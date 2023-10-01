import React, { useState } from 'react';
import { InputText } from 'primereact/inputtext';
import Navbar from '../../../components/navbar/Navbar';
import WildCards from '../../../components/cards/WildCards';
import 'primeicons/primeicons.css';
import './index.scss';
import CreateClass from '../create-class/CreateClass';

function Classes() {
    const buttons = [
        { id: 1, label: 'Classes', className: 'classes', path: '/classes' },
        { id: 2, label: 'Peer Evaluation', className: 'peer-eval', path: '/peer-eval' },
      ];
    const [isCreateClassModalOpen, setCreateClassModalOpen] = useState(false);

    const openCreateClassModal = () => {
      setCreateClassModalOpen(true);
      console.log('open')
    };
  
    const closeCreateClassModal = () => {
      setCreateClassModalOpen(false);
    };

  return (
    <div className='d-flex'>
    <Navbar { ...{ buttons }}/>
      <div className='container-fluid d-flex flex-column'>
          <div className='d-flex flex-row'>
            <div className='d-flex header'>
              <div className="py-5 px-4 app-name">
                <span className="yellow-text fs-3 fw-bold">Wild</span>
                <span className="fs-3 fw-bolder">FORGE</span>
              </div>
              <div className="p-5 ms-auto">
                <span className='brown-text fw-bold px-3'>Account Settings</span>
                <span className='red-text fw-bold px-3'>Logout</span>
              </div>
            </div>
          </div>
          <div className='d-flex pt-2 pb-2'>
            <span className='brown-text fw-bold py-2 mx-4'>Classes</span>
            <div className="d-flex ms-auto mx-5">
              <InputText className='search-input me-4' placeholder='Search'/>
              <button className='btn btn-add-primary' onClick={openCreateClassModal}>
                <i className="pi pi-plus"/>
              </button>
            </div>
          </div>
          <div className='d-flex justify-content-center pt-2 pb-2'>
            <span className='grey-text fw-semibold py-2 mx-4'>No Classes. Create a new Class</span>
            <WildCards/>
          </div>
      </div>
      {isCreateClassModalOpen && (
        <CreateClass visible={isCreateClassModalOpen} handleModal={closeCreateClassModal} />
      )}
    </div>
  )
}

export default Classes