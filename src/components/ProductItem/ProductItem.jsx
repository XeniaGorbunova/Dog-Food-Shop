/* eslint-disable max-len */
import './ProductItem.css'
import { useDispatch, useSelector } from 'react-redux'
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
        <button type="button" className="btn btn-primary" onClick={isInCart(id) ? removeFromCartHandler : moveToCartHandler}>
          {isInCart(id) ? (
            <img className="card__icon" src={done} alt="done" />
          ) : (
            <img className="card__icon" src={cart} alt="cart" />
          )}
        </button>
      </div>
    </li>
  )
}

export default ProductItem
