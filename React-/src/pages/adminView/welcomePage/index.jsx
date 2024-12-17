import React from 'react';
import Navbar from '../../../components/Admin_Navbar/Navbar';
import WelcomePage from './welcomeSection/WelcomePage';
import Footer from '../../../components/Footer/Footer';

function index() {
    return ( 
        <>
            <Navbar />
            <WelcomePage />
            <Footer />

        </>
    );
}

export default index;