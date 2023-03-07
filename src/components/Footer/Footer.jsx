/* eslint-disable max-len */
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import dog from '../../assets/dog.png'
import '../../index.css'
import { clearCart } from '../../redux/slices/cartSlice'
import { getTokenSelector, logOut } from '../../redux/slices/userSlice'
import AddProductModal from '../AddProductModal/AddProductModal'

function Footer() {
  const userToken = useSelector(getTokenSelector)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const handleLogOut = () => {
    dispatch(logOut())
    dispatch(clearCart())
    navigate('/Dog-Food-Shop/signin')
  }
  const handleAddModalOpen = () => {
    setIsAddModalOpen(true)
  }
  return (
    <div className="p-3 position-fixed bottom-0 start-0 header_footer">
      <Link to="/Dog-Food-Shop/">
        <img src={dog} alt="" />
      </Link>
      <h1>Dog Food</h1>
      <span>
        <button className="btn mx-2" type="button" onClick={handleAddModalOpen}>Добавить товар</button>
        <NavLink to="/Dog-Food-Shop/products" className={({ isActive }) => (isActive ? 'btn mx-1 btn-info' : 'btn mx-1 btn-primary')}>
          Каталог
        </NavLink>
        <button className={userToken ? 'btn btn-info mx-2' : 'btn btn-light mx-2'} type="button" onClick={handleLogOut}>Выйти</button>
      </span>
      <AddProductModal
        isOpen={isAddModalOpen}
        setIsAddModalOpen={setIsAddModalOpen}
      />
    </div>
  )
}

export default Footer
