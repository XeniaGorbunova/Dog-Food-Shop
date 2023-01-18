/* eslint-disable no-unused-vars */
import {
  createContext, useContext, useEffect, useState, useMemo,
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

  const setNewToken = (newToken) => setUserToken(newToken)

  const tokenValues = useMemo(() => ({
    userToken, setNewToken,
  }), [])

  return (
    <TokenContext.Provider value={tokenValues}>
      {children}
    </TokenContext.Provider>
  )
}

export default TokenContextProvider

export const useTokenContext = () => useContext(TokenContext)
