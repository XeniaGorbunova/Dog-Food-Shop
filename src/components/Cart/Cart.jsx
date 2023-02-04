/* eslint-disable no-underscore-dangle */
/* eslint-disable max-len */
import { useDispatch, useSelector } from 'react-redux'
import { useQuery } from '@tanstack/react-query'
// import { Link } from 'react-router-dom'
import '../../index.css'
import { clearCart, getAllCartProductsSelector } from '../../redux/slices/cartSlice'
import CartItem from '../CartItem/CartItem'
import { DogFoodApiConst } from '../../api/DogFoodapi'
import { getTokenSelector } from '../../redux/slices/userSlice'
import Loader from '../Loader/Loader'

function Cart() {
  const cart = useSelector(getAllCartProductsSelector)
  const userToken = useSelector(getTokenSelector)
  DogFoodApiConst.setToken(userToken)
  const dispatch = useDispatch()
  const {
    data: cartProducts, isLoading, isError, error,
  } = useQuery({
    queryKey: ['cart'],
    queryFn: () => DogFoodApiConst.getProductsByIds(cart.map((product) => product.id)),
  })
  console.log(cartProducts)
  const clearCartHandler = () => {
    dispatch(clearCart())
  }

  if (isLoading) return <Loader />
  if (isError) return <p>{`Error: ${error} `}</p>
  return (
  // {!cartProducts[1] && (
  //   <div className="d-flex align-items-center justify-content-center flex-column">
  //   <h1>Ваша корзина пуста</h1>
  //   <Link to="/products">
  //     <button type="button" className="btn btn-primary mt-4">
  //       перейти к покупкам
  //     </button>
  //     </Link>
  //     </div>
  //   )}

    <div className="d-flex align-items-center justify-content-center flex-column">
      {cartProducts[0] && (
        <>
          <ul className="d-flex p-2 flex-wrap align-items-center justify-content-around">
            {cartProducts.map((item) => (
              <CartItem
                key={item.id}
                id={item.id}
                name={item.name}
                price={item.price}
                pictures={item.pictures}
              />
            ))}
          </ul>
          <button type="button" className="btn btn-primary mt-4" onClick={clearCartHandler}>
            Очистить
          </button>

        </>
      )}
    </div>
  )
}

export default Cart
