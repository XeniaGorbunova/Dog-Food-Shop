import { configureStore } from '@reduxjs/toolkit'
import { TOKEN_LS_KEY } from './constants'
import { initState } from './initState'
import { rootReducer } from './rootReducer'

export const store = configureStore({
  reducer: rootReducer,
  preloadedState: initState,

})

store.subscribe(() => window.localStorage.setItem(TOKEN_LS_KEY, JSON.stringify(store.getState())))
