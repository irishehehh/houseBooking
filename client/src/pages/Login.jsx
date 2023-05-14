import axios from "axios";
import { useContext, useState } from "react"
import { Link, Navigate } from "react-router-dom"
import { UserContext } from "../UserContext";



const Login = () => {

  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');
  const [redirect,setRedirect] = useState(false);

   const {setUser} =    useContext(UserContext)

  async function handleSubmit (e) {
    e.preventDefault();
    try {
  const {data} = await  axios.post('/login',{
        email,
        password
     })
     if (data) {
       setUser(data)
     }

     setRedirect(true)
    } catch (e) {
      console.log(e,'登录')
    }

  }

  if (redirect) {
    return <Navigate to={'/'}/>
  }

  return (
    <div className="mt-40  grow flex items-center justify-around  ">
      <div className="mb-1">
      <h1 className="text-4xl text-center mb-4">登录</h1>
      <form className="max-w-md mx-auto " onSubmit={e=>handleSubmit(e)}>
      <input type="email" placeholder="输入你的邮箱" value={email} onChange={(e)=>setEmail(e.target.value)} />
      <input type="password" placeholder="输入你的密码" value={password} onChange={(e)=>setPassword(e.target.value)}/>
      <button className="primary">登录</button>
      <div className="text-center py-2 text-gray-500">没有账号?
         <Link to={'/register'} className="underline text-black ml-2">注册</Link></div>

      </form>
      </div>
    </div>
  )
}

export default Login