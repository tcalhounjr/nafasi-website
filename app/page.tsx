import Navigation from './components/Navigation'
import Hero from './components/Hero'
import ValueProps from './components/ValueProps'
import Services from './components/Services'
import Experience from './components/Experience'
import Technologies from './components/Technologies'
import Problems from './components/Problems'
import Footer from './components/Footer'
import Chatbot from './components/Chatbot'

export default function Home() {
  return (
    <>
      <Navigation />
      <Hero />
      <ValueProps />
      <Experience />
      <Services />
      <Technologies />
      <Problems />
      <Footer />
      <Chatbot />
    </>
  )
}
