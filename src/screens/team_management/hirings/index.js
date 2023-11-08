import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../../../contexts/AuthContext';
import { useClass, useClasses } from '../../../hooks';

import Navbar from '../../../components/navbar';
import Header from '../../../components/header';
import Search from '../../../components/search';
import HiringCard from '../../../components/cards/hiring_cards';
import CreateTeam from '../../../components/modals/create_team';

function Hirings() {
  const { user } = useAuth();
  const { id: classId } = useParams();
  const navigate = useNavigate();
  const { isLoading: isClassesLoading, classes } = useClasses();
  const { isLoading: isClassLoading, classRoom } = useClass(classId);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const [isPostingsModalOpen, setPostingsModalOpen] = useState(false);

  const openPostingModal = () => {
    setPostingsModalOpen(true);
  };

  const closePostingModal = () => {
    setPostingsModalOpen(false);
  };

  const postings = [];

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

  const data = [];

  useEffect(() => {
    if (!isClassesLoading) {
      const foundClass = classes.find((c) => c.id === parseInt(classId, 10));

      if (!foundClass) {
        navigate('/classes');
      }
    }
  }, [isClassesLoading]);

  // For Search
  // useEffect(() => {
  //   const lowerCaseQuery = searchQuery.toLowerCase();
  //   const filtered = data.filter(
  //     (item) =>
  //       item.name.toLowerCase().includes(lowerCaseQuery) ||
  //       item.team.toLowerCase().includes(lowerCaseQuery) ||
  //       item.role.toLowerCase().includes(lowerCaseQuery) ||
  //       item.status.toLowerCase().includes(lowerCaseQuery)
  //   );
  //   setFilteredData(filtered);
  // }, [searchQuery, data]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

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
        <button
          type="button"
          className="btn btn-join-primary ms-3"
          onClick={openPostingModal}
        >
          Post Hiring
        </button>
      </div>
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
        {renderSubheader()}
        <div className="d-flex flex-column justify-content-center pt-3 pb-3 px-5">
          {postings && postings.length === 0 && (
            <div className="grey-text text-center fw-semibold py-2">
              No Postings. Create a new Posting
            </div>
          )}
          <div className="d-flex flex-row justify-content-start py-2 gap-5 flex-wrap">
            <HiringCard />
          </div>
        </div>
        {isPostingsModalOpen && (
          <CreateTeam
            visible={isPostingsModalOpen}
            handleModal={closePostingModal}
          />
        )}
      </div>
    </div>
  );
}

export default Hirings;
