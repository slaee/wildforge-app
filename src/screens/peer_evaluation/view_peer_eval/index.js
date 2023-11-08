import React from 'react';
import Navbar from '../../../components/navbar';
import Header from '../../../components/header';
import { useAuth } from '../../../contexts/AuthContext';

function PeerEval() {
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

  return (
    <div className="d-flex">
      <Navbar
        name={`${user?.first_name} ${user?.last_name}`}
        buttons={buttons}
      />
      <div className="container-fluid d-flex flex-column">
        <Header />
      </div>
    </div>
  );
}

export default PeerEval;
