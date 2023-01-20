/* eslint-disable max-len */
import { Link, NavLink } from 'react-router-dom'
import dog from '../../assets/dog.png'
import '../../index.css'
import { useTokenContext } from '../../context/TokenContext'

function Footer() {
  const { removeToken } = useTokenContext()

  return (
    <div className="p-3 position-sticky bottom-0 start-0 header_footer">
      <Link to="/">
        <img src={dog} alt="" />
      </Link>
      <h1>Dog Food</h1>
      <span>
        <NavLink to="/products" className={({ isActive }) => (isActive ? 'btn mx-1 btn-info' : 'btn mx-1 btn-primary')}>
          Каталог
        </NavLink>
        <button className="btn btn-info mx-2" type="button" onClick={() => removeToken()}>Выйти</button>
      </span>
    </div>
  )
}

export default Footer
