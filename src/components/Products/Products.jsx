/* eslint-disable prefer-const */
/* eslint-disable max-len */
/* eslint-disable no-underscore-dangle */
import { useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { useSelector } from 'react-redux'
import ProductItem from '../ProductItem/ProductItem'
import withQuery from '../HOCs/withQuery'
import { DogFoodApiConst } from '../../api/DogFoodapi'
import { getSearchSelector } from '../../redux/slices/filterSlice'
import { getQuerySearchKey } from './utils'
import { getTokenSelector } from '../../redux/slices/userSlice'

function ProductsInner({ data }) {
  let products = [...data]
  const [searchParams] = useSearchParams()
  const currentFilterName = searchParams.get('filterName')
  console.log(currentFilterName)
  // useEffect(() => {
  switch (currentFilterName) {
    case null:
      products = [...data]
      break
    case 'Новинки':
      products = products.sort((item, nextItem) => {
        const itemTime = new Date(Date.parse(item.updated_at))
        const nextItemTime = new Date(Date.parse(nextItem.updated_at))
        if (itemTime < nextItemTime) {
          return -1
        }
        if (itemTime > nextItemTime) {
          return 1
        }
        return 0
      })
      break
    case 'Скидки':
      products = products.filter((item) => item.discount > 0).sort((item, nextItem) => {
        if (item.discount > nextItem.discount) {
          return -1
        }
        if (item.discount < nextItem.discount) {
          return 1
        }
        return 0
      })
      break
    case 'Дороже':
      products = products.sort((item, nextItem) => {
        if (item.price > nextItem.price) {
          return -1
        }
        if (item.price < nextItem.price) {
          return 1
        }
        return 0
      })
      break
    case 'Дешевле':
      products = products.sort((item, nextItem) => {
        if (item.price < nextItem.price) {
          return -1
        }
        if (item.price > nextItem.price) {
          return 1
        }
        return 0
      })
      break

    default:
      break
  }
  // }, [currentFilterName, products])
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
            discount={product.discount}
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
    enabled: !!(userToken),
  })
  console.log({ data })

  return <ProductsInnerWithQuery data={data} isLoading={isLoading} isError={isError} refetch={refetch} error={error} />
}

export default Products
