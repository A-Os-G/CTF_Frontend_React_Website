import React from 'react';
import './challengeCard.css'
import GetElementDimensions from '../../../../hooks/GetElementDimensions';
import {Link} from 'react-router-dom'

// function DynamicCard() {}

function ChallengeCard() {
    return ( 
        <>
            <div className="challengeCard-Section">

                <Link to='./slug' className="Card">
                    <div className="cat-Diff">
                        <p>Cateogry</p>
                        <p>Diffucilty</p>
                    </div>

                    {/* <div className="cart-Title [overflowing|nooverflow]"> */}
                    <GetElementDimensions 
                        kid={
                            <>1 2 3 4 5 6 7 8</>
                        }
                    />
                    {/* /> */}

                    <div className="star-progress">

                        <p> Progress: </p>

                        <img src="./images/Star_full.png" className='Side' />
                        <img src="./images/Star_full.png" className='Center' />
                        <img src="./images/Star_full.png" className='Side' />
                    </div>

                </Link>

                <div className="Card">
                    <div className="cat-Diff">
                        <p>Cateogry</p>
                        <p>Diffucilty</p>
                    </div>

                    {/* <div className="cart-Title [overflowing|nooverflow]"> */}
                    <GetElementDimensions 
                        kid={
                            <>1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18 19 20 21 22 23 24 25</>
                        }
                    />
                    {/* /> */}

                    <div className="star-progress">

                        <p> Progress: </p>

                        <img src="./images/Star_full.png" className='Side' />
                        <img src="./images/Star_full.png" className='Center' />
                        <img src="./images/Star_full.png" className='Side' />
                    </div>

                </div>

                <div className="Card">
                    <div className="cat-Diff">
                        <p>Cateogry</p>
                        <p>Diffucilty</p>
                    </div>

                    <GetElementDimensions 
                        kid={
                            <>1 2 3 4 5 6 7 8 9 10</>
                        }
                    />

                    <div className="star-progress">

                        <p> Progress: </p>

                        <img src="./images/Star_full.png" className='Side' />
                        <img src="./images/Star_full.png" className='Center' />
                        <img src="./images/Star_full.png" className='Side' />
                    </div>

                </div>

                <div className="Card">
                    <div className="cat-Diff">
                        <p>Cateogry</p>
                        <p>Diffucilty</p>
                    </div>

                    <GetElementDimensions 
                        kid={
                            <>1 2 3 4 5 6 7 8 9 10</>
                        }
                    />

                    <div className="star-progress">

                        <p> Progress: </p>

                        <img src="./images/Star_full.png" className='Side' />
                        <img src="./images/Star_full.png" className='Center' />
                        <img src="./images/Star_full.png" className='Side' />
                    </div>

                </div>

               

            </div>
        </>
     );
}

// function overflow (){
    
// }

export default ChallengeCard;