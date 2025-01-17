import React from 'react'
import Header from '../Components/Header'
import FindHome from '../Components/FindHome'
import HomiMessage from '../Components/HomiMessage'
import HomiMatch from '../Components/HomiMatch'
import LandlordTestimonial from '../Components/LandlordTestimonial'
import Footer from '../Components/Footer'


const Home = () => {
  return (
    <div>
       <Header/>
       <FindHome/>
       <HomiMessage/>
       <HomiMatch/>
       <LandlordTestimonial/>
       <Footer/>
    </div>
  )
}

export default Home