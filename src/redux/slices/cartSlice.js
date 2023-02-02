import { createSlice } from '@reduxjs/toolkit'
import { initState } from '../initState'

const cartSlice = createSlice({
  name: 'cart',
  initialState: initState.cart,
  reducers: {
    pickProduct(state, action) {
      const currentProduct = state.find((product) => product.id === action.payload)
      if (currentProduct) currentProduct.isPicked = !currentProduct.isPicked
    },
    deleteProduct(state, action) {
      return state.filter((product) => product.id !== action.payload)
    },
    clearCart() {
      return []
    },
    addNewProduct(state, action) {
      state.unshift(action.payload)
    },
    getCartQuantity(state) {
      return state.length
    },
  },
})

export const {
  pickProduct, deleteProduct, clearCart, addNewProduct, getCartQuantity,
} = cartSlice.actions
export const getAllCartProductsSelector = (state) => state.cart
export const cartReducer = cartSlice.reducer
