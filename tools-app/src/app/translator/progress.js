import React from 'react';
import { ProgressBar } from 'react-bootstrap';

const Progress = ({ text, percentage }) => {
  return (
    <div className="mb-2">
      <div className="d-flex justify-content-between align-items-center mb-1">
        <small className="text-muted">{text}</small>
        <small className="text-muted">{percentage}%</small>
      </div>
      <ProgressBar 
        now={percentage} 
        label={`${percentage}%`}
        variant="primary"
        animated
        style={{ height: '8px' }}
      />
    </div>
  );
};

export default Progress;
