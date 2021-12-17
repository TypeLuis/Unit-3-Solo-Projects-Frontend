import {useState, createContext} from 'react'

const UserContext = createContext()

const UserProvider = ({children}) => {
  const [ user, setUser ] = useState({})

  const [pageId , setPageId] = useState(0)

  const state = {
    userState: [ user, setUser ],
    pageState: [pageId , setPageId]
  }

  return (
    <UserContext.Provider value={ state }>
      { children }
    </UserContext.Provider>
  )
}

export { UserContext, UserProvider }