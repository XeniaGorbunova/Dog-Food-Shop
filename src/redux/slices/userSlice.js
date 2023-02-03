import { createSlice } from '@reduxjs/toolkit'
import { initState } from '../initState'

const userSlice = createSlice({
  name: 'user',
  initialState: initState.user,
  reducers: {
    setUser: {
      reducer(state, action) {
        console.log(state, action)
      },
      prepare(id, token, name, email) {
        return {
          payload: {
            id,
            token,
            name,
            email,
          },

        }
      },
    },
  },
})

export const getUserSelector = (state) => state.user
export const userReducer = userSlice.reducer
