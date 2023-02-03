import { createSlice } from '@reduxjs/toolkit'
import { initState } from '../initState'

const productsSlice = createSlice({
  name: 'products',
  initialState: initState.products,
  reducers: {
  },
})
export const getProductsSelector = (state) => state.products
export const productsReducer = productsSlice.reducer
