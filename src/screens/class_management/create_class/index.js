import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Formik } from 'formik';
import { Dialog } from 'primereact/dialog';
import ControlInput from '../../../components/controlinput';
import { isObjectEmpty } from '../../../utils/object';
import { useCreateClass } from '../../../hooks';
import './index.scss';

const validate = (values) => {
  const errors = {};

  if (!values.name) {
    errors.name = 'This field is required.';
  } else if (values.name.length > 50) {
    errors.name = 'The maximum length of this field is 50 characters.';
  }

  if (!values.sections) {
    errors.sections = 'This field is required.';
  } else if (values.sections.length > 50) {
    errors.sections = 'The maximum length of this field is 50 characters.';
  }

  if (!values.schedule) {
    errors.schedule = 'This field is required.';
  } else if (values.schedule.length > 50) {
    errors.schedule = 'The maximum length of this field is 50 characters.';
  } else if (
    !values.schedule.match(
      /^[0-9]{1,2}:[0-9]{2}[AP]M - [0-9]{1,2}:[0-9]{2}[AP]M$/
    )
  ) {
    errors.schedule = 'The format of this field is invalid.';
  }

  return errors;
};

function CreateClass({ visible, handleModal }) {
  const [showCode, setShowCode] = useState(false);
  const [classCode, setClassCode] = useState('');

  const { createClass } = useCreateClass();

  const openShowCodeModal = () => {
    setShowCode(true);
  };

  const closeShowCodeModal = () => {
    setShowCode(false);
    window.location.reload();
  };

  const handleCopyCode = (code) => {
    navigator.clipboard.writeText(code);
    setShowCode(false);
    handleModal();
    window.location.reload();
  };

  const renderShowCode = (code) => (
    <Dialog
      className="code-modal p-4"
      visible={showCode}
      onHide={closeShowCodeModal}
      showHeader={false}
    >
      <span className="fw-bold fs-6">Join Code</span>
      <div className="d-flex flex-row my-3 justify-content-center">
        <span className="code-content text-center p-2">{code}</span>
        <button
          className="btn btn-create-primary fw-semibold ms-2"
          onClick={() => handleCopyCode(classCode)}
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
          <Formik
            initialValues={{
              name: '',
              sections: '',
              schedule: '',
            }}
            onSubmit={async (values, { setErrors }) => {
              const errors = validate(values);
              if (!isObjectEmpty(errors)) {
                setErrors(errors);
                return;
              }

              const createClassCallbacks = {
                created: async ({ retrievedClass }) => {
                  if (retrievedClass) {
                    setClassCode(retrievedClass.class_code);
                    openShowCodeModal();
                  }
                },
                invalidFields: () =>
                  setErrors({
                    overall: 'Invalid class name.',
                  }),
                internalError: () =>
                  setErrors({
                    overall: 'Oops, something went wrong.',
                  }),
              };

              // Create Class
              await createClass({
                name: values.name,
                sections: values.sections,
                schedule: values.schedule,
                callbacks: createClassCallbacks,
              });
            }}
          >
            {({ errors, values, handleSubmit, setFieldValue }) => (
              <form onSubmit={handleSubmit}>
                <ControlInput
                  name="name"
                  label="Class Name"
                  className="yellow-on-focus"
                  value={values.name}
                  onChange={(e) => setFieldValue('name', e.target.value)}
                  error={errors.name}
                />
                <div>
                  <ControlInput
                    name="sections"
                    label="Class Sections"
                    className="yellow-on-focus"
                    value={values.sections}
                    onChange={(e) => setFieldValue('sections', e.target.value)}
                    error={errors.sections}
                  />
                  <div className="format-instructions">
                    e.g F1-F2, E2, Honesty
                  </div>
                  <ControlInput
                    name="schedule"
                    label="Schedule"
                    className="yellow-on-focus"
                    value={values.schedule}
                    onChange={(e) => setFieldValue('schedule', e.target.value)}
                    error={errors.schedule}
                  />
                  <div className="format-instructions">
                    Sample Format: 1:00PM - 2:00PM
                  </div>
                </div>
                <div className="d-flex flex-row justify-content-center">
                  <button
                    type="submit"
                    className="btn btn-create-primary ms-auto fw-semibold my-3 mx-auto"
                  >
                    Create
                  </button>
                </div>
              </form>
            )}
          </Formik>
        </div>
      </Dialog>
      {showCode && renderShowCode(classCode)}
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
