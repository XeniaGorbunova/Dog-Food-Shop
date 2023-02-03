import { useEffect, useState } from 'react'

export const useDebounce = (value, ms = 500) => {
  const [debouncedValue, setDebouncedValue] = useState()

  useEffect(() => {
    const timeOutId = setTimeout(() => {
      setDebouncedValue(value)
    }, ms)

    return () => {
      clearTimeout(timeOutId)
    }
  }, [ms, value])

  return debouncedValue
}
