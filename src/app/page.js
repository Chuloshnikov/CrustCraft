import Hero from "../components/layout/Hero";
import HomeMenu from "../components/layout/HomeMenu";
import SectionHeaders from "../components/layout/SectionHeaders";



export default function Home() {
  return (
  <>
    
    <Hero/>
    <HomeMenu/>
    <section
    className="text-center my-16"
    >
      <SectionHeaders subHeader={'Our story'} mainHeader={'About us'}/>
      <div
      className="text-gray-500 text-md font-medium max-w-md mx-auto mt-4 flex flex-col gap-4"
      >
        <p>
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
          Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
          when an unknown printer took a galley of type and scrambled it to make a type specimen book. 
          It has survived not only five centuries, but also the leap into electronic typesetting, 
          remaining essentially unchanged. 
        </p>
        <p>
        Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
        when an unknown printer took a galley of type and scrambled it to make a type specimen book. 
        It has survived not only five centuries, but also the leap into electronic typesetting, 
        remaining essentially unchanged.
      </p>
      <p>
        Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, 
        when an unknown printer took a galley of type and scrambled it to make a type specimen book. 
        It has survived not only five centuries, but also the leap into electronic typesetting, 
        remaining essentially unchanged. 
      </p>
      </div>
    </section>
    <section
    className="text-center my-8"
    >
      <SectionHeaders subHeader={'Don\'t hesitate'} mainHeader={'Contact us'}/>
      <a 
      className="text-4xl underline text-gray-500" 
      href="tel:+985632567771"
      >
        +98 777 777 77 77
      </a>
    </section>
  </>
  )
}
