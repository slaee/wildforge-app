import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../../../contexts/AuthContext';
import { useClass, useClasses } from '../../../hooks';

import Navbar from '../../../components/navbar';
import Header from '../../../components/header';
import Table from '../../../components/table';
import AddLeaders from '../../../components/modals/add_leaders';

import './index.scss';

function Teams() {
  const { user } = useAuth();
  const { id: classId } = useParams();

  const navigate = useNavigate();

  const { isLoading: isClassesLoading, classes } = useClasses();

  useEffect(() => {
    if (!isClassesLoading) {
      const foundClass = classes.find((c) => c.id === parseInt(classId, 10));

      if (!foundClass) {
        navigate('/classes');
      }
    }
  }, [isClassesLoading]);

  const { isLoading: isClassLoading, classRoom } = useClass(classId);

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
      label: 'Teams',
      className: 'teams',
      path: `/classes/${classId}/teams`,
    },
    {
      id: 4,
      label: 'Hirings',
      className: 'team-leaders',
      path: `/classes/${classId}/hirings`,
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

  const handleCopyCode = () => {
    navigator.clipboard.writeText(classRoom?.class_code);
    console.log('copied');
  };

  const renderSubheader = () => (
    <div className="d-flex pt-2 pb-2">
      <div className="mx-5">
        <div className="fw-bold fs-5 brown-text">
          {classRoom?.name} {classRoom?.sections}
        </div>
        <div className="d-flex py-2">
          <div className="fw-semibold fs-6">{classRoom?.schedule}</div>
          <div className="ms-4 me-2 fw-semibold fs-6">
            {classRoom?.class_code}
          </div>
          <button
            type="button"
            className="btn btn-secondary btn-sm"
            onClick={handleCopyCode}
          >
            Copy
          </button>
        </div>
      </div>
    </div>
  );

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
        <div className="d-flex pt-2 pb-2">
          {renderSubheader()}
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
      </div>
    </div>
  );
}

export default Teams;
