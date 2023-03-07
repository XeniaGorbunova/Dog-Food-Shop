/* eslint-disable max-len */
import { Link, NavLink } from 'react-router-dom'
import '../../index.css'
import './Header.css'
import { useSelector } from 'react-redux'
import dogFace from '../../assets/dogFace.svg'
import dog from '../../assets/dog.png'
import cart from '../../assets/cart.svg'
import heart from '../../assets/heart.svg'
import person from '../../assets/person.svg'
import { getAllCartProductsSelector } from '../../redux/slices/cartSlice'
import { getUserSelector } from '../../redux/slices/userSlice'

function Header() {
  const cartProducts = useSelector(getAllCartProductsSelector)
  const { id: userId } = useSelector(getUserSelector)
  return (
    <div className="p-3 header_footer">
      <Link to="/Dog-Food-Shop/">
        <img src={dog} alt="" />
      </Link>
      <h1>Dog Food</h1>
      <div className="d-flex gap-3 align-items-center justify-content-center">

        <NavLink to="/Dog-Food-Shop/signin" className={({ isActive }) => (isActive ? 'active_link' : undefined)}>
          <img src={dogFace} alt="sign in link" style={{ width: '70px', height: '70px' }} />

        </NavLink>
        <NavLink to="/Dog-Food-Shop/favorites" className={({ isActive }) => (isActive ? 'active_link' : undefined)}>
          <img src={heart} alt="favorites link" style={{ width: '70px', height: '70px', padding: '13px' }} />

        </NavLink>
        <NavLink to={`/Dog-Food-Shop/user/${userId}`} className={({ isActive }) => (isActive ? 'active_link' : undefined)}>
          <img src={person} alt="profile link" style={{ width: '70px', height: '70px', padding: '13px' }} />

        </NavLink>
        <NavLink to="/Dog-Food-Shop/cart" className={({ isActive }) => (isActive ? 'active_link' : undefined)}>
          <img
            src={cart}
            alt=""
            style={{
              width: '70px', height: '70px', padding: '10px', position: 'relative',
            }}
          />
          <span className="cart__number">
            {cartProducts.length}
          </span>
        </NavLink>
      </div>
    </div>
  )
}

export default Header
