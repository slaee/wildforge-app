import React from 'react'
import Navbar from '../../../Utils/Navbar';

function ViewClass() {
    const buttons = [
        { id: 1, label: 'Dashboard', className: 'classes' },
        { id: 2, label: 'Students', className: 'peers' },
        { id: 3, label: 'Teams', className: 'teams' },
        { id: 4, label: 'Edit Class', className: 'profile' },
        { id: 5, label: 'Delete Class', className: 'delete' },
        { id: 6, label: 'Logout', className: 'logout' }
      ];
  return (
    <div>
        <Navbar buttons={buttons} />
    </div>
  )
}

export default ViewClass