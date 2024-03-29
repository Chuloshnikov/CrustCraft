import Hero from "../components/layout/Hero";
import HomeMenu from "../components/layout/HomeMenu";
import SectionHeaders from "../components/layout/SectionHeaders";
import AboutUs from "../components/layout/AboutUs";
import RestaurantsMap from "../components/layout/RestaurantsMap";



export default function Home() {
  return (
  <>
    
    <Hero/>
    <HomeMenu/>
    <section
    id="about"
    className="text-center my-16"
    >
      <SectionHeaders subHeader={'Our story'} mainHeader={'About us'}/>
      <AboutUs/>
    </section>
    <section
    id="contact"
    className="text-center my-8"
    >
      <SectionHeaders subHeader={'Don\'t hesitate'} mainHeader={'Contact us'}/>
      <a 
      className="text-4xl underline text-gray-500" 
      href="tel:+985632567771"
      >
        +77 787 78 78 77
      </a>
      <RestaurantsMap/>
    </section>
  </>
  )
}
