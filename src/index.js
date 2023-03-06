/* eslint-disable import/no-extraneous-dependencies */
import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom'
import { Provider } from 'react-redux/es/exports'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import App from './App'
import Main from './components/Main/Main'
import SignIn from './components/SignIn/SignIn'
import SignUp from './components/SignUp/SignUp'
import './index.css'
import Cart from './components/Cart/Cart'
import { store } from './redux/store'
import Cathalog from './components/Cathalog/Cathalog'
import { PageNotFound } from './components/PageNotFound/PageNotFound'
import DetailPage from './components/DatailPage/DetailPage'
import UserPage from './components/UserPage/UserPage'
import FavoritesPage from './components/Favorites/Favorites'
// import App from './App'

const router = createBrowserRouter([
  {
    path: '/Dog-Food-Shop/',
    element: <App />,
    children: [
      {
        index: true,
        element: <Main />,
      },
      {
        path: '/Dog-Food-Shop/signup',
        element: <SignUp />,
      },
      {
        path: '/Dog-Food-Shop/signin',
        element: <SignIn />,
      },
      {
        path: '/Dog-Food-Shop/products',
        element: <Cathalog />,
      },
      {
        path: '/Dog-Food-Shop/cart',
        element: <Cart />,
      },
      {
        path: '/Dog-Food-Shop/product/:id',
        element: <DetailPage />,
      },
      {
        path: '/Dog-Food-Shop/user/:id',
        element: <UserPage />,
      },
      {
        path: '/Dog-Food-Shop/favorites',
        element: <FavoritesPage />,
      },
      {
        path: '*',
        element: <PageNotFound />,
      },
    ],
  },
])

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
})

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>

    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </QueryClientProvider>

  </React.StrictMode>,
)
