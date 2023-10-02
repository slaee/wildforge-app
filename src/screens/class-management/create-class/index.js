import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { InputText } from 'primereact/inputtext';
import { Dialog } from 'primereact/dialog';
import './index.scss';

function CreateClass({ visible, handleModal }) {
  const [showCode, setShowCode] = useState(false);

  const [formData, setFormData] = useState({
    className: '',
    classSection: '',
    classSchedule: '',
  });

  const openShowCodeModal = () => {
    setShowCode(true);
    console.log('open code');
  };

  const closeShowCodeModal = () => {
    setShowCode(false);
    console.log('close code');
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText('SAMPL3-C0D3');
    setShowCode(false);
    handleModal();
    console.log('copy code');
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const renderShowCode = () => (
    <Dialog
      className="code-modal p-3"
      visible={showCode}
      onHide={closeShowCodeModal}
      showHeader={false}
    >
      <span className="fw-bold fs-6">Join Code</span>
      <div className="d-flex flex-row my-3 justify-content-center">
        <span className="code-content text-center p-2">SAMPL3-C0D3</span>
        <button
          className="btn btn-create-primary fw-semibold ms-2"
          onClick={handleCopyCode}
        >
          Copy
        </button>
      </div>
    </Dialog>
  );

  return (
    <>
      <Dialog
        className="create-modal p-5"
        visible={visible}
        onHide={handleModal}
        showHeader={false}
      >
        <div className="d-flex flex-column">
          <button
            aria-label="Close Modal"
            className="btn btn-close ms-auto"
            onClick={handleModal}
          />
          <span className="fw-bold text-center fs-5">Create Class</span>
          <InputText
            className="input-container"
            title="Class Name"
            name="className"
            placeholder="Enter class name"
            value={formData.className}
            onChange={handleInputChange}
          />
          <InputText
            className="input-container"
            title="Class Section"
            name="classSection"
            placeholder="Enter sections. e.g F1 - F2"
            value={formData.classSection}
            onChange={handleInputChange}
          />
          <InputText
            className="input-container"
            title="Class Schedule"
            name="classSchedule"
            placeholder="DD/MM/YYYY"
            value={formData.classSchedule}
            onChange={handleInputChange}
          />
          <button
            className="btn btn-create-primary ms-auto fw-semibold my-3"
            onClick={openShowCodeModal}
          >
            Create
          </button>
        </div>
      </Dialog>
      {showCode && renderShowCode()}
    </>
  );
}

CreateClass.defaultProps = {
  visible: false,
  handleModal: () => {},
};

CreateClass.propTypes = {
  visible: PropTypes.bool,
  handleModal: PropTypes.func,
};

export default CreateClass;
