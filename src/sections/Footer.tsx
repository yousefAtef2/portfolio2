import { Github, Linkedin, Facebook } from 'lucide-react'

export default function Footer() {
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
    <footer
      className="relative"
      style={{
        zIndex: 1,
        borderTop: '1px solid rgba(255, 255, 255, 0.06)',
        padding: '32px 48px',
      }}
    >
      <div
        className="flex flex-col md:flex-row items-center justify-between"
        style={{ maxWidth: 1200, margin: '0 auto', gap: 16 }}
      >
        {/* Logo */}
        <span
          className="text-accent"
          style={{
            fontFamily: "'Geist Mono', monospace",
            fontSize: 16,
            fontWeight: 700,
          }}
        >
          YA.
        </span>

        {/* Center text */}
        <p
          style={{
            fontFamily: "'Geist Sans', sans-serif",
            fontSize: 13,
            fontWeight: 300,
            color: '#888888',
            textAlign: 'center',
          }}
        >
          Full-Stack Developer passionate about building high-quality web
          applications and solving complex problems.
        </p>

        {/* Right - Name + socials */}
        <div className="flex items-center" style={{ gap: 16 }}>
          <span
            style={{
              fontFamily: "'Geist Sans', sans-serif",
              fontSize: 14,
              fontWeight: 400,
              color: '#fff',
            }}
          >
            Yousef Atef
          </span>
          <div className="flex" style={{ gap: 8 }}>
            {socialLinks.map((link) => {
              const Icon = link.icon
              return (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-icon-btn"
                  style={{ width: 32, height: 32 }}
                  aria-label={link.label}
                >
                  <Icon size={14} />
                </a>
              )
            })}
            <a
              href="https://wa.me/+201033734422"
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon-btn"
              style={{ width: 32, height: 32 }}
              aria-label="WhatsApp"
            >
              <svg
                width="14"
                height="14"
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
      </div>

      {/* Copyright */}
      <div
        className="text-center"
        style={{
          marginTop: 24,
          fontFamily: "'Geist Mono', monospace",
          fontSize: 11,
          color: '#888888',
          textTransform: 'uppercase',
          letterSpacing: '0.06em',
        }}
      >
        &copy; 2026 Yousef Atef. All Rights Reserved.
      </div>
    </footer>
  )
}
