import { createSlice } from '@reduxjs/toolkit'
import { initState } from '../initState'

const cartSlice = createSlice({
  name: 'cart',
  initialState: initState.cart,
  reducers: {
    changeIsPickProduct(state, action) {
      const currentProduct = state.find((product) => product.id === action.payload)
      if (currentProduct) currentProduct.isPicked = !currentProduct.isPicked
    },
    pickAllProducts(state) {
      state.map((product) => ({
        ...product,
        isPicked: true,
      }))
    },
    getProductById(state, action) {
      return state.find((product) => product.id === action.payload)
    },
    getAllPickedProducts(state) {
      return state.filter((product) => product.isPicked === true)
    },
    productIncrement(state, action) {
      state.map((product) => {
        if (product.id === action.payload) {
          return {
            ...product,
            count: product.count + 1,
          }
        }
        return product
      })
    },
    productDecrement(state, action) {
      state.map((product) => {
        if (product.id === action.payload) {
          return {
            ...product,
            count: product.count - 1,
          }
        }
        return product
      })
    },
    deleteProduct(state, action) {
      console.log({ action })
      return state.filter((product) => product.id !== action.payload)
    },
    clearCart() {
      return []
    },
    addNewProduct: {
      reducer(state, action) {
        const currentProduct = state.find((product) => product.id === action.payload.id)
        if (!currentProduct) state.unshift(action.payload)
      },
      prepare(id) {
        return {
          payload: {
            id,
            isPicked: false,
            count: 1,
          },

        }
      },
    },
  },
})

export const {
  changeIsPickProduct, deleteProduct, clearCart, addNewProduct,
  productDecrement, productIncrement, getAllPickedProducts, getProductById, pickAllProducts,
} = cartSlice.actions
export const getAllCartProductsSelector = (state) => state.cart
export const cartReducer = cartSlice.reducer
