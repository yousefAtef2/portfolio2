import ASCIIBackground from './components/ASCIIBackground'
import Navigation from './components/Navigation'
import Hero from './sections/Hero'
import About from './sections/About'
import Services from './sections/Services'
import Projects from './sections/Projects'
import Skills from './sections/Skills'
import Contact from './sections/Contact'
import Footer from './sections/Footer'

export default function App() {
  return (
    <>
      <ASCIIBackground />
      <div className="relative" style={{ zIndex: 1 }}>
        <Navigation />
        <Hero />
        <About />
        <Services />
        <Projects />
        <Skills />
        <Contact />
        <Footer />
      </div>
    </>
  )
}
