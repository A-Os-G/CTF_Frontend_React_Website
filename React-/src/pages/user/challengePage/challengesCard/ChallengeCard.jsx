import React, { useEffect, useState } from 'react';
import './challengeCard.css';
import GetElementDimensions from '../../../../hooks/GetElementDimensions';
import { Link } from 'react-router-dom';
import axios from 'axios';

function ChallengeCard({ challenges, onCardClick }) {
  if (!challenges || challenges.length === 0) {
    return <div style={{ padding: '1rem', textAlign: 'center' }}>No challenges available.</div>;
  }

  return (
    <div className="challenge-page-container">
      <div className="challengeCard-Section">
        {challenges.map((ch) => (
          <Link to="#" key={ch.id} onClick={(e) => {
              e.preventDefault(); // prevent navigation
              onCardClick(ch);
            }} className="Card">

            <div className="cat-Diff">
              <p>{ch.category?.type}</p>
              <p>{ch.difficulty}</p>
            </div>

            <GetElementDimensions kid={<>{ch.name}</>} />

            <div className="star-progress">
              <p>Progress:</p>
              {[...Array(3)].map((_, i) => (
                <img
                  key={i}
                  src={
                    i < ch.stars
                      ? '/images/Star_full.png'
                      : '/images/Star_empty.png'
                  }
                  className={i === 1 ? 'Center' : 'Side'}
                  alt="star"
                />
              ))}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}


export default ChallengeCard;
