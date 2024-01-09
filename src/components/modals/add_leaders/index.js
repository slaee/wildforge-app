import React, { useEffect, useState } from 'react';

import { Dialog } from 'primereact/dialog';
import PropTypes from 'prop-types';

import './index.scss';
import { useNavigate, useParams } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import Table from '../../table';
import Search from '../../search';
import { useAuth } from '../../../contexts/AuthContext';
import { useTeams } from '../../../hooks';
import GLOBALS from '../../../app_globals';

function AddLeaders({ visible, handleModal }) {
  const navigate = useNavigate;

  const { accessToken } = useAuth();
  const user = jwtDecode(accessToken);

  const { id: classId } = useParams();
  const { teams, isRetrieving, nonLeaders, setLeader, isSettingLeader } =
    useTeams(classId);

  const [showManualModal, setShowManualModal] = useState(false);
  const [showAutomaticModal, setShowAutomaticModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const [nonLeadersTable, setNonLeadersTable] = useState([]);

  const openManualModal = () => {
    setShowManualModal(true);
    console.log('open manual');
  };

  const closeManualModal = () => {
    setShowManualModal(false);
    console.log('close manual');
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

  const manualHeaders = ['id', 'name', 'actions'];

  useEffect(() => {
    if (nonLeaders) {
      const nonLeadersData = nonLeaders.map((n) => {
        const { class_member_id, first_name, last_name, teamember_status } = n;

        const tb_data = {
          id: class_member_id,
          name: `${first_name} ${last_name}`,
          actions:
            teamember_status === GLOBALS.MEMBER_STATUS.PENDING ? (
              <button
                type="button"
                className="btn btn-yellow-primary fw-semibold"
                disabled
              >
                Pending
              </button>
            ) : (
              <button
                type="button"
                className="btn btn-yellow-primary fw-semibold"
                onClick={() => {
                  setLeader(class_member_id);
                }}
              >
                Select as Leader
              </button>
            ),
        };

        return tb_data;
      });
      setNonLeadersTable(nonLeadersData);
    }
  }, [nonLeaders, isSettingLeader]);

  const automaticHeaders = ['id', 'activity', 'actions'];
  const automaticSelectionData = [
    {
      id: 1,

      activity: 'Activity 1',
      actions: (
        <div className="d-flex justify-content-center form-check form-switch">
          <input
            className="form-check-input"
            type="checkbox"
            role="switch"
            id="flexSwitchCheckDefault"
          />
        </div>
      ),
    },
  ];

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
        <div className="d-flex align-items-center justify-content-between text-left fs-5 fw-bold">
          <span>Students List</span>
          <Search value={searchQuery} onChange={handleSearchChange} />
        </div>
        <Table
          headers={manualHeaders}
          data={nonLeadersTable}
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
        <div className="d-flex align-items-center justify-content-between text-left fs-5 fw-bold">
          <span>Activities List</span>
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
