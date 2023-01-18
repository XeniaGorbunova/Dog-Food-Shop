import { useQuery } from '@tanstack/react-query'
import { useTokenContext } from '../../context/TokenContext'

function Products() {
  const { userToken } = useTokenContext()
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
    <h1>Products</h1>
  )
}

export default Products
