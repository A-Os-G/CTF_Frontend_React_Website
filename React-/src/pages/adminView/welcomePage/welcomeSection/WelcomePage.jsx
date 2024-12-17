import React from 'react';
import './welcomePage.css'

function welcomePage() {
    return ( 
        <>
            <div className="welcome-Section">
                <div className="welcome-Header">
                    <h1>Welcome, Name!</h1>
                    <h2>To the Admin’s summary</h2>
                </div>

                <div className="welcome-Counters">

                    <div className="counter">
                        <h4>Total Users</h4>
                        <p>00,000</p>
                    </div>

                    <div className="counter">
                        <h4>Total Category</h4>
                        <p>00,000</p>
                    </div>

                    <div className="counter">
                        <h4>Total Challenges</h4>
                        <p>00,000</p>
                    </div>

                    <div className="counter">
                        <h4>Total Feedback</h4>
                        <p>00,000</p>
                    </div>

                </div>

                <div className="welcome-subHeader">
                    <h2>Please use the nav-bar above to navigate.</h2>
                    <a href="">
                        <h3>Or click to go to User web page.</h3>
                    </a>
                </div>
            </div>
        </>
     );
}

export default welcomePage;