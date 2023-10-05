import React from 'react';

import Navbar from '../../../components/navbar';
import Header from '../../../components/header';

import './index.scss';

function ViewClass() {
  const renderSubheader = () => (
    <div className="d-flex pt-2 pb-2">
      <div className="mx-5">
        <div className="fw-bold fs-5 brown-text">[Class Title]</div>
        <div className="d-flex py-2">
          <div className="fw-semibold fs-6">[Class Scedule]</div>
          <div className="ms-4 me-2 fw-semibold fs-6">[Class Code]</div>
          <button type="button" className="btn btn-secondary btn-sm">
            Copy
          </button>
        </div>
      </div>
    </div>
  );

  const renderBody = () => (
    <div className="d-flex">
      <div className="d-flex flex-column">
        <div className="mx-5 my-3 students-container">
          <div className="fw-bold fs-1">[Number]</div>
          <div className="ms-auto fw-semibold fs-3 mx-5">Students</div>
        </div>
        <div className="mx-5 my-3 students-container">
          <div className="fw-bold fs-1">[Number]</div>
          <div className="ms-auto fw-semibold fs-3 mx-5">Teams</div>
        </div>
      </div>
      <div className="mx-5 my-3 logs-container">
        <div className="fw-bold fs-4 mb-3">CLASS LOGS</div>
        <div className="d-flex">
          <div>[DateTime]</div>
          <div className="ms-3">[Log Entry]</div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="d-flex">
      <Navbar />
      <div className="container-fluid d-flex flex-column">
        <Header />
        {renderSubheader()}
        {renderBody()}
      </div>
    </div>
  );
}

export default ViewClass;
