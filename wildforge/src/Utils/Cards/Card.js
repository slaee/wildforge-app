import React from 'react'
import './Card.scss'

function Card() {
  return (
    <div className='card-container'>
        <h1>Subject Title</h1>
        <div className='card-subheading'>
            <h3>Section</h3><p>Schedule</p>
        </div>
        <div className='end-label'>Student Count</div>
    </div>
  )
}

export default Card