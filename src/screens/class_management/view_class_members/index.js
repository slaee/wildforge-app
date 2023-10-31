import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { useAuth } from '../../../contexts/AuthContext';
import Search from '../../../components/search';
import Navbar from '../../../components/navbar';
import Header from '../../../components/header';
import Table from '../../../components/table';
import { useClassMembers } from '../../../hooks';

import 'primeicons/primeicons.css';
import './index.scss';

function ViewClassMembers() {
  const { id: classId } = useParams();
  const { user } = useAuth();
  const { deleteMember, acceptMember, classMembers } = useClassMembers(classId);

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
      path: ``,
    },
  ];

  let headers;
  if (user.is_staff) {
    headers = ['id', 'name', 'team', 'role', 'status', 'actions'];
  } else {
    headers = ['id', 'name', 'team', 'role', 'status'];
  }
  // filter out teacher from classMembers
  const data = classMembers
    .filter((member) => member.role !== 't')
    .map((member) => {
      const { id, first_name, last_name, team, status, role } = member;

      let tb_data = {};

      const actions =
        status === 'pending' ? (
          <>
            <button
              type="button"
              className="btn btn-sm text-success"
              onClick={() => {
                acceptMember(id);
                window.location.reload();
              }}
            >
              ACCEPT
            </button>
            <button
              type="button"
              className="btn btn-sm text-danger"
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
            type="button"
            className="btn btn-sm text-danger"
            onClick={() => {
              deleteMember(id);
              window.location.reload();
            }}
          >
            KICK
          </button>
        );

      if (user.is_staff) {
        if (role === 's') {
          tb_data = {
            id,
            name: `${first_name} ${last_name}`,
            team: team || 'N/A',
            status,
            role: 'Student',
            actions,
          };
        }
        if (role === 'tl') {
          tb_data = {
            id,
            name: `${first_name} ${last_name}`,
            team: team || 'N/A',
            status,
            role: 'Team Leader',
            actions,
          };
        }
      } else {
        if (role === 's') {
          tb_data = {
            id,
            name: `${first_name} ${last_name}`,
            team: team || 'N/A',
            status,
            role: 'Student',
          };
        }
        if (role === 'tl') {
          tb_data = {
            id,
            name: `${first_name} ${last_name}`,
            team: team || 'N/A',
            status,
            role: 'Team Leader',
          };
        }
      }

      return tb_data;
    });

  const [searchQuery, setSearchQuery] = useState('');
  const [filteredData, setFilteredData] = useState([]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  useEffect(() => {
    const lowerCaseQuery = searchQuery.toLowerCase();
    if (data.length === 0) {
      setFilteredData([]);
    } else {
      const filtered = data.filter(
        (item) =>
          item.name.toLowerCase().includes(lowerCaseQuery) ||
          item.team.toLowerCase().includes(lowerCaseQuery) ||
          item.role.toLowerCase().includes(lowerCaseQuery) ||
          item.status.toLowerCase().includes(lowerCaseQuery)
      );
      setFilteredData(filtered);
    }
  }, [searchQuery, data, filteredData]);

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
        name={`${user?.first_name} ${user?.last_name} Test`}
        buttons={buttons}
        hasBackButton
      />
      <div className="container-fluid d-flex flex-column">
        <Header />
        <div className="d-flex pt-3 pb-3">
          <div className="brown-text fw-bold fs-5 py-2 mx-5">Classes</div>
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
