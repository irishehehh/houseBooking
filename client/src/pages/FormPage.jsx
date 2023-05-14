import { useEffect, useState } from "react"
import { Navigate, useParams } from "react-router-dom"
import axios from "axios"

import AccountNav from "../components/AccountNav"
import Perks from '../components/Perks'
import PhotoUpload from '../components/PhotoUpload'


const FormPage = () => {
  const {id} = useParams()
  const [title, setTitle] = useState('')
  const [address, setAddress] = useState('')
  const [addPhotos, setAddPhotos] = useState([])
  const [desc, setDesc] = useState('')
  const [perks, setPerks] = useState([])
  const [extraInfo, setExtraInfo] = useState('')
  const [checkIn, setCheckIn] = useState('')
  const [checkOut, setCheckOut] = useState('')
  const [maxGuests, setMaxGuests] = useState(1)
  const [redriect,setRedriect] = useState(false)
  const [price,setPrice] = useState(100)

  useEffect(()=>{
    if (!id) {
      return;
    }
  
    axios.get('/place/' + id).then((res)=>{
      const {data} = res
      setTitle(data.title)
      setAddress(data.address)
      setAddPhotos(data.photos)
      setDesc(data.description)
      setExtraInfo(data.extraInfo)
      setPerks(data.perks)
      setCheckIn(data.checkIn)
      setCheckOut(data.checkOut)
      setMaxGuests(data.maxGuests),
      setPrice(data.price)
    })

  },[] )

  const inputHeader = (text) => {
    return <h2 className="text-2xl mt-4 ">{text}</h2>
  }

  const inputDesc = (text) => {
    return <p className="text-sm text-gray-500">{text}</p>
  }

  const preInput = (header, desc) => {
    return (
      <>
        {inputHeader(header)}
        {inputDesc(desc)}
      </>
    )
  }

  const savePlace = async (e) => {
    e.preventDefault()
    if (id) {
      // update
      if (title.trim() .length === 0 && address.trim().length === 0 && perks.length === 0 ) return 
      const placeData  = {
        id,
        title,
        address,
        addPhotos,
        desc,
        perks,
        extraInfo,
        checkIn,
        checkOut,
        maxGuests,
        price
  
      }
  
      await  axios.put('/places',placeData)
      setRedriect(true)



    } else {
      // new add
      if (title.trim() .length === 0 && address.trim().length === 0 && perks.length === 0 ) return 
      const placeData  = {
        title,
        address,
        addPhotos,
        desc,
        perks,
        extraInfo,
        checkIn,
        checkOut,
        maxGuests,
        price
  
      }
  
      await  axios.post ('/places',placeData)
  
      setRedriect(true)
    }
  


  }

  if (redriect) {
      return <Navigate to={'/account/places'}/>

  }


  return (
    <>
      <AccountNav/>
        <form onSubmit={savePlace}>
            {preInput('名称', '地点名称')}
            <input
              type="text"
              placeholder="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            {preInput('地址', '详细地址')}
            <input
              type="text"
              placeholder="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
            {preInput('照片', '越多越好')}
            <PhotoUpload  addPhotos = {addPhotos} onChange = {setAddPhotos}/>
            {preInput('描述', '地点信息描述')}
            <textarea  value={desc} onChange={e=>setDesc(e.target.value)}/>

            {preInput('津贴', '选择所有的津贴')}
            <Perks selected={perks} onChange={setPerks} />
            {preInput('额外信息', '房间信息等')}

            <textarea value={extraInfo} onChange={e=>setExtraInfo(e.target.value)} />
            {preInput(
              '入住，退房时间',
              '添加你的入住,退房时间，以便有空余时间清理房间'
            )}
            <div className="grid gap-2 sm:grid-cols-2 md:grid-cols-4">
              <div>
                <h3 className="mt-2 -mb-1">入住时间</h3>
                <input type="text" placeholder="14:00" value={checkIn} onChange={e=>setCheckIn(e.target.value)}/>
              </div>
              <div>
                <h3 className="mt-2 -mb-1">退房时间</h3>
                <input type="text" placeholder="12:00"  value={checkOut} onChange={e=>setCheckOut(e.target.value)}/>
              </div>
              <div>
                <h3 className="mt-2 -mb-1">最大入住人数</h3>
                <input type="number" placeholder="3"  value={maxGuests} onChange={e=>setMaxGuests(e.target.value)}/>
              </div>
              <div>
                <h3 className="mt-2 -mb-1">每晚价格</h3>
                <input type="number" placeholder="3"  value={price} onChange={e=>setPrice(e.target.value)}/>
              </div>
            </div>

            <button className="primary my-4">保存</button>
          </form>
    
    </>
  )
}

export default FormPage