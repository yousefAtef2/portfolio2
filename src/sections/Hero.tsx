export default function Hero() {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      id="hero"
      className="relative"
      style={{ minHeight: '100vh', display: 'flex', alignItems: 'center' }}
    >
      {/* Left gradient overlay for text readability */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'linear-gradient(to right, rgba(5,5,5,0.85) 0%, rgba(5,5,5,0.4) 45%, transparent 70%)',
          zIndex: 1,
        }}
      />

      {/* Content */}
      <div className="relative" style={{ zIndex: 2, padding: '0 48px', maxWidth: 1200, margin: '0 auto', width: '100%' }}>
        <div style={{ maxWidth: 600 }}>
          <p className="eyebrow" style={{ marginBottom: 24 }}>
            FULL-STACK DEVELOPER
          </p>

          <h1
            style={{
              fontFamily: "'Geist Sans', sans-serif",
              fontSize: 64,
              fontWeight: 400,
              letterSpacing: -1,
              lineHeight: 1.0,
              color: '#fff',
              marginBottom: 24,
            }}
          >
            Yousef Atef
            <br />
            Crafting Digital Solutions
          </h1>

          <p
            style={{
              fontFamily: "'Geist Sans', sans-serif",
              fontSize: 18,
              fontWeight: 300,
              color: '#888888',
              lineHeight: 1.6,
              maxWidth: 480,
              marginBottom: 40,
            }}
          >
            Passionate Fullstack PHP Laravel Developer specializing in building
            modern, scalable, and user-friendly web applications.
          </p>

          <div className="flex flex-wrap" style={{ gap: 16, marginBottom: 64 }}>
            <a
              href="#projects"
              onClick={(e) => handleClick(e, '#projects')}
              className="btn-primary"
            >
              View My Work
            </a>
            <a
              href="#contact"
              onClick={(e) => handleClick(e, '#contact')}
              className="btn-secondary"
            >
              Get In Touch
            </a>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap" style={{ gap: 48 }}>
            {[
              { number: '1+', label: 'Years Experience' },
              { number: '10+', label: 'Projects Completed' },
              { number: '3+', label: 'Happy Clients' },
            ].map((stat) => (
              <div key={stat.label}>
                <div
                  style={{
                    fontFamily: "'Geist Sans', sans-serif",
                    fontSize: 40,
                    fontWeight: 400,
                    color: '#59f301',
                    lineHeight: 1,
                  }}
                >
                  {stat.number}
                </div>
                <div
                  style={{
                    fontFamily: "'Geist Mono', monospace",
                    fontSize: 11,
                    textTransform: 'uppercase',
                    color: '#888888',
                    marginTop: 8,
                    letterSpacing: '0.06em',
                  }}
                >
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
