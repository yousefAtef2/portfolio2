import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ExternalLink } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const projects = [
  {
    image: '/images/project-cms.jpg',
    tags: ['Laravel', 'MySQL', 'Admin Dashboard'],
    title: 'Dynamic Content Management System',
    description:
      'A robust blogging platform built with Laravel and MySQL, featuring a secure admin dashboard for content management, user authentication, category filtering, and an interactive commenting system.',
    links: [{ label: 'GitHub', url: 'https://github.com/yousefAtef2' }],
  },
  {
    image: '/images/project-coffee.jpg',
    tags: ['React.js', 'Bootstrap', 'Animations'],
    title: 'Premium Coffee Experience Interface',
    description:
      'A modern, highly responsive landing page for a coffee brand featuring smooth scrolling animations, an interactive menu gallery, and an integrated reservation form.',
    links: [{ label: 'GitHub', url: 'https://github.com/yousefAtef2' }],
  },
  {
    image: '/images/project-ecommerce.jpg',
    tags: ['PHP', 'Laravel', 'Tailwind CSS'],
    title: 'Urban-Step E-Commerce Platform',
    description:
      'A full-scale online store for fashion and footwear with complex product filtering, dynamic shopping cart, and secure checkout with order tracking functionality.',
    links: [{ label: 'GitHub', url: 'https://github.com/yousefAtef2' }],
  },
  {
    image: '/images/project-hangman.jpg',
    tags: ['JavaScript', 'CSS3', 'DOM Manipulation'],
    title: 'Guessing Challenge (Hangman)',
    description:
      'A logic-based web game focusing on state management and DOM manipulation, featuring dynamic SVG drawing, keyboard event listeners, and a responsive UI.',
    links: [
      { label: 'GitHub', url: 'https://github.com/yousefAtef2' },
      { label: 'Play', url: ' https://yousefatef2.github.io/hung-game/' },
    ],
  },
]

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null)
  const cardsRef = useRef<HTMLDivElement[]>([])

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const ctx = gsap.context(() => {
      cardsRef.current.forEach((card, i) => {
        if (!card) return
        gsap.from(card, {
          y: 60,
          opacity: 0,
          duration: 0.8,
          delay: i * 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 70%',
            toggleActions: 'play none none none',
          },
        })
      })
    }, section)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="projects"
      ref={sectionRef}
      style={{ paddingTop: 120, position: 'relative', zIndex: 1 }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: '0 auto',
          padding: '0 48px',
        }}
      >
        <p className="eyebrow text-center" style={{ marginBottom: 16 }}>
          FEATURED PROJECTS
        </p>

        <h2
          className="text-center"
          style={{
            fontFamily: "'Geist Sans', sans-serif",
            fontSize: 48,
            fontWeight: 400,
            letterSpacing: -0.5,
            color: '#fff',
            lineHeight: 1.1,
            marginBottom: 64,
          }}
        >
          My Recent Work
        </h2>

        <div
          className="grid grid-cols-1 lg:grid-cols-2"
          style={{ gap: 32 }}
        >
          {projects.map((project, i) => (
            <div
              key={project.title}
              ref={(el) => {
                if (el) cardsRef.current[i] = el
              }}
              className="glass-card overflow-hidden group"
              style={{
                transition: 'border-color 0.4s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = 'rgba(89, 243, 1, 0.25)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)'
              }}
            >
              {/* Image area */}
              <div
                className="overflow-hidden"
                style={{ aspectRatio: '16/9' }}
              >
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-600"
                  style={{
                    transitionDuration: '0.6s',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'scale(1.05)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'scale(1)'
                  }}
                />
              </div>

              {/* Content area */}
              <div style={{ padding: 32 }}>
                <div className="flex flex-wrap" style={{ gap: 8, marginBottom: 12 }}>
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      style={{
                        fontFamily: "'Geist Mono', monospace",
                        fontSize: 11,
                        color: '#59f301',
                        background: 'rgba(89, 243, 1, 0.08)',
                        padding: '4px 10px',
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <h3
                  style={{
                    fontFamily: "'Geist Sans', sans-serif",
                    fontSize: 22,
                    fontWeight: 400,
                    color: '#fff',
                    marginBottom: 12,
                  }}
                >
                  {project.title}
                </h3>

                <p
                  style={{
                    fontFamily: "'Geist Sans', sans-serif",
                    fontSize: 15,
                    fontWeight: 300,
                    color: '#888888',
                    lineHeight: 1.6,
                    marginBottom: 20,
                  }}
                >
                  {project.description}
                </p>

                <div className="flex" style={{ gap: 16 }}>
                  {project.links.map((link) => (
                    <a
                      key={link.label}
                      href={link.url}
                      className="inline-flex items-center"
                      style={{
                        fontFamily: "'Geist Mono', monospace",
                        fontSize: 12,
                        textTransform: 'uppercase',
                        color: '#59f301',
                        gap: 6,
                      }}
                    >
                      {link.label}
                      <ExternalLink size={12} />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
