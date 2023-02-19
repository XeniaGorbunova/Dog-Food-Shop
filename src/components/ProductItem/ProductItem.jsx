/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable max-len */
import './ProductItem.css'
import { useDispatch, useSelector } from 'react-redux'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { addNewProduct, deleteProduct, getAllCartProductsSelector } from '../../redux/slices/cartSlice'
import done from '../../assets/done.svg'
import cart from '../../assets/cart.svg'
import smallHeart from '../../assets/smallHeart.svg'
import redHeart from '../../assets/redHeart.svg'
import { addFavorite, getAllFavoriteProductsSelector, removeFavorite } from '../../redux/slices/favoriteSlice'

function ProductItem({
  name, pictures, price, id, discount,
}) {
  const cartProducts = useSelector(getAllCartProductsSelector)
  const favorites = useSelector(getAllFavoriteProductsSelector)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const moveToCartHandler = () => {
    dispatch(addNewProduct(id))
  }
  const removeFromCartHandler = () => {
    dispatch(deleteProduct(id))
  }
  const navigateToDetailsHandler = (event) => {
    if (event.target.className !== 'card__icon-favorite') navigate(`/product/${id}`)
  }
  const isInCart = (productListId) => cartProducts.find((product) => product.id === productListId)
  return (
    <motion.li
      className="card m-2 product_card p-2"
      onClick={navigateToDetailsHandler}
      whileHover={{
        scale: 1.05,
      }}
    >

      <img src={pictures} className="card-img-top product_picture" alt="product" />

      {favorites.includes(id) && <img src={redHeart} className="card__icon-favorite" alt="favorite" onClick={() => { dispatch(removeFavorite(id)) }} />}
      {!favorites.includes(id) && <img src={smallHeart} className="card__icon-favorite" alt="not favorite" onClick={() => { dispatch(addFavorite(id)) }} />}
      <div className="card-body">
        <h5 className="card-title">{name}</h5>
        <div className="d-flex flex-row align-items-center justify-content-between">
          <p className="card-text mb-0">
            {price}
            {' '}
            ₽
          </p>
          {discount > 0 && (
          <span className="badge rounded-pill bg-info text-dark">
            -
            {' '}
            {discount}
            {' '}
            %
          </span>
          )}
        </div>
        <motion.button
          type="button"
          whileHover={{
            scale: 1.1,
          }}
          whileTap={{
            scale: 0.9,
          }}
          className="btn btn-primary"
          onClick={isInCart(id) ? removeFromCartHandler : moveToCartHandler}
        >
          {isInCart(id) ? (
            <img className="card__icon" src={done} alt="done" />
          ) : (
            <img className="card__icon" src={cart} alt="cart" />
          )}
        </motion.button>
      </div>
    </motion.li>
  )
}

export default ProductItem
