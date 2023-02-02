/* eslint-disable max-len */
/* eslint-disable no-underscore-dangle */
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { useTokenContext } from '../../context/TokenContext'
import ProductItem from '../ProductItem/ProductItem'
import withQuery from '../HOCs/withQuery'
import { DogFoodApiConst } from '../../api/DogFoodapi'
import Search from '../Search/Search'

function ProductsInner({ data }) {
  const { products } = data
  return (

    <>
      <h1>Products</h1>
      <Search />
      {products && (
      <ul className="d-flex p-2 flex-wrap align-items-center justify-content-around">
        {products.map((product) => (
          <ProductItem
            key={product._id}
            name={product.name}
            price={product.price}
            pictures={product.pictures}
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
  console.log({ userToken })
  useEffect(() => {
    if (!userToken) {
      navigate('/signin')
    }
  }, [userToken])

  const {
    data, isLoading, isError, error, refetch,
  } = useQuery({
    queryKey: ['productsfetch'],
    queryFn: () => DogFoodApiConst.getAllProducts(),
    enabled: (userToken !== undefined) && (userToken !== ''),
  })
  console.log({
    data, isLoading, isError, error, refetch,
  })

  return <ProductsInnerWithQuery data={data} isLoading={isLoading} isError={isError} refetch={refetch} error={error} />
}

export default Products
