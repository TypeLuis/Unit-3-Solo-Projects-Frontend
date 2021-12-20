import {useState, createContext} from 'react'

const UserContext = createContext()

const UserProvider = ({children}) => {
  const [ user, setUser ] = useState({})
  const [watched, setWatched] = useState([])
  const [pageId , setPageId] = useState(0)
  const [fave, setFave] = useState([])

  const state = {
    userState: [ user, setUser ],
    pageState: [pageId , setPageId],
    watchState : [watched, setWatched],
    faveState: [fave, setFave]
  }

  return (
    <UserContext.Provider value={ state }>
      { children }
    </UserContext.Provider>
  )
}

export { UserContext, UserProvider }