/* eslint-disable max-len */
/* eslint-disable no-underscore-dangle */
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { useSelector } from 'react-redux'
import ProductItem from '../ProductItem/ProductItem'
import withQuery from '../HOCs/withQuery'
import { DogFoodApiConst } from '../../api/DogFoodapi'
import { getSearchSelector } from '../../redux/slices/filterSlice'
import { getQuerySearchKey } from './utils'
import { getTokenSelector } from '../../redux/slices/userSlice'

function ProductsInner({ data }) {
  const products = data
  return (
    <div>
      {products[0] && (
      <ul className="d-flex p-2 flex-wrap align-items-center justify-content-around">
        {products.map((product) => (
          <ProductItem
            key={product._id}
            id={product._id}
            name={product.name}
            price={product.price}
            pictures={product.pictures}
          />
        ))}
      </ul>
      )}
      {!products[0] && products && (
      <h5 className="card-header">По вашему запросу ничего не найдено</h5>
      )}
    </div>

  )
}
const ProductsInnerWithQuery = withQuery(ProductsInner)

function Products() {
  const userToken = useSelector(getTokenSelector)
  const navigate = useNavigate()
  console.log({ userToken })
  useEffect(() => {
    if (!userToken) {
      navigate('/signin')
    }
  }, [userToken])

  const search = useSelector(getSearchSelector)
  const {
    data, isLoading, isError, error, refetch,
  } = useQuery({
    queryKey: getQuerySearchKey(search),
    queryFn: () => DogFoodApiConst.getAllProducts(search, userToken),
    enabled: (userToken !== undefined) && (userToken !== ''),
  })
  console.log({ data, key: getQuerySearchKey(search) })

  return <ProductsInnerWithQuery data={data} isLoading={isLoading} isError={isError} refetch={refetch} error={error} />
}

export default Products
