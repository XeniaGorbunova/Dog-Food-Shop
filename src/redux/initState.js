import { DOGFOOD_LS_KEY } from './constants'

export const initState = {
  user: {
    group: '',
    name: '',
    email: '',
    token: '',
  },
  products: [],
  cart: [],
  filter: {
    search: '',
  },
}

export const getInitState = () => {
  const dataFromLS = window.localStorage.getItem(DOGFOOD_LS_KEY)

  return dataFromLS ? JSON.parse(dataFromLS) : initState
}
