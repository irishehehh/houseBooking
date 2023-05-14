import axios from 'axios'
import { useEffect, useState } from 'react'
import { createContext } from 'react'

export const UserContext = createContext({})


export function UserContextProvider({ children }) {
  const [ready,setReady] = useState(false)

  useEffect( ()=>{
      if (!user) {
        axios.get('/profile').then(({data}) => {
          setUser(data)
          setReady(true)

        })
        
  
  
    }


  },[])


  const [user,setUser] = useState(null)
  return ( <UserContext.Provider value={{user,setUser,ready}}>
    {children}
    
    </UserContext.Provider>)
}
