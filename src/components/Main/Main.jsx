import { Link } from 'react-router-dom'

function Main() {
  console.log()

  return (
    <>
      <h1>Main</h1>
      <Link to="/products">
        Магазин
      </Link>

    </>
  )
}

export default Main
