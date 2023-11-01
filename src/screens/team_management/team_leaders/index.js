import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../../../contexts/AuthContext';

import Navbar from '../../../components/navbar';
import Header from '../../../components/header';
import Table from '../../../components/table';
import AddLeaders from '../../../components/add_leaders';
import TeamFormation from '../../../components/team_formation';

import './index.scss';

function TeamLeaders() {
  const { user } = useAuth();
  const { id: classId } = useParams();
  const [isAddLeadersModalOpen, setAddLeadersModalOpen] = useState(false);
  // prettier-ignore
  const [isStartTeamFormationModalOpen, setStartTeamFormationModalOpen] = useState(false);

  const buttons = [
    {
      id: 1,
      label: 'Dashboard',
      className: 'classes',
      path: `/classes/${classId}`,
    },
    {
      id: 2,
      label: 'Members',
      className: 'members',
      path: `/classes/${classId}/members`,
    },
    {
      id: 3,
      label: 'Team Leaders',
      className: 'team-leaders',
      path: `/classes/${classId}/teamleaders`,
    },
  ];

  const headers = ['id', 'name', 'status'];

  const data = [];

  const openAddLeadersModal = () => {
    setAddLeadersModalOpen(true);
  };

  const closeAddLeadersModal = () => {
    setAddLeadersModalOpen(false);
  };

  const openStartTeamFormationModal = () => {
    setStartTeamFormationModalOpen(true);
  };

  const closeStartTeamFormationModal = () => {
    setStartTeamFormationModalOpen(false);
  };

  const renderTable = () => (
    <div className="d-flex flex-column pt-3 pb-3 px-5 table-body">
      {data.length === 0 ? (
        <div className="d-flex flex-column justify-content-center align-items-center">
          <Table headers={headers} data={data} className="mt-3" />
          <div className="brown-text fw-bold fs-5 py-2 mx-5">
            No leaders identified
          </div>
        </div>
      ) : (
        <Table headers={headers} data={data} className="mt-3" />
      )}
    </div>
  );

  return (
    <div className="d-flex">
      <Navbar
        name={`${user?.first_name} ${user?.last_name}`}
        buttons={buttons}
        hasBackButton
      />
      <div className="container-fluid d-flex flex-column">
        <Header />
        <div className="d-flex pt-3 pb-3">
          <div className="brown-text fw-bold fs-5 py-2 mx-5">Team Leaders</div>
          <div className="d-flex align-items-center ms-auto mx-5">
            <button
              type="button"
              className="btn btn-wild-primary btn-sm fw-semibold"
              onClick={openAddLeadersModal}
            >
              Add Leaders
            </button>
          </div>
          <AddLeaders
            visible={isAddLeadersModalOpen}
            handleModal={closeAddLeadersModal}
          />
        </div>
        {renderTable()}
        <div className="position-relative">
          <div className="footer-container">
            <button
              type="btn"
              className="btn btn-wild-primary fw-semibold"
              onClick={openStartTeamFormationModal}
            >
              Start Team Formation
            </button>
            <TeamFormation
              visible={isStartTeamFormationModalOpen}
              handleModal={closeStartTeamFormationModal}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default TeamLeaders;
