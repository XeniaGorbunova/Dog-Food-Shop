import { Link } from 'react-router-dom'
import './Main.css'

function Main() {
  console.log()

  return (
    <div className="picture">
      <div className="opacity">
        <h1>Лакомства для счастливых собак</h1>
        <Link to="/products">
          <button type="button" className="btn btn-primary mt-4">
            перейти к покупкам
          </button>

        </Link>
      </div>
    </div>
  )
}

export default Main
