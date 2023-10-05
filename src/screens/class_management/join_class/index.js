import React, { useState } from 'react';
import { Dialog } from 'primereact/dialog';
import PropTypes from 'prop-types';

import './index.scss'; // Assuming the SCSS file is named JoinClass.scss

function JoinClass({ visible, handleModal }) {
  const [showCode, setShowCode] = useState(false);

  const closeShowCodeModal = () => {
    setShowCode(false);
    console.log('close code');
  };

  return (
    <Dialog
      className="join-class-modal p-3"
      visible={visible}
      onHide={closeShowCodeModal}
      showHeader={false}
    >
      <span className="fw-bold fs-6">Join Class</span>
      <div className="d-flex flex-row my-3 justify-content-center">
        <input
          className="code-content text-center p-2"
          placeholder="Enter Code"
        />
        <button
          className="btn btn-create-primary fw-semibold ms-2"
          onClick={closeShowCodeModal}
        >
          Join
        </button>
      </div>
    </Dialog>
  );
}

JoinClass.propTypes = {
  visible: PropTypes.bool,
  handleModal: PropTypes.func,
};

export default JoinClass;
