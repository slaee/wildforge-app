import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import PropTypes from 'prop-types';

import './index.scss';

function Navbar({ buttons, name, hasBackButton, onButtonClick }) {
  const [selectedButton, setSelectedButton] = useState(buttons[0]?.id);

  const handleButtonClick = (buttonId) => {
    setSelectedButton(buttonId);
    onButtonClick(buttonId); // Notify the parent component of the button click
  };

  return (
    <div className="position-relative top-0 start-0 d-flex flex-column p-3 nav-bar">
      {hasBackButton && (
        <Link to="/classes" className="nav-button text-decoration-none">
          {'< Back'}
        </Link>
      )}
      <div className="ps-4 fw-semibold pt-5 pb-5">{name}</div>{' '}
      {/* to be updated once there are roles/tokens? */}
      {buttons.map((button) => (
        <Link
          to={button.path}
          className={`text-center nav-button pt-2 pb-2 mt-3 mb-3 fw-semibold ${
            selectedButton === button.id ? 'selected' : ''
          }`}
          key={button.id}
          onClick={() => handleButtonClick(button.id)}
        >
          {button.label}
        </Link>
      ))}
    </div>
  );
}

Navbar.defaultProps = {
  name: '',
  hasBackButton: false,
  buttons: [],
  onButtonClick: () => {},
};

Navbar.propTypes = {
  name: PropTypes.string,
  hasBackButton: PropTypes.bool,
  buttons: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      label: PropTypes.string,
      className: PropTypes.string,
      path: PropTypes.string,
    })
  ),
  onButtonClick: PropTypes.func,
};

export default Navbar;
