import React, { useState, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';

import { useTeams, useTeam, useClassMemberTeam } from '../../../hooks';

import GLOBALS from '../../../app_globals';

import Table from '../../../components/table';
import AddLeaders from '../../../components/modals/add_leaders';
import CreateTeam from '../../../components/modals/create_team';
import Search from '../../../components/search';
import ApplyTeam from '../../../components/modals/apply_team';

import './index.scss';

function Teams() {
  const { user, classId, classMember, classRoom } = useOutletContext();

  const { teams, nonLeaders, setLeader, acceptLeader, removeLeader } = useTeams(classId);

  const [showNotif, setShowNotif] = useState(false);
  const [isAddLeadersModalOpen, setAddLeadersModalOpen] = useState(false);
  const [isCreateTeamModalOpen, setCreateTeamModalOpen] = useState(false);
  const [teamsTableData, setTeamsTableData] = useState([]);
  const [selectedValue, setSelectedValue] = useState('');
  const [selectedTeam, setSelectedTeam] = useState(false);

  const teamLeaderHeaders = ['id', 'name', 'team', 'status'];
  const teamsHeaders = ['id', 'team', 'leader', 'members', 'actions'];
  const membersHeaders = ['id', 'name', 'role', 'actions'];

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
      {classMember?.role === GLOBALS.CLASSMEMBER_ROLE.TEACHER && (
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

  useEffect(() => {
    if (teams) {
      const teamsData = teams.map((t) => {
        const { id, name, team_members } = t;

        let tb_data = {};

        const leader = team_members.find(
          (team_member) => team_member.role === GLOBALS.TEAMMEMBER_ROLE.LEADER
        );
        const members = team_members.length;

        tb_data = {
          id,
          team: name,
          leader: `${leader?.first_name} ${leader?.last_name}`,
          members,
          actions: actionButtons(),
        };

        return tb_data;
      });

      setTeamsTableData(teamsData);
    }
  }, [teams]);

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

  const renderTable = (headerData, tableData, emptyMessage) => (
    <div className="d-flex flex-column pt-3 pb-3 px-5 table-body">
      {tableData.length === 0 ? (
        <div className="d-flex flex-column justify-content-center align-items-center">
          <Table headers={headerData} data={tableData} className="mt-3" />
          <div className="brown-text fw-bold fs-5 py-2 mx-5">{emptyMessage}</div>
        </div>
      ) : (
        <Table headers={headerData} data={tableData} className="mt-3" />
      )}
    </div>
  );

  const renderTeamData = (team) => (
    <div>
      <div className="fw-bold fs-3 px-5 py-3">{team.name}</div>
      <div className="px-5 py-3 lh-lg text-justify">
        {team.description || 'No description yet.'}
      </div>
      <div className="container">
        <div className="fw-bold fs-4 px-5 py-3">Members</div>
        {renderTable(membersHeaders, [], "There's no members yet.")}
      </div>
    </div>
  );

  const [activeTab, setActiveTab] = useState('teamLeaders');

  const renderTeacherTeamManagement = () => (
    <div className="d-flex flex-column pt-3 pb-3 px-5">
      <ul className="nav nav-underline">
        <li className="nav-item">
          <button
            className={`nav-link ${activeTab === 'teamLeaders' ? 'active' : ''}`}
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
          {renderTable(teamLeaderHeaders, [], 'No Leaders Identified Yet.')}
        </>
      )}
      {activeTab === 'teams' && (
        <>{renderTable(teamsHeaders, teamsTableData, 'No Teams Formed Yet.')}</>
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
      {renderTable(teamsHeaders, teamsTableData, 'No Teams Formed Yet.')}
      {selectedTeam && (
        <ApplyTeam visible={selectedTeam} handleModal={() => setSelectedTeam(false)} />
      )}
    </div>
  );

  let subheaderContent;
  let bodyContent;

  /// TEACHER section
  if (classMember.role === GLOBALS.CLASSMEMBER_ROLE.TEACHER) {
    subheaderContent = (
      <div className="d-flex pt-2 pb-2">
        <div className="px-5">
          <div className="d-flex align-items-center fw-bold fs-5 brown-text">
            {classRoom?.name} {classRoom?.sections}
          </div>
          <div className="d-flex py-2">
            <div className="d-flex align-items-center fw-semibold fs-6">{classRoom?.schedule}</div>
            <div className="d-flex align-items-center ps-4 pe-2 fw-semibold fs-6">
              {classRoom?.class_code}
            </div>
            <button type="button" className="btn btn-secondary btn-sm" onClick={handleCopyCode}>
              Copy
            </button>
          </div>
        </div>
        <div className="d-flex align-items-center me-5 ms-auto">
          <Search />
        </div>
      </div>
    );
    bodyContent = renderTeacherTeamManagement();
  }

  /// STUDENT section
  if (classMember.role === GLOBALS.CLASSMEMBER_ROLE.STUDENT) {
    const {
      teamMember,
      team,
      isRetrieving: isRoleRetrieving,
    } = useClassMemberTeam(classId, classMember?.id);

    useEffect(() => {
      if (!isRoleRetrieving) {
        if (teamMember?.status === GLOBALS.MEMBER_STATUS.PENDING) {
          setShowNotif(true);
        } else {
          setShowNotif(false);
        }
      }
    }, [teamMember]);

    if (team) {
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
              <button type="button" className="btn btn-secondary btn-sm" onClick={handleCopyCode}>
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

      bodyContent = renderTeamData(team);
    } else {
      subheaderContent = (
        <div className="subheader-body d-flex pt-2 pb-2">
          <div className="mx-5">
            <div className="fw-bold fs-5 brown-text">
              {classRoom?.name} {classRoom?.sections}
            </div>
            <div className="d-flex py-2">
              <div className="fw-semibold fs-6">{classRoom?.schedule}</div>
              <div className="ms-4 me-2 fw-semibold fs-6">{classRoom?.class_code}</div>
              <button type="button" className="btn btn-secondary btn-sm" onClick={handleCopyCode}>
                Copy
              </button>
            </div>
          </div>
          <div className="d-flex align-items-center me-5 ms-auto">
            <Search />
          </div>
        </div>
      );
      if (
        teamMember?.role === GLOBALS.TEAMMEMBER_ROLE.LEADER &&
        teamMember?.status === GLOBALS.MEMBER_STATUS.ACCEPTED
      ) {
        bodyContent = renderTeamLeaderNoTeam();
      } else {
        bodyContent = renderStudentNoTeam();
      }
    }
  }

  const renderContent = () => (
    <div>
      <div className="d-flex flex-column">
        {subheaderContent}
        <AddLeaders
          modalTitle="Add Leaders"
          visible={isAddLeadersModalOpen}
          handleModal={closeAddLeadersModal}
        />
      </div>
      {bodyContent}
    </div>
  );

  const handleAcceptLeader = () => {
    acceptLeader(classMember?.id);
    window.location.reload();
  };

  const handleDeclineLeader = () => {
    removeLeader(user?.user_id);
    window.location.reload();
  };

  const renderPendingLeader = () => (
    <div className="notif-pending-bar fw-semibold">
      You have been Identified/Selected as a Team Leader. &nbsp;
      <button
        type="button"
        className="btn notif-pending-btn align-middle"
        onClick={handleAcceptLeader}
      >
        Accept
      </button>
      <button
        type="button"
        className="btn notif-pending-btn align-middle"
        onClick={handleDeclineLeader}
      >
        Decline
      </button>
    </div>
  );

  return (
    <div>
      {showNotif && renderPendingLeader()}
      {renderContent()}
    </div>
  );
}

export default Teams;
