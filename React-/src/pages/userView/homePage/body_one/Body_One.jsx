import React from 'react';
import './body_one.css'

function Body_One() {
    return ( 
        <>
            <div className="body1-Section">

                <div className="header">
                    <h1>Why CTF Challenges?</h1>
                </div>

                <div className="reasons-Section">
                    <div className="reason">
                        <h2>Hands-On Experience:</h2>
                        <p>Apply theoretical knowledge to real challenges.</p>
                    </div>
                    
                    <div className="reason">
                        <h2>Creative Thinking:</h2>
                        <p>Develop innovative approaches to solving security challenges.</p>
                    </div>
                    
                    <div className="reason">
                        <h2>Build Confidence:</h2>
                        <p>Tackle complex problems and improve critical thinking.</p>
                    </div>

                </div>
            </div>

        </>
     );
}

export default Body_One;