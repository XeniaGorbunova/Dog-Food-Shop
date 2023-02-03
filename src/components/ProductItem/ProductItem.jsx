/* eslint-disable max-len */
import './ProductItem.css'
import { useDispatch } from 'react-redux'
import { addNewProduct } from '../../redux/slices/cartSlice'

function ProductItem({
  name, pictures, price, id,
}) {
  const dispatch = useDispatch()
  const moveToCartHandler = () => {
    dispatch(addNewProduct(id))
  }
  return (
    <li className="card m-2 product_card p-2">
      <img src={pictures} className="card-img-top product_picture" alt="product" />
      <div className="card-body">
        <h5 className="card-title">{name}</h5>
        <p className="card-text">{price}</p>
        <button type="button" className="btn btn-primary" onClick={moveToCartHandler}>В корзину</button>
      </div>
    </li>
  )
}

export default ProductItem
