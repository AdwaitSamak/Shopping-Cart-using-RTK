import React, { useState, useEffect } from 'react'
import { add } from '../store/cartSlice';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts, STATUSES } from '../store/productSlice';

function Products() {
    const dispatch = useDispatch();

    const {data,status} = useSelector(state=>state.products)   //api call done in store, product list fetched from store using useselector   --> will give current data and status

    // useEffect(()=>{
    //     const fetchproducts = async ()=>{
    //         const res = await fetch('https://fakestoreapi.com/products')
    //         const data = await res.json();
    //         console.log(data);
    //         setProducts(data);
    //     }
    //     fetchproducts()
    // },[])          //fetching data here

    useEffect(()=>{
      dispatch(fetchProducts());     //when component mounts, dispatch a thunk action to fetch products. It does an api call and sends the response to the store where tne reducers are called and they update state and the change is reflected in the UI
    },[])

    const handleAdd = (product)=>{
        dispatch(add(product))     //dispacth action to add product int cart
    }

    if(status===STATUSES.LOADING){      //the freezed object having the three possible statuses
      return <h2>Loading...</h2>
    }

    if(status===STATUSES.ERROR){
      return <h2>Something Went Wrong...</h2>
    }

  return (
    <div className='productsWrapper'>
      {
        data.map(product=>(
            <div className='card' key={product.id}>
                <img src={product.image} alt="" />
                <h4>{product.title}</h4>
                <h5>{product.price}$</h5>
                <button className='btn' onClick={()=>handleAdd(product)}>Add to Cart</button>
            </div>
        ))
      }
    </div>
  )
}

export default Products
