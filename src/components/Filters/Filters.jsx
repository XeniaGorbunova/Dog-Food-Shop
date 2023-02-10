import { useSearchParams } from 'react-router-dom'
import styles from './Filters.module.css'

export function Filters() {
  const [searchParams, setSearchParams] = useSearchParams()

  const FILTERS = ['Price', 'Sales', 'New']

  const clickFilterHandler = (filterName) => {
    setSearchParams({
      ...Object.fromEntries(searchParams.entries()),
      filterName,
    })
  }

  return (
    <div>
      {FILTERS.map((filter) => (
        <FilterItem key={filter} filterName={filter} clickFilterHandler={clickFilterHandler} />))}
    </div>
  )
}

export function FilterItem({ filterName, clickFilterHandler }) {
  const [searchParams] = useSearchParams()
  const currentFilterName = searchParams.get('filterName')

  return (
    <button
      type="button"
      className={filterName === currentFilterName ? styles.active : ''}
      onClick={() => clickFilterHandler(filterName)}
    >
      {filterName}
    </button>
  )
}
