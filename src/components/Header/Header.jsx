import { Link, NavLink } from 'react-router-dom'
import '../../index.css'
import dogFace from '../../assets/dogFace.svg'
import dog from '../../assets/dog.png'

function Header() {
  console.log()

  return (
    <div className="p-3 header_footer">
      <Link to="/">
        <img src={dog} alt="" />
      </Link>
      <h1>Dog Food</h1>
      <NavLink to="/signup" className={({ isActive }) => (isActive ? 'active_link' : undefined)}>
        <img src={dogFace} alt="" style={{ width: '70px', height: '70px' }} />

      </NavLink>
    </div>
  )
}

export default Header
