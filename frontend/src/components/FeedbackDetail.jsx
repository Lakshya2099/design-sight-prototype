import React from 'react';
const modalStyles = {
  position: 'fixed',
  bottom: '20px',
  right: '20px',
  width: '400px',
  backgroundColor: '#2a2a2a',
  border: '1px solid #444',
  borderRadius: '8px',
  padding: '20px',
  boxShadow: '0 5px 15px rgba(0,0,0,0.5)',
  zIndex: 100,
  color: 'white',
};

const FeedbackDetail = ({ feedbackItem, onClose }) => {
  if (!feedbackItem) return null;

  return (
    <div style={modalStyles}>
      <button onClick={onClose} style={{ float: 'right' }}>X</button>
      <h3>{feedbackItem.category} ({feedbackItem.severity})</h3>
      <h4>Feedback:</h4>
      <p>{feedbackItem.feedbackText}</p>
      <h4>Recommendation:</h4>
      <p>{feedbackItem.recommendation}</p>
      <small>Relevant for: {feedbackItem.roleTags.join(', ')}</small>
    </div>
  );
};

export default FeedbackDetail;