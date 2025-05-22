import HomeVideo from "../asstes/HomeVideo.mp4";

const Body = () => {
  return (
    <div>
        <div className="w-full h-screen  ">
                  <video 
                    src={HomeVideo}
                    autoPlay
                    loop
                    muted
                    className="w-full"
                  ></video>
                </div>
      
    </div>
  )
}

export default Body