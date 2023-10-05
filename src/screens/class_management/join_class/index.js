import React from 'react';
import { Dialog } from 'primereact/dialog';
import { Formik } from 'formik';
import PropTypes from 'prop-types';
import { isObjectEmpty } from '../../../utils/object';

import './index.scss';
import ControlInput from '../../../components/controlinput';
import { useJoinClass } from '../../../hooks';

const validate = (values) => {
  const errors = {};

  if (!values.class_code) {
    errors.class_code = 'Field is required';
  } else if (values.class_code.length > 50) {
    errors.class_code = 'Class code is too long';
  }

  return errors;
};

function JoinClass({ visible, handleModal }) {
  const { isJoining, joinClass } = useJoinClass();

  return (
    <Dialog
      className="join-class-modal p-3"
      visible={visible}
      onHide={handleModal}
      showHeader={false}
    >
      <span className="fw-bold fs-6">Join Class</span>
      <div className="d-flex flex-column">
        <Formik
          initialValues={{
            class_code: '',
          }}
          onSubmit={async (values, { setErrors }) => {
            const errors = validate(values);
            if (!isObjectEmpty(errors)) {
              setErrors(errors);
              return;
            }

            const joinClassCallbacks = {
              joined: ({ retrievedMessage }) => {
                alert('Please wait for the teacher to accept your request');
              },
              invalidFields: () => {
                errors.class_code = 'Invalid class code';
                setErrors(errors);
              },
              internalError: () => {
                alert('Internal error');
              },
            };

            await joinClass({
              classCode: values.class_code,
              callbacks: joinClassCallbacks,
            });
          }}
        >
          {({ errors, values, handleSubmit, setFieldValue }) => (
            <form onSubmit={handleSubmit}>
              <div className="d-flex flex-row my-3 justify-content-center">
                <ControlInput
                  name="class_code"
                  className="yellow-on-focus"
                  label=""
                  placeholder="Enter Class Code"
                  value={values.class_code}
                  onChange={(e) => setFieldValue('class_code', e.target.value)}
                  error={errors.class_code}
                />
                <button
                  className="btn btn-create-primary fw-semibold ms-2 mt-3"
                  type="submit"
                >
                  {isJoining ? 'Joining...' : 'Join'}
                </button>
              </div>
            </form>
          )}
        </Formik>

        <button
          aria-label="Close Modal"
          className="btn btn-close ms-auto join-class-close"
          onClick={handleModal}
        />
      </div>
    </Dialog>
  );
}

JoinClass.defaultProps = {
  visible: false,
  handleModal: () => {},
};

JoinClass.propTypes = {
  visible: PropTypes.bool,
  handleModal: PropTypes.func,
};

export default JoinClass;
