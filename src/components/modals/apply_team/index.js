import React from 'react';

import PropTypes from 'prop-types';
import { Dialog } from 'primereact/dialog';
import Table from '../../table';
import './index.scss';

function ApplyTeam({ visible, handleModal, teamData, applyToTeam }) {
  const tableheaders = ['id', 'members'];

  const members = teamData.team_members.map((member) => {
    const { class_member_id, first_name, last_name } = member;
    return {
      id: class_member_id,
      members: `${first_name} ${last_name}`,
    };
  });

  const renderViewTeamDataModal = () => (
    <Dialog
      className="modal-apply-team p-4"
      visible={visible}
      onHide={handleModal}
      showHeader={false}
    >
      <div className="d-grid gap-3 p-3">
        <button aria-label="Close Modal" className="btn btn-close ms-auto" onClick={handleModal} />
        <div className="px-3">
          <div className="fw-bold fs-4">{teamData.name}</div>
          <div className="py-3 lh-lg text-justify">
            {teamData.description ? teamData.description : 'No description.'}
          </div>
          <div className="d-flex flex-column justify-content-center align-items-center">
            <Table headers={tableheaders} data={members} />
          </div>
        </div>
      </div>
      <div className="d-flex flex-row justify-content-end">
        <button
          type="submit"
          className="btn btn-yellow-primary btn-create-team-modal mx-auto fw-semibold"
          onClick={() => applyToTeam(teamData.team_id)}
        >
          Apply
        </button>
      </div>
    </Dialog>
  );

  return <>{renderViewTeamDataModal()}</>;
}

ApplyTeam.propTypes = {
  visible: PropTypes.bool.isRequired,
  handleModal: PropTypes.func.isRequired,
  teamData: PropTypes.objectOf(PropTypes.any).isRequired,
  applyToTeam: PropTypes.func.isRequired,
};

export default ApplyTeam;
