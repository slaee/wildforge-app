import React, { useState } from 'react';

import { Dialog } from 'primereact/dialog';
import ControlInput from '../controlinput';

import './index.scss';

function TeamFormation() {
  const [showModal, setShowModal] = useState(false);

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const renderMdodal = () => (
    <Dialog
      className="team-formation-modal"
      visible={showModal}
      onHide={closeModal}
      showHeader={false}
    >
      <div className="d-grid gap-4">
        <button
          aria-label="Close Modal"
          className="btn btn-close ms-auto"
          onClick={closeModal}
        />
        <ControlInput
          name="name"
          label="Minimum Number of Members:"
          className="yellow-on-focus"
        />
        <ControlInput
          name="name"
          label="Maximum Number of Members:"
          className="yellow-on-focus"
        />
        <button
          aria-label="Start"
          className="btn btn-wild-primary fs-5 fw-semibold"
          onClick={closeModal}
        >
          Start
        </button>
      </div>
    </Dialog>
  );

  return (
    <div className="container">
      <button
        type="btn"
        className="btn btn-wild-primary fs-4 fw-semibold"
        onClick={openModal}
      >
        Start Team Formation
      </button>
      {renderMdodal()}
    </div>
  );
}

export default TeamFormation;
