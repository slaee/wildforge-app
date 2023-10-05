import React, { useState } from 'react';
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
  const { classMembers } = useClassMembers(classId);

  const headers = ['name', 'team', 'role'];
  // filter out teacher from classMembers
  const data = classMembers
    .filter((member) => member.role !== 't')
    .map((member) => ({
      id: member.id,
      name: `${member.first_name} ${member.last_name}`,
      team: 'Under construction',
      role: member.role,
    }));

  const actions = [
    {
      id: 1,
      label: 'ACCEPT',
      handler: () => {
        /* Handle edit action */
      },
      style: {
        color: 'green',
        fontWeight: 'bold',
        textDecoration: 'none',
      },
    },
    {
      id: 2,
      label: 'DECLINE',
      handler: () => {
        /* Handle delete action */
      },
      style: {
        color: 'red',
        fontWeight: 'bold',
        textDecoration: 'none',
      },
    },
  ];

  const [search, setSearch] = useState('');

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const filteredData = data.filter((d) =>
    d.name.toLowerCase().includes(search.toLowerCase())
  );

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

  const renderTable = () => (
    <>
      <Table
        headers={headers}
        data={filteredData}
        actions={actions}
        className="mt-3"
      />
      {data && data.length === 0 && (
        <div className="d-flex justify-content-center align-items-center">
          <div className="brown-text fw-bold fs-5 py-2 mx-5">
            No members found
          </div>
        </div>
      )}
    </>
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
          <div className="brown-text fw-bold fs-5 py-2 mx-5">Classes</div>
          <div className="d-flex align-items-center ms-auto mx-5">
            <Search />
          </div>
        </div>
        <div className="d-flex flex-column justify-content-center pt-3 pb-3 px-5">
          {renderTable()}
        </div>
      </div>
    </div>
  );
}

export default ViewClassMembers;
