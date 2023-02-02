/* eslint-disable max-len */
import { Link } from 'react-router-dom'
import '../../index.css'

function Cart() {
  return (
    <div className="d-flex align-items-center justify-content-center flex-column">
      <h1>Ваша корзина пуста</h1>
      <Link to="/products">
        <button type="button" className="btn btn-primary mt-4">
          перейти к покупкам
        </button>

      </Link>
    </div>
  )
}

export default Cart
