import React, { useState } from 'react';
import { Dialog } from 'primereact/dialog';
import Navbar from '../../../components/navbar';
import Header from '../../../components/header';
import { useAuth } from '../../../contexts/AuthContext';
import Search from '../../../components/search';
import Table from '../../../components/table';

import './index.scss';
import ControlInput from '../../../components/controlinput';

function PeerEval() {
  const { user } = useAuth();
  const [peerEvalModal, setPeerEvalModal] = useState(false);
  const [assignClassModal, setAssignClassModal] = useState(false);

  const buttons = [
    { id: 1, label: 'Classes', className: 'classes', path: '/classes' },
    {
      id: 2,
      label: 'Peer Evaluation',
      className: 'peer-eval',
      path: '/peer-eval',
    },
  ];

  const peerEvalHeaders = ['id', 'name', 'actions'];
  const classesHeaders = ['id', 'class', 'actions'];

  const openPeerEvalModal = () => {
    setPeerEvalModal(true);
  };

  const closePeerEvalModal = () => {
    setPeerEvalModal(false);
  };

  const openAssignTeamModal = () => {
    setAssignClassModal(true);
  };

  const closeAssignTeamModal = () => {
    setAssignClassModal(false);
  };

  const renderAssignTeamModal = () => (
    <Dialog
      className="assign-teams-modal"
      visible={assignClassModal}
      onHide={closeAssignTeamModal}
      showHeader={false}
    >
      <div className="d-flex flex-column p-5">
        <div className="d-grid gap-3">
          <div className="text-left fs-5 fw-semibold">List of Classes</div>
          <div className="ms-auto">
            <Search />
          </div>
          <Table headers={classesHeaders} data={[]} className="mt-3" />
          <div className="position-fixed bottom-0 start-50 translate-middle-x pb-5">
            <button
              type="btn"
              className="btn btn-outline-secondary btn-lg fw-semibold me-4"
              onClick={closeAssignTeamModal}
            >
              Cancel
            </button>
            <button
              type="btn"
              className="btn btn-yellow-primary btn-lg fw-semibold ms-4 px-4"
              onClick={() => console.log('submit')}
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </Dialog>
  );

  const renderPeerEvalModal = () => (
    <Dialog
      className="peer-eval-modal"
      visible={peerEvalModal}
      onHide={closePeerEvalModal}
      showHeader={false}
    >
      <div className="d-flex flex-column p-5">
        <ControlInput
          name="team_name"
          label="Name"
          placeholder="Enter Peer Evaluation Name"
        />
        <ControlInput
          name="eval_link"
          label="Forms Link"
          placeholder="Enter Google Forms Link"
        />
        <button
          type="btn"
          className="btn btn-outline-warning fw-semibold mt-4"
          onClick={openAssignTeamModal}
        >
          Assign Classes
        </button>
        <div className="position-fixed bottom-0 start-50 translate-middle-x pb-5">
          <button
            type="btn"
            className="btn btn-outline-secondary btn-lg fw-semibold me-3"
            onClick={closePeerEvalModal}
          >
            Cancel
          </button>
          <button
            type="btn"
            className="btn btn-yellow-primary btn-lg fw-semibold ms-3"
            onClick={() => console.log('submit')}
          >
            Submit
          </button>
        </div>
      </div>
    </Dialog>
  );

  return (
    <div className="d-flex">
      <Navbar
        name={`${user?.first_name} ${user?.last_name}`}
        buttons={buttons}
      />
      <div className="container-fluid d-flex flex-column">
        <Header />
        <div className="d-flex pt-2 pb-2">
          <div className="py-2 mx-5">
            <Search />
          </div>
          <div className="d-flex align-items-center ms-auto mx-5">
            <button
              type="btn"
              className="btn btn-yellow-primary fw-semibold"
              onClick={openPeerEvalModal}
            >
              Add Peer Evaluation
            </button>
          </div>
        </div>
        <div className="d-flex flex-column">
          <div className="brown-text fw-bold fs-5 py-2 px-5">
            PEER EVALUATION
          </div>
          <Table headers={peerEvalHeaders} data={[]} className="mt-3" />
          {peerEvalModal && renderPeerEvalModal()}
          {assignClassModal && renderAssignTeamModal()}
        </div>
      </div>
    </div>
  );
}

export default PeerEval;
