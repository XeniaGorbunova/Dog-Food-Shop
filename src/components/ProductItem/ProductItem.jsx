/* eslint-disable max-len */
function ProductItem({
  name, pictures, price,
}) {
  return (
    <li className="card m-2" style={{ width: '18rem', height: '22rem' }}>
      <img src={{ pictures }} className="card-img-top" alt="product" />
      <div className="card-body">
        <h5 className="card-title">{name}</h5>
        <p className="card-text">{price}</p>
        <button type="button" className="btn btn-primary">В корзину</button>
      </div>
    </li>
  )
}

export default ProductItem
