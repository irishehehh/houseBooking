import { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

const Register = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  // 注册函数

     async function registerUser(e) {
      e.preventDefault();
   try {  
      await axios.post('/register', {
        name,
        email,
        password,
      })

      alert('注册成功')
    }catch (e) {
      console.log(e,'注册');
    }
  } 

  return (
    <div className="mt-40  grow flex items-center justify-around  ">
      <div className="mb-1">
        <h1 className="text-4xl text-center mb-4">注册</h1>
        <form className="max-w-md mx-auto " onSubmit={(e) => registerUser(e)}>
          <input
            type="text"
            placeholder="用户名"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="email"
            placeholder="输入你的邮箱"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="输入你的密码"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button className="primary">注册</button>
          <div className="text-center py-2 text-gray-500">
            已有账号?
            <Link to={'/login'} className="underline text-black ml-2">
              去登录
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Register
