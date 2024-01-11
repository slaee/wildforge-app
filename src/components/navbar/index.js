import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

import PropTypes from 'prop-types';

import 'primeicons/primeicons.css';
import './index.scss';

function Navbar({ buttons, name, hasBackButton, onButtonClick }) {
  const [selectedButton, setSelectedButton] = useState(buttons[0]?.id);
  const location = useLocation();

  useEffect(() => {
    // Determine the selected button based on the current location
    const currentButton = buttons.find((button) => button.path === location.pathname);
    if (currentButton) {
      setSelectedButton(currentButton.id);
    }
  }, [location.pathname, buttons]);

  const handleButtonClick = (buttonId) => {
    onButtonClick(buttonId);
  };

  return (
    <div className="position-relative top-0 start-0 d-flex flex-column p-4 nav-bar">
      {hasBackButton && (
        <Link to="/classes" className="nav-button text-decoration-none align-middle">
          <i className="pi pi-angle-double-left align-middle" style={{ fontSize: '1.25rem' }} />
          <span className="align-middle ps-2 fw-semibold">BACK</span>
        </Link>
      )}
      <div className="ps-4 fw-semibold pt-5 pb-5">{name}</div>{' '}
      {/* to be updated once there are roles/tokens? */}
      {buttons.map((button) => (
        <Link
          to={button.path}
          className={`text-center nav-button pt-2 pb-2 mt-3 mb-3 fw-semibold ${
            location.pathname === button.path ? 'selected' : ''
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
