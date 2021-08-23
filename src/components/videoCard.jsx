import { useState } from "react"
import "./videoCard.css"

let VideoCard = () =>{

    let [playing,setPlaying] = useState(false);
     let[commentBoxOpen, setcommentBoxOpen] = useState(false);

return(
 <div className="video-card">

     <p className="video-card-username">Fake user</p>
     <span className="video-card-music">
     <span
     class="material-icons ">music_note</span>
        <marquee>some song</marquee>
     </span>

     <span onClick ={(e)=>{
        
        if(commentBoxOpen){
            setcommentBoxOpen(false);
        }
        else{
            setcommentBoxOpen(true);
        }

     }} class="material-icons-outlined  video-card-comment">chat</span>

     <span class="material-icons-outlined video-card-like">favorite_border</span>

     {commentBoxOpen? (<div className="video-card-comment-box">

         <div className="actual-comments">
             <div className="post-user-comment">
                 <img src="data:image/jpeg;base64,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"/>
                 <div> 
                     <h5>user name</h5>
                     <p>This is actual comment</p>
                 </div>
                 
             </div>
         </div>
         <div className="comment-form">
             <input type="text"/>
             <button>Post</button>
         </div>


     </div>):("")}
     
     



    <video onClick={(e)=>{
        if(playing){
            e.currentTarget.pause()
            setPlaying(false)
        }
        else{
            e.currentTarget.play()
            setPlaying(true)
        }
    }}
   
    loops
    src=" https://file-examples-com.github.io/uploads/2017/04/file_example_MP4_480_1_5MG.mp4" className="video-card-video"></video>

</div>
)
}


export default VideoCard;