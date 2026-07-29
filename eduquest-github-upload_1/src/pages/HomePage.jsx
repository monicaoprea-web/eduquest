import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import ClassPathSection from '../components/ClassPathSection'
import ExploreSection from '../components/ExploreSection'
import Footer from '../components/Footer'

/**
 * HomePage
 * The marketing homepage: hero, class picker and explore sections.
 * Selecting a class routes into the content system (Class → Subject →
 * Chapter → Lesson); the explore tiles remain anchors within this page
 * for now, wired up as their own destinations in a later sprint.
 */
export default function HomePage() {
  const navigate = useNavigate()
  const location = useLocation()

  // Support deep links like "/#clase" from other pages (e.g. the navbar)
  // by scrolling to the matching section once we land back on "/".
  useEffect(() => {
    if (!location.hash) return
    const id = location.hash.replace('#', '')
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }, [location.hash])

  const scrollToId = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  const handleClassSelect = (classId) => {
    navigate(`/clasa/${classId}`)
  }

  const handleFeatureSelect = (featureName) => {
    console.log(`Secțiune selectată: ${featureName}`)
  }

  return (
    <div id="top">
      <Navbar />
      <main>
        <Hero
          onPrimaryClick={() => scrollToId('clase')}
          onSecondaryClick={() => scrollToId('exploreaza')}
        />
        <ClassPathSection onSelectClass={handleClassSelect} />
        <ExploreSection onSelectFeature={handleFeatureSelect} />
      </main>
      <Footer />
    </div>
  )
}
