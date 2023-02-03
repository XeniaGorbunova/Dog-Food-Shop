/* eslint-disable max-len */
import './CartItem.css'
import { useDispatch } from 'react-redux'
import { deleteProduct } from '../../redux/slices/cartSlice'

function CartItem({
  name, pictures, price, id,
}) {
  const dispatch = useDispatch()
  const deleteProductHandler = () => {
    console.log(id)
    dispatch(deleteProduct(id))
  }
  return (
    <li className="card m-2 product_card p-2">
      <img src={pictures} className="card-img-top product_picture" alt="product" />
      <div className="card-body">
        <h5 className="card-title">{name}</h5>
        <p className="card-text">{price}</p>
        <button type="button" className="btn btn-primary" onClick={deleteProductHandler}>Удалить</button>
      </div>
    </li>
  )
}

export default CartItem
