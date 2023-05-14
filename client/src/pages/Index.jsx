
import axios from 'axios'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

const Index = () => {
  const [places,setPlaces] = useState([])

  useEffect(()=>{
    axios.get('/user-place').then((res)=>{
      setPlaces(res.data)
    })


  },[])


  return (
 <div className='bg-gradient-r from-cyan-300 to-blue-500 '>
      <div className=' grid sm:grid-cols-4  lg:grid-cols-6 grid-cols-3 mt-8 gap-x-6 gap-y-8 '>
      {places.length > 0 && places.map((place)=>(
        <Link to={'/place/'+place._id} key={place._id}>
          <div className='bg-gray-500  rounded-2xl flex mb-2 '>
          <img src={"http://localhost:4000/upload/" +place.photos?.[0]} alt="" className='rounded-2xl object-cover aspect-square ' />
          </div>
          <h3 className='font-bold  '>{place.address}</h3>
         <h2 className='text-sm truncate leading-4 text-gray-500'> {place.title}</h2>
        
         <div className='mt-1'>
           <span className='font-bold '>￥{place.price}</span> 元 每晚
         </div>
        </Link>
      ))}
    </div>
 </div>
  )
}

export default Index