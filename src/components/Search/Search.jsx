import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useSearchParams } from 'react-router-dom'
import { useDebounce } from '../../hooks/useDebounce'
import { changeSearchFilter } from '../../redux/slices/filterSlice'

function Search() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [search, setSearch] = useState(() => {
    const searchParamsFromQuery = searchParams.get('q')
    return searchParamsFromQuery ?? ''
  })
  const dispatch = useDispatch()

  const debouncedSearchValue = useDebounce(search, 750)
  const searchHandler = (e) => {
    const newSearchValue = e.target.value
    setSearch(newSearchValue)
    setSearchParams({
      ...Object.fromEntries(searchParams.entries()),
      q: newSearchValue,
    })
  }

  useEffect(() => {
    dispatch(changeSearchFilter(debouncedSearchValue))
  }, [dispatch, debouncedSearchValue])

  return (
    <input
      placeholder="Поиск"
      type="text"
      className="form-control"
      style={{ width: '500px', margin: '24px auto' }}
      value={search}
      onChange={searchHandler}
    />
  )
}

export default Search
