import React from 'react';
import PropTypes from 'prop-types';

import './index.scss';
import { Link } from 'react-router-dom';

function WildCards({ id, name, classCode, section, schedule }) {
  return (
    <Link to={`/classes/${id}`} className="text-decoration-none">
      <div className="class-card d-flex flex-column justify-content-center p-5">
        <span className="text-center fw-bold fs-5 my-1">{name}</span>
        <div className="d-flex flex-row justify-content-center my-1">
          <span className="text-center fw-semibold mx-1">{section}</span>
        </div>
        <span className="text-center fw-semibold mx-1">{schedule}</span>
        <span className="text-center fw-semibold mx-1">
          Class Code: {classCode}
        </span>
      </div>
    </Link>
  );
}

WildCards.defaultProps = {
  id: 0,
  name: '',
  classCode: '',
  section: '',
  schedule: '',
};

WildCards.propTypes = {
  id: PropTypes.number,
  name: PropTypes.string,
  classCode: PropTypes.string,
  section: PropTypes.string,
  schedule: PropTypes.string,
};

export default WildCards;
