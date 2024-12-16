import React from 'react';
import './progress.css'

function Progress() {
    return ( 
        <>
            <div className="progress-Section">
                <div className="progress-Diff">
                    <h1>Easy</h1>
                    <p>8 / 10</p>
                    <img src="./images/stars_collection.png" alt="" />
                </div>
                <div className="progress-Diff">
                    <h1>Medium</h1>
                    <p>3 / 10</p>
                    <img src="./images/stars_collection.png" alt="" />
                </div>
                <div className="progress-Diff">
                    <h1>Hard</h1>
                    <p>1 / 10</p>
                    <img src="./images/stars_collection.png" alt="" />
                </div>
            </div>
        </>
     );
}

export default Progress;