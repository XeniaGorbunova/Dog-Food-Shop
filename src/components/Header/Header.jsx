/* eslint-disable max-len */
import { Link, NavLink } from 'react-router-dom'
import '../../index.css'
import { useSelector } from 'react-redux'
import dogFace from '../../assets/dogFace.svg'
import dog from '../../assets/dog.png'
import cart from '../../assets/cart.svg'
import { getAllCartProductsSelector } from '../../redux/slices/cartSlice'

function Header() {
  console.log()
  const cartProducts = useSelector(getAllCartProductsSelector)
  return (
    <div className="p-3 header_footer">
      <Link to="/">
        <img src={dog} alt="" />
      </Link>
      <h1>Dog Food</h1>
      <div className="d-flex align-items-center justify-content-center">
        <NavLink to="/signin" className={({ isActive }) => (isActive ? 'active_link' : undefined)}>
          <img src={dogFace} alt="" style={{ width: '70px', height: '70px' }} />

        </NavLink>
        <NavLink to="/cart" className={({ isActive }) => (isActive ? 'active_link' : undefined)}>
          <img src={cart} alt="" style={{ width: '70px', height: '70px', padding: '10px' }} />
          {cartProducts.length}
        </NavLink>
      </div>
    </div>
  )
}

export default Header
