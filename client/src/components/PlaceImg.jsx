

const PlaceImg = ({place,index=0,className= null}) => {
  if (!place.photos.length) {
    return ''
  }
  if (!className) {
    className = 'object-cover'
  }

  return (
   
   <img className={className +'h-full'} src={'http://localhost:4000/upload/' + place.photos[index]} alt=""/>
  
  )
}

export default PlaceImg