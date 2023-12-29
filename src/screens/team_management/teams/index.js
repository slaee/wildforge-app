import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../../../contexts/AuthContext';
import { useClassMembers, useClassRoom, useClassRooms } from '../../../hooks';

import Navbar from '../../../components/navbar';
import Header from '../../../components/header';
import Table from '../../../components/table';
import AddLeaders from '../../../components/modals/add_leaders';
import CreateTeam from '../../../components/modals/create_team';
import Search from '../../../components/search';
import ApplyTeam from '../../../components/modals/apply_team';

import './index.scss';
import GLOBALS from '../../../app_globals';

function Teams() {
  const { user } = useAuth();
  const { id: classId } = useParams();

  const { classMembers } = useClassMembers(classId);

  const classMember = classMembers.find(
    (member) => member.user_id === user.user_id
  );

  const navigate = useNavigate();

  const hasTeam = false;

  // /user.role = 'tl';

  const { isLoading: isClassesLoading, classes } = useClassRooms();

  useEffect(() => {
    if (!isClassesLoading) {
      const foundClass = classes.find((c) => c.id === parseInt(classId, 10));

      if (!foundClass) {
        navigate('/classes');
      }
    }
  }, [isClassesLoading]);

  const { isLoading: isClassLoading, classRoom } = useClassRoom(classId);

  const [isAddLeadersModalOpen, setAddLeadersModalOpen] = useState(false);
  const [isCreateTeamModalOpen, setCreateTeamModalOpen] = useState(false);

  let buttons = [];

  if (classMember?.role === GLOBALS.CLASSMEMBER_ROLE.STUDENT) {
    buttons = [
      {
        id: 2,
        label: 'Teams',
        className: 'teams',
        path: `/classes/${classId}/teams`,
      },
      {
        id: 3,
        label: 'Members',
        className: 'members',
        path: `/classes/${classId}/members`,
      },
    ];
  } else {
    buttons = [
      {
        id: 1,
        label: 'Dashboard',
        className: 'classes',
        path: `/classes/${classId}`,
      },
      {
        id: 2,
        label: 'Teams',
        className: 'teams',
        path: `/classes/${classId}/teams`,
      },
      {
        id: 3,
        label: 'Members',
        className: 'members',
        path: `/classes/${classId}/members`,
      },
    ];
  }

  const teamLeaderHeaders = ['id', 'name', 'team', 'status'];
  const teamsHeaders = ['id', 'team', 'leader', 'members', 'actions'];
  const membersHeaders = ['id', 'name', 'role', 'actions'];
  const [selectedValue, setSelectedValue] = useState('');
  const [selectedTeam, setSelectedTeam] = useState(false);

  const actionButtons = () => (
    <>
      <button
        type="button"
        className="btn btn-sm fw-bold text-success"
        onClick={() => {
          console.log('View Team');
          setSelectedTeam(true);
        }}
      >
        VIEW
      </button>
      {user.is_staff && (
        <>
          <button
            type="button"
            className="btn btn-sm fw-bold text-primary"
            onClick={() => console.log('Edit Team')}
          >
            EDIT
          </button>
          <button
            type="button"
            className="btn btn-sm fw-bold text-danger"
            onClick={() => console.log('Delete Team')}
          >
            DELETE
          </button>
        </>
      )}
    </>
  );

  const dataTL = [
    {
      id: 1,
      name: 'John Doe',
      team: 'Team A',
      status: 'Active',
    },
    {
      id: 2,
      name: 'Jane Doe',
      team: 'Team B',
      status: 'Pending',
    },
    {
      id: 3,
      name: 'Bob Smith',
      team: 'Team C',
      status: 'Inactive',
    },
  ];

  const dataT = [
    {
      id: 1,
      team: 'Team A',
      leader: 'John Doe',
      members: '3',
      actions: actionButtons(),
    },
  ];

  const dataM = [];

  const openAddLeadersModal = () => {
    setAddLeadersModalOpen(true);
  };

  const closeAddLeadersModal = () => {
    setAddLeadersModalOpen(false);
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(classRoom?.class_code);
    console.log('copied');
  };

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };

  const getColorClass = () => {
    if (selectedValue === '1') {
      return 'text-success';
    }
    if (selectedValue === '2') {
      return 'text-danger';
    }
    return 'text-default';
  };

  const renderSubheader = () => {
    let subheaderContent = null;

    if (user.is_staff) {
      subheaderContent = (
        <div className="d-flex pt-2 pb-2">
          <div className="px-5">
            <div className="d-flex align-items-center fw-bold fs-5 brown-text">
              {classRoom?.name} {classRoom?.sections}
            </div>
            <div className="d-flex py-2">
              <div className="d-flex align-items-center fw-semibold fs-6">
                {classRoom?.schedule}
              </div>
              <div className="d-flex align-items-center ps-4 pe-2 fw-semibold fs-6">
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
          <div className="d-flex align-items-center me-5 ms-auto">
            <Search />
          </div>
        </div>
      );
    } else if (user.role === 'tl' && hasTeam) {
      subheaderContent = (
        <div className="subheader-body d-flex pt-2 pb-2">
          <div className="mx-5">
            <div className="fw-bold fs-5 brown-text">
              {classRoom?.name} {classRoom?.sections}
            </div>
            <div className="d-flex py-2">
              <div className="fw-semibold fs-6">{classRoom?.schedule}</div>
              <div className="d-flex align-items-center ps-4 pe-2 fw-semibold fs-6">
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
          <div className="d-flex align-items-center me-5 ms-auto">
            <div className="d-flex">
              <div className="d-flex fw-semibold justify-content-center align-items-center me-2">
                Hiring:
              </div>
              <select
                className={`form-select form-select-sm ${getColorClass()} fw-bold`}
                onChange={handleChange}
                value={selectedValue}
              >
                <option className="text-success fw-semibold" value="1">
                  OPEN
                </option>
                <option className="text-danger fw-semibold" value="2">
                  CLOSE
                </option>
              </select>
            </div>
            <div className="fw-bold ms-4 red-text">Leave Team</div>
          </div>
        </div>
      );
    } else if (user.role !== 'tl' && hasTeam) {
      subheaderContent = (
        <div className="subheader-body d-flex pt-2 pb-2">
          <div className="mx-5">
            <div className="fw-bold fs-5 brown-text">
              {classRoom?.name} {classRoom?.sections}
            </div>
            <div className="d-flex py-2">
              <div className="fw-semibold fs-6">{classRoom?.schedule}</div>
              <div className="d-flex align-items-center ps-4 pe-2 fw-semibold fs-6">
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
          <div className="d-flex align-items-center me-5 ms-auto">
            <div className="d-flex">
              <div className="d-flex fw-semibold justify-content-center align-items-center me-2">
                Hiring:
              </div>
              <select
                className={`form-select form-select-sm ${getColorClass()} fw-semibold`}
                onChange={handleChange}
                value={selectedValue}
                disabled
              >
                <option className="text-success fw-semibold" value="1">
                  OPEN
                </option>
                <option className="text-danger fw-semibold" value="2">
                  CLOSE
                </option>
              </select>
            </div>
          </div>
        </div>
      );
    } else {
      subheaderContent = (
        <div className="subheader-body d-flex pt-2 pb-2">
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
          <div className="d-flex align-items-center me-5 ms-auto">
            <Search />
          </div>
        </div>
      );
    }

    return subheaderContent;
  };

  const renderTable = (headerData, tableData, emptyMessage) => (
    <div className="d-flex flex-column pt-3 pb-3 px-5 table-body">
      {tableData.length === 0 ? (
        <div className="d-flex flex-column justify-content-center align-items-center">
          <Table headers={headerData} data={tableData} className="mt-3" />
          <div className="brown-text fw-bold fs-5 py-2 mx-5">
            {emptyMessage}
          </div>
        </div>
      ) : (
        <Table headers={headerData} data={tableData} className="mt-3" />
      )}
    </div>
  );

  const renderTeamData = () => (
    <div>
      <div className="fw-bold fs-3 px-5 py-3">[Team Name]</div>
      <div className="px-5 py-3 lh-lg text-justify">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque
        lacinia nisl vel nisl feugiat vestibulum. Praesent finibus lacus
        scelerisque nibh dapibus pellentesque. Morbi eget urna id metus finibus
        mollis vitae non massa. Ut at condimentum odio. Cras viverra, mauris ut
        mattis convallis, urna est lacinia velit, vitae vehicula dui erat id
        nisi. Quisque ultricies vestibulum nulla, vitae semper lacus rhoncus et.
        Cras nec tellus laoreet, fringilla felis non, facilisis magna. Mauris
        lacinia, leo ut gravida imperdiet, magna ligula suscipit nulla, at
        volutpat nisi mi quis arcu.
      </div>
      <div className="container">
        <div className="fw-bold fs-4 px-5 py-3">Members</div>
        {renderTable(membersHeaders, dataM, "There's no members yet.")}
      </div>
    </div>
  );

  const [activeTab, setActiveTab] = useState('teamLeaders');

  const renderTeacherTeamManagement = () => (
    <div className="d-flex flex-column pt-3 pb-3 px-5">
      <ul className="nav nav-underline">
        <li className="nav-item">
          <button
            className={`nav-link ${
              activeTab === 'teamLeaders' ? 'active' : ''
            }`}
            onClick={() => setActiveTab('teamLeaders')}
          >
            Team Leaders
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === 'teams' ? 'active' : ''}`}
            onClick={() => setActiveTab('teams')}
          >
            Teams
          </button>
        </li>
      </ul>
      {activeTab === 'teamLeaders' && (
        <>
          <div className="d-flex justify-content-end ms-auto p-2">
            <button
              type="button"
              className="btn btn-yellow-primary fw-semibold"
              onClick={openAddLeadersModal}
            >
              Add Leaders
            </button>
          </div>
          {renderTable(teamLeaderHeaders, dataTL, 'No Leaders Identified Yet.')}
        </>
      )}
      {activeTab === 'teams' && (
        <>{renderTable(teamsHeaders, dataT, 'No Teams Formed Yet.')}</>
      )}
      {selectedTeam && (
        <div className="modal-apply-team p-4">
          <button
            aria-label="Close Modal"
            className="btn d-flex btn-close ms-auto"
            onClick={() => setSelectedTeam(false)}
          />
          {renderTeamData()}
        </div>
      )}
    </div>
  );

  const renderTeamLeaderNoTeam = () => (
    <div className="d-flex flex-column pt-3 pb-3 px-5">
      <div className="d-flex justify-content-center">
        <button
          type="button"
          className="btn btn-yellow-primary fw-semibold btn-lg"
          onClick={() => setCreateTeamModalOpen(true)}
        >
          Create Team
        </button>
      </div>
      <CreateTeam
        visible={isCreateTeamModalOpen}
        handleModal={() => setCreateTeamModalOpen(false)}
      />
    </div>
  );

  const renderStudentNoTeam = () => (
    <div className="d-flex flex-column pt-3 pb-3 px-5">
      {renderTable(teamsHeaders, dataT, 'No Teams Formed Yet.')}
      {selectedTeam && (
        <ApplyTeam
          visible={selectedTeam}
          handleModal={() => setSelectedTeam(false)}
        />
      )}
    </div>
  );

  const isTeacher = user.is_staff;

  const renderContent = () => {
    if (isTeacher) {
      return renderTeacherTeamManagement();
    }
    if (user.role === 'tl') {
      return hasTeam ? renderTeamData() : renderTeamLeaderNoTeam();
    }
    return hasTeam ? renderTeamData() : renderStudentNoTeam();
  };

  return (
    <div className="d-flex">
      <Navbar
        name={`${user?.first_name} ${user?.last_name}`}
        buttons={buttons}
        hasBackButton
      />
      <div className="container-fluid d-flex flex-column">
        <Header />
        <div className="d-flex flex-column">
          {renderSubheader()}
          <AddLeaders
            modalTitle="Add Leaders"
            visible={isAddLeadersModalOpen}
            handleModal={closeAddLeadersModal}
          />
        </div>
        {renderContent()}
      </div>
    </div>
  );
}

export default Teams;
