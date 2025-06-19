import React, { useState } from 'react';
import './challengeModal.css';

function ChallengeModal({ challenge, visible, onClose, onSubmitFlag }) {
  const [flag, setFlag] = useState('');

  if (!visible || !challenge) return null;

  const handleSubmit = () => {
    if (!flag.trim()) return alert('Flag cannot be empty');
    onSubmitFlag(challenge.id, flag);
    setFlag('');
  };

  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <button className="close-button" onClick={onClose}>✖</button>

        <div className='challenge-header'>
          <h2>{challenge.name}</h2>
          <hr></hr>
          <div className="details">
              <p><strong>Category:</strong> {challenge.category?.type}</p>
              <p><strong>Difficulty:</strong> {challenge.difficulty}</p>
          </div>
      </div>
        {/* {challenge.image && ( */}
          <img src={`/images/Hero_Image.jpg`} alt={challenge.name} className="challenge-image" />
        {/* )} */}

        <p className="description">{challenge.description}</p>

        
       <div className="flag-submit">
          <div className="hint-buttons">
            <p className="hint-title"><b>Hints:</b></p>
              {[1, 2].map((num) => (
                <div key={num}>
                  <button
                    className="hint-btn"
                    onClick={() =>
                      document.getElementById(`hint-${num}`).style.display = 'block'
                    }
                  >
                    {num}
                  </button>
                  <p id={`hint-${num}`} className="hint-text" style={{ display: 'none', marginTop: '0.5rem' }}>
                    {challenge[`hint${num}`]}
                  </p>
                </div>
              ))}
          </div>
        
          <input
            type="text"
            value={flag}
            onChange={(e) => setFlag(e.target.value)}
            placeholder="Enter flag here..."
          />
          <button className="green" onClick={handleSubmit}>Submit Flag</button>

        </div>
      </div> 
    </div>
  );
}

export default ChallengeModal;
