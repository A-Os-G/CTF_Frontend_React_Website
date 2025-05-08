import React, { useState, useEffect } from 'react';
import './welcomePage.css';
import axios from 'axios';

function WelcomePage() {
  const [userCount, setUserCount] = useState(0);
  const [challengeCount, setChallengeCount] = useState(0);
  const [categoryCount, setCategoryCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch all three in parallel
    Promise.all([
      axios.get('/api/user/total'),
      axios.get('/api/challenge/total'),
      axios.get('/api/category/total')
    ])
      .then(([userRes, challengeRes, categoryRes]) => {
        setUserCount(userRes.data);
        setChallengeCount(challengeRes.data);
        setCategoryCount(categoryRes.data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="welcome-Section">
      <div className="welcome-Header">
        <h1>Welcome, Admin!</h1>
        <h2>To the Admin’s summary</h2>
      </div>

      <div className="welcome-Counters">
        <div className="counter">
          <h4>Total Users</h4>
          <p>{userCount}</p>
        </div>

        <div className="counter">
          <h4>Total Category</h4>
          <p>{categoryCount}</p>
        </div>

        <div className="counter">
          <h4>Total Challenges</h4>
          <p>{challengeCount}</p>
        </div>

        <div className="counter">
          <h4>Total Feedback</h4>
          <p>00,000</p> {/* You can fetch this similarly later */}
        </div>
      </div>

      <div className="welcome-subHeader">
        <h2>Please use the nav-bar above to navigate.</h2>
        <a href="">
          <h3>Or click to go to User web page.</h3>
        </a>
      </div>
    </div>
  );
}

export default WelcomePage;
