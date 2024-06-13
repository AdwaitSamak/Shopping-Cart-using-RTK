import { createSlice } from "@reduxjs/toolkit";

const initialState=[];
const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {   //create functions to chnage state
        add(state,action){        //here state will be initialState in this slice
            state.push(action.payload)      //will update in the initialState declared above, here state is the initialState only
            //add to cart action se aane wala data push kr rhe hum state me
        },
        remove(state,action){
            return state.filter(item => item.id !== action.payload)
            //when we will remove a item, we wil, pass an id, state will filter out the items not matching the passed id
        }
    }
})

export const {add,remove} = cartSlice.actions; 
export default cartSlice.reducer; 