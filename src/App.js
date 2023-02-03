import './App.css'
import { Outlet } from 'react-router-dom'
import './index.css'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import Search from './components/Search/Search'

function App() {
  return (
    <div className="container_100 d-flex flex-column justify-content-between align-items-center">
      <Header />
      <Search />
      <Outlet />
      <Footer />
    </div>
  )
}

export default App
