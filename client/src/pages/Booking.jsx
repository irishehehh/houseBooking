import axios from "axios"
import { differenceInCalendarDays } from "date-fns"
import { format } from "date-fns/esm"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"


const Booking = () => {

const {id} = useParams()
const [ bookingInfo,setBookingInfo] = useState('')
useEffect(()=>{
  axios.get(`/bookings`).then((res)=> {
    
   const findBooking =    res.data.find(({_id}) =>_id === id)
   if(findBooking) {
     setBookingInfo(findBooking)
   }
  })

},[id])


if (!bookingInfo) {
  return ''
}

console.log(bookingInfo)



  return (
    <div className="my-8 h-full">
      <h1>{bookingInfo?.place?.title}</h1>
      <div className="mt-4 flex gap-1">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
</svg>

      <a className="" href={`https://maps.google.comq=${bookingInfo.place.address}`} target="_blank">{bookingInfo.place.address}</a>
      </div>
      <div className="flex text-gray-600 mt-4 h-30 border">
      <div className="flex gap-2 items-center  mt-1 ">
        <div className="flex gap-1 items-center text-gray-500">
        <div className="flex gap-1">
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
<path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
</svg>
    共:{differenceInCalendarDays(new Date(bookingInfo.checkIn),new Date(bookingInfo.checkOut)) * -1}晚 
    </div>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z" />
</svg>

         {format(new Date(bookingInfo.checkIn),'yyyy-MM-dd')}
        </div>
          &rarr;
          <div className="flex gap-1 items-center text-gray-400">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z" />
</svg>

          {format(new Date(bookingInfo.checkOut),'yyyy-MM-dd')}
          </div>
         </div>

      </div>
      <div className="grid grid-cols-5 gap-1 mt-2">
        {bookingInfo?.place.photos.map((photo)=>(
          <img src={`http://localhost:4000/upload/${photo}`}/>
        ))}
      </div>
      <div className="h-16 bg-gradient-to-r from-cyan-200 to-blue-500">
        
      </div>
    </div>
  )
}

export default Booking