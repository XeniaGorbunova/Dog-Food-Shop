/* eslint-disable max-len */
import './ProductItem.css'

function ProductItem({
  name, pictures, price,
}) {
  return (
    <li className="card m-2 product_card p-2">
      <img src={pictures} className="card-img-top product_picture" alt="product" />
      <div className="card-body">
        <h5 className="card-title">{name}</h5>
        <p className="card-text">{price}</p>
        <button type="button" className="btn btn-primary">В корзину</button>
      </div>
    </li>
  )
}

export default ProductItem
