import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../../../contexts/AuthContext';
import { useClass, useClasses } from '../../../hooks';

import Navbar from '../../../components/navbar';
import Header from '../../../components/header';
import Table from '../../../components/table';
import AddLeaders from '../../../components/modals/add_leaders';

import './index.scss';
import Search from '../../../components/search';
import Remarks from '../../../components/modals/remarks';
import DischargeNotifModal from '../../../components/modals/discharge_notif';

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
  ];

  if (!user.is_staff) {
    buttons.splice(0, 1);
  }

  const teamHeaders = ['id', 'name', 'status'];
  const membersHeaders = ['id', 'name', 'role', 'actions'];
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredClasses, setFilteredClasses] = useState([]);

  const data = [];

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

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const renderAdminSubheader = () => (
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
    </div>
  );

  const renderSubheader = () => (
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

  const renderTeamsSubheader = () => (
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
        <div className="d-flex">
          <div className="d-flex fw-semibold justify-content-center align-items-center me-2">
            Hiring:
          </div>
          <select className="form-select form-select-sm">
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

  const renderTable = (headerData, tableData, emptyMessage) => (
    <div className="d-flex flex-column pt-3 pb-3 px-5 table-body">
      {data.length === 0 ? (
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
        {renderTable(membersHeaders, data, "There's no members yet.")}
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
        <div>
          <div className="d-flex justify-content-end ms-auto p-2">
            <button
              type="button"
              className="btn btn-wild-primary btn-sm fw-semibold"
              onClick={openAddLeadersModal}
            >
              Add Leaders
            </button>
          </div>
          {renderTable(teamHeaders, data, 'No Leaders Identified Yet.')}
        </div>
      )}
      {activeTab === 'teams' &&
        renderTable(membersHeaders, data, 'No Teams Formed Yet.')}
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
          {renderAdminSubheader()}
          <AddLeaders
            modalTitle="Add Leaders"
            visible={isAddLeadersModalOpen}
            handleModal={closeAddLeadersModal}
          />
        </div>
        {renderTeacherTeamManagement()}
        {/* {renderTable()} */}
        {/* {renderTeamData()} */}
      </div>
    </div>
  );
}

export default Teams;
