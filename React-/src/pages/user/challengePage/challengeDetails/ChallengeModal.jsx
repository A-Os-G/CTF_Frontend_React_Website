import React, { useState, useEffect } from 'react';
import './challengeModal.css';
import FeedbackModal from '../feedbackModal/FeedbackModal';
import axios from 'axios';

function ChallengeModal({ challenge, visible, onClose, onSubmitFlag }) {
  const [flag, setFlag] = useState('');
  const [usedHints, setUsedHints] = useState([]);
  const [visibleHints, setVisibleHints] = useState([]); // ✅ For controlling which hints are shown
  const [showFeedback, setShowFeedback] = useState(false);

  useEffect(() => {
    if (visible && challenge) {
      setFlag('');
      setUsedHints([]);
      setVisibleHints([]); // ✅ Reset hint visibility when modal opens
    }
  }, [challenge, visible]);

  if (!visible || !challenge) return null;

  const handleSubmit = () => {
    if (!flag.trim()) return alert('Flag cannot be empty');
    onSubmitFlag(challenge.id, flag, usedHints, () => setShowFeedback(true));
    setFlag('');
  };

  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <button className="close-button" onClick={onClose}>✖</button>

        <div className='challenge-header'>
          <h2>{challenge.name}</h2>
          <hr />
          <div className="details">
            <p><strong>Category:</strong> {challenge.category?.type}</p>
            <p><strong>Difficulty:</strong> {challenge.difficulty}</p>
          </div>
        </div>

        <img src={`/images/Hero_Image.jpg`} alt={challenge.name} className="challenge-image" />

        <p className="description">{challenge.description}</p>

        <div className="flag-submit">
          <div className="hint-buttons">
            <p className="hint-title"><b>Hints:</b></p>
            {[1, 2].map(num => (
              <div key={num}>
                <button
                  className="hint-btn"
                  onClick={() => {
                    setUsedHints(prev => prev.includes(num) ? prev : [...prev, num]);
                    setVisibleHints(prev => prev.includes(num) ? prev : [...prev, num]);
                  }}
                >
                  {num}
                </button>
                {visibleHints.includes(num) && (
                  <p className="hint-text" style={{ marginTop: '0.5rem' }}>
                    {challenge[`hint${num}`]}
                  </p>
                )}
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

      <FeedbackModal
        visible={showFeedback}
        onClose={() => setShowFeedback(false)}
        onSubmit={(comment, challengeId) => {
          axios.post(`/api/feedback/post/${challengeId}`, { comment })
            .then(() => {
              alert('Feedback submitted!');
              setShowFeedback(false);
              onClose(); // Closes both feedback modal and challenge modal
            })
            .catch(err => {
              console.error('Failed to submit feedback', err);
              alert('Submission failed');
            });
        }}
        challengeId={challenge.id}
      />
    </div>
  );
}

export default ChallengeModal;
