import React from 'react'
import Accordion from '@mui/material/Accordion';
import AccordionActions from '@mui/material/AccordionActions';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Button from '@mui/material/Button';
import Image from 'next/image';

const AboutUs = () => {
  return (
    <div
    className="relative text-gray-500 text-md font-medium max-w-xl mx-auto mt-4 flex flex-col gap-4"
    >
         <Accordion 
         sx={{
            '&.MuiPaper-root': {
              borderRadius: '16px',
            },
            '& .MuiAccordion-root': {
              borderRadius: '16px',
            },
            '& .MuiAccordion-rounded': {
              borderRadius: '16px',
            }
          }}
         >
         <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          How it starts?
        </AccordionSummary>
        <AccordionDetails>
            <p>
            Once upon a time in the bustling city streets, nestled among the eclectic array of eateries, 
            emerged a unique culinary gem known as CrustCraft. This artisanal pizza and gourmet fast food 
            joint was not just another run-of-the-mill establishment; it was a haven for food enthusiasts 
            seeking a delectable fusion of creativity and quality.
            The story of CrustCraft began with two passionate food aficionados, Alex and Emma, 
            whose shared dream was to create a dining experience that celebrated the artistry of 
            crafting exceptional pizzas and fast food with premium, locally-sourced ingredients. 
            With unwavering determination and a sprinkle of entrepreneurial spirit, they 
            transformed a quaint corner storefront into a vibrant hub of culinary innovation.
            </p>
        </AccordionDetails>
         </Accordion>
         <Accordion
          sx={{
            '&.MuiPaper-root': {
              borderRadius: '16px',
            },
            '& .MuiAccordion-root': {
              borderRadius: '16px',
            },
            '& .MuiAccordion-rounded': {
              borderRadius: '16px',
            }
          }}
         >
            <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1-content"
            id="panel1-header"
            >
            Our pizza
            </AccordionSummary>
            <AccordionDetails>
                <p>
                At CrustCraft, every pizza was a masterpiece, meticulously handcrafted from scratch 
                using only the finest artisanal dough, homemade sauces bursting with flavor, and an 
                abundance of fresh, seasonal toppings sourced from local farmers&lsquo; markets. 
                Whether it was the classic Margherita adorned with plump tomatoes and fragrant basil, 
                or the adventurous BBQ Chicken with tender grilled chicken and tangy barbecue sauce, 
                each pizza was a testament to CrustCraft&lsquo;s dedication to quality and creativity.
                But CrustCraft was more than just a pizzeria; it was a playground for culinary experimentation. 
                Inspired by the diverse palate of their patrons, Alex and Emma introduced an array of gourmet 
                fast food options that tantalized taste buds and pushed the boundaries of traditional fare. 
                From indulgent gourmet burgers stacked high with artisanal cheeses and house-made condiments 
                to innovative salads bursting with vibrant colors and flavors, 
                every dish at CrustCraft was a culinary delight.
            </p>
            </AccordionDetails>
         </Accordion>
         <Accordion 
          sx={{
            '&.MuiPaper-root': {
              borderRadius: '16px',
            },
            '& .MuiAccordion-root': {
              borderRadius: '16px',
            },
            '& .MuiAccordion-rounded': {
              borderRadius: '16px',
            }
          }}
         >
         <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          Our community 
        </AccordionSummary>
        <AccordionDetails>
        <p>
            As word of CrustCraft&lsquo;s delectable offerings spread, so did its reputation as a community-centric 
            establishment that embraced sustainability and supported local artisans. From partnering with 
            neighborhood farms to hosting charity events and culinary workshops, CrustCraft became a beloved 
            gathering place where food, creativity, and community intersected.
            Through dedication, passion, and a sprinkle of culinary magic, CrustCraft continued to thrive, 
            leaving a lasting impression on the city&lsquo;s culinary landscape and inspiring a new generation 
            of food artisans to push the boundaries of flavor and innovation.
            And so, the story of CrustCraft lived on, a testament to the power of passion, creativity, 
            and good food to bring people together and create unforgettable experiences one delicious bite at a time.
        </p>
        </AccordionDetails>
         </Accordion>
         <div
        className='xs:hidden md:block absolute -top-[70px] rotate-45 -z-10'
        >
          <Image src={'/noodles.svg'} width={200} height={200} alt={'sallad'}/>
        </div>
        <div
        className='absolute -top-[70px] -rotate-45 right-0 -z-10'
        >
          <Image src={'/donut.svg'} width={200} height={200} alt={'sallad'}/>
        </div>
    </div>
  )
}

export default AboutUs