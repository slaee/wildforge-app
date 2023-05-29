import React from 'react'
import './Search.scss'

function Search({placeholder}) {
  return (
    <div className='search-bar'>
        <h2>Search</h2>
        <input type="text" placeholder={placeholder}/>
    </div>
  )
}

export default Search