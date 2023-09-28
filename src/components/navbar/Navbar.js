import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.scss';

function Navbar({buttons, onButtonClick }) {
  const [selectedButton, setSelectedButton] = useState(buttons[0]?.id);

  const handleButtonClick = (buttonId) => {
    setSelectedButton(buttonId);
    onButtonClick(buttonId); // Notify the parent component of the button click
  };

  return (
    <div className='position-relative top-0 start-0 d-flex flex-column p-3 nav-bar'>
      <div className='ps-4 fw-semibold pt-5 pb-5'>Sample Role</div> {/* to be updated once there are roles/tokens? */}
      {buttons.map((button) => (
        <Link
          to={button.path}
          className={`text-center nav-button pt-2 pb-2 mt-3 mb-3 fw-semibold ${selectedButton === button.id ? 'selected' : ''}`}
          key={button.id}
          onClick={() => handleButtonClick(button.id)}
        >
          {button.label}
        </Link>
      ))}
    </div>
  )
}

export default Navbar