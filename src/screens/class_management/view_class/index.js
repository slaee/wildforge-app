import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { useAuth } from '../../../contexts/AuthContext';
import { useClassMember, useClassRoom } from '../../../hooks';

import GLOBALS from '../../../app_globals';

import Loading from '../../../components/loading';
import Navbar from '../../../components/navbar';
import Header from '../../../components/header';

import './index.scss';

function ViewClass() {
  const navigate = useNavigate();

  const { user } = useAuth();
  const { id: classId } = useParams();
  const { isLoading: isClassLoading, classRoom } = useClassRoom(classId);
  const { classMember, isRetrieving } = useClassMember(classId, user.user_id);

  const [isLoading, setIsLoading] = useState(true);

  let buttons = [];

  if (classMember?.role === GLOBALS.CLASSMEMBER_ROLE.STUDENT) {
    navigate(`/classes/${classId}/teams`);
    buttons = GLOBALS.SIDENAV_CLASSMEMBER(classId);
  } else {
    buttons = GLOBALS.SIDENAV_TEACHER(classId);
  }

  useEffect(() => {
    if (isRetrieving || isClassLoading) {
      setTimeout(() => setIsLoading(false), 600);
    }
  }, [classMember, isClassLoading, isRetrieving]);

  const handleCopyCode = () => {
    navigator.clipboard.writeText(classRoom?.class_code);
    console.log('copied');
  };

  const renderSubheader = () => (
    <div className="d-flex pt-2 pb-2">
      <div className="px-5">
        <div className="d-flex align-items-center fw-bold fs-5 brown-text">
          {classRoom?.name} {classRoom?.sections}
        </div>
        <div className="d-flex py-2">
          <div className="d-flex align-items-center fw-semibold fs-6">
            {classRoom?.schedule}
          </div>
          <div className="d-flex align-items-center ps-4 pe-2 fw-semibold fs-6">
            {classRoom?.class_code}
          </div>
          {user.is_staff && (
            <button
              type="button"
              className="btn btn-secondary btn-sm"
              onClick={handleCopyCode}
            >
              Copy
            </button>
          )}
        </div>
      </div>
    </div>
  );

  const renderBody = () => (
    <div className="d-flex justify-content-center pt-3 pb-3 px-5">
      <div className="d-flex flex-column">
        <div className="pe-5">
          <div className="students-container p-5">
            <div className="fw-bold fs-1">{classRoom?.number_of_students}</div>
            <div className="ms-auto fw-semibold fs-3 mx-5">Students</div>
          </div>
        </div>
        <div className="pe-5 pt-4">
          <div className="students-container p-5">
            <div className="fw-bold fs-1">0</div>
            <div className="ms-auto fw-semibold fs-3 mx-5">Teams</div>
          </div>
        </div>
      </div>
      <div className="logs-container">
        <div className="fw-bold fs-4 mb-3">CLASS LOGS</div>
        <div className="d-flex">
          <div>[DateTime]</div>
          <div className="ms-3">[Log Entry]</div>
        </div>
      </div>
    </div>
  );

  const renderContent = () => (
    <div className="d-flex">
      <Navbar
        name={`${user?.first_name} ${user?.last_name}`}
        buttons={buttons}
        hasBackButton
      />
      <div className="container-fluid d-flex flex-column">
        <Header />
        {renderSubheader()}
        {renderBody()}
      </div>
    </div>
  );

  return <div>{isLoading ? <Loading /> : renderContent()}</div>;
}

export default ViewClass;
