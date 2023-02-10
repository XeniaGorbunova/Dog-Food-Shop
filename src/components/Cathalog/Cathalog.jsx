import { Filters } from '../Filters/Filters'
import Products from '../Products/Products'
import Search from '../Search/Search'

function Cathalog() {
  console.log()

  return (
    <div style={{ position: 'absolute', top: '120px' }}>
      <Search />
      <Filters />
      <Products />
    </div>
  )
}

export default Cathalog
