function ProductItem({
  name, stock, pictures, price,
}) {
  return (
    <li className="list-group-item d-flex justify-content-between align-items-center">
      <img src={pictures} alt="product" />
      <p>{name}</p>
      <b>{price}</b>
      <p>{stock}</p>
    </li>

  )
}

export default ProductItem
