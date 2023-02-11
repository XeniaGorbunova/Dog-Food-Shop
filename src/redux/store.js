import { configureStore } from '@reduxjs/toolkit'
import { DOGFOOD_CART_LS_KEY, DOGFOOD_LS_KEY } from './constants'
import { getInitState } from './initState'
import { rootReducer } from './rootReducer'

export const store = configureStore({
  reducer: rootReducer,
  preloadedState: getInitState(),

})

store.subscribe(() => window.localStorage.setItem(DOGFOOD_LS_KEY, JSON.stringify(store.getState())))

store.subscribe(() => {
  const cartsFromLS = window.localStorage.getItem(DOGFOOD_CART_LS_KEY)
  const currentState = store.getState()
  const parsedCartsFromLS = cartsFromLS ? JSON.parse(cartsFromLS) : {}
  if (currentState.user.id) {
    window.localStorage.setItem(DOGFOOD_CART_LS_KEY, JSON.stringify({
      ...parsedCartsFromLS,
      [currentState.user.id]: currentState.cart,
    }))
  }
})
