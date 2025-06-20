import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './progress.css';

function Progress({ refresh }) {
    const [summary, setSummary] = useState(null);

    const fetchStarSummary = () => {
        axios.get(`/api/progress/stars/summary/full?email=Galal@gmail.com`)
            .then(res => setSummary(res.data.response))
            .catch(err => console.error("Failed to load progress summary", err));
    };



    useEffect(() => {
        fetchStarSummary();
    }, [refresh]);;

    const getBarGradient = (difficulty) => {
        switch (difficulty) {
            case 'EASY':
                return 'linear-gradient(90deg, #a8e6cf, #28a745)';
            case 'MEDIUM':
                return 'linear-gradient(90deg, #fff3cd, #ffc107)';
            case 'HARD':
                return 'linear-gradient(90deg, #f8d7da, #dc3545)';
            default:
                return 'linear-gradient(90deg, #cce5ff, #007bff)';
        }

    };


    const renderProgress = (difficulty) => {
        const data = summary?.[difficulty];
        if (!data) return <p>Loading...</p>;

        return (
            <div className="progress-Diff">
                <h1>{difficulty}</h1>


                <p>{data.earned} / {data.max}</p>

                <div className="bar-wrapper">
                    <div
                        className="bar-fill"
                        style={{
                            width: `${(data.earned / data.max) * 100}%`,
                            background: getBarGradient(difficulty)
                        }}
                    />
                </div>
            </div>
        );
    };


    return (
        <div className="progress-Section">
            {["EASY", "MEDIUM", "HARD"].map(diff => (
                <React.Fragment key={diff}>
                    {renderProgress(diff)}
                </React.Fragment>
            ))}
        </div>
    );
}

export default Progress;
