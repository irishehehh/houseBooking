import { Route, Routes } from "react-router-dom"
import Layout from "./components/Layout"

import Index from "./pages/Index"
import Login from "./pages/Login"
import Register from "./pages/register"
import ProfilePage from './pages/ProfilePage'
import axios from "axios"
import { UserContextProvider } from "./UserContext"
import PlacePage from "./pages/PlacePage"
import FormPage from "./pages/FormPage"
import DetailPage from "./pages/DetailPlace"
import Bookings from "./pages/Bookings"
import Booking from "./pages/Booking"

axios.defaults.baseURL = 'http://127.0.0.1:4000'
axios.defaults.withCredentials = true
const App = () => {
  return (
    <UserContextProvider>
     <Routes>
      <Route path="/" element={<Layout/>}>
      <Route index element={<Index/>}/>
      <Route path="/login" element={<Login/>} />
      <Route path="/register" element={<Register/>}/>
      <Route  path="/account" element={<ProfilePage/>}  />
      <Route  path="/account/places" element={<PlacePage/>}  />
      <Route  path="/account/places/new" element={<FormPage/>}  />
      <Route  path="/account/places/:id" element={<FormPage/>}  />
      <Route  path="/place/:id" element={<DetailPage/>} />
      <Route  path="/account/bookings" element={<Bookings/>}  /> 
      <Route  path="/account/bookings/:id" element={<Booking/>}  /> 
   

      </Route>
  

    </Routes>
    </UserContextProvider>
 
  )
}

export default App
