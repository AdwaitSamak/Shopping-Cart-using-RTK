import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { act } from "react";

export const STATUSES = Object.freeze({
  IDLE: "idle",
  ERROR: "error",
  LOADING: "loading",
}); //freeze so that no one can change the contents within

const productSlice = createSlice({
  name: "products",
  initialState: {
    data: [],
    status: STATUSES.IDLE, //default state is idle
  },
  reducers: {
    // setProducts(state, action) {
    //   state.data = action.payload;
    // },
    // setStatus(state, action) {
    //   state.status = action.payload;
    // },
  },
  extraReducers: (builder) => {
    //cases to handle the possible states returned as a promise by the async thunk
    builder
      .addCase(fetchProducts.pending, (state, action) => {
        state.status = STATUSES.LOADING;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.data = action.payload;
        state.status = STATUSES.IDLE;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = STATUSES.ERROR;
      });
  },
});

export const { setProducts, setStatus } = productSlice.actions;
export default productSlice.reducer;

//thunk 
//METHOD 1
// export function fetchProducts(){
//     return async function fetchProductsThunk(dispatch, getState){
//         dispatch(setStatus(STATUSES.LOADING))  //firstly whenever we'll be fetching, we will dispatch an action to change state from idle to loading
//         try {
//             const res = await fetch('https://fakestoreapi.com/products')          //fetched data
//             const data = await res.json();
//             dispatch(setProducts(data))    //dispatch action to set products using the fetched data
//             dispatch(setStatus(STATUSES.IDLE))   //after getting data, we will make the status as idle agaian
//         } catch (error) {
//             console.log(error);
//             dispatch(setStatus(STATUSES.ERROR))  //set status as ERROR
//         }
//     }
// }
//----------------------------------------------------------

//METHOD 2
export const fetchProducts = createAsyncThunk("products/fetch", async () => {
  const res = await fetch("https://fakestoreapi.com/products");
  const data = await res.json();
  return data;
});
//createAsyncThunk returns a promise.
//Promise has 3 states - fulfilled, rejected and pending
