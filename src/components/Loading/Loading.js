// src/components/Loading.js
import React from 'react';
import './Loading.css'; // Create this CSS file for your spinner styling

const Loading = () => {
  return (
    <div className="loading-screen">
      <div className="spinner"></div>
    </div>
  );
};

export default Loading;
