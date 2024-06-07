import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

function Navbar() {
    const cartitems = useSelector((state)=> state.cart)
  return (
    <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
      <span className='logo'>REDUX STORE</span>
      <div>
        <Link to='/' className='navLink'>Home</Link>
        <Link to='/cart' className='navLink'>Cart</Link>
        <span className='cartCount'>
            Cart Items: {cartitems.length}
        </span>
      </div>
    </div>
  )
}

export default Navbar
