import {
  createContext, useContext, useEffect, setState,
} from 'react'

export const TokenContext = createContext()

function TokenContextProvider({ children }) {
  const [userToken, setUserToken] = setState('')

  useEffect(() => {
    setUserToken(localStorage.getItem('user_token'))
  }, [userToken])

  return (
    <TokenContext.Provider value={userToken}>
      {children}
    </TokenContext.Provider>
  )
}

export default TokenContextProvider

export const useTokenContext = () => useContext(TokenContext)
