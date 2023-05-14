import axios from "axios"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import BookingWidget from "./BookingWidget"

const DetailPage = () => {
  const {id} = useParams()
  const [place,setPlace] = useState(null)
  const [showAllPhoto,setShowAllPhoto] = useState(false)

  useEffect(()=>{
    if (!id) return 
    axios.get(`/place/${id}`).then((res)=>{
      setPlace(res.data)
       
    })


  },[id])

  if (showAllPhoto) {
    
    return (
      <div className="absolute inset-0 bg-black text-white min-h-screen w-full">
      <div className="p-8 bg-black grid gap-4 w-full">
        <div>
          <h2 className="text-3xl">{place?.title} "的所有图片"</h2>
          <button onClick={()=>setShowAllPhoto(false)}  className="fixed flex gap-1 py-2 px-4 right-12 top-8 rounded-xl text-black bg-white shadow shadow-black">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
  <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm-1.72 6.97a.75.75 0 10-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 101.06 1.06L12 13.06l1.72 1.72a.75.75 0 101.06-1.06L13.06 12l1.72-1.72a.75.75 0 10-1.06-1.06L12 10.94l-1.72-1.72z" clipRule="evenodd" />
</svg>

        关闭所有图片
        </button>
        </div>
     {place?.photos?.length > 0 && place?.photos?.map((photo)=>(
          <div className="w-full">
            <img src={"http://localhost:4000/upload/" + photo} className="w-full shrink-0" alt="" />
          </div>
        ))}
     </div>
      </div>
    )
  }

  return (
    <div className="mt-4 bg-gray-100 -mx-8 px-8 pt-8">
    <h1 className="text-3xl">{place?.title}</h1>
    <a target="_blank" className="underline  font-semibold flex gap-1 my-3" href={"https://maps.google.com?q="+ place?.address}>
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
</svg>

      {place?.address}</a>
    
    <div className="mt-8 mb-1 grid gap-1 grid-cols-1 md:grid-cols-[2fr_1fr]">
        <div>
          {place?.photos?.[0] && (
            <div>
              <img className="aspect-square object-cover" src={"http://localhost:4000/upload/" + place?.photos?.[0] } alt="" />
            </div>
          )}
        </div>
        <div>
              
              {place?.photos?.[1] && (
            <div className=" mb-1">
              <img className="grid gap-2 aspect-square object-cover " src={"http://localhost:4000/upload/" + place?.photos?.[1] } alt="" />
            </div>
          )}
           {place?.photos?.[2] && (
            <div>
              <img className="overflow-hidden grid gap-1 aspect-square object-cover" src={"http://localhost:4000/upload/" + place?.photos?.[2] } alt="" />
            </div>
          )}
            
           
            <button onClick={()=>setShowAllPhoto(true)} className="py-2 px-3 float-right w-30 bg-primary rounded-xl mt-4 border-black text-white" >展示更多图片</button>
          

        </div>
  
      <div className="my-2 w-full">
          <h2 className="font-semibold text-2xl">描述</h2>
          {place?.description}<br/>
        <div className="my-10">
        入住人数: {place?.checkIn}<br />
        退房人数: {place?.checkOut}<br />
        最多顾客: {place?.maxGuests}
        <div className="my-2">
        <h2 className="font-semibold text-2xl">额外信息</h2>
      </div>
      <div className="mb-4 mt-2 text-sm text-gray-700 leading-5">{place?.extraInfo}</div>
        </div>
        </div>
      
        
           <BookingWidget place={place}/> 
      
      </div>
      <div>

     
    </div>

  </div>
  )
}

export default DetailPage