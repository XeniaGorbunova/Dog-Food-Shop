import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import './Main.css'

function Main() {
  console.log()

  return (
    <div className="picture">
      <div className="opacity">
        <motion.h1
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 1,
          }}
          className="mb-5"
        >
          Лакомства для счастливых собак
        </motion.h1>
        <Link to="/products">
          <motion.button type="button" className="btn btn-primary mt-4">
            перейти к покупкам
          </motion.button>

        </Link>
      </div>
    </div>
  )
}

export default Main
