import React, { useState } from 'react';

import { Dialog } from 'primereact/dialog';
import PropTypes from 'prop-types';

import './index.scss';
import Table from '../table';
import Search from '../search';

function AddLeaders({ visible, handleModal }) {
  const [showManualModal, setShowManualModal] = useState(false);
  const [showAutomaticModal, setShowAutomaticModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredData, setFilteredData] = useState([]);

  const manualHeaders = ['id', 'name', 'actions'];
  const automaticHeaders = ['id', 'activity', 'actions'];
  // unya na ang actions kay kalimot ko hehe

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
      className="manual-add-modal"
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
        <div className="text-center fs-5 fw-semibold">Students List</div>
        <Search value={searchQuery} onChange={handleSearchChange} />
        <Table headers={manualHeaders} data={[]} className="mt-3" />
      </div>
    </Dialog>
  );

  const renderAutoModal = () => (
    <Dialog
      className="manual-add-modal"
      visible={showAutomaticModal}
      onHide={closeAutomaticModal}
      showHeader={false}
    >
      <div className="d-grid gap-3">
        <button
          aria-label="Close Modal"
          className="btn btn-close ms-auto"
          onClick={closeAutomaticModal}
        />
        <div className="text-center fs-5 fw-semibold">
          Select an activity to start Automatic Leader Identification.
        </div>
        <Search value={searchQuery} onChange={handleSearchChange} />
        <Table headers={automaticHeaders} data={[]} className="mt-3" />
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
