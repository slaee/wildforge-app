import React from 'react';
import PropTypes from 'prop-types';

import { Dialog } from 'primereact/dialog';
import ControlInput from '../../controlinput';
import ControlTextArea from '../../controltextarea';

import './index.scss';

function CreateTeam({ visible, handleModal }) {
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
          <div className="text-center fs-4 fw-bold">Team Creation</div>
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
          className="btn btn-yellow-primary btn-create-team-modal mx-auto fw-semibold"
        >
          Create
        </button>
      </div>
    </Dialog>
  );
}

CreateTeam.propTypes = {
  visible: PropTypes.bool.isRequired,
  handleModal: PropTypes.func.isRequired,
};

CreateTeam.defaultProps = {};

export default CreateTeam;
