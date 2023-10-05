import React from 'react';
import { Dialog } from 'primereact/dialog';
import PropTypes from 'prop-types';

import './index.scss';

function JoinClass({ visible, handleModal }) {
  return (
    <Dialog
      className="join-class-modal p-3"
      visible={visible}
      onHide={handleModal}
      showHeader={false}
    >
      <span className="fw-bold fs-6">Join Class</span>
      <div className="d-flex flex-row my-3 justify-content-center">
        <input
          className="code-content text-center p-2"
          placeholder="Enter Code"
        />
        <button className="btn btn-create-primary fw-semibold ms-2">
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
