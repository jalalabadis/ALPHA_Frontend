import React, { useState, useEffect } from 'react';

const ProgressBar = ({journey, onComplete}) => {
    const totalTime = journey.adventure_time; // total countdown time in seconds
    const [timeLeft, setTimeLeft] = useState(totalTime);

    useEffect(() => {
        if (timeLeft > 0) {
            const timer = setInterval(() => {
                setTimeLeft((prev) => prev - 1);
            }, 1000);

            return () => clearInterval(timer);
        }
        else{
            onComplete()
        }
    }, [timeLeft, onComplete]);

    // Calculate the percentage of time left
    const progressPercentage = ((totalTime - timeLeft) / totalTime) * 100;
    const formattedTime = `${Math.floor(timeLeft / 60)}:${(timeLeft % 60).toString().padStart(2, '0')}`;

    return (
        <div className="progress-container">
            <div className="progress-bar" style={{ width: `${progressPercentage}%` }}>
                <div className="progress-text">{formattedTime}</div>
            </div>
            <div className="progress-max-text">{`${Math.floor(totalTime / 60)}:${(totalTime % 60).toString().padStart(2, '0')}`}</div>
        </div>
    );
};

export default ProgressBar;