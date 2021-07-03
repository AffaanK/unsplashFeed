import { useEffect,useState } from 'react'
import axios  from 'axios'

export default function useFetchImage(pageNumber) {

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [images,setImages] = useState([])

  useEffect(()=>{
    setLoading(true)
    setError(false)
    axios({
      method:'GET',
      url:'https://api.unsplash.com/photos',
      params:{
        page:pageNumber,
        per_page:30,
        client_id:'6autXrXBMEYNOFXYRBJ5aHhumwbtfclVEF24KomfmiE',}
    }).then(res=>{
      setImages(prevImages => { 
        return [...prevImages, ...res.data] 
      })
      setLoading(false)
    }).catch(err=>{
      setError(true)
    })
  },[pageNumber])
  return {images,loading,error};
}
