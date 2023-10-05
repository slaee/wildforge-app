import React, { useState } from 'react';

import Navbar from '../../../components/navbar';
import Header from '../../../components/header';
import WildCards from '../../../components/cards';
import CreateClass from '../create_class';

import 'primeicons/primeicons.css';
import './index.scss';
import Search from '../../../components/search';
import TeamDetails from '../../../components/team_details';
import { useClasses } from '../../../hooks';
import { useAuth } from '../../../contexts/AuthContext';

function Classes() {
  // const actions = [
  //   {
  //     id: 1,
  //     label: 'ACCEPT',
  //     handler: () => {
  //       /* Handle edit action */
  //     },
  //     style: {
  //       color: 'green',
  //       fontWeight: 'bold',
  //       textDecoration: 'none',
  //     },
  //   },
  //   {
  //     id: 2,
  //     label: 'DECLINE',
  //     handler: () => {
  //       /* Handle delete action */
  //     },
  //     style: {
  //       color: 'red',
  //       fontWeight: 'bold',
  //       textDecoration: 'none',
  //     },
  //   },
  // ];

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

  const openCreateClassModal = () => {
    setCreateClassModalOpen(true);
    console.log('open');
  };

  const closeCreateClassModal = () => {
    setCreateClassModalOpen(false);
  };

  return (
    <div className="d-flex">
      <Navbar
        name={`${user?.first_name} ${user?.last_name}`}
        buttons={buttons}
      />
      <div className="container-fluid d-flex flex-column">
        <Header />
        <div className="d-flex pt-3 pb-3">
          <div className="brown-text fw-bold fs-5 py-2 mx-5">Classes</div>
          <div className="d-flex align-items-center ms-auto mx-5">
            <Search />
            <button
              className="btn btn-add-primary"
              onClick={openCreateClassModal}
            >
              <i className="pi pi-plus" />
            </button>
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
              classes.map((Class) => (
                <WildCards
                  key={Class.id}
                  id={Class.id}
                  name={Class.name}
                  classCode={Class.class_code}
                  section={Class.sections}
                  schedule={Class.schedule}
                />
              ))}
          </div>
          {/* <TeamDetails /> */}
        </div>
      </div>
      {isCreateClassModalOpen && (
        <CreateClass
          visible={isCreateClassModalOpen}
          handleModal={closeCreateClassModal}
        />
      )}
    </div>
  );
}

export default Classes;
