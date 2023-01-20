/* eslint-disable no-unused-vars */
import {
  createContext, useContext, useEffect, useState, useMemo, useCallback,
} from 'react'

export const TokenContext = createContext()

function TokenContextProvider({ children }) {
  const [userToken, setUserToken] = useState(() => {
    const tokenFromLs = localStorage.getItem('user_token')
    return tokenFromLs
  })

  useEffect(() => {
    localStorage.setItem('user_token', userToken)
  }, [userToken])

  const setNewToken = useCallback((newToken) => setUserToken(newToken), [setUserToken])

  const removeToken = useCallback(() => setUserToken(''), [setUserToken])

  const tokenValues = useMemo(() => ({
    userToken, setNewToken, removeToken,
  }), [userToken])

  return (
    <TokenContext.Provider value={tokenValues}>
      {children}
    </TokenContext.Provider>
  )
}

export default TokenContextProvider

export const useTokenContext = () => useContext(TokenContext)
