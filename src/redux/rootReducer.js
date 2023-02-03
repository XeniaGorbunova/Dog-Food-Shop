import { combineReducers } from '@reduxjs/toolkit'
import { cartReducer } from './slices/cartSlice'
import { productsReducer } from './slices/productsSlice'
import { userReducer } from './slices/userSlice'

export const rootReducer = combineReducers({
  user: userReducer,
  products: productsReducer,
  cart: cartReducer,
})
