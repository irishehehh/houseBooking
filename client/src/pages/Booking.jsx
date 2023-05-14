import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"


const Booking = () => {

const {id} = useParams()
const [ bookingInfo,setBookingInfo] = useState('')
useEffect(()=>{
  axios.get(`/bookings/${id}`).then((res)=> {
    
    setBookingInfo(res.data)
  })

},[])



const calcuTime = (time) => {
  

  return time?.split('T')[0]

}

  return (
    <div className="mt-8 text-xl ">
      <div>
        用户名:{bookingInfo.name}
      </div>
      <div>
      手机号:{bookingInfo.mobile}
      </div>
      <div>
        房源价格:￥{bookingInfo.price}元
      </div>
      <div>
        入住日期:{calcuTime(bookingInfo?.checkIn)}
      </div>
      <div>
        退房日期:{calcuTime(bookingInfo?.checkOut)}
      </div>
      <div>
        最多入住人数:{bookingInfo.Guests}
      </div>
      <div>

      </div>
    </div>
  )
}

export default Booking