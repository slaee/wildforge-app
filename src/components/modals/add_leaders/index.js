import React, { useState } from 'react';

import { Dialog } from 'primereact/dialog';
import PropTypes from 'prop-types';

import './index.scss';
import Table from '../../table';
import Search from '../../search';

function AddLeaders({ visible, handleModal }) {
  const [showManualModal, setShowManualModal] = useState(false);
  const [showAutomaticModal, setShowAutomaticModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredData, setFilteredData] = useState([]);

  const openManualModal = () => {
    setShowManualModal(true);
    console.log('open manual');
  };

  const closeManualModal = () => {
    setShowManualModal(false);
  };

  const openAutomaticModal = () => {
    setShowAutomaticModal(true);
  };

  const closeAutomaticModal = () => {
    setShowAutomaticModal(false);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const actionButtons = () => {
    if (showManualModal) {
      return (
        <button
          type="button"
          className="btn btn-yellow-primary fw-semibold"
          onClick={() => console.log('clicked')}
        >
          Select as Leader
        </button>
      );
    }
    if (showAutomaticModal) {
      return (
        <div className="d-flex justify-content-center form-check form-switch">
          <input
            className="form-check-input"
            type="checkbox"
            role="switch"
            id="flexSwitchCheckDefault"
          />
        </div>
      );
    }
    return null; // Default to null if neither condition is met
  };

  const manualHeaders = ['id', 'name', 'actions'];
  const manualSelectionData = [
    {
      id: 1,
      name: 'John Doe',
      actions: actionButtons(),
    },
    {
      id: 2,
      name: 'Sheldon Cooper',
      actions: actionButtons(),
    },
    {
      id: 3,
      name: 'Loki Laufeyson',
      actions: actionButtons(),
    },
  ];
  const automaticHeaders = ['id', 'activity', 'actions'];
  const automaticSelectionData = [
    {
      id: 1,
      activity: 'Activity 1',
      actions: actionButtons(),
    },
    {
      id: 2,
      activity: 'Activity 2',
      actions: actionButtons(),
    },
    {
      id: 3,
      activity: 'Activity 3',
      actions: actionButtons(),
    },
  ];

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

  const renderManualModal = () => (
    <Dialog
      className="option-modal"
      visible={showManualModal}
      onHide={closeManualModal}
      showHeader={false}
    >
      <div className="d-flex flex-column">
        <button
          aria-label="Close Modal"
          className="btn btn-close ms-auto"
          onClick={closeManualModal}
        />
        <div className="text-left fs-5 fw-bold">Students List</div>
        <div className="ms-auto">
          <Search value={searchQuery} onChange={handleSearchChange} />
        </div>
        <Table
          headers={manualHeaders}
          data={manualSelectionData}
          className="mt-3"
        />
      </div>
    </Dialog>
  );

  const renderAutoModal = () => (
    <Dialog
      className="option-modal"
      visible={showAutomaticModal}
      onHide={closeAutomaticModal}
      showHeader={false}
    >
      <div className="d-flex flex-column h-100">
        <button
          aria-label="Close Modal"
          className="btn btn-close ms-auto"
          onClick={closeAutomaticModal}
        />
        <div className="text-left fs-5 fw-semibold">Activity Lists</div>
        <div className="ms-auto">
          <Search value={searchQuery} onChange={handleSearchChange} />
        </div>
        <Table
          headers={automaticHeaders}
          data={automaticSelectionData}
          className="mt-3"
        />

        <div className="mt-auto position-fixed bottom-0 start-50 translate-middle-x pb-5">
          <button type="btn" className="btn btn-wild-primary fw-bold btn-large">
            Start Identifying
          </button>
        </div>
      </div>
    </Dialog>
  );

  return (
    <>
      <Dialog
        className="add-leaders-modal p-4"
        visible={visible}
        onHide={handleModal}
        showHeader={false}
      >
        <div className="d-grid gap-3">
          <button
            aria-label="Close Modal"
            className="btn btn-close ms-auto"
            onClick={handleModal}
          />
          <button
            type="button"
            className="btn btn-wild-primary btn-large fw-bold fs-6"
            onClick={openManualModal}
          >
            Add a Leader Manually
          </button>
          <button
            type="button"
            className="btn btn-wild-secondary btn-large fw-bold fs-6"
            onClick={openAutomaticModal}
          >
            Start Automatic Leader Selection
          </button>
        </div>
      </Dialog>
      {showManualModal && renderManualModal()}
      {showAutomaticModal && renderAutoModal()}
    </>
  );
}

AddLeaders.defaultProps = {
  visible: false,
  handleModal: () => {},
};

AddLeaders.propTypes = {
  visible: PropTypes.bool,
  handleModal: PropTypes.func,
};

export default AddLeaders;
