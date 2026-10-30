"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Github,
  Instagram,
  Linkedin,
  Mail,
  Menu,
  X,
  ChevronRight,
} from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import Script from "next/script";
import { Toast } from "./components/toast";
import Typed from "typed.js";
import emailjs from "@emailjs/browser";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import Signature from "./components/Signature";

declare global {
  interface Window {
    Typed: typeof import("typed.js");
  }
}

export default function Portfolio() {
  const typedRef = useRef(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [formData, setFormData] = useState({
    from: "",
    name: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toast, setToast] = useState({
    isVisible: false,
    message: "",
    type: "success" as "success" | "error",
  });

  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.05], [1, 0]);

  useEffect(() => {
    const loadTyped = () => {
      if (typeof window !== "undefined" && typedRef.current && window.Typed) {
        new Typed(typedRef.current, {
          strings: [
            "React Native Developer.",
            "Software Developer.",
            "Product-Focused Developer.",
            "Cross-Platform App Developer.",
          ],
          typeSpeed: 50,
          backSpeed: 30,
          loop: true,
          backDelay: 2000,
        });
      }
    };

    if (typeof window !== "undefined" && window.Typed) {
      loadTyped();
    } else {
      window.addEventListener("typed-script-loaded", loadTyped);
    }

    return () => {
      window.removeEventListener("typed-script-loaded", loadTyped);
    };
  }, []);

  const handleScriptLoad = () => {
    if (typeof window !== "undefined") {
      window.dispatchEvent(new Event("typed-script-loaded"));
    }
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const navHeight = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
    setIsMenuOpen(false);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const showToast = (message: string, type: "success" | "error") => {
    setToast({
      isVisible: true,
      message,
      type,
    });
  };

  const hideToast = () => {
    setToast((prev) => ({
      ...prev,
      isVisible: false,
    }));
  };

  useEffect(() => {
    // PUBLIC KEY verification
    emailjs.init("HBml8i9QDqfK_05Il");
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Note: check the variable names in the EmailJS dashboard template
      const payload = {
        from_name: formData.name,
        from_email: formData.from,
        subject: formData.subject,
        message: formData.message,
        timestamp: new Date().toLocaleString(),
        user_agent: typeof navigator !== "undefined" ? navigator.userAgent : "unknown",
      };

      const result = await emailjs.send(
        "service_692qx9r",
        "template_pszrrw8",
        payload
      );

      if (result.status === 200) {
        showToast("Message sent successfully! I'll get back to you soon.", "success");
        setFormData({ from: "", name: "", subject: "", message: "" });
      } else {
        throw new Error(`EmailJS Error: ${result.status} ${result.text}`);
      }
    } catch (err) {
      console.error("EmailJS Error:", err);
      const errorMessage = err instanceof Error ? err.message : String(err);
      showToast(
        errorMessage.includes("412")
          ? "Message could not be sent (Config Error). Please contact via email directly."
          : "Failed to send message. Please try again later.",
        "error"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const navLinks = [
    { name: "Home", id: "home" },
    { name: "About", id: "about" },
    { name: "Projects", id: "projects" },
    { name: "Contact", id: "contact" },
  ];

  return (
    <div className="min-h-screen bg-[#08090A] text-[#F5F5F5] selection:bg-[#00D9F5]/30">
      <Script
        src="https://unpkg.com/typed.js@2.1.0/dist/typed.umd.js"
        onLoad={handleScriptLoad}
      />

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b border-white/[0.03] bg-[#08090A]/80 backdrop-blur-xl">
        <div className="container-site">
          <div className="flex justify-between items-center h-20">
            <Link
              href="/"
              className="text-xl font-heading font-bold tracking-tighter hover:text-[#00D9F5] transition-colors"
            >
              Rudrx Devport
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-10">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollToSection(link.id)}
                  className="text-sm font-medium text-[#A1A1AA] hover:text-[#00D9F5] transition-colors tracking-tight"
                >
                  {link.name}
                </button>
              ))}
              <Link
                href="/CV/Rudraksh_Ramekar_CV.pdf"
                className="px-5 py-2.5 rounded-full bg-[#F5F5F5] text-[#08090A] text-sm font-bold hover:bg-[#00D9F5] transition-all hover:scale-105 active:scale-95"
              >
                Resume
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 text-[#A1A1AA] hover:text-[#F5F5F5]"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-[#08090A] border-b border-white/[0.05] overflow-hidden"
            >
              <div className="container-site py-8 flex flex-col space-y-6">
                {navLinks.map((link) => (
                  <button
                    key={link.id}
                    onClick={() => scrollToSection(link.id)}
                    className="text-2xl font-heading font-semibold text-left text-[#A1A1AA] hover:text-[#00D9F5]"
                  >
                    {link.name}
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Hero Section */}
      <section
        id="home"
        className="relative min-h-screen flex items-center pt-20"
      >
        {/* Abstract shapes/glows */}
        <div className="absolute top-[20%] left-[-10%] w-[40vw] h-[40vw] bg-[#00D9F5]/5 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-[10%] right-[-5%] w-[30vw] h-[30vw] bg-[#A78BFA]/5 rounded-full blur-[100px] pointer-events-none" />

        <div className="container-site relative">
          <div className="max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/[0.08] bg-white/[0.02] mb-8"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#00D9F5] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#00D9F5]"></span>
              </span>
              <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#A1A1AA]">
                Available for opportunities
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-5xl md:text-7xl lg:text-8xl font-heading font-bold tracking-tighter mb-8 leading-[0.9]"
            >
              Rudraksh <br />
              <span className="text-[#A1A1AA]">Ramekar</span>
            </motion.h1>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-2xl md:text-3xl font-medium text-[#F5F5F5] mb-8 min-h-[1.5em]"
            >
              A <span className="text-[#00D9F5] font-semibold" ref={typedRef}></span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-[#A1A1AA] text-lg md:text-xl max-w-2xl mb-12 leading-relaxed"
            >
              I specialize in building intuitive, high-performance mobile and web
              experiences using <span className="text-[#00D9F5]">React Native</span>,
              <span className="text-[#A78BFA]"> Expo</span>, and
              <span className="text-white font-medium"> TypeScript</span>.
              I bridge the gap between technical engineering and user-focused product design.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-wrap gap-4"
            >
              <Link
                href="/CV/Rudraksh_Ramekar_CV.pdf"
                className="group flex items-center gap-3 px-8 py-4 rounded-full bg-[#00D9F5] text-[#08090A] font-bold transition-all hover:scale-105 hover:bg-white active:scale-95"
              >
                Download CV
                <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>

              <Link
                href="https://github.com/roxton75"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 px-8 py-4 rounded-full border border-white/[0.1] bg-white/[0.02] text-[#F5F5F5] font-bold transition-all hover:bg-white/[0.05] active:scale-95"
              >
                <Github size={20} />
                GitHub
              </Link>
            </motion.div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          style={{ opacity }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none"
        >
          <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#52525B]">Scroll</span>
          <div className="w-px h-12 bg-gradient-to-b from-[#00D9F5] to-transparent opacity-50" />
        </motion.div>
      </section>

      {/* Work Experience */}
      <section className="py-32 border-t border-white/[0.03]">
        <div className="container-site">
          <div className="grid lg:grid-cols-12 gap-16">
            <div className="lg:col-span-4">
              <p className="section-label">Trajectory</p>
              <h2 className="section-title">Work Experience</h2>
            </div>
            <div className="lg:col-span-8 space-y-24">
              {/* Experience 1 */}
              <div className="group relative">
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-2">
                  <div>
                    <h3 className="text-2xl font-heading font-bold text-[#F5F5F5] group-hover:text-[#00D9F5] transition-colors">
                      Mobile Application Developer
                    </h3>
                    <p className="text-[#A1A1AA] font-medium tracking-tight">ANIX AI</p>
                  </div>
                  <div className="text-sm font-mono text-[#52525B] px-3 py-1 rounded-full border border-white/[0.05] bg-white/[0.01]">
                    July 2026 — October 2026
                  </div>
                </div>
                <div className="space-y-4 text-[#A1A1AA] leading-relaxed max-w-3xl">
                  <p>Developed the KATIC LMS mobile application using React Native, Expo, and TypeScript.</p>
                  <ul className="space-y-3">
                    <li className="flex gap-3">
                      <span className="text-[#00D9F5] font-bold mt-1.5">•</span>
                      <span>Built course discovery, enrollment, learning, progress tracking, certificates, and video learning features with playback controls.</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-[#00D9F5] font-bold mt-1.5">•</span>
                      <span>Integrated REST APIs for authentication, courses, enrollments, progress, certificates, and media.</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-[#00D9F5] font-bold mt-1.5">•</span>
                      <span>Built reusable, responsive UI components with consistent theming and cross-platform support.</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Experience 2 */}
              <div className="group relative">
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-2">
                  <div>
                    <h3 className="text-2xl font-heading font-bold text-[#F5F5F5] group-hover:text-[#00D9F5] transition-colors">
                      Android Developer Intern
                    </h3>
                    <p className="text-[#A1A1AA] font-medium tracking-tight">Mout Reach Solutions Pvt. Ltd.</p>
                  </div>
                  <div className="text-sm font-mono text-[#52525B] px-3 py-1 rounded-full border border-white/[0.05] bg-white/[0.01]">
                    June 2023 — September 2023
                  </div>
                </div>
                <div className="space-y-4 text-[#A1A1AA] leading-relaxed max-w-3xl">
                  <p>Developed Android applications using Java and Android SDK.</p>
                  <ul className="space-y-3">
                    <li className="flex gap-3">
                      <span className="text-[#00D9F5] font-bold mt-1.5">•</span>
                      <span>Designed user-friendly mobile interfaces with a focus on usability and performance.</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-[#00D9F5] font-bold mt-1.5">•</span>
                      <span>Integrated third-party APIs, including Google Maps.</span>
                    </li>
                    <li className="flex gap-3">
                      <span className="text-[#00D9F5] font-bold mt-1.5">•</span>
                      <span>Contributed to application features and UI improvements based on project requirements.</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-32 bg-[#111214] relative overflow-hidden">
        <div className="container-site relative z-10">
          <div className="grid lg:grid-cols-12 gap-16 items-start">
            <div className="lg:col-span-5 relative order-2 lg:order-1">
              <div className="aspect-square relative rounded-[2rem] overflow-hidden border border-white/[0.05] shadow-2xl">
                <Image
                  src="/images/avatar.webp"
                  alt="Rudraksh Ramekar"
                  fill
                  className="object-cover grayscale hover:grayscale-0 transition-all duration-700 hover:scale-105"
                />
              </div>
              <div className="absolute -bottom-8 -right-8 w-40 h-40 bg-[#00D9F5]/10 rounded-full blur-3xl" />
            </div>

            <div className="lg:col-span-7 order-1 lg:order-2">
              <p className="section-label">Introduction</p>
              <h2 className="section-title mb-8">About Me</h2>

              <div className="space-y-8">
                <p className="text-xl text-[#F5F5F5] font-medium leading-relaxed">
                  I&apos;m a software developer and engineering student passionate
                  about building useful digital products.
                </p>
                <p className="text-[#A1A1AA] leading-relaxed">
                  My core experience lies in cross-platform mobile development with React Native, Expo, and
                  TypeScript, alongside working with modern web technologies, APIs,
                  and databases. I care about clean architecture, reusable
                  components, thoughtful UI/UX, and solving real-world problems
                  through technology.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 pt-4">
                  <div>
                    <h4 className="font-heading font-bold text-[#F5F5F5] mb-4 flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#00D9F5]" />
                      Education
                    </h4>
                    <ul className="space-y-4 font-mono text-xs text-[#A1A1AA]">
                      <li>
                        <p className="text-[#F5F5F5] font-bold text-[13px] mb-1 uppercase tracking-wider">B.E. CSE (Data Science)</p>
                        <p>Sant Gadge Baba Amravati University</p>
                        <p className="text-[#52525B]">2024 — 2027</p>
                      </li>
                      <li>
                        <p className="text-[#F5F5F5] font-bold text-[13px] mb-1 uppercase tracking-wider">Diploma in Computer Eng.</p>
                        <p>MSBTE</p>
                        <p className="text-[#52525B]">2021 — 2024</p>
                      </li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-heading font-bold text-[#F5F5F5] mb-4 flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#A78BFA]" />
                      Specialization
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {[
                        "Cross-Platform Dev",
                        "UI/UX Design",
                        "Frontend Engineering",
                        "IoT Solutions",
                        "API Architecture",
                        "Product Thinking"
                      ].map((item) => (
                        <span key={item} className="px-3 py-1.5 rounded-lg bg-[#18191C] border border-white/[0.05] text-[11px] font-mono uppercase tracking-widest text-[#A1A1AA]">
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-32">
        <div className="container-site">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-20 gap-8">
            <div className="max-w-xl">
              <p className="section-label">Showcase</p>
              <h2 className="section-title">Selected Projects</h2>
            </div>
            <Link
              href="https://github.com/roxton75"
              className="inline-flex items-center gap-2 text-sm font-mono uppercase tracking-[0.2em] text-[#A1A1AA] hover:text-[#00D9F5] transition-colors group"
            >
              View all work
              <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: "Spicetify Party",
                category: "Open-Source / Real-time",
                tech: ["React", "TypeScript", "Supabase", "PostgreSQL"],
                description:
                  "Open-source collaborative listening extension for Spotify Desktop. Shared parties with synchronized playback and collaborative queues.",
                features: ["Real-time synchronization", "Party codes", "Member presence", "Shared queues"],
                link: "https://github.com/roxton75",
              },
              {
                title: "Smart Switch",
                category: "IoT / Mobile App",
                tech: ["React Native", "Expo", "Firebase", "ESP32"],
                description:
                  "IoT home automation controller for ESP32 devices. Real-time appliance control and synchronization via mobile interface.",
                features: ["Firebase integration", "Real-time sync", "Status dashboard", "Hardware connectivity"],
                link: "https://github.com/roxton75/Smart-Switch",
              },
              {
                title: "Bubble Brew",
                category: "POS / Management",
                tech: ["React Native", "Expo", "SQLite", "Realm"],
                description:
                  "Cafe management and point-of-sale mobile application designed for optimized order management and billing workflows.",
                features: ["Offline-first data", "Billing workflow", "Menu customization", "Intuitive UI"],
                link: "https://github.com/roxton75/BubbleBrew-Expo-React-Native",
              },
            ].map((project, idx) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="group relative flex flex-col bg-[#111214] border border-white/[0.05] rounded-3xl p-8 hover:bg-[#18191C] hover:border-white/[0.1] transition-all duration-500 overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#00D9F5]/10 rounded-full blur-[60px] opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

                <div className="mb-6">
                  <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#00D9F5]">
                    {project.category}
                  </span>
                  <h3 className="text-2xl font-heading font-bold mt-2 text-[#F5F5F5] group-hover:text-white">
                    {project.title}
                  </h3>
                </div>

                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tech.map((t) => (
                    <span key={t} className="text-[10px] font-mono px-2 py-1 rounded bg-white/[0.03] text-[#52525B] border border-white/[0.05]">
                      {t}
                    </span>
                  ))}
                </div>

                <p className="text-[#A1A1AA] text-sm leading-relaxed mb-8">
                  {project.description}
                </p>

                <div className="mt-auto space-y-6">
                  <ul className="space-y-2">
                    {project.features.map(f => (
                      <li key={f} className="text-[11px] font-medium text-[#52525B] flex items-center gap-2">
                        <div className="w-1 h-1 rounded-full bg-white/20" />
                        {f}
                      </li>
                    ))}
                  </ul>

                  <Link
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-sm font-bold text-[#F5F5F5] group/btn"
                  >
                    View Source
                    <Github size={16} className="group-hover/btn:scale-110 transition-transform" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-32 border-t border-white/[0.03]">
        <div className="container-site">
          <div className="grid lg:grid-cols-12 gap-16">
            <div className="lg:col-span-5">
              <p className="section-label">Connect</p>
              <h2 className="section-title mb-8">Start a conversation</h2>
              <p className="text-[#A1A1AA] text-lg mb-10 leading-relaxed">
                Have a project in mind or just want to say hi? <br />
                I&apos;m always open to discussing new opportunities.
              </p>

              <div className="space-y-6">
                <a
                  href="mailto:workrudrx75@gmail.com"
                  className="group flex items-center gap-4 text-xl font-medium hover:text-[#00D9F5] transition-colors"
                >
                  <div className="w-12 h-12 rounded-full border border-white/[0.1] flex items-center justify-center group-hover:border-[#00D9F5] group-hover:bg-[#00D9F5]/5 transition-all">
                    <Mail size={20} />
                  </div>
                  workrudrx75@gmail.com
                </a>
              </div>
            </div>

            <div className="lg:col-span-7">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#52525B] ml-1">Name</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      placeholder="Full Name"
                      className="w-full px-6 py-4 bg-[#111214] border border-white/[0.05] rounded-2xl text-[#F5F5F5] focus:outline-none focus:border-[#00D9F5] transition-colors"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#52525B] ml-1">Email</label>
                    <input
                      type="email"
                      name="from"
                      value={formData.from}
                      onChange={handleInputChange}
                      required
                      placeholder="hello@example.com"
                      className="w-full px-6 py-4 bg-[#111214] border border-white/[0.05] rounded-2xl text-[#F5F5F5] focus:outline-none focus:border-[#00D9F5] transition-colors"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#52525B] ml-1">Subject</label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    required
                    placeholder="Inquiry about..."
                    className="w-full px-6 py-4 bg-[#111214] border border-white/[0.05] rounded-2xl text-[#F5F5F5] focus:outline-none focus:border-[#00D9F5] transition-colors"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#52525B] ml-1">Message</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={6}
                    placeholder="Tell me more about your project..."
                    className="w-full px-6 py-4 bg-[#111214] border border-white/[0.05] rounded-2xl text-[#F5F5F5] focus:outline-none focus:border-[#00D9F5] transition-colors resize-none"
                  />
                </div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-5 rounded-2xl bg-[#F5F5F5] text-[#08090A] font-bold text-lg hover:bg-[#00D9F5] transition-all disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98]"
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="pt-32 pb-10 bg-[#08090A] overflow-hidden">
        <div className="container-site">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-12 pb-16 border-b border-white/[0.05] mb-16">
            <div className="space-y-6">
              <h2 className="text-4xl md:text-5xl font-heading font-bold tracking-tighter">
                Rudrx <span className="text-[#A1A1AA]">Devport</span>
              </h2>
              <Signature />
            </div>

            <div className="flex flex-col gap-8">
              <div className="flex items-center gap-6">
                {[
                  { icon: <Linkedin size={22} />, url: "https://linkedin.com/in/rudrx75" },
                  { icon: <Github size={22} />, url: "https://github.com/roxton75" },
                  { icon: <Instagram size={22} />, url: "https://www.instagram.com/rudrx_75/" },
                ].map((social, i) => (
                  <Link
                    key={i}
                    href={social.url}
                    target="_blank"
                    className="text-[#A1A1AA] hover:text-[#00D9F5] transition-all hover:-translate-y-1"
                  >
                    {social.icon}
                  </Link>
                ))}
              </div>
              <p className="text-sm font-mono text-[#52525B]">
                © {new Date().getFullYear()} RudrxDevport. <br />
                All rights reserved.
              </p>
            </div>
          </div>
        </div>

        {/* Large Typographic Branded Footer Image */}
        <div className="relative w-full overflow-hidden mt-10 pointer-events-none select-none opacity-40">
           <div className="container-site px-0 max-w-none">
              <div className="relative w-full aspect-[21/5] md:aspect-[21/3]">
                <Image
                  src="/images/header.png"
                  alt="Branded Signature"
                  fill
                  className="object-contain object-bottom"
                />
              </div>
           </div>
        </div>
      </footer>

      <Toast
        message={toast.message}
        type={toast.type}
        isVisible={toast.isVisible}
        onClose={hideToast}
      />
    </div>
  );
}
