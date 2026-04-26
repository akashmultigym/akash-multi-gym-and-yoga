import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useVoiceAgent } from "./hooks/useVoiceAgent";
import {
  Dumbbell,
  MapPin,
  Phone,
  ChevronRight,
  Menu,
  X,
  Mic,
  Activity,
  MessageCircle,
  HeartPulse,
  Navigation,
  CheckCircle2,
  Clock,
  IndianRupee,
} from "lucide-react";

const SECTIONS = [
  { id: "hero", label: "Home" },
  { id: "features", label: "Offerings" },
  { id: "pricing", label: "Pricing" },
  { id: "location", label: "Location" },
  { id: "contact", label: "Contact" },
];

export default function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const { isActive, isConnecting, error, connect, disconnect } =
    useVoiceAgent();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    setMobileMenuOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleVoiceAgentClick = () => {
    if (isActive || isConnecting) {
      disconnect();
    } else {
      connect();
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 font-sans selection:bg-lime-500/30">
      {/* Navigation */}
      <header
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-zinc-950/80 backdrop-blur-md border-b border-zinc-800"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <div
              className="flex items-center gap-2 cursor-pointer"
              onClick={() => scrollTo("hero")}
            >
              <div className="w-10 h-10 bg-lime-500 rounded-lg flex items-center justify-center">
                <Dumbbell className="text-zinc-950 h-6 w-6" strokeWidth={2.5} />
              </div>
              <div>
                <h1 className="font-bold text-xl tracking-tight leading-none uppercase">
                  Akash
                </h1>
                <p className="text-[10px] text-lime-500 uppercase tracking-widest font-semibold mt-0.5">
                  Multi Gym And Yoga
                </p>
              </div>
            </div>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-8">
              {SECTIONS.slice(1).map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollTo(item.id)}
                  className="text-sm font-medium text-zinc-400 hover:text-lime-500 transition-colors uppercase tracking-wider"
                >
                  {item.label}
                </button>
              ))}
              <a
                href="https://wa.me/918240038696"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-lime-500 text-zinc-950 px-5 py-2.5 rounded-full font-bold text-sm tracking-wide uppercase hover:bg-lime-400 transition-colors flex items-center gap-2"
              >
                <MessageCircle className="w-4 h-4" />
                WhatsApp Us
              </a>
            </nav>

            {/* Mobile Menu Toggle */}
            <button
              className="md:hidden text-zinc-300"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="w-7 h-7" />
              ) : (
                <Menu className="w-7 h-7" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Nav Overlay */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="md:hidden absolute top-20 left-0 w-full bg-zinc-900 border-b border-zinc-800 shadow-2xl"
            >
              <div className="flex flex-col p-4 space-y-4">
                {SECTIONS.slice(1).map((item) => (
                  <button
                    key={item.id}
                    onClick={() => scrollTo(item.id)}
                    className="text-left px-4 py-3 text-sm font-semibold text-zinc-200 hover:bg-zinc-800 hover:text-lime-500 rounded-lg uppercase tracking-wider"
                  >
                    {item.label}
                  </button>
                ))}
                <div className="pt-4 pb-2 px-4">
                  <a
                    href="https://wa.me/918240038696"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex justify-center items-center gap-2 bg-lime-500 text-zinc-950 px-5 py-3 rounded-xl font-bold text-sm tracking-wide uppercase"
                  >
                    <MessageCircle className="w-5 h-5" />
                    WhatsApp Us
                  </a>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Hero Section */}
      <section
        id="hero"
        className="relative h-screen flex items-center justify-center overflow-hidden"
      >
        {/* Background Image with intense moody overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1920"
            alt="Dark Modern Gym Interior"
            className="w-full h-full object-cover object-center"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-zinc-950 via-zinc-950/80 to-zinc-950/40"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-zinc-950/40 via-transparent to-zinc-950"></div>
        </div>

        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-900/80 border border-zinc-800 mb-6 backdrop-blur-sm">
              <span className="w-2 h-2 rounded-full bg-lime-500 animate-pulse"></span>
              <span className="text-xs font-semibold uppercase tracking-wider text-zinc-300">
                Open Daily in Noa Para
              </span>
            </div>
            <h2 className="text-5xl md:text-7xl font-extrabold text-zinc-100 tracking-tight leading-[1.1] mb-6">
              THE BEST GYM IN <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-lime-400 to-emerald-600">
                MAHESHTALA AREA
              </span>
            </h2>
            <p className="text-lg md:text-xl text-zinc-400 max-w-lg mb-10 font-light leading-relaxed">
              Premium yoga sessions and modern multi-gym equipment designed for
              real transformations.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => scrollTo("features")}
                className="px-8 py-4 bg-lime-500 text-zinc-950 font-bold uppercase tracking-widest rounded-full hover:bg-lime-400 transition-colors flex items-center justify-center gap-2 group"
              >
                Start Your Journey
                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <a
                href="https://share.google/3oSpLNMmjGUO6sUgi"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 bg-zinc-900 text-white font-bold uppercase tracking-widest border border-zinc-800 rounded-full hover:bg-zinc-800 hover:border-zinc-700 transition-colors flex items-center justify-center gap-2"
              >
                <Navigation className="w-5 h-5 text-lime-500" />
                Get Directions
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Offerings Sector */}
      <section id="features" className="py-24 bg-zinc-950 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-center mb-16"
          >
            <h3 className="text-lime-500 font-bold uppercase tracking-widest text-sm mb-2">
              Our Offerings
            </h3>
            <h2 className="text-3xl md:text-5xl font-bold text-zinc-100">
              Premium Facilities
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            {/* Multi-Gym Card */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              className="group relative overflow-hidden rounded-3xl bg-zinc-900 border border-zinc-800"
            >
              <div className="absolute inset-0 h-2/3">
                <img
                  src="https://images.unsplash.com/photo-1540497077202-7c8a3999166f?q=80&w=800"
                  alt="Modern Gym Equipment"
                  className="w-full h-full object-cover opacity-60 group-hover:opacity-40 group-hover:scale-105 transition-all duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-zinc-900/60 to-zinc-900"></div>
              </div>
              <div className="relative pt-64 p-8 sm:p-10 z-10 flex flex-col h-full justify-end">
                <div className="w-14 h-14 bg-zinc-950 border border-zinc-800 rounded-2xl flex items-center justify-center mb-6 text-lime-500 shadow-xl">
                  <Activity className="w-7 h-7" />
                </div>
                <h3 className="text-2xl font-bold mb-3">Modern Equipment</h3>
                <p className="text-zinc-400 font-light mb-6">
                  State-of-the-art multi-gym equipment designed for all fitness
                  levels. Build strength, endurance, and power in a clean,
                  hardcore environment.
                </p>
                <ul className="space-y-3 mb-8">
                  {[
                    "Free Weights Area",
                    "Cardio Selection",
                    "Resistance Machines",
                  ].map((feature, i) => (
                    <li
                      key={i}
                      className="flex items-center gap-3 text-sm text-zinc-300 font-medium"
                    >
                      <CheckCircle2 className="w-4 h-4 text-lime-500" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>

            {/* Yoga Card */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              className="group relative overflow-hidden rounded-3xl bg-zinc-900 border border-zinc-800"
            >
              <div className="absolute inset-0 h-2/3">
                <img
                  src="https://images.unsplash.com/photo-1599901860904-17e6ed7083a0?q=80&w=800"
                  alt="Premium Yoga Studio"
                  className="w-full h-full object-cover opacity-60 group-hover:opacity-40 group-hover:scale-105 transition-all duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-zinc-900/60 to-zinc-900"></div>
              </div>
              <div className="relative pt-64 p-8 sm:p-10 z-10 flex flex-col h-full justify-end">
                <div className="w-14 h-14 bg-zinc-950 border border-zinc-800 rounded-2xl flex items-center justify-center mb-6 text-lime-500 shadow-xl">
                  <HeartPulse className="w-7 h-7" />
                </div>
                <h3 className="text-2xl font-bold mb-3">Premium Yoga</h3>
                <p className="text-zinc-400 font-light mb-6">
                  Expert-led yoga sessions focusing on flexibility, core
                  strength, and mental wellness. Find your balance in our
                  dedicated studio space.
                </p>
                <ul className="space-y-3 mb-8">
                  {[
                    "Expert Instructors",
                    "All Experience Levels",
                    "Dedicated Calm Space",
                  ].map((feature, i) => (
                    <li
                      key={i}
                      className="flex items-center gap-3 text-sm text-zinc-300 font-medium"
                    >
                      <CheckCircle2 className="w-4 h-4 text-lime-500" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section
        id="pricing"
        className="py-24 bg-zinc-900 border-t border-zinc-800 relative"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-center mb-16"
          >
            <h3 className="text-lime-500 font-bold uppercase tracking-widest text-sm mb-2">
              Membership Plans
            </h3>
            <h2 className="text-3xl md:text-5xl font-bold text-zinc-100">
              Simple, Transparent Pricing
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Monthly Plan */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              className="bg-zinc-950 border border-zinc-800 rounded-3xl p-8 flex flex-col relative"
            >
              <h3 className="text-2xl font-bold text-zinc-100 mb-2">
                Monthly Foundation
              </h3>
              <div className="text-zinc-400 mb-6 flex items-baseline gap-1">
                <span className="text-4xl font-extrabold text-white">₹800</span>
                <span>/mo</span>
              </div>
              <ul className="space-y-4 mb-8 flex-1">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-lime-500 flex-shrink-0 mt-0.5" />
                  <span className="text-zinc-300">
                    Admission Fee: ₹2,000 (One-time)
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-lime-500 flex-shrink-0 mt-0.5" />
                  <span className="text-zinc-300">
                    Total at joining: ₹2,800
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-lime-500 flex-shrink-0 mt-0.5" />
                  <span className="text-zinc-300">
                    Full access to multi-gym and yoga
                  </span>
                </li>
              </ul>
            </motion.div>

            {/* Yearly Plan */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: 0.1 }}
              className="bg-zinc-800 border-2 border-lime-500 rounded-3xl p-8 flex flex-col relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 bg-lime-500 text-zinc-950 text-xs font-bold uppercase tracking-wider px-4 py-1.5 rounded-bl-xl">
                Best Value
              </div>
              <h3 className="text-2xl font-bold text-zinc-100 mb-2">
                Yearly Membership
              </h3>
              <div className="text-zinc-400 mb-6 flex items-baseline gap-1">
                <span className="text-4xl font-extrabold text-white">
                  ₹9,600
                </span>
                <span>/yr</span>
              </div>
              <ul className="space-y-4 mb-8 flex-1">
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-lime-500 flex-shrink-0 mt-0.5" />
                  <span className="text-zinc-100 font-semibold underline decoration-lime-500 underline-offset-4">
                    Admission Fee Waived (Save ₹2,000)
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-lime-500 flex-shrink-0 mt-0.5" />
                  <span className="text-zinc-300">
                    Full year unrestricted access
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-lime-500 flex-shrink-0 mt-0.5" />
                  <span className="text-zinc-300">
                    All kinds of modern equipment
                  </span>
                </li>
              </ul>
            </motion.div>
          </div>

          <p className="text-center text-zinc-500 text-sm mt-8 max-w-2xl mx-auto">
            * Prices may vary on seasonal changes. Please contact Manoj Sir for
            exact, up-to-date pricing details.
          </p>
        </div>
      </section>

      {/* Location & Contact Section */}
      <section
        id="location"
        className="py-24 bg-zinc-950 border-t border-zinc-800"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Contact Details */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="flex flex-col justify-center"
            >
              <h3 className="text-lime-500 font-bold uppercase tracking-widest text-sm mb-2">
                Visit Us
              </h3>
              <h2 className="text-3xl md:text-5xl font-bold text-zinc-100 mb-8">
                Ready to Start?
              </h2>

              <div className="space-y-8">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-zinc-900 flex items-center justify-center flex-shrink-0 border border-zinc-800">
                    <MapPin className="text-lime-500 w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-zinc-200 mb-1">
                      Our Location
                    </h4>
                    <p className="text-zinc-400 leading-relaxed mb-3">
                      Akra Station Road, Noa Para,
                      <br />
                      Maheshtala,
                      <br />
                      Kolkata 700141
                    </p>
                    <a
                      href="https://share.google/3oSpLNMmjGUO6sUgi"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-lime-500 hover:text-lime-400 text-sm font-bold uppercase tracking-wider flex items-center gap-1 group"
                    >
                      Open in Maps
                      <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-zinc-900 flex items-center justify-center flex-shrink-0 border border-zinc-800">
                    <Clock className="text-lime-500 w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-zinc-200 mb-1">
                      Gym Timings
                    </h4>
                    <p className="text-zinc-400 leading-relaxed">
                      Morning: 6:00 AM - 11:00 AM
                      <br />
                      Evening: 3:00 PM - 11:30 PM
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-zinc-900 flex items-center justify-center flex-shrink-0 border border-zinc-800">
                    <Phone className="text-lime-500 w-5 h-5" />
                  </div>
                  <div id="contact">
                    <h4 className="text-lg font-bold text-zinc-200 mb-1">
                      Contact Owner
                    </h4>
                    <p className="text-zinc-400 mb-1">Manoj Majhi</p>
                    <p className="text-zinc-300 font-light text-xl tracking-wider mb-4">
                      8240038696
                    </p>
                    <a
                      href="https://wa.me/918240038696"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 text-zinc-100 px-6 py-3 rounded-xl font-bold text-sm tracking-wide uppercase transition-colors shadow-lg"
                    >
                      <MessageCircle className="w-5 h-5 text-lime-500" />
                      Chat on WhatsApp
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Map Placeholder Graphic (SaaS Landing Split Style) */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative aspect-square lg:aspect-auto lg:h-[600px] w-full bg-zinc-900 rounded-3xl border border-zinc-800 overflow-hidden flex items-center justify-center"
            >
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-zinc-700/40 via-zinc-900/80 to-zinc-900 border border-zinc-700 rounded-3xl m-2 opacity-50"></div>

              {/* Abstract Map visual elements */}
              <div className="relative z-10 flex flex-col items-center">
                <div className="w-24 h-24 rounded-full bg-zinc-900/80 backdrop-blur-md border border-zinc-700 flex items-center justify-center shadow-2xl relative mb-6">
                  <div className="absolute inset-0 rounded-full border border-lime-500/30 animate-[ping_3s_cubic-bezier(0,0,0.2,1)_infinite]"></div>
                  <MapPin className="text-lime-500 w-10 h-10" />
                </div>
                <div className="text-center px-8">
                  <h3 className="text-2xl font-bold text-zinc-200 mb-2">
                    Akash Multi Gym And Yoga
                  </h3>
                  <p className="text-zinc-400 max-w-xs mx-auto">
                    Located conveniently on Akra Station Road, Noa Para, Maheshtala Kolkata 700141.
                  </p>
                </div>
                <a
                  href="https://share.google/3oSpLNMmjGUO6sUgi"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-8 bg-lime-500 text-zinc-950 px-6 py-3 rounded-full font-bold uppercase tracking-wider text-sm hover:bg-lime-400 transition-colors shadow-[0_0_20px_rgba(132,204,22,0.3)]"
                >
                  Get Directions
                </a>
              </div>

              {/* Grid background pattern */}
              <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#3f3f4622_1px,transparent_1px),linear-gradient(to_bottom,#3f3f4622_1px,transparent_1px)] bg-[size:40px_40px]"></div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-zinc-950 py-12 border-t border-zinc-900 text-center relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="w-12 h-12 bg-zinc-900 rounded-xl mx-auto flex items-center justify-center mb-6">
            <Dumbbell className="text-lime-500 w-6 h-6" />
          </div>
          <h2 className="text-xl font-bold text-zinc-200 uppercase tracking-widest mb-2">
            Akash Multi Gym & Yoga
          </h2>
          <p className="text-zinc-500 text-sm mb-8">
            Owned by Manoj Majhi • Call: 8240038696
          </p>
          <div className="text-zinc-600 text-xs font-mono">
            &copy; {new Date().getFullYear()} Akash Multi Gym And Yoga. All
            rights reserved.
          </div>
        </div>
      </footer>

      {/* Persistent AI Voice Agent FAB */}
      <div className="fixed bottom-6 right-6 z-50">
        <AnimatePresence>
          {(isActive || isConnecting) && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 20 }}
              className="absolute bottom-20 right-0 w-72 bg-zinc-900 border border-zinc-700/50 rounded-2xl shadow-2xl overflow-hidden backdrop-blur-xl"
            >
              <div className="p-4 bg-zinc-800/50 border-b border-zinc-700/50 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span
                    className={`w-2 h-2 rounded-full ${isActive ? "bg-lime-500 animate-pulse" : isConnecting ? "bg-amber-500 animate-pulse" : "bg-red-500 animate-pulse"}`}
                  ></span>
                  <span className="text-xs font-bold uppercase tracking-wider text-zinc-300">
                    {isConnecting ? "Connecting..." : "AI Assistant"}
                  </span>
                </div>
                <button
                  onClick={disconnect}
                  className="text-zinc-400 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
              <div className="p-6 flex flex-col items-center justify-center min-h-[160px] text-center">
                {error ? (
                  <div className="text-red-400 text-sm font-medium">
                    {error}
                  </div>
                ) : (
                  <>
                    <div className="relative">
                      {/* Speech wave animation rings */}
                      {isActive && (
                        <>
                          <div className="absolute -inset-4 rounded-full border border-lime-500/20 animate-[ping_2s_cubic-bezier(0,0,0.2,1)_infinite]"></div>
                          <div className="absolute -inset-8 rounded-full border border-lime-500/10 animate-[ping_2.5s_cubic-bezier(0,0,0.2,1)_infinite_0.5s]"></div>
                        </>
                      )}
                      <div className="w-16 h-16 rounded-full bg-zinc-800 flex items-center justify-center relative z-10 border border-zinc-700 shadow-xl">
                        <Mic
                          className={`${isActive ? "text-lime-500" : "text-zinc-500"} w-7 h-7`}
                        />
                      </div>
                    </div>
                    <p className="mt-6 text-sm text-zinc-400 font-medium">
                      {isConnecting ? "Waking up agent..." : "Listening..."}
                    </p>
                    <p className="mt-1 text-xs text-zinc-500">
                      {isActive ? "Speak naturally to interact" : "Please wait"}
                    </p>
                  </>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main Floating Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleVoiceAgentClick}
          className={`relative flex items-center justify-center w-14 h-14 rounded-full shadow-2xl transition-all duration-300 group ${
            isActive || isConnecting
              ? "bg-zinc-800 text-lime-500 border border-lime-500/50 shadow-[0_0_20px_rgba(132,204,22,0.3)]"
              : "bg-lime-500 text-zinc-950 hover:bg-lime-400"
          }`}
          aria-label="AI Voice Agent"
        >
          {isActive || isConnecting ? (
            <X className="w-6 h-6" />
          ) : (
            <div className="flex items-center justify-center w-full h-full relative">
              <Mic className="w-6 h-6 z-10" />
              <div className="absolute inset-0 rounded-full bg-lime-400/40 animate-ping opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </div>
          )}
        </motion.button>
      </div>
    </div>
  );
}
