import React from 'react';
import './body_two.css'
import Button from '../../../../components/ui/Button';

function Body_Two() {
    return ( 
        <>
            <div className="body2-Section">

                <div className="header">
                    <h1>Why Practice With Us?</h1>
                </div>

                <div className="reasons-Section">
                    <div className="b2_reason">
                        <h2>Beginner-Friendly:</h2>
                        <p>This website offers hints and solutions, making cybersecurity concepts easy for beginners.</p>
                    </div>
                    
                    <div className="b2_reason">
                        <h2>Gamified Learning:</h2>
                        <p> Learn through interactive, challenge-based activities that make cybersecurity enjoyable.</p>
                    </div>
                    
                    <div className="b2_reason">
                        <h2>Self-Paced:</h2>
                        <p>Learn at your speed with no time pressure, allowing flexibility to suit your schedule and needs.</p>
                    </div>
                </div>

                    <div className="body2_button">
                        <Button name="Start Practice" address="./challenges"/>
                    </div>
            </div>

        </>
     );
}

export default Body_Two;