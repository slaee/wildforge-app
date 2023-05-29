import React from 'react'
import Navbar from '../../../Utils/Navbar'
import './styles.module.scss'

function CreateClass() {
    const buttons = [
        { id: 1, label: 'My Classes', className: 'classes' },
        { id: 2, label: 'Peer Evaluation', className: 'peers' },
        { id: 3, label: 'My Profile', className: 'profile' },
        { id: 4, label: 'Logout', className: 'logout' }
      ];
  return (
    <div>
        <Navbar buttons={buttons} />
        <div>
        </div>
    </div>
  )
}

export default CreateClass