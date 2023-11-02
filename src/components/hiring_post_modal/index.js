import React from 'react';
import PropTypes from 'prop-types';

import { Dialog } from 'primereact/dialog';
import ControlInput from '../controlinput';
import ControlTextArea from '../controltextarea';

import './index.scss';

function HiringPost({ visible, handleModal }) {
  return (
    <Dialog
      className="hiring-post-modal"
      visible={visible}
      onHide={handleModal}
      showHeader={false}
    >
      <div className="d-grid gap-3 p-3">
        <button
          aria-label="Close Modal"
          className="btn btn-close ms-auto"
          onClick={handleModal}
        />
        <div className="px-3">
          <div className="text-center fs-4 fw-bold">Post a Hiring</div>
          <ControlInput
            name="team_name"
            label="Team Name"
            placeholder="Enter Team Name"
          />
          <ControlTextArea
            name="team_name"
            label="Team Description"
            placeholder="Enter Team Description"
          />
          <ControlInput
            name="no_of_members"
            label="Number of Members"
            placeholder="Enter Number of Members"
          />
        </div>
      </div>
      <div className="d-flex flex-row justify-content-center">
        <button
          className="btn btn-cancel-secondary fw-semibold mx-auto"
          onClick={handleModal}
        >
          Cancel
        </button>
        <button
          type="submit"
          className="btn btn-create-primary mx-auto fw-semibold"
        >
          Create
        </button>
      </div>
    </Dialog>
  );
}

HiringPost.propTypes = {
  visible: PropTypes.bool.isRequired,
  handleModal: PropTypes.func.isRequired,
};

HiringPost.defaultProps = {};

export default HiringPost;
