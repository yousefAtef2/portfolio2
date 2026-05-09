import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Mail, Phone, MapPin } from 'lucide-react'
import { Github, Linkedin, Facebook } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null)
  const cardRef = useRef<HTMLDivElement>(null)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })

  useEffect(() => {
    const section = sectionRef.current
    const card = cardRef.current
    if (!section || !card) return

    const ctx = gsap.context(() => {
      gsap.from(card, {
        y: 60,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      })
    }, section)

    return () => ctx.revert()
  }, [])

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    alert('Thank you for your message! I will get back to you soon.')
    setFormData({ name: '', email: '', subject: '', message: '' })
  }

  const contactInfo = [
    {
      icon: Mail,
      label: 'dev.yousef.atef@gmail.com',
      href: 'mailto:dev.yousef.atef@gmail.com',
    },
    {
      icon: Phone,
      label: '+20 103 373 4422',
      href: 'tel:+201033734422',
    },
    {
      icon: MapPin,
      label: 'Egypt',
      href: '#',
    },
  ]

  const socialLinks = [
    { icon: Github, href: 'https://github.com/yousefAtef2', label: 'GitHub' },
    {
      icon: Linkedin,
      href: 'https://www.linkedin.com/in/yousef-atef22/',
      label: 'LinkedIn',
    },
    {
      icon: Facebook,
      href: 'https://www.facebook.com/share/1DqjUGGLHx/',
      label: 'Facebook',
    },
  ]

  return (
    <section
      id="contact"
      ref={sectionRef}
      style={{
        paddingTop: 120,
        paddingBottom: 120,
        position: 'relative',
        zIndex: 1,
      }}
    >
      <div
        ref={cardRef}
        className="glass-card"
        style={{
          maxWidth: 1200,
          margin: '0 auto',
          padding: 64,
        }}
      >
        <div className="flex flex-col lg:flex-row" style={{ gap: 64 }}>
          {/* Left column - Contact info */}
          <div className="lg:w-[45%]">
            <p className="eyebrow" style={{ marginBottom: 16 }}>
              GET IN TOUCH
            </p>

            <h2
              style={{
                fontFamily: "'Geist Sans', sans-serif",
                fontSize: 48,
                fontWeight: 400,
                letterSpacing: -0.5,
                color: '#fff',
                lineHeight: 1.1,
                marginBottom: 16,
              }}
            >
              Let's Work Together
            </h2>

            <p
              style={{
                fontFamily: "'Geist Sans', sans-serif",
                fontSize: 16,
                fontWeight: 300,
                color: '#888888',
                lineHeight: 1.6,
                marginBottom: 48,
              }}
            >
              Have a project in mind? I'm currently available for freelance work
              and open to new opportunities.
            </p>

            {/* Contact info list */}
            <div style={{ marginBottom: 32 }}>
              {contactInfo.map((item) => {
                const Icon = item.icon
                return (
                  <a
                    key={item.label}
                    href={item.href}
                    className="flex items-center"
                    style={{ gap: 16, marginBottom: 20 }}
                  >
                    <Icon size={16} color="#59f301" />
                    <span
                      style={{
                        fontFamily: "'Geist Sans', sans-serif",
                        fontSize: 15,
                        fontWeight: 300,
                        color: '#aaaaaa',
                      }}
                    >
                      {item.label}
                    </span>
                  </a>
                )
              })}
            </div>

            {/* Social links */}
            <div className="flex" style={{ gap: 16 }}>
              {socialLinks.map((link) => {
                const Icon = link.icon
                return (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-icon-btn"
                    aria-label={link.label}
                  >
                    <Icon size={18} />
                  </a>
                )
              })}
              <a
                href="https://wa.me/+201033734422"
                target="_blank"
                rel="noopener noreferrer"
                className="social-icon-btn"
                aria-label="WhatsApp"
              >
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21" />
                  <path d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1Z" />
                  <path d="M14 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1Z" />
                  <path d="M9.5 15.5a5 5 0 0 0 5 0" />
                </svg>
              </a>
            </div>
          </div>

          {/* Right column - Form */}
          <div className="lg:w-[55%]">
            <form onSubmit={handleSubmit}>
              <div style={{ marginBottom: 20 }}>
                <input
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="input-field"
                />
              </div>
              <div style={{ marginBottom: 20 }}>
                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="input-field"
                />
              </div>
              <div style={{ marginBottom: 20 }}>
                <input
                  type="text"
                  name="subject"
                  placeholder="Subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="input-field"
                />
              </div>
              <div style={{ marginBottom: 24 }}>
                <textarea
                  name="message"
                  placeholder="Message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="input-field"
                  style={{ resize: 'vertical' }}
                />
              </div>
              <button
                type="submit"
                className="btn-primary"
                style={{ width: '100%' }}
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
