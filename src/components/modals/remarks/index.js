import React from 'react';

import { Dialog } from 'primereact/dialog';
import PropTypes from 'prop-types';

import ControlTextArea from '../../controltextarea';

import './index.scss';

function Remarks({ modalTitle, visible, handleModal, hasDropdown }) {
  return (
    <Dialog
      className="remarks-modal"
      visible={visible}
      onHide={handleModal}
      showHeader={false}
    >
      <div className="d-flex flex-column p-5">
        <div className="d-grid gap-3">
          <div className="text-center fs-3 fw-bold">{modalTitle}</div>
          <ControlTextArea name="remarks" label="Add Remarks" />
          {hasDropdown && (
            <div className="d-flex flex-column">
              <div className="text-left fs-5 fw-semibold">
                Nominate a New Leader
              </div>
              <select className="form-select form-select-sm">
                <option className="text-success fw-semibold" value="1">
                  OPEN
                </option>
                <option className="text-danger fw-semibold" value="2">
                  CLOSE
                </option>
              </select>
            </div>
          )}
          <div className="d-flex flex-row justify-content-center mt-3">
            <button
              className="btn btn-cancel-secondary fw-semibold mx-auto"
              onClick={handleModal}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-create-primary mx-auto fw-semibold"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </Dialog>
  );
}

Remarks.defaultProps = {
  modalTitle: '',
  visible: false,
  handleModal: () => {},
  hasDropdown: false,
};

Remarks.propTypes = {
  modalTitle: PropTypes.string,
  visible: PropTypes.bool,
  handleModal: PropTypes.func,
  hasDropdown: PropTypes.bool,
};

export default Remarks;
