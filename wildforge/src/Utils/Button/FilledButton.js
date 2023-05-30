import React from 'react'
import './FilledButton.scss'

function FilledButton({label, handlerOnClick}) {
  return (
    <div className='button-container' onClick={handlerOnClick}>
        {label}
    </div>
  )
}

export default FilledButton