/* eslint-disable no-underscore-dangle */
import { useNavigate } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
// import { useEffect } from 'react'
import { useTokenContext } from '../../context/TokenContext'
import ProductItem from '../ProductItem/ProductItenm'

function Products() {
  const { userToken } = useTokenContext()
  const navigate = useNavigate()

  if (!userToken) navigate('/signin')

  console.log({ userToken })
  const {
    data, isLoading, isError, error, refetch,
  } = useQuery({
    queryKey: ['productsfetch'],
    queryFn: () => fetch('https://api.react-learning.ru/products', {
      headers: {
        authorization: `Bearer ${userToken}`,
      },
    }).then((res) => res.json()),
  })
  console.log({
    data, isLoading, isError, error, refetch,
  })

  return (

    <>
      <h1>Products</h1>
      <ul className="list-group">
        {data.products.map((product) => (
          <ProductItem
            key={product._id}
            name={product.name}
            price={product.price}
            stock={product.stock}

          />
        ))}
      </ul>

    </>

  )
}

export default Products
