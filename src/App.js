import './App.css';
import { useState,useRef,useCallback } from 'react';
import useFetchImage from './useFetchImage';
import Modal from './Modal'


function App() {
  const [pageNumber, setPageNumber] = useState(1)
  const [selectedImage,setSelectedImage] =useState(null)

  const {images,loading,error} = useFetchImage(pageNumber)
  const observer = useRef()
  const lastImageCardRef = useCallback(node=>{
    if(loading) return 
    if(observer.current) observer.current.disconnect()
    observer.current= new IntersectionObserver(entries=>{
      if(entries[0].isIntersecting){
        setPageNumber(prevPagenumber=>{return prevPagenumber+1})
      }
    })
    if(node) observer.current.observe(node)
  },[loading])
  return (
    <>
    <header className="inner">
  <h2><a href="/"><i className="fa fa-camera-retro" />
      UnsplashFeed</a></h2>
  <nav>
    <ul>
      <li>
        <a href="/">Home</a>
      </li>
    </ul>
  </nav>
</header>


    <div className="container">

      {images.map((image,index) => {
        console.log(image)
        if(images.length === index+1)
        {
          return (
            <div ref={lastImageCardRef} key={index} className="image-card">
              <div className="App-header">
                <ul>
                  <li>
                    <img src={image.urls.thumb} className="App-logo" style={{ height: "auto", width: "200px" }} alt="logo" />
                  </li>
                  <li>
                    <h5>image description:</h5>
                    <p>
                      {image.alt_description}<br />
                    </p>
                  </li>
                </ul>
                <div className="tech">
                  <small>Credits: <span>{image.user.first_name}</span></small>
                </div>
              </div>
            </div>
          )
        }else{
          return (
            <div key={index} className="image-card">
              <div className="App-header">
                <ul>
                  <li>
                    <img 
                     onClick={()=>{
                      setSelectedImage(image.urls.full)
                    }}
                    src={image.urls.thumb} className="App-logo"
                     style={{ height: "auto", width: "200px" }}
                      alt="logo" />
                  </li>
                  <li>
                    <h5>image description:</h5>
                    <p>
                      {image.alt_description}<br />
                    </p>
                  </li>
                </ul>
                <div className="tech">
                  <span>
                  <img
                  className="avatar"
                      src={image.user.profile_image.small}
                      alt="profile_img"
                    />
                    <span style={{paddingRight:'5px'}}>{image.user.first_name}</span>
                    </span>
                  <a style={{ paddingRight: '5px' }} href={image.user.social.portfolio_url} target="_blank" rel="noopener noreferrer" >
                    <i className="fa fa-camera"></i>
                    </a>
                  <a style={{paddingRight:'5px'}} href={`https://instagram.com/${image.user.social.instagram_username}`} target="_blank" rel="noopener noreferrer" >
                    <i className="fa fa-instagram"></i>
                    </a>
                  <a style={{paddingRight:'5px'}} href={`https://twitter.com/${image.user.social.twitter_username}`} target="_blank" rel="noopener noreferrer" >
                    <i className="fa fa-twitter"></i>
                    </a>
                  &nbsp;
                </div>
              </div>
            </div>
          )
        } 
      })}

      { selectedImage && <Modal selectedImage={selectedImage} setSelectedImage={setSelectedImage}/>}
    </div>
    <div>{loading && 'Loading...'}</div>
     <div>{error && 'Error'}</div>
</> 
  );
}

export default App;
