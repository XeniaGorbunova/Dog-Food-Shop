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
  name, pictures, price, id, discount, weight,
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
    if (event.target.dataset.label !== 'notNavigate') navigate(`/product/${id}`)
  }
  const isInCart = (productListId) => cartProducts.find((product) => product.id === productListId)
  return (
    <motion.li
      className="card m-3 product_card p-2"
      onClick={navigateToDetailsHandler}
      whileHover={{
        scale: 1.05,
      }}
    >

      <img src={pictures} className="card-img-top product_picture" alt="product" />

      {favorites.includes(id) && (
        <img
          src={redHeart}
          className="card__icon-favorite"
          alt="favorite"
          data-label="notNavigate"
          onClick={() => { dispatch(removeFavorite(id)) }}
        />
      )}
      {!favorites.includes(id) && (
        <img
          src={smallHeart}
          className="card__icon-favorite"
          alt="not favorite"
          data-label="notNavigate"
          onClick={() => { dispatch(addFavorite(id)) }}
        />
      )}
      <div className="card-body" style={{ minWidth: '270px' }}>
        <h5 className="card-title" style={{ minHeight: '48px', overflow: 'hidden' }}>{name}</h5>
        <div className="d-flex flex-row align-items-center justify-content-between">
          <b className="card-text mb-0 mt-1">
            {price}
            {' '}
            ₽
          </b>
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
        <small className="mb-2">{weight}</small>
        <motion.button
          type="button"
          data-label="notNavigate"
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
            <img className="card__icon" src={done} alt="done" data-label="notNavigate" />
          ) : (
            <img className="card__icon" src={cart} alt="cart" data-label="notNavigate" />
          )}
        </motion.button>
      </div>
    </motion.li>
  )
}

export default ProductItem
