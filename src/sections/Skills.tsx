import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const skills = [
  { name: 'PHP', level: 90 },
  { name: 'Laravel', level: 85 },
  { name: 'JavaScript', level: 80 },
  { name: 'React.js', level: 75 },
  { name: 'MySQL', level: 85 },
  { name: 'HTML/CSS', level: 90 },
  { name: 'Tailwind CSS', level: 80 },
  { name: 'Git', level: 75 },
  { name: 'REST APIs', level: 85 },
  { name: 'Bootstrap', level: 80 },
  { name: 'WordPress', level: 70 },
  { name: 'Problem Solving', level: 90 },
]

export default function Skills() {
  const sectionRef = useRef<HTMLElement>(null)
  const cardRef = useRef<HTMLDivElement>(null)
  const progressRefs = useRef<HTMLDivElement[]>([])

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

      progressRefs.current.forEach((bar, i) => {
        if (!bar) return
        const targetWidth = skills[i]?.level ?? 0
        gsap.fromTo(
          bar,
          { width: '0%' },
          {
            width: `${targetWidth}%`,
            duration: 1.2,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: section,
              start: 'top 70%',
              toggleActions: 'play none none none',
            },
            delay: 0.3 + i * 0.06,
          }
        )
      })
    }, section)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="skills"
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
        <h2
          style={{
            fontFamily: "'Geist Sans', sans-serif",
            fontSize: 48,
            fontWeight: 400,
            letterSpacing: -0.5,
            color: '#fff',
            lineHeight: 1.1,
            marginBottom: 48,
          }}
        >
          Skills & Technologies
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4" style={{ gap: 24 }}>
          {skills.map((skill, i) => (
            <div key={skill.name}>
              <div
                className="flex justify-between"
                style={{ marginBottom: 8 }}
              >
                <span
                  style={{
                    fontFamily: "'Geist Mono', monospace",
                    fontSize: 13,
                    textTransform: 'uppercase',
                    letterSpacing: '0.06em',
                    color: '#888888',
                  }}
                >
                  {skill.name}
                </span>
                <span
                  style={{
                    fontFamily: "'Geist Mono', monospace",
                    fontSize: 13,
                    color: '#59f301',
                  }}
                >
                  {skill.level}%
                </span>
              </div>
              <div
                style={{
                  height: 4,
                  background: 'rgba(255, 255, 255, 0.06)',
                  borderRadius: 0,
                  overflow: 'hidden',
                }}
              >
                <div
                  ref={(el) => {
                    if (el) progressRefs.current[i] = el
                  }}
                  style={{
                    height: 4,
                    background: '#59f301',
                    width: '0%',
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
