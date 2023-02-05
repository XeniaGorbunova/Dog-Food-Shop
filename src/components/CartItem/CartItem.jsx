/* eslint-disable max-len */
import './CartItem.css'
import { useDispatch } from 'react-redux'
import { deleteProduct } from '../../redux/slices/cartSlice'

function CartItem({
  name, pictures, price, id, description, store, discount,
}) {
  const dispatch = useDispatch()
  const deleteProductHandler = () => {
    console.log(id)
    dispatch(deleteProduct(id))
  }
  return (
    <li className="card" style={{ width: '100%' }}>
      <h5 className="card-header">{name}</h5>
      <div className="card-body">
        <h5 className="card-title">{price}</h5>
        <p className="card-text">{description}</p>
        <p className="card-text">{store}</p>
        <p className="card-text">{discount}</p>
        <button type="button" className="btn btn-primary" onClick={deleteProductHandler}>Удалить</button>
        <img src={pictures} className="card-img-top product_picture" alt="product" />
      </div>
    </li>
  )
}

export default CartItem
