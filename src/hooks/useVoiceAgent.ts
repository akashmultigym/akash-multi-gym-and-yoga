import { useState, useRef, useEffect, useCallback } from 'react';
import { GoogleGenAI, LiveConnectConfig, Modality } from '@google/genai';

const PCM_SAMPLE_RATE = 16000;
const OUTPUT_SAMPLE_RATE = 24000; // Gemini Live returns 24kHz audio

const activeSources = new Set<AudioBufferSourceNode>();

export function useVoiceAgent() {
  const [isActive, setIsActive] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const audioContextRef = useRef<AudioContext | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const scriptNodeRef = useRef<ScriptProcessorNode | null>(null);
  const sessionRef = useRef<any>(null);
  
  // Audio playback state
  const nextPlayTimeRef = useRef<number>(0);

  const connect = useCallback(async () => {
    setIsConnecting(true);
    setError(null);
    try {
      if (!process.env.GEMINI_API_KEY) {
        throw new Error("Please configure your Gemini API Key in the AI Studio Settings (Secrets panel) to use the voice agent.");
      }

      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: PCM_SAMPLE_RATE });
      audioContextRef.current = audioCtx;
      
      const stream = await navigator.mediaDevices.getUserMedia({ audio: {
        echoCancellation: true,
        noiseSuppression: true,
        autoGainControl: true,
      }});
      streamRef.current = stream;

      nextPlayTimeRef.current = audioCtx.currentTime;

      // Connect to Gemini
      const sessionPromise = ai.live.connect({
        model: "gemini-3.1-flash-live-preview",
        config: {
          responseModalities: [Modality.AUDIO],
          speechConfig: {
            voiceConfig: { prebuiltVoiceConfig: { voiceName: "Aoede" } },
          },
          systemInstruction: "You are the AI voice assistant for Akash Multi Gym And Yoga (Best Gym in Maheshtala Area). Owner: Manoj Majhi. Address: Akra Station Road, Noa Para Kolkata 700141. Contact: 8240038696. Timings: 6 AM to 11 AM and 3 PM to 11:30 PM. Equipment: All kinds of modern multi gym equipments are available. Pricing context: Admission fee is 2,000 RS, plus first month 800 RS (Total 2,800 RS). Monthly fee is 800 RS. Yearly subscription is 9,600 RS (waives the 2,000 RS admission fee). Tell users that prices may vary on seasonal changes so please contact Manoj sir for exact pricing details. IMPORTANT: You support English, Bengali, and Hindi. You MUST always reply in the exact same language the user uses. Keep responses EXTREMELY concise. Be energetic, helpful, natural. Do not use formatting. Only speak plain text. When interrupted, stop immediately and listen.",
        },
        callbacks: {
          onopen: () => {
            const source = audioCtx.createMediaStreamSource(stream);
            const processor = audioCtx.createScriptProcessor(4096, 1, 1);
            scriptNodeRef.current = processor;
            
            processor.onaudioprocess = (e) => {
              const channelData = e.inputBuffer.getChannelData(0);
              // Float32 to Int16
              const pcm16 = new Int16Array(channelData.length);
              for (let i = 0; i < channelData.length; i++) {
                let s = Math.max(-1, Math.min(1, channelData[i]));
                pcm16[i] = s < 0 ? s * 0x8000 : s * 0x7FFF;
              }
              // To Base64
              const bytes = new Uint8Array(pcm16.buffer);
              let binary = '';
              for (let i = 0; i < bytes.byteLength; i++) {
                binary += String.fromCharCode(bytes[i]);
              }
              const base64Data = btoa(binary);
              
              if (sessionRef.current) {
                sessionRef.current.sendRealtimeInput({
                  audio: { data: base64Data, mimeType: 'audio/pcm;rate=16000' }
                });
              }
            };

            source.connect(processor);
            processor.connect(audioCtx.destination);
            setIsConnecting(false);
            setIsActive(true);
          },
          onmessage: (message: any) => {
            if (message.serverContent?.interrupted) {
              // Handle interruption: stop all playing audio and reset play time
              activeSources.forEach(source => {
                try { source.stop(); } catch(e) {}
                try { source.disconnect(); } catch(e) {}
              });
              activeSources.clear();

              if (audioContextRef.current) {
                nextPlayTimeRef.current = audioContextRef.current.currentTime + 0.1; // Add small buffer for transition
              }
            }
            
            const base64Audio = message.serverContent?.modelTurn?.parts?.[0]?.inlineData?.data;
            if (base64Audio && audioContextRef.current) {
              playPCM16Base64(base64Audio, audioContextRef.current, nextPlayTimeRef);
            }
          },
          onclose: () => {
            disconnect();
          },
          onerror: (err) => {
            console.error("Gemini Live Error:", err);
            setError("Connection error");
            disconnect();
          }
        }
      } as any);

      sessionRef.current = await sessionPromise;
      
      // onopen should be called when ready.
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Failed to start voice agent");
      setIsConnecting(false);
      disconnect();
    }
  }, []);

  const disconnect = useCallback(() => {
    setIsActive(false);
    setIsConnecting(false);
    
    // Stop any playing audio
    activeSources.forEach(source => {
      try { source.stop(); } catch(e) {}
      try { source.disconnect(); } catch(e) {}
    });
    activeSources.clear();

    if (sessionRef.current) {
      try { sessionRef.current.close(); } catch(e) {}
      sessionRef.current = null;
    }
    if (scriptNodeRef.current) {
      scriptNodeRef.current.disconnect();
      scriptNodeRef.current = null;
    }
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(t => t.stop());
      streamRef.current = null;
    }
    if (audioContextRef.current) {
      audioContextRef.current.close().catch(() => {});
      audioContextRef.current = null;
    }
  }, []);

  return { isActive, isConnecting, error, connect, disconnect };
}

function playPCM16Base64(base64: string, audioCtx: AudioContext, nextPlayTimeRef: React.MutableRefObject<number>) {
  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  
  const int16Array = new Int16Array(bytes.buffer);
  const float32Array = new Float32Array(int16Array.length);
  for (let i = 0; i < int16Array.length; i++) {
    float32Array[i] = int16Array[i] / (int16Array[i] < 0 ? 0x8000 : 0x7FFF);
  }

  const audioBuffer = audioCtx.createBuffer(1, float32Array.length, OUTPUT_SAMPLE_RATE);
  audioBuffer.getChannelData(0).set(float32Array);

  const source = audioCtx.createBufferSource();
  source.buffer = audioBuffer;
  source.connect(audioCtx.destination);
  
  activeSources.add(source);
  source.onended = () => activeSources.delete(source);

  const currentTime = audioCtx.currentTime;
  if (nextPlayTimeRef.current < currentTime) {
    nextPlayTimeRef.current = currentTime;
  }
  
  source.start(nextPlayTimeRef.current);
  nextPlayTimeRef.current += audioBuffer.duration;
}
