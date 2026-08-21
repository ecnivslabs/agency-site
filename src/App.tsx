import { Nav } from '@/components/site/Nav'
import { Hero } from '@/components/site/Hero'
import { Capabilities } from '@/components/site/Capabilities'
import { CaseStudies } from '@/components/site/CaseStudies'
import { Engagement } from '@/components/site/Engagement'
import { Positioning } from '@/components/site/Positioning'
import { Work } from '@/components/site/Work'
import { Inquiry } from '@/components/site/Inquiry'
import { Footer } from '@/components/site/Footer'

function App() {
  return (
    <div className="min-h-screen w-full bg-background">
      <a href="#main" className="skip-link">
        Skip to content
      </a>

      <Nav />

      <main id="main">
        <Hero />
        <CaseStudies />
        <Capabilities />
        <Engagement />
        <Positioning />
        <Work />
        <Inquiry />
      </main>

      <Footer />
    </div>
  )
}

export default App
