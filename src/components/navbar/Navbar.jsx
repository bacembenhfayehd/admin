import React from 'react'
import image from '../../assets/boy3.png'

function Navbar() {
  return (
    <div className='navbar'>
        <h1 className='nav-logo'>E-shop</h1>
        <img className='nav-profile' src={image} alt="" />
    </div>
  )
}

export default Navbar