import React from 'react';
import Navbar from '../../components/Navbar/Navbar.jsx';
import Footer from '../../components/Footer/Footer.jsx';
import Hero from './heroSection/Hero.jsx'


function MainPage() {
    return ( 
        <> 
            <Navbar />
            <Hero />


            < Footer/>
        </>
     );
}

export default MainPage;