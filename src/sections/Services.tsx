import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Code2, Plug, MonitorSmartphone } from 'lucide-react'

gsap.registerPlugin(ScrollTrigger)

const services = [
  {
    icon: Code2,
    title: 'Full-Stack Development',
    description:
      'Complete web applications from database design to UI/UX implementation. End-to-end solutions with PHP Laravel and React.',
    tags: ['Laravel', 'React', 'MySQL'],
  },
  {
    icon: Plug,
    title: 'API Development',
    description:
      'Building secure and scalable RESTful APIs using Laravel framework. Clean architecture with authentication and documentation.',
    tags: ['REST API', 'Authentication', 'Documentation'],
  },
  {
    icon: MonitorSmartphone,
    title: 'Responsive Design',
    description:
      'Ensuring your website looks perfect on all devices and screen sizes. Mobile-first approach with modern CSS frameworks.',
    tags: ['Tailwind CSS', 'Bootstrap', 'Mobile-First'],
  },
]

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null)
  const cardsRef = useRef<HTMLDivElement[]>([])

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const ctx = gsap.context(() => {
      cardsRef.current.forEach((card, i) => {
        if (!card) return
        gsap.from(card, {
          y: 50,
          opacity: 0,
          duration: 0.8,
          delay: i * 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 75%',
            toggleActions: 'play none none none',
          },
        })
      })
    }, section)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="services"
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
        <p
          className="eyebrow text-center"
          style={{ marginBottom: 16 }}
        >
          WHAT I CAN DO FOR YOU
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
          Services
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3" style={{ gap: 24 }}>
          {services.map((service, i) => {
            const Icon = service.icon
            return (
              <div
                key={service.title}
                ref={(el) => {
                  if (el) cardsRef.current[i] = el
                }}
                className="glass-card group"
                style={{
                  padding: 48,
                  transition: 'border-color 0.4s ease, box-shadow 0.4s ease',
                  cursor: 'default',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'rgba(89, 243, 1, 0.3)'
                  e.currentTarget.style.boxShadow =
                    '0 0 40px rgba(89, 243, 1, 0.05)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor =
                    'rgba(255, 255, 255, 0.08)'
                  e.currentTarget.style.boxShadow = 'none'
                }}
              >
                <Icon
                  size={32}
                  color="#59f301"
                  style={{ marginBottom: 24 }}
                  strokeWidth={1.5}
                />

                <h3
                  style={{
                    fontFamily: "'Geist Sans', sans-serif",
                    fontSize: 24,
                    fontWeight: 400,
                    color: '#fff',
                    marginBottom: 16,
                  }}
                >
                  {service.title}
                </h3>

                <p
                  style={{
                    fontFamily: "'Geist Sans', sans-serif",
                    fontSize: 15,
                    fontWeight: 300,
                    color: '#888888',
                    lineHeight: 1.6,
                    marginBottom: 24,
                  }}
                >
                  {service.description}
                </p>

                <div className="flex flex-wrap" style={{ gap: 8 }}>
                  {service.tags.map((tag) => (
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
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
