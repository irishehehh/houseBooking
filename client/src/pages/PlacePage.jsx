

import { Link, Navigate, useParams } from 'react-router-dom'
import AccountNav from '../components/AccountNav'
import axios from 'axios'
import { useEffect, useState } from 'react'



const PlacePage = () => {

  const [placeInfo,setPlaceInfo] = useState([])

  useEffect(()=>{
    axios.get('/place-info').then(({data})=>{
      setPlaceInfo(data)
    })

  },[])

  


  

  return (
    <div>
      <AccountNav/>
   
        <div className="text-center">
        list all places <br />
          <Link
            to={'/account/places/new'}
            className="inline-flex gap-2  bg-primary text-white rounded-full py-2 px-6"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>
          
            添加新地点
          </Link>
        </div>

        <div className='mt-4'>
          {placeInfo.length > 0  && placeInfo.map((place)=>{
            return (
              <Link to={`/account/places/${place._id}`} className= 
              'flex cursor-pointer gap-4 bg-gray-300 rounded-2xl p-4 mt-3'>
                <div className='flex w-32 h-32 bg-gray-100 grow shrink-0 '>
                  {place.photos.length > 0 && (
                    <img className='object-cover w-full' src={'http://localhost:4000/upload/' + place.photos[0]} alt=""/>
                  )}

                </div>
               
                    <div className='grow-0 shrink'>
                    <h2 className='text-xl font-bold '>{place.title}</h2>
                     <p className='text-sm mt-2'>{place.description}</p>
                     <p className='text-sm mt-1 text-gray-700'>{place.extraInfo}</p>
                    </div>
            
              </Link>
            )
          })}
        </div>

    
    </div>
  )
}

export default PlacePage


