import React from 'react'
import './InputBox.scss'

function InputBox({title, placeholder}) {
  return (
    <div className='input-container'>
        <p className='input-title'>{title}</p>
        <input className='input-text' type='text' placeholder={placeholder}/>
    </div>
  )
}

export default InputBox