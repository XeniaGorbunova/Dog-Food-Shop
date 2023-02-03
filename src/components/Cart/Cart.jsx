/* eslint-disable no-underscore-dangle */
/* eslint-disable max-len */
import { useDispatch, useSelector } from 'react-redux'
// import { Link } from 'react-router-dom'
import '../../index.css'
import { clearCart, getAllCartProductsSelector } from '../../redux/slices/cartSlice'
import CartItem from '../CartItem/CartItem'

function Cart() {
  const cartProducts = useSelector(getAllCartProductsSelector)
  const dispatch = useDispatch()
  console.log(cartProducts)
  const clearCartHandler = () => {
    dispatch(clearCart())
  }

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
            {cartProducts.map(({ _id: id, ...item }) => (
              <CartItem
                key={id}
                id={id}
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
