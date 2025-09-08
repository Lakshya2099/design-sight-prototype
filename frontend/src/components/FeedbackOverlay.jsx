import React from 'react';
import './FeedbackOverlay.css';

const FeedbackOverlay = ({ feedbackItems, onSelectFeedback, activeFeedbackId }) => {
  const getSeverityClass = (severity) => {
    return `severity-${severity.toLowerCase()}`;
  };

  return (
    <div className="feedback-overlay-container">
      {feedbackItems.map(item => (
        <div
          key={item._id}
          className={`feedback-box ${getSeverityClass(item.severity)} ${activeFeedbackId === item._id ? 'active' : ''}`}
          style={{
            left: `${item.coordinates.x}%`,
            top: `${item.coordinates.y}%`,
            width: `${item.coordinates.width}%`,
            height: `${item.coordinates.height}%`,
          }}
          onClick={() => onSelectFeedback(item)}
        />
      ))}
    </div>
  );
};

export default FeedbackOverlay;