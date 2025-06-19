import React, { useEffect, useState } from 'react';
import './filter.css';
import {useRef, useCallback } from 'react';

import axios from 'axios';

function Filter({ onFilter }) {
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [selectedDifficulty, setSelectedDifficulty] = useState('All');
    const [searchTerm, setSearchTerm] = useState('');
    const [categories, setCategories] = useState([]);

  // Get categories dynamically from backend
  useEffect(() => {
    axios.get('/api/category/get/all/with-challenge-counts')
      .then(res => setCategories(res.data.response))
      .catch(() => setCategories([]));
  }, []);

  // Notify parent on any change
  const applyFilters = (newFilters) => {
    const filters = {
      searchTerm,
      selectedCategory,
      selectedDifficulty,
      ...newFilters,
    };
    onFilter(filters);
  };
  
    function debounce(func, delay) {
        let timeout;
        return (...args) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => func(...args), delay);
        };
    }



    const debouncedSearch = useRef(
    debounce((value) => {
        applyFilters({ searchTerm: value });
    }, 300)
    ).current;



  return (
    <div className="filter-Section">
      <div className="filter-header filterParts"><h1>Filter</h1></div>

      <div className="filter-search filterParts">
        <div className="filter-subheader"><h2>Search</h2></div>

        <input
          type="text"
          placeholder='Search by name'
          value={searchTerm}
          onChange={(e) => {
            const value = e.target.value;
            setSearchTerm(value);
            debouncedSearch(value);
          }}
        />

      </div>

      <div className="filter-list filterParts">
        
        <div className="filter-subheader"><h2>Category</h2></div>
        
        <div className="filter-list-items">
          <ul>
            <li
              className={selectedCategory === 'All' ? 'activeCell' : ''}
              onClick={() => {
                setSelectedCategory('All');
                applyFilters({ selectedCategory: 'All' });
              }}
            >
              All
            </li>
            
            {categories.map((cat) => (
              <li
                key={cat.id}
                className={selectedCategory === cat.type ? 'activeCell' : ''}
                onClick={() => {
                  setSelectedCategory(cat.type);
                  applyFilters({ selectedCategory: cat.type });
                }}
              >
                {cat.type}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="filter-list filterParts">
        <div className="filter-subheader"><h2>Difficulty</h2></div>
        <div className="filter-list-items">
          <ul>
            {['All', 'EASY', 'MEDIUM', 'HARD'].map((level) => (
              <li
                key={level}
                className={selectedDifficulty === level ? 'activeCell' : ''}
                onClick={() => {
                  setSelectedDifficulty(level);
                  applyFilters({ selectedDifficulty: level });
                }}
              >
                {level}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Filter;
