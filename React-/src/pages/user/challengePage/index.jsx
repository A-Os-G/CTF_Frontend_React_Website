import React from 'react';
import Navbar from '../../../components/Navbar/Navbar'
import Footer from '../../../components/Footer/Footer'
import Filter from './filterSection/Filter'
import ChallengeCard from './challengesCard/ChallengeCard';
import Progress from './progressSection/Progress';
import ChallengeModal from './challengeDetails/ChallengeModal';
import axios from 'axios';
import { useState, useEffect } from 'react';
import './index.css'

function ChallengePage() {
  const [challenges, setChallenges] = useState([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  const [selectedChallenge, setSelectedChallenge] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const openChallengeModal = (challenge) => {
    setSelectedChallenge(challenge);
    setModalVisible(true);
  };

  const handleFlagSubmit = (id, flag) => {
    axios.post(`/api/challenge/solve/${id}`, flag, {
      headers: { 'Content-Type': 'text/plain' }
    })
    .then(res => alert("Flag submitted!"))
    .catch(err => alert("Wrong flag or error occurred"));
  };

  const fetchChallenges = (pageNum = 0) => {
    setLoading(true);
    axios.get(`/api/challenge/get/public/all?page=${pageNum}&size=16`)
      .then(res => {
        setChallenges(res.data.response);
        setTotalPages(res.data.totalPages);
        setPage(pageNum);
      })
      .catch(() => setChallenges([]))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchChallenges();
  }, []);

  const handleFilter = ({ searchTerm, selectedCategory, selectedDifficulty }) => {
    if (searchTerm.trim()) {
      axios.get(`/api/challenge/get/name/${searchTerm}`)
        .then(res => setChallenges([res.data.response]))
        .catch(() => setChallenges([]));
    } else if (selectedCategory !== 'All') {
      axios.get(`/api/challenge/get/category/public/${selectedCategory}`)
        .then(res => setChallenges(res.data.response))
        .catch(() => setChallenges([]));
    } else if (selectedDifficulty !== 'All') {
      axios.get(`/api/challenge/get/difficulty/${selectedDifficulty}`)
        .then(res => setChallenges(res.data.response))
        .catch(() => setChallenges([]));
    } else {
      fetchChallenges();
    }
  };

  return (
    <>
      <Navbar />
      <div className='body'>
        <Progress />

        <div className="layout">
          <Filter onFilter={handleFilter} />
          {loading ? (
            <div className="spinner" />
          ) : (
            <>
              <ChallengeCard challenges={challenges} onCardClick={openChallengeModal}/>

              {totalPages > 1 && (
                <div className="pagination">
                  <button disabled={page === 0} onClick={() => fetchChallenges(page - 1)}>{'<'}</button>
                  <span>Page {page + 1} of {totalPages}</span>
                  <button disabled={page + 1 >= totalPages} onClick={() => fetchChallenges(page + 1)}>{'>'}</button>
                </div>
              )}
            </>
          )}
        </div>
        
      </div>
      <ChallengeModal
        visible={modalVisible}
        challenge={selectedChallenge}
        onClose={() => setModalVisible(false)}
        onSubmitFlag={handleFlagSubmit}
      />

      <Footer />
    </>
  );
}


export default ChallengePage;