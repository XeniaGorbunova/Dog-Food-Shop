/* eslint-disable max-len */
/* eslint-disable no-underscore-dangle */
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { useTokenContext } from '../../context/TokenContext'
import ProductItem from '../ProductItem/ProductItem'
import withQuery from '../HOCs/withQuery'

function ProductsInner({ data }) {
  const { products } = data
  return (

    <>
      <h1>Products</h1>
      {products && (
      <ul className="d-flex p-2 flex-wrap align-items-center justify-content-around">
        {products.map((product) => (
          <ProductItem
            key={product._id}
            name={product.name}
            price={product.price}
            stock={product.stock}
          />
        ))}
      </ul>
      )}

    </>

  )
}
const ProductsInnerWithQuery = withQuery(ProductsInner)

function Products() {
  const { userToken } = useTokenContext()
  const navigate = useNavigate()

  useEffect(() => {
    if (!userToken) {
      navigate('/signin')
    }
  }, [userToken])

  console.log({ userToken })
  const {
    data, isLoading, isError, error, refetch,
  } = useQuery({
    queryKey: ['productsfetch'],
    queryFn: () => fetch('https://api.react-learning.ru/products', {
      headers: {
        authorization: `Bearer ${userToken}`,
      },
    })
      .then((res) => {
        if (res.status >= 400) {
          throw new Error(`${res.status}: Произошла ошибка при получении информации о товарах. Попробуйте сделать запрос позже.`)
        }
        return res.json()
      }),
    enabled: (userToken !== undefined) && (userToken !== ''),
  })
  console.log({
    data, isLoading, isError, error, refetch,
  })

  return <ProductsInnerWithQuery data={data} isLoading={isLoading} isError={isError} refetch={refetch} error={error} />
}

export default Products
