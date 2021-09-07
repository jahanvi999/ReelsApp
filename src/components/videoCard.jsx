import { useContext, useEffect, useState } from "react"
import "./videoCard.css"
import { authContext } from "../AuthProvider"
import {firestore} from "../firebase"

let VideoCard = (props) =>{

    let [playing,setPlaying] = useState(false);
     let[commentBoxOpen, setcommentBoxOpen] = useState(false);
     let[currUserComment, setCurrUserComment] = useState("");
     let[comments, setComments] = useState([]);

     

     let user = useContext(authContext);
     let currUserLiked =  props.data.likes.includes(user.uid)


     useEffect(()=>{

        let f = async ()=>{

            let commentsArr =   props.data.comments;
            let arr = [];

            for(let i=0;i<commentsArr.length;i++){
                let commentDoc =  await firestore.collection("comments").doc(commentsArr[i]).get();
                arr.push(commentDoc.data());
            }

            
            setComments(arr);

        }

        f();

     },[props]);

return(
 <div className="video-card">

     <p className="video-card-username"> {props.data.name}</p>
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

        <span class="material-icons-outlined video-card-like" onClick = {()=>{
             let likesArr = props.data.likes
            if(currUserLiked){

                likesArr = likesArr.filter((el)=>el!=user.uid)
            }
            else{
                likesArr.push(user.uid)

            }
            firestore.collection("posts").doc(props.data.id).update({likes:likesArr})

        }}>

            {

             currUserLiked?"favorite":"favorite_border"

            }
         
         </span>

     {commentBoxOpen? (<div className="video-card-comment-box">

         <div className="actual-comments">


             {comments.map((el)=>{

                 return (
                 <div className="post-user-comment">
                     <img src= {el.photo}/>
                     <div> 
                         <h5>{el.name}</h5>
                         <p>{el.Comment}</p>
                     </div>
                   </div>
                 );

             })}

              </div> 
       
         <div className="comment-form">
             <input type="text"
             value={currUserComment}
             onChange ={(e)=>{

                 setCurrUserComment(e.currentTarget.value);

             }}
             />
             <button onClick={async ()=>{

               let docRef = await firestore.collection("comments").add({
                     name: user.displayName,
                     Comment:currUserComment,
                     photo:user.photoURL,
                 });


                 setCurrUserComment("");

                 let doc = await docRef.get();
                 let commentId = doc.id;

                 let postDoc = await firestore.collection("posts").doc(props.data.id).get();

                 let postCommentsArr = await postDoc.data().comments;

                 postCommentsArr.push(commentId)

                 firestore.collection("posts").doc(props.data.id).update({
                     comments: postCommentsArr,
                 })

             }}>Post</button>
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
    src= {props.data.url}
    className="video-card-video"></video>

</div>
)
}


export default VideoCard;