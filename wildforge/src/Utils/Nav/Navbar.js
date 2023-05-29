import React, { useState } from 'react'
import './Navbar.scss'

function Navbar({ buttons }) {
  const [selectedButton, setSelectedButton] = useState(null)

  const handleButtonClick = (buttonId) => {
    setSelectedButton(buttonId);
  };
  
  return (
    <div className='parent'>
        <div className='title'>Class</div>
        {buttons.map(button => (
        <div
          className={`${button.className} ${selectedButton === button.id ? 'selected' : ''}`}
          key={button.id}
          onClick={() => handleButtonClick(button.id)}
        >
          {button.label}
        </div>
      ))}
    </div>
  )
}

export default Navbar