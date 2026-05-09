import { useState, useEffect } from 'react'
import { Menu, X } from 'lucide-react'

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Projects', href: '#projects' },
  { label: 'Skills', href: '#skills' },
  { label: 'Contact', href: '#contact' },
]

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    setMenuOpen(false)
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: scrolled ? 'rgba(5, 5, 5, 0.6)' : 'rgba(5, 5, 5, 0.3)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
      }}
    >
      <div className="flex items-center justify-between" style={{ padding: '20px 48px' }}>
        <a
          href="#"
          className="text-accent"
          style={{
            fontFamily: "'Geist Mono', monospace",
            fontSize: 18,
            fontWeight: 700,
          }}
        >
          YA.
        </a>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center" style={{ gap: 32 }}>
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleClick(e, link.href)}
              className="text-white hover:text-accent transition-colors duration-300"
              style={{
                fontFamily: "'Geist Mono', monospace",
                fontSize: 13,
                fontWeight: 400,
                textTransform: 'uppercase',
                letterSpacing: '0.06em',
              }}
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-white"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          className="md:hidden"
          style={{
            background: 'rgba(5, 5, 5, 0.95)',
            backdropFilter: 'blur(12px)',
            padding: '24px 48px',
          }}
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleClick(e, link.href)}
              className="block text-white hover:text-accent transition-colors duration-300"
              style={{
                fontFamily: "'Geist Mono', monospace",
                fontSize: 13,
                fontWeight: 400,
                textTransform: 'uppercase',
                letterSpacing: '0.06em',
                padding: '12px 0',
              }}
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  )
}
