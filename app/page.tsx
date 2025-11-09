import Navigation from './components/Navigation'
import Hero from './components/Hero'
import ValueProps from './components/ValueProps'
import Experience from './components/Experience'
import Technologies from './components/Technologies'
import Problems from './components/Problems'
import Footer from './components/Footer'

export default function Home() {
  return (
    <>
      <Navigation />
      <Hero />
      <ValueProps />
      <Experience />
      <Problems />
      <Technologies />
      <Footer />
    </>
  )
}
