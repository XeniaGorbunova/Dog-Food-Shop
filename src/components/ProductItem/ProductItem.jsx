/* eslint-disable max-len */
import './ProductItem.css'
import { useDispatch, useSelector } from 'react-redux'
import { motion } from 'framer-motion'
import { addNewProduct, deleteProduct, getAllCartProductsSelector } from '../../redux/slices/cartSlice'
import done from '../../assets/done.svg'
import cart from '../../assets/cart.svg'

function ProductItem({
  name, pictures, price, id,
}) {
  const cartProducts = useSelector(getAllCartProductsSelector)

  const dispatch = useDispatch()
  const moveToCartHandler = () => {
    dispatch(addNewProduct(id))
  }
  const removeFromCartHandler = () => {
    dispatch(deleteProduct(id))
  }
  const isInCart = (productListId) => cartProducts.find((product) => product.id === productListId)
  return (
    <li className="card m-2 product_card p-2">
      <img src={pictures} className="card-img-top product_picture" alt="product" />
      <div className="card-body">
        <h5 className="card-title">{name}</h5>
        <p className="card-text">
          {price}
          {' '}
          ₽
        </p>
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
    </li>
  )
}

export default ProductItem
