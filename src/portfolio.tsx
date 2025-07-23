"use client"

import Image from "next/image"
import Link from "next/link"
import { Github, Instagram, Linkedin, Mail, User, MessageSquare, Menu, X } from "lucide-react"  
import React, { useEffect, useRef, useState } from "react"
import Script from "next/script"
import { Toast } from "./components/toast"
import Typed from "typed.js"

declare global {
  interface Window {
    Typed: typeof import('typed.js');
  }
}

declare global {
  interface Window {
    emailjs: typeof import("@emailjs/browser");
  }
}




export default function Portfolio() {
  const typedRef = useRef(null)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [formData, setFormData] = useState({
    from: "",
    name: "",
    subject: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [toast, setToast] = useState({
    isVisible: false,
    message: "",
    type: "success" as "success" | "error",
  })



  useEffect(() => {
    // Initialize Typed.js after the script has loaded
    const loadTyped = () => {
      if (typeof window !== "undefined" && typedRef.current && window.Typed) {
        new Typed(typedRef.current, {
          strings: ["3D Artist,", "Graphic Designer."],
          typeSpeed: 65,
          backSpeed: 50,
          loop: true,
          backDelay: 1500,
        })
      }
    }

    // Check if Typed is already available
    if (typeof window !== "undefined" && window.Typed) {
      loadTyped()
    } else {
      // If not, we'll wait for the script to load
      window.addEventListener("typed-script-loaded", loadTyped)
    }

    return () => {
      window.removeEventListener("typed-script-loaded", loadTyped)
      // Clean up Typed instance if needed
    }
  }, [])

  // Function to notify when script is loaded
  const handleScriptLoad = () => {
    if (typeof window !== "undefined") {
      window.dispatchEvent(new Event("typed-script-loaded"))
    }
  }

  // Function to handle smooth scrolling with animation
  const scrollToSection = (sectionId:string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
    setIsMenuOpen(false) // Close mobile menu after navigation
  }

  // Handle form input changes
  const handleInputChange = (e:React.ChangeEvent<HTMLInputElement|HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  // Show toast message
  const showToast = (message: string, type: "success" | "error") => {
    setToast({
      isVisible: true,
      message,
      type,
    })
  }

  // Hide toast message
  const hideToast = () => {
    setToast((prev) => ({
      ...prev,
      isVisible: false,
    }))
  }

  // Handle form submission with EmailJS
  const handleSubmit = async (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Check if EmailJS is loaded
      if (typeof window.emailjs === "undefined") {
        throw new Error("EmailJS not loaded")
      }

      // Send email using EmailJS
      const result = await window.emailjs.send(
        "service_692qx9r", // Your Service ID
        "template_pszrrw8", // Your Template ID
        {
          from_name: formData.name,
          from_email: formData.from,
          subject: formData.subject,
          message: formData.message,
          to_email: "workrudrx75@gmail.com",
        },
        "HBml8i9QDqfK_05Il", // Your Public Key
      )

      if (result.status === 200) {
        showToast("Message sent successfully! I'll get back to you soon.", "success")
        // Reset form
        setFormData({
          from: "",
          name: "",
          subject: "",
          message: "",
        })
      } else {
        throw new Error("Failed to send email")
      }
    } catch (error) {
      console.error("EmailJS Error:", error)
      showToast("Failed to send message. Please try again or contact me directly.", "error")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden">
      {/* Add Typed.js script */}
      <Script src="https://unpkg.com/typed.js@2.1.0/dist/typed.umd.js" onLoad={handleScriptLoad} />

      {/* Add EmailJS script */}
      <Script
        src="https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js"
        onLoad={() => {
          // Initialize EmailJS with your public key
          if (typeof window.emailjs !== "undefined") {
            window.emailjs.init("HBml8i9QDqfK_05Il") // Your Public Key
          }
        }}
      />

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <Link href="/" className="text-xl md:text-2xl font-bold text-white">
              Rudrx Devport
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-8">
              <Link href="/" className="text-cyan-400 hover:text-cyan-300 transition-colors">
                Home
              </Link>
              <button
                onClick={() => scrollToSection("about")}
                className="text-cyan-400 hover:text-cyan-300 transition-colors"
              >
                About
              </button>
              <button
                onClick={() => scrollToSection("projects")}
                className="text-cyan-400 hover:text-cyan-300 transition-colors"
              >
                Projects
              </button>
              <button
                onClick={() => scrollToSection("contact")}
                className="text-cyan-400 hover:text-cyan-300 transition-colors"
              >
                Contact
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden text-cyan-400 hover:text-cyan-300 transition-colors"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Navigation Menu */}
          {isMenuOpen && (
            <div className="md:hidden mt-4 pb-4 border-t border-zinc-800">
              <div className="flex flex-col space-y-4 pt-4">
                <Link href="/" className="text-cyan-400 hover:text-cyan-300 transition-colors">
                  Home
                </Link>
                <button
                  onClick={() => scrollToSection("about")}
                  className="text-cyan-400 hover:text-cyan-300 transition-colors text-left"
                >
                  About
                </button>
                <button
                  onClick={() => scrollToSection("projects")}
                  className="text-cyan-400 hover:text-cyan-300 transition-colors text-left"
                >
                  Projects
                </button>
                <button
                  onClick={() => scrollToSection("contact")}
                  className="text-cyan-400 hover:text-cyan-300 transition-colors text-left"
                >
                  Contact
                </button>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section
        id="home"
        className="min-h-screen pt-20 md:pt-8 container mx-auto px-4 grid lg:grid-cols-2 gap-8 items-center"
      >
        <div className="space-y-4 md:space-y-6 order-2 lg:order-1">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold">
            Hi my name is <span className="text-purple-500">Rudraksh</span>
          </h1>
          <h2 className="text-xl md:text-2xl lg:text-3xl">
            I&apos;m a software developer & a <span className="text-emerald-400" ref={typedRef}></span>
          </h2>
          <h3 className="text-lg md:text-xl lg:text-2xl">
            Welcome to my <span className="text-orange-500">DevPort</span>
          </h3>
          <p className="text-gray-400 text-sm md:text-base text-justify">
            Im a passionate developer cum designer with a focus on creating efficient and elegant solutions. With
            experience in Android development and a strong foundation in 3D and other programming languages, I enjoy
            tackling challenges and continuously expanding my skill set. Whether it&apos;s building mobile applications or
            exploring new technologies, I&apos;m always eager to learn and innovate.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 mt-6">
            <Link
              href="/cv.pdf"
              download
              className="bg-purple-600 hover:bg-purple-700 text-white px-4 md:px-6 py-3 rounded-lg transition-colors flex items-center justify-center gap-2 text-sm md:text-base"
            >
              <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              Download CV
            </Link>
            <Link
              href="https://github.com/roxton75"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gray-800 hover:bg-gray-700 text-white px-4 md:px-6 py-3 rounded-lg transition-colors flex items-center justify-center gap-2 text-sm md:text-base"
            >
              <Github className="w-4 h-4 md:w-5 md:h-5" />
              GitHub
            </Link>
          </div>
        </div>
        <div className="relative h-[410px] md:h-[400px] lg:h-[550px] flex items-center justify-center order-1 lg:order-2">
          <Image src="./images/devbg.png" alt="Developer Illustration" fill className="object-contain" />
        </div>
      </section>
      <div className="w-full border-t border-zinc-800" />

      {/* Work Experience */}
      <section className="py-12 md:py-20 container mx-auto px-4">
        <div className="space-y-2 mb-8 md:mb-12">
          <p className="text-gray-400 text-sm md:text-base">What I&apos;ve done so far</p>
          <h2 className="text-2xl md:text-3xl font-bold">Work Experience</h2>
        </div>
        <div className="space-y-8 md:space-y-12">
          <div className="relative flex flex-col md:flex-row items-start gap-4 md:gap-6">
            {/* Vertical line container for first experience */}
            <div className="relative z-10 flex-shrink-0 hidden md:block">
              <div className="w-3 h-3 rounded-full bg-blue-500 border-2 border-black"></div>
              <div className="absolute top-3 left-1/2 transform -translate-x-1/2 w-0.5 h-48 bg-blue-500"></div>
            </div>
            <div className="flex-1 flex flex-col md:flex-row gap-4 md:gap-40">
              <div className="md:w-80 md:pr-6 flex-shrink-0">
                <div className="flex items-center gap-3 md:block">
                  {/* Mobile timeline dot */}
                  <div className="w-3 h-3 rounded-full bg-blue-500 border-2 border-black md:hidden flex-shrink-0"></div>
                  <div>
                    <h3 className="text-lg md:text-xl font-bold">Intern, Android Developer</h3>
                    <p className="text-gray-400 text-sm md:text-base">Mout Reach Solutions PVT. LTD.</p>
                    <p className="text-gray-400 text-sm md:text-base">June 2023 - September 2023</p>
                  </div>
                </div>
              </div>
              <div className="flex-1 space-y-2 text-gray-300 text-sm md:text-base ml-6 md:ml-0">
                <p className="mb-2">Internship in Android development :</p>
                <p>• Optimized UI and UX design elements based on client&apos;s feedback reviews.</p>
                <p>
                  • Contributed to the development of new features by researching innovative technologies and
                  frameworks.
                </p>
                <p>• Assisted in designing user interfaces with XML layouts, widgets, and custom components.</p>
                <p>• Developed a prototype of an Android application to demonstrate the use of various APIs.</p>
                <p>• Integrated third-party services such as Google Maps API into existing mobile apps.</p>
                <p>• Implemented functionality using Java programming and Android SDKs.</p>
              </div>
            </div>
          </div>

          <div className="relative flex flex-col md:flex-row items-start gap-4 md:gap-6">
            {/* Vertical line container for second experience */}
            <div className="relative z-10 flex-shrink-0 hidden md:block">
              <div className="w-3 h-3 rounded-full bg-blue-500 border-2 border-black"></div>
              <div className="absolute top-3 left-1/2 transform -translate-x-1/2 w-0.5 h-28 bg-blue-500"></div>
            </div>
            <div className="flex-1 flex flex-col md:flex-row gap-4 md:gap-40">
              <div className="md:w-80 md:pr-6 flex-shrink-0">
                <div className="flex items-center gap-3 md:block">
                  {/* Mobile timeline dot */}
                  <div className="w-3 h-3 rounded-full bg-blue-500 border-2 border-black md:hidden flex-shrink-0"></div>
                  <div>
                    <h3 className="text-lg md:text-xl font-bold">Freelancer 3D Artist</h3>
                    <p className="text-gray-400 text-sm md:text-base">Client based, September 2022 - February 2023</p>
                  </div>
                </div>
              </div>
              <div className="flex-1 space-y-2 text-gray-300 text-sm md:text-base ml-6 md:ml-0">
                <p className="mb-2">3D Modeling in blender for assets like car model and a night landscape :</p>
                <p>• Created 3D models of assets and environments for clients up to their needs.</p>
                <p>• Rendered textures, materials, lighting, and shading for 3D models in Blender 3D.</p>
                <p>• Edited UV maps on complex geometry to reduce stretching or other artifacts when texturing.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="w-full border-t border-zinc-800" />

      {/* About */}
      <section id="about" className="py-12 md:py-20 container mx-auto px-4">
        <div className="space-y-2 mb-8 md:mb-12">
          <p className="text-gray-400 text-sm md:text-base">You need to know</p>
          <h2 className="text-2xl md:text-3xl font-bold">About me</h2>
        </div>
        <div className="flex flex-col lg:flex-row gap-8 md:gap-12 items-start">
          <div className="flex-1 space-y-4 md:space-y-6 order-2 lg:order-1">
            <p className="text-gray-300 leading-relaxed text-justify text-sm md:text-base">
              I am a passionate software developer with a strong foundation in Android development and 3D design. I
              enjoy creating efficient and innovative solutions, whether it&apos;s through mobile app development, UI/UX
              improvements, or exploring new technologies like AI. With a keen interest in both technical and creative
              fields, I continuously strive to enhance my skills and adapt to the ever-evolving tech landscape. My
              strengths lie in problem-solving, adaptability, and a commitment to delivering high-quality work.
            </p>
            <div className="space-y-4">
              <div>
                <h3 className="font-bold mb-2 text-base md:text-lg">Education:</h3>
                <ul className="space-y-1 text-sm md:text-base">
                  <li className="text-cyan-400">• Diploma in Computer Engineering</li>
                  <li className="text-cyan-400">• Pursuing B.E. in Computer Science and Engineering</li>
                </ul>
              </div>
              <div>
                <h3 className="font-bold mb-2 text-base md:text-lg">Interests:</h3>
                <ul className="space-y-1 text-sm md:text-base">
                  <li className="text-cyan-400">• Web Development</li>
                  <li className="text-cyan-400">• Android Development</li>
                  <li className="text-cyan-400">• Graphic Designing</li>
                </ul>
              </div>
            </div>
          </div>
          <div className="flex-shrink-0 w-[300px] h-[300px] md:w-[350px] md:h-[350px] lg:w-[400px] lg:h-[400px] relative mx-auto order-1 lg:order-2">
            <div className="absolute inset-0 rounded-full overflow-hidden">
              <Image src="./images/dp.jpg" alt="Profile" fill className="object-cover" />
            </div>
          </div>
        </div>
      </section>
      <div className="w-full border-t border-zinc-800" />

      {/* Projects */}
      <section id="projects" className="py-12 md:py-20 container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold mb-8 md:mb-12">Projects</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {[
            {
              title: "Text-to-Speech",
              description:
                "This project was built in Python using pyttsx3 & tkinter libraries. It performs text-to-speech using the system voice and pitch with a simple GUI.",
              link: "https://github.com/roxton75/Text-to-Speech-in-Python"
            },
            {
              title: "Music Player: Audify",
              description:
                "Audify is an offline music player developed in Android using Java and XML. It fetches and plays '.MP3' and '.WAV' files from the user's device.",
              link: "https://github.com/roxton75/Spotify-Clone-Audify"
            },
            {
              title: "Image Steganography",
              description:
                "A Python-based tool that hides a secret image in a cover image using LSB technique. It includes GUI, encoding, and decoding features.",
              link: "https://github.com/roxton75/Image-Steganography-in-Python"
            },
          ].map((project) => (
            <div
              key={project.title}
              className="bg-zinc-900 rounded-lg p-4 md:p-6 transition-all duration-300 hover:transform hover:-translate-y-2 hover:shadow-lg hover:shadow-blue-500/20"
            >
              <h3 className="text-lg md:text-xl font-bold mb-3 md:mb-4">{project.title}</h3>
              <p className="text-gray-400 mb-4 md:mb-6 text-justify text-sm md:text-base">{project.description}</p>
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
          ))}
        </div>
      </section>
      <div className="w-full border-t border-zinc-800" />


      {/* Contact Section */}
      <section id="contact" className="py-12 md:py-20 container mx-auto px-4">
        <div className="space-y-2 mb-8 md:mb-12">
          <p className="text-gray-400 text-sm md:text-base">Get in touch</p>
          <h2 className="text-2xl md:text-3xl font-bold">Contact Me</h2>
        </div>
        <div className="max-w-2xl mx-auto">
          <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              <div>
                <label htmlFor="from" className="block text-sm font-medium text-gray-300 mb-2">
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
                <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
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
              <label htmlFor="subject" className="block text-sm font-medium text-gray-300 mb-2">
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
              <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
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
      </section>
      <div className="w-full border-t border-zinc-800" />

      {/* Footer */}
      <footer className="py-6 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center space-y-4">
            <Link href="/" className="text-xl md:text-2xl font-bold text-black">
              Rudrx Devport
            </Link>
            <div className="flex space-x-4">
              <Link href="https://linkedin.com/in/rudrx75" className="bg-black rounded-full p-2">
                <Linkedin className="h-5 w-5 md:h-6 md:w-6 text-white" />
              </Link>
              <Link href="https://github.com/roxton75" className="bg-black rounded-full p-2">
                <Github className="h-5 w-5 md:h-6 md:w-6 text-white" />
              </Link>
              <Link href="https://www.instagram.com/rudrx_75/" className="bg-black rounded-full p-2">
                <Instagram className="h-5 w-5 md:h-6 md:w-6 text-white" />
              </Link>
            </div>
            <p className="text-black text-xs md:text-sm">workrudrx75@gmail.com</p>
            <div className="w-48 md:w-64 h-px bg-gray-300"></div>
            <p className="text-black text-xs md:text-sm text-center">
              © RudrxDevport. All rights reserved.
              <br />
              2023-2024 RudrxDevport
            </p>
          </div>
        </div>
      </footer>

      {/* Toast Notification */}
      <Toast message={toast.message} type={toast.type} isVisible={toast.isVisible} onClose={hideToast} />
    </div>
  )
}
