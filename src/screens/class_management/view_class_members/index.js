import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { useAuth } from '../../../contexts/AuthContext';
import Search from '../../../components/search';
import Navbar from '../../../components/navbar';
import Header from '../../../components/header';
import Table from '../../../components/table';
import { useClassRoom, useClassMembers } from '../../../hooks';

import 'primeicons/primeicons.css';
import './index.scss';
import GLOBALS from '../../../app_globals';

function ViewClassMembers() {
  const { id: classId } = useParams();
  const { user } = useAuth();
  const { deleteMember, acceptMember, classMembers, isRetrieving } =
    useClassMembers(classId);
  const { isLoading: isClassLoading, classRoom } = useClassRoom(classId);

  let buttons = [];

  const classMember = classMembers.find(
    (member) => member.user_id === user.user_id
  );

  if (classMember?.role === GLOBALS.CLASSMEMBER_ROLE.STUDENT) {
    buttons = GLOBALS.SIDENAV_CLASSMEMBER(classId);
  } else {
    buttons = GLOBALS.SIDENAV_TEACHER(classId);
  }

  const headers = ['id', 'name', 'team', 'role', 'status'];
  if (user.role === GLOBALS.USER_ROLE.MODERATOR) headers.push('actions');

  const data = classMembers
    .filter((member) => member.role !== GLOBALS.CLASSMEMBER_ROLE.TEACHER)
    .map((member) => {
      const { id, first_name, last_name, team, status } = member;

      let tb_data = {};

      const actions =
        status === GLOBALS.MEMBER_STATUS.PENDING ? (
          <>
            <button
              type="btn"
              className="btn btn-sm fw-bold text-success"
              onClick={() => {
                acceptMember(id);
                window.location.reload();
              }}
            >
              ACCEPT
            </button>
            <button
              type="btn"
              className="btn btn-sm fw-bold text-danger"
              onClick={() => {
                deleteMember(id);
                window.location.reload();
              }}
            >
              REJECT
            </button>
          </>
        ) : (
          <button
            type="btn"
            className="btn btn-sm fw-bold text-danger"
            onClick={() => {
              deleteMember(id);
              window.location.reload();
            }}
          >
            KICK
          </button>
        );

      tb_data = {
        id,
        name: `${first_name} ${last_name}`,
        team: team || 'N/A',
        status:
          status === GLOBALS.MEMBER_STATUS.PENDING ? 'pending' : 'accepted',
        role: 'Student',
      };

      if (user.role === GLOBALS.USER_ROLE.MODERATOR) tb_data.actions = actions;

      return tb_data;
    });

  const [searchQuery, setSearchQuery] = useState('');
  const [filteredData, setFilteredData] = useState(data);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const searchMember = (query) => {
    const lowerCaseQuery = query.toLowerCase();
    if (lowerCaseQuery.length === 0) {
      setFilteredData(data);
    } else {
      const filtered = data?.filter(
        (item) =>
          item.name.toLowerCase().includes(lowerCaseQuery) ||
          item.team.toLowerCase().includes(lowerCaseQuery) ||
          item.role.toLowerCase().includes(lowerCaseQuery) ||
          item.status.toLowerCase().includes(lowerCaseQuery)
      );
      setFilteredData(filtered);
    }
  };

  useEffect(() => {
    searchMember(searchQuery);
  }, [searchQuery, data?.length]);

  const handleCopyCode = () => {
    navigator.clipboard.writeText(classRoom?.class_code);
    console.log('copied');
  };

  const renderSubheader = () => (
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
          {user.is_staff && (
            <button
              type="button"
              className="btn btn-secondary btn-sm"
              onClick={handleCopyCode}
            >
              Copy
            </button>
          )}
        </div>
      </div>
    </div>
  );

  const renderTable = () => (
    <div className="d-flex flex-column justify-content-center pt-3 pb-3 px-5">
      {data && filteredData.length === 0 ? (
        <div className="d-flex justify-content-center align-items-center">
          <div className="brown-text fw-bold fs-5 py-2 mx-5">
            No members found
          </div>
        </div>
      ) : (
        <Table headers={headers} data={filteredData} className="mt-3" />
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
        <div className="d-flex">
          {renderSubheader()}
          <div className="d-flex align-items-center ms-auto mx-5">
            <Search value={searchQuery} onChange={handleSearchChange} />
          </div>
        </div>
        {renderTable()}
      </div>
    </div>
  );
}

export default ViewClassMembers;
