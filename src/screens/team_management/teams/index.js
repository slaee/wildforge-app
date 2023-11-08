import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useClass, useClasses } from '../../../hooks';
import { useAuth } from '../../../contexts/AuthContext';

import Navbar from '../../../components/navbar';
import Header from '../../../components/header';
import Search from '../../../components/search';
import Table from '../../../components/table';
import TeamFormation from '../../../components/team_formation';

function Teams() {
  const { id: classId } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const { isLoading: isClassesLoading, classes } = useClasses();
  const { isLoading: isClassLoading, classRoom } = useClass(classId);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  let buttons = [];

  if (user.is_staff) {
    buttons = [
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
      {
        id: 4,
        label: 'Hirings',
        className: 'team-leaders',
        path: `/classes/${classId}/hirings`,
      },
    ];
  } else {
    buttons = [
      {
        id: 1,
        label: 'Teams',
        className: 'teams',
        path: `/classes/${classId}/teams`,
      },
      {
        id: 2,
        label: 'Hirings',
        className: 'team-leaders',
        path: `/classes/${classId}/hirings`,
      },
    ];
  }

  const headers = ['id', 'team name', 'leader', '# of members', 'actions'];
  const data = [];

  useEffect(() => {
    if (!isClassesLoading) {
      const foundClass = classes.find((c) => c.id === parseInt(classId, 10));

      if (!foundClass) {
        navigate('/classes');
      }
    }
  }, [isClassesLoading]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    console.log(e.target.value);
  };

  useEffect(() => {
    const lowerCaseQuery = searchQuery.toLowerCase();
    const filtered = data.filter(
      (item) =>
        item.name.toLowerCase().includes(lowerCaseQuery) ||
        item.team.toLowerCase().includes(lowerCaseQuery) ||
        item.role.toLowerCase().includes(lowerCaseQuery) ||
        item.status.toLowerCase().includes(lowerCaseQuery)
    );
    setFilteredData(filtered);
  }, [searchQuery, data]);

  const renderSubheader = () => (
    <div className="d-flex pt-2 pb-2">
      <div className="mx-5">
        <div className="fw-bold fs-5 brown-text">{classRoom?.name}</div>
        <div className="d-flex py-2">
          <div className="fw-semibold fs-6 pt-2">{classRoom?.sections}</div>
          <div className="fw-semibold fs-6 pt-2 ms-3">
            {classRoom?.schedule}
          </div>
        </div>
      </div>
      <div className="ms-auto mt-4 me-5">
        <Search value={searchQuery} onChange={handleSearchChange} />
      </div>
    </div>
  );

  const renderTable = () => (
    <div className="d-flex flex-column justify-content-center pt-3 pb-3 px-5">
      {data && filteredData.length === 0 ? (
        <div className="d-flex justify-content-center align-items-center">
          <div className="brown-text fw-bold fs-5 py-2 mx-5">
            No teams found
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
      <div className="container d-flex flex-column">
        <Header />
        {renderSubheader()}
        {renderTable()}
      </div>
    </div>
  );
}

export default Teams;
