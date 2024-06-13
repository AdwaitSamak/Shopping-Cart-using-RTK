import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { remove } from '../store/cartSlice'

function Cart() {
  const items = useSelector((state)=>state.cart)    //cart is name of cartSlice. it has all the products in the cart 
  const dispatch = useDispatch();
  const handleRemove = (id)=>{
    dispatch(remove(id));          //dispatch action to remove the product with given id
  }
  return (
    <div>
      <h3>Cart</h3>
      <div className='cartWrapper'>
        {
          items.map(product=>(
            <div className="cartCard" key={product.id}>
              <img src={product.image} alt="" />
              <h5>{product.title}</h5>
              <h5>{product.price}</h5>
              <button className='btn' onClick={()=>handleRemove(product.id)}>Remove</button>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default Cart
