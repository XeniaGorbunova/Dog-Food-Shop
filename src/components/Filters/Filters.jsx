import { useSearchParams } from 'react-router-dom'

export function Filters() {
  const [searchParams, setSearchParams] = useSearchParams()

  const FILTERS = ['Price', 'Sales', 'New']

  const clickFilterHandler = (filterName) => {
    const currentFilterName = searchParams.get('filterName')
    if (currentFilterName && currentFilterName.length && currentFilterName === filterName) {
      setSearchParams('', filterName)
      console.log('no')
    } else {
      setSearchParams({
        ...Object.fromEntries(searchParams.entries()),
        filterName,
      })
      console.log('yes')
    }
  }

  return (
    <div className="d-flex align-items-center justify-content-center gap-4 mb-2">
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
      className={filterName === currentFilterName ? 'btn btn-info' : 'btn btn-light'}
      onClick={() => clickFilterHandler(filterName)}
    >
      {filterName}
    </button>
  )
}
