import React from 'react';
import './progress-bar.css';

const ProgressBar = ({ progress }) => {
  return (
    <div className="progress-container">
      <div className="progress-bar">
        <div className="progress" style={{ width: `${progress}%` }}>
          <span className="progress-text">{progress}% Progress</span>
        </div>
      </div>
      <div className="progress-labels">
        <span>Start</span>
        <span>Complete</span>
      </div>
    </div>
  );
};

export default ProgressBar;
