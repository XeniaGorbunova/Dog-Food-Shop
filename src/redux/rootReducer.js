import { combineReducers } from '@reduxjs/toolkit'
import { cartReducer } from './slices/cartSlice'

export const rootReducer = combineReducers({
  user: userReducer,
  products: productsReducer,
  cart: cartReducer,
})
