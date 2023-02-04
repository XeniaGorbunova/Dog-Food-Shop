import { configureStore } from '@reduxjs/toolkit'
import { DogFoodApiConst } from '../api/DogFoodapi'
import { DOGFOOD_LS_KEY } from './constants'
import { getInitState } from './initState'
import { rootReducer } from './rootReducer'

export const store = configureStore({
  reducer: rootReducer,
  preloadedState: getInitState(),

})

store.subscribe(() => window.localStorage.setItem(DOGFOOD_LS_KEY, JSON.stringify(store.getState())))
store.subscribe(() => DogFoodApiConst.setToken(store.getState().user.token))
