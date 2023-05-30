import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.scss';

function Navbar({ buttons, onButtonClick }) {
  const [selectedButton, setSelectedButton] = useState(buttons[0]?.id);

  const handleButtonClick = (buttonId) => {
    setSelectedButton(buttonId);
    onButtonClick(buttonId); // Notify the parent component of the button click
  };

  return (
    <div className="parent">
      <div className="title">Class</div>
      {buttons.map((button) => (
        <Link
          to={button.path}
          className={`${button.className} ${selectedButton === button.id ? 'selected' : ''}`}
          key={button.id}
          onClick={() => handleButtonClick(button.id)}
        >
          {button.label}
        </Link>
      ))}
    </div>
  );
}

export default Navbar;