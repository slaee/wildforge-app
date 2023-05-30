import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../../../Utils/Nav/Navbar';
import CreateClassDetails from '../CreateClass/CreateClassDetails';
import Search from '../../../Utils/Search/Search';
import CreateButton from '../../../Utils/Button/CreateButton';
import Card from '../../../Utils/Cards/Card';
import './CreateClass.scss';

function CreateClass() {
  const buttons = [
    { id: 1, label: 'My Classes', className: 'classes' },
    { id: 2, label: 'Peer Evaluation', className: 'peers' },
    { id: 3, label: 'My Profile', className: 'profile' },
    { id: 4, label: 'Logout', className: 'logout' }
  ];

  const [isClicked, setIsClicked] = useState(false);

  const handleCreateButtonClick = () => {
    console.log('Create button clicked');
    setIsClicked(true);
  };

  const handleClickOut = () => {
    console.log('Create button clicked');
    setIsClicked(false);
  };

  return (
    <div className='class-container'>
      <Navbar {...{ buttons }} />
      <div className='class-dashboard'>
        <div className='class-dashboard-header'>
          <div className='header-content'>
            <h1>Create Class</h1>
            <h2>Date</h2>
          </div>
          <Search placeholder='Enter Class Info' />
          <CreateButton handlerOnClick={handleCreateButtonClick} />
        </div>
        <div className='class-dashboard-body'>
          {isClicked && <CreateClassDetails handlerOnClick={handleClickOut} />}
          <Link to='/class/dashboard'>
            <Card />
          </Link>
          <Card />
          <Card />
          <Card />
        </div>
      </div>
    </div>
  );
}

export default CreateClass;