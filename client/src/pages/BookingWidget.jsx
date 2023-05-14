import { useState } from "react"
import {differenceInCalendarDays} from 'date-fns'
import axios from "axios"
import { Navigate } from "react-router-dom"
const BookingWidget = ({place}) => {

  const [checkIn,setCheckIn] = useState('')
  const [checkOut,setCheckOut] = useState('')
  const [Guests,setGuests] = useState(1)
  const [name,setName] = useState('')
  const [mobile,setMobile] = useState('')
  const [redriect,setRedriect] = useState('')

  let numbersDay = 0;
     numbersDay = -differenceInCalendarDays(new Date(checkIn),new Date(checkOut))
  
     const bookthisPlace = async() => {
       const data = {checkIn,checkOut,Guests,name,mobile,place:place._id,price:numbersDay * place.price}
    const res = await   axios.post('/booking',data)
    const bookingId = res.data._id
    setRedriect(`/account/bookings/${bookingId}`)


      
     }
     if (redriect) {
       return <Navigate to={redriect}/>
     }

  return (
    <div className="grid grid-cols-1 ">
     
            
          
           
    <div className="bg-white shadow p-4 rounded-2xl">
      <div className="text-xl text-center">
      每晚价格: ￥{place?.price} 元
      </div>
   <div className="border rounded-xl">
   <div className="my-4  py-3 px-4 "> <label>入住:</label>
      <input type="date" value={checkIn} onChange={e=>setCheckIn(e.target.value)} /></div>
      <div className="my-4  py-3 px-4  mt-4 border-l">
        <label>退房:</label>
        <input type="date" value={checkOut} onChange={e=>setCheckOut(e.target.value)}/>
      </div>
      <div className="my-4  py-3 px-4  mt-4 border-t">
        <label>最多人数:</label>
        <input type="number" value={Guests} onChange={e=>setGuests(e.target.value)}/>
      </div>
      {numbersDay > 0 && (
       <div className="   px-4  mt-2 ">
       <label>名字:</label>
       <input type="text" value={name} onChange={e=>setName(e.target.value)}/>
       <label>手机号:</label>
       <input type="tel" value={mobile} onChange={e=>setMobile(e.target.value)}/>
     </div>
      )}
   </div>
      
      <button className="primary" onClick={bookthisPlace}>
        
        预定房间
        {numbersDay > 0 && (
          <span>￥{numbersDay * place?.price}元</span>
        )}
        </button>
    </div>
   
   </div>

  )
}

export default BookingWidget