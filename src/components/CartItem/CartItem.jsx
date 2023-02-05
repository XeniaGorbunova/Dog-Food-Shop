/* eslint-disable max-len */
import './CartItem.css'
import { useDispatch } from 'react-redux'
import { deleteProduct } from '../../redux/slices/cartSlice'
import minus from '../../assets/minus.svg'
import plus from '../../assets/plus.svg'

function CartItem({
  name, pictures, price, id, description, stock, discount,
}) {
  const dispatch = useDispatch()
  const deleteProductHandler = () => {
    console.log(id)
    dispatch(deleteProduct(id))
  }
  return (
    <li className="card" style={{ width: '100%' }}>
      <h5 className="card-header">
        <input type="checkbox" style={{ marginRight: '10px' }} />
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
          </div>
          <img src={pictures} className="card-img-top product_picture" alt="product" />
        </div>
        <div className="d-flex flex-row gap-4 px-3">
          <div className="card d-flex flex-row gap-3 px-4 p-1 align-items-center">
            <img src={minus} alt="minus" className="number__icon" />
            <h4>1</h4>
            <img src={plus} alt="plus" className="number__icon" />
          </div>
          <button type="button" className="btn btn-primary" onClick={deleteProductHandler}>Удалить</button>
        </div>
      </div>
    </li>
  )
}

export default CartItem
