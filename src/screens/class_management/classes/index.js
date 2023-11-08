import React, { useState, useEffect } from 'react';

import Navbar from '../../../components/navbar';
import Header from '../../../components/header';
import ClassCards from '../../../components/cards/class_cards';
import CreateClass from '../create_class';
import JoinClass from '../join_class';

import 'primeicons/primeicons.css';
import './index.scss';
import Search from '../../../components/search';
import { useClasses } from '../../../hooks';
import { useAuth } from '../../../contexts/AuthContext';

function Classes() {
  const { classes } = useClasses();
  const { user } = useAuth();

  const buttons = [
    { id: 1, label: 'Classes', className: 'classes', path: '/classes' },
    {
      id: 2,
      label: 'Peer Evaluation',
      className: 'peer-eval',
      path: '/peer-eval',
    },
  ];
  const [isCreateClassModalOpen, setCreateClassModalOpen] = useState(false);
  const [isJoinClassModalOpen, setJoinClassModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredClasses, setFilteredClasses] = useState([]);

  const openJoinClassModal = () => {
    setJoinClassModalOpen(true);
  };

  const closeJoinClassModal = () => {
    setJoinClassModalOpen(false);
  };

  const openCreateClassModal = () => {
    setCreateClassModalOpen(true);
    console.log('open');
  };

  const closeCreateClassModal = () => {
    setCreateClassModalOpen(false);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  useEffect(() => {
    const lowerCaseQuery = searchQuery.toLowerCase();
    const filtered = classes.filter((Class) => {
      const classInfo =
        `${Class.name} ${Class.class_code} ${Class.sections} ${Class.schedule}`.toLowerCase();
      return classInfo.includes(lowerCaseQuery);
    });
    setFilteredClasses(filtered);
  }, [searchQuery, classes]);

  return (
    <div className="d-flex">
      <Navbar
        name={`${user?.first_name} ${user?.last_name}`}
        buttons={buttons}
      />
      <div className="container-fluid d-flex flex-column">
        <Header />
        <div className="d-flex pt-2 pb-2">
          <div className="brown-text fw-bold fs-5 py-2 mx-5">Classes</div>
          <div className="d-flex align-items-center ms-auto mx-5">
            <Search value={searchQuery} onChange={handleSearchChange} />
            {user.is_staff ? (
              <button
                className="btn btn-add-primary ms-4"
                onClick={openCreateClassModal}
              >
                <i className="pi pi-plus" />
              </button>
            ) : (
              <button
                className="btn btn-join-primary ms-4"
                onClick={openJoinClassModal}
              >
                Join a class
              </button>
            )}
          </div>
        </div>
        <div className="d-flex flex-column justify-content-center pt-3 pb-3 px-5">
          {classes && classes.length === 0 && (
            <div className="grey-text text-center fw-semibold py-2">
              No Classes. Create a new Class
            </div>
          )}
          <div className="d-flex flex-row justify-content-start py-2 gap-5 flex-wrap">
            {classes &&
              filteredClasses.map((Class) => (
                <ClassCards
                  key={Class.id}
                  id={Class.id}
                  name={Class.name}
                  classCode={Class.class_code}
                  section={Class.sections}
                  schedule={Class.schedule}
                />
              ))}
          </div>
        </div>
      </div>
      {isCreateClassModalOpen && (
        <CreateClass
          visible={isCreateClassModalOpen}
          handleModal={closeCreateClassModal}
        />
      )}
      {isJoinClassModalOpen && (
        <JoinClass
          visible={isJoinClassModalOpen}
          handleModal={closeJoinClassModal}
        />
      )}
    </div>
  );
}

export default Classes;
