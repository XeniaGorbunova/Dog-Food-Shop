/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable max-len */
import './FavoriteItem.css'
import { motion } from 'framer-motion'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import smallHeart from '../../assets/smallHeart.svg'
import { removeFavorite } from '../../redux/slices/favoriteSlice'
import done from '../../assets/done.svg'
import cart from '../../assets/cart.svg'
import { addNewProduct, deleteProduct, getAllCartProductsSelector } from '../../redux/slices/cartSlice'

function FavoriteItem({
  name, pictures, price, id, description, stock, discount, count,
}) {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const cartProducts = useSelector(getAllCartProductsSelector)
  const moveToCartHandler = () => {
    dispatch(addNewProduct(id))
  }
  const removeFromCartHandler = () => {
    dispatch(deleteProduct(id))
  }
  const navigateToDetailsHandler = (event) => {
    const { label } = event.target.dataset
    if (label !== 'notNavigate') navigate(`/product/${id}`)
  }
  const isInCart = (productListId) => cartProducts.find((product) => product.id === productListId)
  console.log({ count })
  return (
    <motion.li
      whileHover={{
        scale: 1.05,
      }}
      onClick={navigateToDetailsHandler}
      className="card"
      style={{ width: '100%', cursor: 'pointer' }}
    >
      <h5 className="card-header" style={{ height: '65px' }}>
        {name}
      </h5>
      <div className="card-body">
        <div className="d-flex flex-row gap-2">
          <div className="card-body">
            <div className="d-flex flex-row gap-3">
              <h5 className="card-title">
                {discount > 0 && `${((price * (100 - discount)) / 100)} ₽`}
                {discount === 0 && `${price} ₽`}
              </h5>
              {discount > 0 && (
              <h6 className="card-title" style={{ textDecoration: 'line-through', color: 'gray' }}>
                {price}
                ₽
              </h6>
              )}
            </div>
            <p className="card-text">{description}</p>
            <p className="card-text">
              В наличии:
              {' '}
              {stock}
            </p>
            <div className="d-flex flex-row gap-4 align-items-center">
              <motion.img
                whileHover={{
                  scale: 1.1,
                }}
                whileTap={{
                  scale: 0.9,
                }}
                data-label="notNavigate"
                src={smallHeart}
                style={{ width: '40px', height: '40px' }}
                alt="not favorite"
                onClick={() => { dispatch(removeFavorite(id)) }}
              />
              <motion.button
                type="button"
                whileHover={{
                  scale: 1.1,
                }}
                whileTap={{
                  scale: 0.9,
                }}
                data-label="notNavigate"
                className="btn btn-primary"
                onClick={isInCart(id) ? removeFromCartHandler : moveToCartHandler}
              >
                {isInCart(id) ? (
                  <img className="card__icon" src={done} alt="done" data-label="notNavigate" />
                ) : (
                  <img className="card__icon" src={cart} alt="cart" data-label="notNavigate" />
                )}
              </motion.button>
            </div>
          </div>
          <img src={pictures} className="card-img-top product_picture" alt="product" />
        </div>
      </div>
    </motion.li>
  )
}

export default FavoriteItem
