import React from 'react';

import './index.scss';

function HiringCards() {
  return (
    <div className="hiring-card p-3">
      <div className="d-flex justify-content-center p-4">
        <span className="text-center fw-bold fs-4">
          [Team Name] Hiring Post
        </span>
        <span className="text-center fw-semibold fs-5 ms-auto">[Members]</span>
        <span className="text-center fw-semibold fs-5 ms-auto">[Status]</span>
        <span className="text-center fw-semibold fs-5 ms-auto">View</span>
      </div>
    </div>
  );
}

export default HiringCards;
