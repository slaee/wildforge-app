import React from 'react'
import './FilledButton.scss'

function FilledButton({label}) {
  return (
    <div className='button-container'>
        {label}
    </div>
  )
}

export default FilledButton