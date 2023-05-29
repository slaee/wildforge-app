import React from 'react'
import Navbar from '../../../Utils/Nav/Navbar'
import './CreateClass.scss'
import CreateButton from '../../../Utils/Button/CreateButton';

function CreateClass() {
    const buttons = [
        { id: 1, label: 'My Classes', className: 'classes' },
        { id: 2, label: 'Peer Evaluation', className: 'peers' },
        { id: 3, label: 'My Profile', className: 'profile' },
        { id: 4, label: 'Logout', className: 'logout' }
      ];
  return (
    <div className='create-class-container'>
      <Navbar buttons={buttons} />
      <div className='class-dashboard'>
        <div className='class-dashboard-header'>
          <div className='header-content'>
            <h1>Create Class</h1>
            <h2>Date</h2>
          </div>
          <CreateButton />
        </div>
      </div>
    </div>
  )
}

export default CreateClass