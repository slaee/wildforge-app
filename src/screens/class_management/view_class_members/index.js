import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import jwtDecode from 'jwt-decode';
import { useAuth } from '../../../contexts/AuthContext';
import { useClassRoom, useClassMembers, useClassMember } from '../../../hooks';

import Search from '../../../components/search';
import Navbar from '../../../components/navbar';
import Header from '../../../components/header';
import Table from '../../../components/table';
import Loading from '../../../components/loading';

import GLOBALS from '../../../app_globals';

import 'primeicons/primeicons.css';
import './index.scss';

function ViewClassMembers() {
  const navigate = useNavigate();
  const { id: classId } = useParams();

  const { accessToken } = useAuth();
  const user = jwtDecode(accessToken);

  const { classMember, isRetrieving } = useClassMember(classId, user?.user_id);
  const { deleteMember, acceptMember, classMembers } = useClassMembers(classId);
  const { classRoom } = useClassRoom(classId);

  const [searchQuery, setSearchQuery] = useState('');
  const [filteredData, setFilteredData] = useState([]);

  const [isLoading, setIsLoading] = useState(true);
  const [buttons, setButtons] = useState([]);

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

  const headers = ['id', 'name', 'team', 'role', 'status'];
  if (user?.role === GLOBALS.USER_ROLE.MODERATOR) headers.push('actions');

  const data = classMembers
    .filter((member) => member?.role !== GLOBALS.CLASSMEMBER_ROLE.TEACHER)
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
              }}
            >
              ACCEPT
            </button>
            <button
              type="btn"
              className="btn btn-sm fw-bold text-danger"
              onClick={() => {
                deleteMember(id);
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
  }, [searchQuery, data?.length, classMembers]);

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

  const renderContent = () => (
    <div>
      <div className="d-flex">
        {renderSubheader()}
        <div className="d-flex align-items-center ms-auto mx-5">
          <Search value={searchQuery} onChange={handleSearchChange} />
        </div>
      </div>
      {renderTable()}
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

        {isLoading ? <Loading /> : renderContent()}
      </div>
    </div>
  );
}

export default ViewClassMembers;
