import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Dialog } from 'primereact/dialog';
import Table from '../../table';
import './index.scss';
import Remarks from '../remarks';

function ApplyTeam({ visible, handleModal }) {
  const tableheaders = ['members'];
  const tableData = [
    {
      members: 'Member 1',
    },
    {
      members: 'Member 2',
    },
    {
      members: 'Member 3',
    },
    {
      members: 'Member 4',
    },
    {
      members: 'Member 5',
    },
  ];

  const [applyToTeam, setApplyToTeam] = useState(false);

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
          <div className="fw-bold fs-4">[Team Name]</div>
          <div className="py-3 lh-lg text-justify">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque lacinia nisl vel
            nisl feugiat vestibulum. Praesent finibus lacus scelerisque nibh dapibus pellentesque.
            Morbi eget urna id metus finibus mollis vitae non massa. Ut at condimentum odio. Cras
            viverra, mauris ut mattis convallis, urna est lacinia velit, vitae vehicula dui erat id
            nisi. Quisque ultricies vestibulum nulla, vitae semper lacus rhoncus et. Cras nec tellus
            laoreet, fringilla felis non, facilisis magna. Mauris lacinia, leo ut gravida imperdiet,
            magna ligula suscipit nulla, at volutpat nisi mi quis arcu.
          </div>
          <div className="d-flex flex-column justify-content-center align-items-center">
            <Table headers={tableheaders} data={tableData} />
          </div>
        </div>
      </div>
      <div className="d-flex flex-row justify-content-end">
        <button
          type="submit"
          className="btn btn-yellow-primary btn-create-team-modal mx-auto fw-semibold"
          onClick={() => setApplyToTeam(true)}
        >
          Apply
        </button>
      </div>
    </Dialog>
  );

  return (
    <>
      {renderViewTeamDataModal()}
      {applyToTeam && (
        <Remarks
          modalTitle="Apply to Team"
          visible={applyToTeam}
          handleModal={() => setApplyToTeam(false)}
        />
      )}
    </>
  );
}

ApplyTeam.propTypes = {
  visible: PropTypes.bool.isRequired,
  handleModal: PropTypes.func.isRequired,
};

export default ApplyTeam;
