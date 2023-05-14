import axios from "axios"
import { useContext,useEffect,useState } from "react"
import {  Navigate, useLocation, useParams } from "react-router-dom"
import AccountNav from "../components/AccountNav"
import { UserContext } from "../UserContext"
import Bookings from "./Bookings"

import PlacePage from "./PlacePage"




const Account = () => {
  let {subpage} = useParams()
 

 
  const [redirect,setRedirect] = useState(null)
  if (subpage === undefined) {
    subpage = 'profile'
  }

  
 

  // 获取context state 准备 还有user 信息
 const {user,ready,setUser} =   useContext(UserContext)

    // 退出登录逻辑
    async function logout () {
      await axios.post('/logout')
      setRedirect('/')
        setUser(null)
       
   
   
   
   
     }
     
  
 // 没准备好，加载中
    if (!ready) {
      return 'Loading...'
    }
    // 准备好，但是没有user信息 重定向到登录页面
    if(ready && !user && !redirect) {
    
      return <Navigate to={'/login'}/>
    }

  
    if (redirect) {
     
     return <Navigate to={redirect}/>
    }

    


  return (
    <div>
      <AccountNav/>
      {subpage === 'profile' && (
        <div className="text-center max-w-xl mx-auto">
          用户: {user?.name} ({user?.email}) 登录成功 <br/>
          <button className="primary max-w-sm shadow-md shadow-gray-300 mt-3" onClick={logout}>退出登录</button>


        </div>
      )}
      
    
      {subpage === 'places' && (
          <PlacePage/>
      )}



     

    </div>
  )


}

export default Account