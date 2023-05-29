import React, { useState } from 'react';
import './Navbar.scss';
import { useNavigate } from 'react-router-dom';

function Navbar({ buttons }) {
  const navigate = useNavigate();
  const [selectedButton, setSelectedButton] = useState(buttons[0]?.id);

  const handleButtonClick = (buttonId, path) => {
    setSelectedButton(buttonId);
    navigate(path);
  };

  return (
    <div className='parent'>
      <div className='title'>Class</div>
      {buttons.map(button => (
        <div
          className={`${button.className} ${selectedButton === button.id ? 'selected' : ''}`}
          key={button.id}
          onClick={() => handleButtonClick(button.id, button.path)}
        >
          {button.label}
        </div>
      ))}
    </div>
  );
}

export default Navbar;
