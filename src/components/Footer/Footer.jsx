/* eslint-disable max-len */
import { Link, NavLink } from 'react-router-dom'
import dog from '../../assets/dog.png'
import '../../index.css'

function Footer() {
  console.log()

  return (
    <div className="p-3 header_footer">
      <Link to="/">
        <img src={dog} alt="" />
      </Link>
      <h1>Dog Food</h1>
      <span>
        <NavLink to="/products" className={({ isActive }) => (isActive ? 'btn btn-info' : 'btn btn-primary')}>
          Каталог
        </NavLink>
        <button className="btn btn-info mx-3" type="button" onClick={() => localStorage.setItem('user_token', '')}>Выйти</button>
      </span>
    </div>
  )
}

export default Footer
