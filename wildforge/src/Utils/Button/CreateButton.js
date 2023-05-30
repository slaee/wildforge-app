import React from 'react'
import './CreateButton.scss'

const CreateButton = ( { handlerOnClick } ) => {
  return (
    <div className='create-button' onClick={handlerOnClick}></div>
  )
};

export default CreateButton