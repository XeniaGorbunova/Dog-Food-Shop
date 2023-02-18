/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable max-len */
import './FavoriteItem.css'
import { useDispatch } from 'react-redux'
import smallHeart from '../../assets/smallHeart.svg'
import { removeFavorite } from '../../redux/slices/favoriteSlice'

function FavoriteItem({
  name, pictures, price, id, description, stock, discount, count,
}) {
  const dispatch = useDispatch()
  console.log({ count })
  return (
    <li className="card" style={{ width: '100%' }}>
      <h5 className="card-header" style={{ height: '65px' }}>
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
            <img src={smallHeart} style={{ width: '30px', height: '30px' }} alt="not favorite" onClick={() => { dispatch(removeFavorite(id)) }} />
          </div>
          <img src={pictures} className="card-img-top product_picture" alt="product" />
        </div>
      </div>
    </li>
  )
}

export default FavoriteItem
