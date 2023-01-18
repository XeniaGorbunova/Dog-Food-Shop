import { useQuery } from '@tanstack/react-query'

function Products() {
  const {
    data, isLoading, isError, error, refetch,
  } = useQuery({
    queryKey: ['productsfetch'],
    queryFn: () => fetch('https://api.react-learning.ru/products').then((res) => res.json()),
  })
  console.log({
    data, isLoading, isError, error, refetch,
  })

  return (
    <h1>Products</h1>
  )
}

export default Products
