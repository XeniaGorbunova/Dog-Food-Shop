/* eslint-disable max-len */
import './CartItem.css'
import { useDispatch } from 'react-redux'
import { useState } from 'react'
import {
  changeIsPickProduct, productDecrement, productIncrement,
} from '../../redux/slices/cartSlice'
import minus from '../../assets/minus.svg'
import plus from '../../assets/plus.svg'
import DeleteItemModal from './DeleteItemModal'

function CartItem({
  name, pictures, price, id, description, stock, discount, isPicked, count,
}) {
  const dispatch = useDispatch()
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const openDeleteModalHandler = () => {
    setIsDeleteModalOpen(true)
  }
  const selectProductHandler = () => {
    dispatch(changeIsPickProduct(id))
  }
  const incrementCountHandler = () => {
    if (count < stock) { dispatch(productIncrement(id)) }
  }
  const decrementCountHandler = () => {
    if (count > 0) { dispatch(productDecrement(id)) }
  }
  console.log({ count })
  return (
    <li className="card" style={{ width: '100%' }}>
      <h5 className="card-header">
        <input type="checkbox" checked={isPicked} style={{ marginRight: '10px' }} onChange={selectProductHandler} />
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
          <div className="d-flex flex-row gap-2 px-2 align-items-center">
            <button type="button" className="btn btn-light" onClick={decrementCountHandler}>
              <img src={minus} alt="minus" className="number__icon" />
            </button>

            <h4>{count}</h4>
            <button type="button" className="btn btn-light" onClick={incrementCountHandler}>
              <img src={plus} alt="plus" className="number__icon" />
            </button>
          </div>
          <button type="button" className="btn btn-primary" onClick={openDeleteModalHandler}>Удалить</button>
        </div>
      </div>
      <DeleteItemModal
        isOpen={isDeleteModalOpen}
        setIsDeleteModalOpen={setIsDeleteModalOpen}
        title={name}
        id={id}
      />
    </li>
  )
}

export default CartItem
