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
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <Main />,
      },
      {
        path: '/signup',
        element: <SignUp />,
      },
      {
        path: '/signin',
        element: <SignIn />,
      },
      {
        path: '/products',
        element: <Cathalog />,
      },
      {
        path: '/cart',
        element: <Cart />,
      },
      {
        path: '/product/:id',
        element: <DetailPage />,
      },
      {
        path: '/user/:id',
        element: <UserPage />,
      },
      {
        path: '/favorites',
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
