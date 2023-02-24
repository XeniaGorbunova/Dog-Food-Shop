/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-underscore-dangle */
/* eslint-disable max-len */
import { useDispatch, useSelector } from 'react-redux'
import { useQuery } from '@tanstack/react-query'
import { Link, useNavigate } from 'react-router-dom'
import '../../index.css'
import { useEffect } from 'react'
import {
  clearCart, getAllCartProductsSelector, notPickAllProducts, pickAllProducts,
} from '../../redux/slices/cartSlice'
import CartItem from '../CartItem/CartItem'
import { DogFoodApiConst } from '../../api/DogFoodapi'
import { getTokenSelector } from '../../redux/slices/userSlice'
import Loader from '../Loader/Loader'
import { getQueryCartKey } from '../Products/utils'

function Cart() {
  const cart = useSelector(getAllCartProductsSelector)
  const userToken = useSelector(getTokenSelector)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  useEffect(() => {
    if (!userToken) {
      navigate('/signin')
    }
  }, [userToken])
  const {
    data: cartProducts, isLoading, isError, error,
  } = useQuery({
    queryKey: [getQueryCartKey(cart.length)],
    queryFn: () => DogFoodApiConst.getProductsByIds(cart.map((product) => product.id), userToken),
    enabled: !!(userToken),
  })
  console.log(cartProducts)
  const clearCartHandler = () => {
    dispatch(clearCart())
  }
  const isAllCardPicked = () => cart.filter((item) => item.isPicked === true).length === cart.length
  const findAllPickedProducts = () => {
    const allPickedProducts = []
    cart.forEach((item) => {
      if (item.isPicked === true) allPickedProducts.push(item)
    })
    return allPickedProducts
  }

  const getCartProductById = (idItem) => cartProducts.find((product) => product._id === idItem)
  const getCartStateProductById = (idItem) => cart.find((product) => product.id === idItem)
  const pickAllProductsHandler = () => {
    if (!isAllCardPicked()) dispatch(pickAllProducts())
    else dispatch(notPickAllProducts())
  }
  const calculateSum = () => findAllPickedProducts().reduce((sum, product) => {
    const updatedSum = sum + product.count * getCartProductById(product.id).price
    return Math.ceil(updatedSum)
  }, 0)
  const calculateDiscount = () => findAllPickedProducts().reduce((sum, product) => {
    const updatedSum = sum + product.count * getCartProductById(product.id).price * (getCartProductById(product.id).discount / 100)
    return Math.ceil(updatedSum)
  }, 0)
  const calculateSumWithDiscount = () => findAllPickedProducts().reduce((sum, product) => {
    const updatedSum = sum + product.count * getCartProductById(product.id).price * ((100 - getCartProductById(product.id).discount) / 100)
    return Math.ceil(updatedSum)
  }, 0)
  if (isLoading) return <Loader />
  if (isError) return <p>{`${error} `}</p>

  return (
    <div style={{ width: '100%' }}>
      {!cart[0] && (
      <div className="d-flex align-items-center justify-content-center flex-column mt-5">
        <h1>Ваша корзина пуста</h1>
        <Link to="/products">
          <button type="button" className="btn btn-primary mt-4">
            перейти к покупкам
          </button>
        </Link>
      </div>
      )}

      {cartProducts[0] && (
        <div className="d-flex flex-row justify-content-between" style={{ width: '100%', marginBottom: '100px' }}>
          <div
            className="d-flex p-2 flex-column"
            style={{ width: '70%' }}
          >
            <div className="d-flex p-4 flex-row gap-2 align-items-center  justify-content-between">
              <span className="d-flex flex-row gap-2">
                <input id="select_all" type="checkbox" checked={isAllCardPicked()} onChange={pickAllProductsHandler} />
                <label htmlFor="select_all">Выбрать все</label>
              </span>
              <button type="button" className="btn btn-primary mt-4" onClick={clearCartHandler}>
                Очистить
              </button>
            </div>
            <ul
              className="d-flex flex-column gap-3 p-2  align-items-start justify-content-start"
            >
              {cartProducts.map((item) => (
                <CartItem
                  key={item._id}
                  id={item._id}
                  name={item.name}
                  price={item.price}
                  pictures={item.pictures}
                  stock={item.stock}
                  discount={item.discount}
                  description={item.description}
                  isPicked={getCartStateProductById(item._id)?.isPicked}
                  count={getCartStateProductById(item._id)?.count}
                />
              ))}
            </ul>
          </div>
          <div style={{ width: '30%' }} className="d-flex flex-column gap-3 m-3">
            <h5>Информация о заказе:</h5>
            <p>
              Сумма:
              {' '}
              {calculateSum() || 0}
              {' '}
              ₽
            </p>
            <p>
              Скидка:
              {' '}
              {calculateDiscount() || 0}
              {' '}
              ₽
            </p>
            <h5>
              К оплате:
              {' '}
              {calculateSumWithDiscount() || 0}
              {' '}
              ₽
            </h5>
            <button type="button" className="btn btn-primary mt-4">
              Оформить
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default Cart
