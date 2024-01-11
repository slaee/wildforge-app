import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import jwtDecode from 'jwt-decode';
import { useAuth } from '../../../contexts/AuthContext';
import {
  useClassMember,
  useClassRoom,
  useTeams,
  useTeam,
  useTeamMemberRole,
} from '../../../hooks';

import GLOBALS from '../../../app_globals';

import Navbar from '../../../components/navbar';
import Header from '../../../components/header';
import Table from '../../../components/table';
import AddLeaders from '../../../components/modals/add_leaders';
import CreateTeam from '../../../components/modals/create_team';
import Search from '../../../components/search';
import ApplyTeam from '../../../components/modals/apply_team';

import './index.scss';
import Loading from '../../../components/loading';

function Teams() {
  const navigate = useNavigate();

  const { accessToken } = useAuth();
  const user = jwtDecode(accessToken);

  const { id: classId } = useParams();
  const { classRoom } = useClassRoom(classId);
  const { classMember, isRetrieving } = useClassMember(classId, user?.user_id);
  const { team, isRetrieving: isTeamRetrieving } = useTeam(
    classId,
    classMember?.team_id
  );
  const { teams, nonLeaders, setLeader, acceptLeader, removeLeader } =
    useTeams(classId);
  const {
    teamMemberRole,
    teamMemberRoleStatus,
    isRetrieving: isRoleRetrieving,
  } = useTeamMemberRole(classId, user?.user_id);

  const [isAddLeadersModalOpen, setAddLeadersModalOpen] = useState(false);
  const [isCreateTeamModalOpen, setCreateTeamModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [buttons, setButtons] = useState([]);
  const [showNotif, setShowNotif] = useState(false);

  useEffect(() => {
    if (isRetrieving) {
      setTimeout(() => setIsLoading(false), 350);
    } else {
      if (classMember?.role === GLOBALS.CLASSMEMBER_ROLE.STUDENT) {
        setButtons(GLOBALS.SIDENAV_CLASSMEMBER(classId));
      }

      if (classMember?.role === GLOBALS.CLASSMEMBER_ROLE.TEACHER) {
        setButtons(GLOBALS.SIDENAV_TEACHER(classId));
      }

      if (!classMember) {
        navigate('/classes');
      }
    }
  }, [isRetrieving]);

  useEffect(() => {
    if (!isRoleRetrieving) {
      if (teamMemberRoleStatus === GLOBALS.MEMBER_STATUS.PENDING) {
        setShowNotif(true);
      } else {
        setShowNotif(false);
      }
    }
  }, [teamMemberRoleStatus]);

  const teamLeaderHeaders = ['id', 'name', 'team', 'status'];
  const [teamsTableData, setTeamsTableData] = useState([]);
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

  const renderSubheader = () => {
    let subheaderContent = null;

    if (user.role === GLOBALS.USER_ROLE.MODERATOR) {
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
    } else if (classMember?.role === GLOBALS.CLASSMEMBER_ROLE.STUDENT && team) {
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
    } else if (classMember?.role !== GLOBALS.CLASSMEMBER_ROLE.STUDENT && team) {
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
        <ApplyTeam
          visible={selectedTeam}
          handleModal={() => setSelectedTeam(false)}
        />
      )}
    </div>
  );

  const renderBody = () => {
    if (user.role === GLOBALS.USER_ROLE.MODERATOR) {
      return renderTeacherTeamManagement();
    }
    if (
      teamMemberRole === GLOBALS.TEAMMEMBER_ROLE.LEADER &&
      teamMemberRoleStatus === GLOBALS.MEMBER_STATUS.ACCEPTED
    ) {
      return team ? renderTeamData() : renderTeamLeaderNoTeam();
    }
    return team ? renderTeamData() : renderStudentNoTeam();
  };

  const renderContent = () => (
    <div>
      <div className="d-flex flex-column">
        {renderSubheader()}
        <AddLeaders
          modalTitle="Add Leaders"
          visible={isAddLeadersModalOpen}
          handleModal={closeAddLeadersModal}
        />
      </div>
      {renderBody()}
    </div>
  );

  const handleAcceptLeader = () => {
    acceptLeader(user?.user_id);
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
    <div className="d-flex">
      {showNotif ? renderPendingLeader() : null}
      {console.log(team.name)}
      <Navbar
        name={`${user?.first_name} ${user?.last_name}`}
        buttons={buttons}
        hasBackButton
      />
      <div className="container-fluid d-flex flex-column">
        <Header />
        {isLoading ? <Loading /> : renderContent()}
      </div>
    </div>
  );
}

export default Teams;
