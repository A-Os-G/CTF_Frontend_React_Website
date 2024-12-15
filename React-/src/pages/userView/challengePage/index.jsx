import React from 'react';
import Navbar from '../../../components/Navbar/Navbar'
import Footer from '../../../components/Footer/Footer'
import Filter from './filterSection/Filter'
import ChallengeCard from './challengesCard/ChallengeCard';
import Progress from './progressSection/Progress';
import './index.css'

function ChallengePage() {
    return ( 
        <>
            <Navbar />

            <div className='body'>
                {/* <Progress /> */}
                <Filter />
                <ChallengeCard/>
            </div>

            <Footer />
        </>
     );
}

export default ChallengePage;