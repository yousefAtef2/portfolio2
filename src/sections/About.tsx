import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function About() {
  const sectionRef = useRef<HTMLElement>(null)
  const cardRef = useRef<HTMLDivElement>(null)

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

  return (
    <section
      id="about"
      ref={sectionRef}
      style={{ paddingTop: 120, position: 'relative', zIndex: 1 }}
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
          {/* Left column - Text */}
          <div className="lg:w-[55%]">
            <p className="eyebrow" style={{ marginBottom: 16 }}>
              ABOUT ME
            </p>

            <h2
              style={{
                fontFamily: "'Geist Sans', sans-serif",
                fontSize: 48,
                fontWeight: 400,
                letterSpacing: -0.5,
                color: '#fff',
                lineHeight: 1.1,
                marginBottom: 32,
              }}
            >
              Building Digital Experiences That Matter
            </h2>

            <div
              style={{
                fontFamily: "'Geist Sans', sans-serif",
                fontSize: 16,
                fontWeight: 300,
                color: '#aaaaaa',
                lineHeight: 1.7,
              }}
            >
              <p style={{ marginBottom: 16 }}>
                Hi, I'm Yousef Atef, a Full-Stack Developer with a strong interest
                in building modern, scalable, and user-friendly web applications. I
                enjoy transforming ideas into real digital experiences through clean
                code, responsive design, and efficient backend architecture.
              </p>
              <p style={{ marginBottom: 16 }}>
                I work with both frontend and backend technologies, allowing me to
                handle complete web application development from designing
                interactive user interfaces to building secure and optimized
                server-side systems.
              </p>
              <p>
                Skilled in PHP, Laravel, JavaScript, MySQL, HTML, CSS, API
                Integration, Git, and Responsive Web Design, with a passion for
                learning, innovation, and building impactful projects.
              </p>
            </div>

            {/* Info pills */}
            <div className="flex flex-wrap" style={{ gap: 16, marginTop: 32 }}>
              <span
                style={{
                  background: 'rgba(89, 243, 1, 0.08)',
                  border: '1px solid rgba(89, 243, 1, 0.15)',
                  color: '#59f301',
                  padding: '8px 16px',
                  fontFamily: "'Geist Mono', monospace",
                  fontSize: 11,
                  textTransform: 'uppercase',
                }}
              >
                Based in Egypt
              </span>
              <span
                style={{
                  background: 'rgba(89, 243, 1, 0.08)',
                  border: '1px solid rgba(89, 243, 1, 0.15)',
                  color: '#59f301',
                  padding: '8px 16px',
                  fontFamily: "'Geist Mono', monospace",
                  fontSize: 11,
                  textTransform: 'uppercase',
                }}
              >
                Available for Freelance & Full-time
              </span>
            </div>
          </div>

          {/* Right column - Portrait */}
          <div className="lg:w-[45%] flex items-center justify-center">
            <img
              src="/images/portrait.jpg"
              alt="Yousef Atef"
              style={{
                width: '100%',
                maxHeight: 500,
                objectFit: 'cover',
                border: '1px solid rgba(255,255,255,0.06)',
              }}
            />
          </div>
        </div>
      </div>
    </section>
  )
}
