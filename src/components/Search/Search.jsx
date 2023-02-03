import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useDebounce } from '../../hooks/useDebounce'
import { changeSearchFilter } from '../../redux/slices/filterSlice'

function Search() {
  const [search, setSearch] = useState('')
  const dispatch = useDispatch()
  const debouncedSearchValue = useDebounce(search, 750)
  const searchHandler = (e) => {
    const newSearchValue = e.target.value
    setSearch(newSearchValue)
  }

  useEffect(() => {
    dispatch(changeSearchFilter(debouncedSearchValue))
  }, [dispatch, debouncedSearchValue])

  return (
    <input
      placeholder="Поиск"
      type="text"
      className="form-control m-3"
      style={{ width: '60%' }}
      value={search}
      onChange={searchHandler}
    />
  )
}

export default Search
