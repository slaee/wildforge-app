import React from 'react'
import '../Styles/Navbar.scss'

function Navbar({ buttons }) {
  return (
    <div className='parent'>
        <div className='title'>Class</div>
        {buttons.map(button => (
          <div className={`${button.className}`} key={button.id}>
        {button.label}
      </div>
    ))}
    </div>
  )
}

export default Navbar