"use client";

import Image from "next/image";
import Link from "next/link";
import {
  Github,
  Instagram,
  Linkedin,
  Mail,
  User,
  MessageSquare,
  Menu,
  X,
} from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import Script from "next/script";
import { Toast } from "./components/toast";
import Typed from "typed.js";
import emailjs from "@emailjs/browser";
import Reveal from "./components/Reveal";

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
          typeSpeed: 55,
          backSpeed: 50,
          loop: true,
          backDelay: 1500,
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
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
    setIsMenuOpen(false);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
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
    emailjs.init("HBml8i9QDqfK_05Il");
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const payload = {
        from_name: formData.name,
        from_email: formData.from,
        subject: formData.subject,
        message: formData.message,
        timestamp: new Date().toLocaleString(),
        user_agent:
          typeof navigator !== "undefined" ? navigator.userAgent : "unknown",
        header_url:
          "https://roxton75.github.io/rudrx-devport/images/header.png",
      };

      const result = await emailjs.send(
        "service_692qx9r",
        "template_pszrrw8",
        payload,
      );

      if (result.status === 200) {
        showToast(
          "Message sent successfully! I'll get back to you soon.",
          "success",
        );
        setFormData({ from: "", name: "", subject: "", message: "" });
      } else {
        throw new Error("EmailJS returned non-200 status");
      }
    } catch (err) {
      console.error("EmailJS Error:", err);
      showToast("Failed to send message. Please try again later.", "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      <Script
        src="https://unpkg.com/typed.js@2.1.0/dist/typed.umd.js"
        onLoad={handleScriptLoad}
      />

      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-zinc-800/60">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <Link href="/" className="text-xl md:text-2xl font-bold text-white hover:text-purple-400 transition-colors">
              Rudrx Devport
            </Link>

            <div className="hidden md:flex space-x-8">
              <Link
                href="/"
                className="text-zinc-300 hover:text-purple-400 font-medium transition-colors"
              >
                Home
              </Link>
              <button
                onClick={() => scrollToSection("about")}
                className="text-zinc-300 hover:text-purple-400 font-medium transition-colors"
              >
                About
              </button>
              <button
                onClick={() => scrollToSection("projects")}
                className="text-zinc-300 hover:text-purple-400 font-medium transition-colors"
              >
                Projects
              </button>
              <button
                onClick={() => scrollToSection("contact")}
                className="text-zinc-300 hover:text-purple-400 font-medium transition-colors"
              >
                Contact
              </button>
            </div>

            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden text-zinc-300 hover:text-purple-400 transition-colors"
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>

          {isMenuOpen && (
            <div className="md:hidden mt-4 pb-4 border-t border-zinc-800">
              <div className="flex flex-col space-y-4 pt-4">
                <Link
                  href="/"
                  className="text-zinc-300 hover:text-purple-400 font-medium transition-colors"
                >
                  Home
                </Link>
                <button
                  onClick={() => scrollToSection("about")}
                  className="text-zinc-300 hover:text-purple-400 font-medium transition-colors text-left"
                >
                  About
                </button>
                <button
                  onClick={() => scrollToSection("projects")}
                  className="text-zinc-300 hover:text-purple-400 font-medium transition-colors text-left"
                >
                  Projects
                </button>
                <button
                  onClick={() => scrollToSection("contact")}
                  className="text-zinc-300 hover:text-purple-400 font-medium transition-colors text-left"
                >
                  Contact
                </button>
              </div>
            </div>
          )}
        </div>
      </nav>

      <section
        id="home"
        className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden"
      >
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-purple-600/15 rounded-full blur-[130px] -z-10 pointer-events-none"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-cyan-600/15 rounded-full blur-[150px] -z-10 pointer-events-none"></div>

        <div className="container mx-auto px-4 relative">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <div className="inline-block px-4 py-1.5 rounded-full border border-zinc-800 bg-zinc-900/50 backdrop-blur-sm">
              <span className="text-cyan-400 text-xs md:text-sm font-medium tracking-wide">
                Available for New Opportunities
              </span>
            </div>

            <div className="space-y-4">
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight">
                Hi, I&apos;m{" "}
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-cyan-400 to-emerald-400">
                  Rudraksh Ramekar
                </span>
              </h1>

              <h2 className="text-2xl md:text-3xl lg:text-4xl font-medium text-gray-200">
                A <span className="text-white font-semibold" ref={typedRef}></span>
              </h2>
            </div>

            <p className="text-gray-400 text-base md:text-lg lg:text-xl max-w-2xl mx-auto leading-relaxed text-center">
              I specialize in building intuitive, high-performance mobile and web
              experiences using <span className="text-cyan-400 font-medium">React Native</span>,
              <span className="text-purple-400 font-medium"> Expo</span>, and
              <span className="text-emerald-400 font-medium"> TypeScript</span>.
              I bridge the gap between engineering and user-focused product design.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 items-center justify-center pt-2">
              <Link
                href="/CV/Rudraksh_Ramekar_CV.pdf"
                download="Rudraksh_Ramekar_CV.pdf"
                className="group relative bg-white text-black px-8 py-4 rounded-full font-bold transition-all hover:scale-105 active:scale-95 flex items-center gap-2 overflow-hidden shadow-lg shadow-white/10"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-purple-100 to-cyan-100 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <span className="relative flex items-center gap-2">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2.5}
                      d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                  Download CV
                </span>
              </Link>

              <Link
                href="https://github.com/roxton75"
                target="_blank"
                rel="noopener noreferrer"
                className="group border border-zinc-700 hover:border-white text-white px-8 py-4 rounded-full font-bold transition-all hover:bg-white/5 flex items-center gap-2 active:scale-95"
              >
                <Github className="w-5 h-5" />
                GitHub
              </Link>
            </div>

            <div className="pt-10 flex flex-wrap items-center justify-center gap-3">
              <span className="text-xs font-bold tracking-widest uppercase text-gray-500 mr-2">Core Tech:</span>
              <span className="px-3 py-1 bg-zinc-900 border border-zinc-800 rounded-full text-xs text-cyan-300">React Native</span>
              <span className="px-3 py-1 bg-zinc-900 border border-zinc-800 rounded-full text-xs text-purple-300">TypeScript</span>
              <span className="px-3 py-1 bg-zinc-900 border border-zinc-800 rounded-full text-xs text-emerald-300">Next.js</span>
              <span className="px-3 py-1 bg-zinc-900 border border-zinc-800 rounded-full text-xs text-orange-300">Firebase</span>
            </div>
          </div>
        </div>
      </section>
      <div className="w-full border-t border-zinc-800" />

      <section className="py-12 md:py-20 container mx-auto px-4">
        <Reveal>
          <div className="space-y-2 mb-8 md:mb-12">
            <p className="text-gray-400 text-sm md:text-base">
              What I&apos;ve done so far
            </p>
            <h2 className="text-2xl md:text-3xl font-bold">Work Experience</h2>
          </div>
        </Reveal>

        <div className="space-y-8 md:space-y-12">
          <Reveal delay={0.1}>
            <div className="relative flex flex-col md:flex-row items-start gap-4 md:gap-6">
              <div className="relative z-10 shrink-0 hidden md:block">
                <div className="w-3 h-3 rounded-full bg-blue-500 border-2 border-black"></div>
                <div className="absolute top-3 left-1/2 transform -translate-x-1/2 w-0.5 h-48 bg-blue-500"></div>
              </div>

              <div className="flex-1 flex flex-col md:flex-row gap-4 md:gap-40">
                <div className="md:w-80 md:pr-6 shrink-0">
                  <div className="flex items-center gap-3 md:block">
                    <div className="w-3 h-3 rounded-full bg-blue-500 border-2 border-black md:hidden shrink-0"></div>
                    <div>
                      <h3 className="text-lg md:text-xl font-bold">
                        Mobile Application Developer
                      </h3>
                      <p className="text-gray-400 text-sm md:text-base">
                        ANIX AI
                      </p>
                      <p className="text-gray-400 text-sm md:text-base">
                        July 2026 - October 2026
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex-1 space-y-2 text-gray-300 text-sm md:text-base ml-6 md:ml-0">
                  <p className="mb-2">
                    Developed the KATIC LMS mobile application using React Native,
                    Expo, and TypeScript.
                  </p>
                  <p>
                    • Built course discovery, enrollment, learning, progress
                    tracking, certificates, and video learning features with
                    playback controls.
                  </p>
                  <p>
                    • Integrated REST APIs for authentication, courses,
                    enrollments, progress, certificates, and media.
                  </p>
                  <p>
                    • Built reusable, responsive UI components with consistent
                    theming and cross-platform support.
                  </p>
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.2}>
          <div className="relative flex flex-col md:flex-row items-start gap-4 md:gap-6">
            <div className="relative z-10 shrink-0 hidden md:block">
              <div className="w-3 h-3 rounded-full bg-blue-500 border-2 border-black"></div>
              <div className="absolute top-3 left-1/2 transform -translate-x-1/2 w-0.5 h-28 bg-blue-500"></div>
            </div>
            <div className="flex-1 flex flex-col md:flex-row gap-4 md:gap-40">
              <div className="md:w-80 md:pr-6 shrink-0">
                <div className="flex items-center gap-3 md:block">
                  <div className="w-3 h-3 rounded-full bg-blue-500 border-2 border-black md:hidden shrink-0"></div>
                  <div>
                    <h3 className="text-lg md:text-xl font-bold">
                      Android Developer Intern
                    </h3>
                    <p className="text-gray-400 text-sm md:text-base">
                      Mout Reach Solutions Pvt. Ltd.
                    </p>
                    <p className="text-gray-400 text-sm md:text-base">
                      June 2023 - September 2023
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex-1 space-y-2 text-gray-300 text-sm md:text-base ml-6 md:ml-0">
                <p className="mb-2">
                  Developed Android applications using Java and Android SDK.
                </p>
                <p>
                  • Designed user-friendly mobile interfaces with a focus on
                  usability and performance.
                </p>
                <p>• Integrated third-party APIs, including Google Maps.</p>
                <p>
                  • Contributed to application features and UI improvements
                  based on project requirements.
                </p>
              </div>
            </div>
          </div>
          </Reveal>
        </div>
      </section>
      <div className="w-full border-t border-zinc-800" />

      <section id="about" className="py-12 md:py-20 container mx-auto px-4">
        <Reveal>
          <div className="space-y-2 mb-8 md:mb-12">
            <p className="text-gray-400 text-sm md:text-base">You need to know</p>
            <h2 className="text-2xl md:text-3xl font-bold">About me</h2>
          </div>
        </Reveal>
        <div className="flex flex-col lg:flex-row gap-8 md:gap-12 items-start">
          <Reveal delay={0.1} y={20}>
          <div className="flex-1 space-y-4 md:space-y-6 order-2 lg:order-1">
            <p className="text-gray-300 leading-relaxed text-justify text-sm md:text-base">
              I&apos;m a software developer and engineering student passionate
              about building useful digital products. My core experience lies in
              cross-platform mobile development with React Native, Expo, and
              TypeScript, alongside working with modern web technologies, APIs,
              and databases. I care about clean architecture, reusable
              components, thoughtful UI/UX, and solving real-world problems
              through technology. I&apos;m continuously learning, experimenting,
              and building projects that combine technical execution with good
              product design.
            </p>
            <div className="space-y-4">
              <div>
                <h3 className="font-bold mb-2 text-base md:text-lg">
                  Education:
                </h3>
                <ul className="space-y-1 text-sm md:text-base">
                  <li className="text-cyan-400">
                    • B.E. Computer Science and Engineering (Data Science), Sant
                    Gadge Baba Amravati University — 2024–2027
                  </li>
                  <li className="text-cyan-400">
                    • Diploma in Computer Engineering, Maharashtra State Board
                    of Technical Education — 2021–2024
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="font-bold mb-2 text-base md:text-lg">
                  Interests:
                </h3>
                <ul className="space-y-1 text-sm md:text-base">
                  <li className="text-cyan-400">
                    • Cross-Platform Development
                  </li>
                  <li className="text-cyan-400">• Frontend Engineering</li>
                  <li className="text-cyan-400">• Product Design and UI/UX</li>
                  <li className="text-cyan-400">• Software Development</li>
                  <li className="text-cyan-400">
                    • IoT and Emerging Technologies
                  </li>
                </ul>
              </div>
            </div>
          </div>
          </Reveal>
          <Reveal delay={0.2} y={20}>
          <div className="shrink-0 w-[300px] h-[300px] md:w-[350px] md:h-[350px] lg:w-[400px] lg:h-[400px] relative mx-auto order-1 lg:order-2">
            <div className="absolute inset-0 rounded-full overflow-hidden">
              <Image
                src="/images/dp.jpg"
                alt="Profile"
                fill
                className="object-cover"
              />
            </div>
          </div>
          </Reveal>
        </div>
      </section>
      <div className="w-full border-t border-zinc-800" />

      <section id="projects" className="py-12 md:py-20 container mx-auto px-4">
        <Reveal>
          <h2 className="text-2xl md:text-3xl font-bold mb-8 md:mb-12">
            Projects
          </h2>
        </Reveal>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {[
            {
              title: "Spicetify Party",
              category: "Open-Source Project / Collaborative Listening",
              tech: [
                "React",
                "TypeScript",
                "Spicetify",
                "Supabase",
                "PostgreSQL",
                "Realtime",
              ],
              description:
                "An open-source collaborative listening extension for Spotify Desktop that brings friends together through shared listening parties. Features party creation using six-character codes, member presence, host-controlled playback synchronization, collaborative queues, and real-time party state.",
              highlights: [
                "Built the party experience using React and TypeScript.",
                "Implemented six-character party codes and member presence.",
                "Designed real-time party state and collaborative queue infrastructure.",
                "Used Supabase and PostgreSQL for profiles, party membership, and playback state.",
              ],
              link: "https://github.com/roxton75",
            },
            {
              title: "Smart Switch",
              category: "IoT / Mobile Application",
              tech: ["React Native", "Expo", "TypeScript", "Firebase", "ESP32"],
              description:
                "A smart home IoT controller that allows users to remotely control connected appliances through a mobile application. It provides real-time device synchronization and a responsive interface for monitoring and controlling ESP32-based devices.",
              highlights: [
                "Built a cross-platform mobile interface for smart appliance control.",
                "Integrated Firebase Realtime Database for device synchronization.",
                "Developed reusable device cards, status components, and responsive dashboards.",
                "Connected the application to an ESP32-based controller.",
              ],
              link: "https://github.com/roxton75/Smart-Switch",
            },
            {
              title: "Bubble Brew",
              category: "POS / Cafe Management",
              tech: ["React Native", "Expo", "SQLite", "Realm", "Figma"],
              description:
                "A point-of-sale and cafe management mobile application designed to simplify order management and billing workflows. The application emphasizes an intuitive interface, reusable UI components, and offline-first data handling.",
              highlights: [
                "Designed a cross-platform POS interface for cafe operations.",
                "Implemented offline-first order management and billing workflows.",
                "Used SQLite and Realm for local data persistence.",
                "Created a reusable UI component system and supporting designs in Figma.",
              ],
              link: "https://github.com/roxton75/BubbleBrew-Expo-React-Native",
            },
          ].map((project, index) => (
            <Reveal key={project.title} delay={index * 0.1}>
            <div
              className="bg-zinc-900 rounded-lg p-4 md:p-6 transition-all duration-300 hover:transform hover:-translate-y-2 hover:shadow-lg hover:shadow-blue-500/20 flex flex-col h-full"
            >
              <div className="mb-2">
                <p className="text-cyan-400 text-xs md:text-sm font-medium">
                  {project.category}
                </p>
              </div>
              <h3 className="text-lg md:text-xl font-bold mb-3 md:mb-4">
                {project.title}
              </h3>
              <div className="flex flex-wrap gap-1.5 mb-3 md:mb-4">
                {project.tech.map((t) => (
                  <span
                    key={t}
                    className="text-[10px] md:text-xs px-2 py-0.5 rounded-full bg-zinc-800 text-gray-300"
                  >
                    {t}
                  </span>
                ))}
              </div>
              <p className="text-gray-400 mb-4 md:mb-6 text-sm md:text-base">
                {project.description}
              </p>
              <ul className="space-y-1 mb-4 md:mb-6 text-sm md:text-base text-gray-300">
                {project.highlights.map((h) => (
                  <li key={h} className="flex items-start">
                    <span className="text-cyan-400 mr-2 mt-1">•</span>
                    <span className="leading-relaxed">{h}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-auto">
                <Link
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-gray-400 hover:text-white text-sm md:text-base"
                >
                  <Github className="mr-2 h-4 w-4 md:h-5 md:w-5 text-gray-400" />
                  Source Code
                </Link>
              </div>
            </div>
            </Reveal>
          ))}
        </div>
      </section>
      <div className="w-full border-t border-zinc-800" />

      <section id="contact" className="py-12 md:py-20 container mx-auto px-4">
        <Reveal>
          <div className="space-y-2 mb-8 md:mb-12">
            <p className="text-gray-400 text-sm md:text-base">Get in touch</p>
            <h2 className="text-2xl md:text-3xl font-bold">Contact Me</h2>
          </div>
        </Reveal>
        <Reveal delay={0.1} y={20}>
        <div className="max-w-2xl mx-auto">
          <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              <div>
                <label
                  htmlFor="from"
                  className="block text-sm font-medium text-gray-300 mb-2"
                >
                  Your Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 md:w-5 md:h-5" />
                  <input
                    type="email"
                    id="from"
                    name="from"
                    value={formData.from}
                    onChange={handleInputChange}
                    required
                    className="w-full pl-10 md:pl-12 pr-4 py-3 bg-zinc-900 border border-zinc-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent text-sm md:text-base"
                    placeholder="your.email@example.com"
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-300 mb-2"
                >
                  Your Name
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 md:w-5 md:h-5" />
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full pl-10 md:pl-12 pr-4 py-3 bg-zinc-900 border border-zinc-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent text-sm md:text-base"
                    placeholder="Your Full Name"
                  />
                </div>
              </div>
            </div>
            <div>
              <label
                htmlFor="subject"
                className="block text-sm font-medium text-gray-300 mb-2"
              >
                Subject
              </label>
              <div className="relative">
                <MessageSquare className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 md:w-5 md:h-5" />
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  required
                  className="w-full pl-10 md:pl-12 pr-4 py-3 bg-zinc-900 border border-zinc-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent text-sm md:text-base"
                  placeholder="What's this about?"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="message"
                className="block text-sm font-medium text-gray-300 mb-2"
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                required
                rows={6}
                className="w-full px-4 py-3 bg-zinc-900 border border-zinc-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent resize-vertical text-sm md:text-base"
                placeholder="Tell me about your project, question, or just say hello..."
              />
            </div>
            <div className="flex justify-center">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full md:w-auto bg-cyan-500 hover:bg-green-700 hover:text-white disabled:bg-cyan-800 text-black px-6 md:px-8 py-3 rounded-lg transition-colors flex items-center justify-center gap-2 font-medium text-sm md:text-base"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 md:h-5 md:w-5 border-b-2 border-white"></div>
                    Sending...
                  </>
                ) : (
                  <>
                    <Mail className="w-4 h-4 md:w-5 md:h-5" />
                    Send Message
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
        </Reveal>
      </section>
      <div className="w-full border-t border-zinc-800" />

      <footer className="py-6 bg-white">
        <Reveal>
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center space-y-4">
            <Link href="/" className="text-xl md:text-2xl font-bold text-black">
              Rudrx Devport
            </Link>
            <div className="flex space-x-4">
              <Link
                href="https://linkedin.com/in/rudrx75"
                className="bg-black rounded-full p-2"
              >
                <Linkedin className="h-5 w-5 md:h-6 md:w-6 text-white" />
              </Link>
              <Link
                href="https://github.com/roxton75"
                className="bg-black rounded-full p-2"
              >
                <Github className="h-5 w-5 md:h-6 md:w-6 text-white " />
              </Link>
              <Link
                href="https://www.instagram.com/rudrx_75/"
                className="bg-black rounded-full p-2"
              >
                <Instagram className="h-5 w-5 md:h-6 md:w-6 text-white " />
              </Link>
            </div>
            <p className="text-black text-xs md:text-sm">
              workrudrx75@gmail.com
            </p>
            <div className="w-48 md:w-64 h-px bg-gray-300"></div>
            <p className="text-black text-xs md:text-sm text-center">
              © RudrxDevport. All rights reserved.
              <br />
              2023-{new Date().getFullYear()} RudrxDevport
            </p>
          </div>
        </div>
        </Reveal>
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
