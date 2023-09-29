import React from 'react'
import './index.scss'

function WildCards() {
  return (
    <div className='class-card d-flex flex-column justify-content-center p-5'>
      <span className='text-center fw-bold fs-5 my-1'>Class Name</span>
      <div className='d-flex flex-row justify-content-center my-1'>
        <span className='text-center fw-semibold mx-1'>Section</span>
        <span className='text-center fw-semibold mx-1'>Schedule</span>
      </div>
    </div>
  )
}

export default WildCards