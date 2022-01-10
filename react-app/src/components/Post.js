import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"
import { useParams, useHistory} from "react-router-dom";
import { grabPosts, deletePost } from "../store/posts"
import Comment from "./Comment.js"
import { addLike, grabLikes, removeLike } from "../store/like";
import { grabPhoto } from '../store/photos'
import { grabComments, addComment, deleteComment, deleteAllComments } from '../store/comment'
import './CSS/PostPage.css'



function Post() {
  const dispatch = useDispatch()
  const history = useHistory()
  const params = useParams()
  const postId = Number(params.id)
  const posts = useSelector(state => state.posts)
  const photo = useSelector(state => state.photos)
  // const like = useSelector(state => state.like)
  const sessionUser = useSelector(state => state.session.user)
  const currentPost = useSelector(state => state.posts[postId]) 
  const comments = useSelector(state => state.CommentsOfPost)
  let [comment, setComment] = useState('')
  let like = false
  


  // LIKES INTERACTIONS ----------------------------------------------------------------------------------------
  const getLikesForPost = async (e) => {                                // GET
    await dispatch(grabLikes(postId))
  }
  
  const onLikeClick = async (e) => {                                    // CREATE                               
    await dispatch(addLike(postId, sessionUser.id, sessionUser.username))
  }

  const onLikeUnclick = async (e) => {                                  // DELETE
    await dispatch(removeLike(postId, sessionUser.id))
  }

  function handleLikeStatus(e){
    like = !like
    e.preventDefault()
    if(like === true){
      onLikeClick()
    } else {
      console.log("removal firing")
      onLikeUnclick()
    }
  }
  

  // COMMENT INTERACTION ---------------------------------------------------------------------------------------
  const onCreateComm = async (e) => {                                    // CREATE
    e.preventDefault()
    await dispatch(addComment(sessionUser.id, postId, comment))
    setComment("")
  }
  const onDeleteComment = async (e, commentId, postId) => {               // DELETE
    e.preventDefault()
    await dispatch(deleteComment(postId, commentId))
  }

  // AUTHOR INTERACTION ---------------------------------------------------------------------------------------
  const onEditPost = async (e) => {                                        // UPDATE
    history.push(`/post/${postId}/edit`)
  }
  const onDelete = async (e) => {                                          // DELETE
    e.preventDefault()
    await dispatch(deleteAllComments(postId))
    await dispatch(deletePost(postId))
        
    history.push(`/`)
  }
  // WHEN PAGE RENDERS THIS IS CALLED --------------------------------------------------------------------------
  useEffect(() => {
  dispatch(grabPosts())
  dispatch(grabComments(postId))
  dispatch(grabLikes(postId))
  
  }, []);

  let pagePost = posts[postId]
	return posts && (
    <div className="Post">
    <div className="Post-Banner">
        <div className="Post-Title-Container">
            <div className="Post-Title-Container-Text">{pagePost?.name}</div>
        </div>
    </div>
    <div className="Post-Container">
        <img 
        className="Post-Container-Photo"
        src={currentPost?.url}
        alt="Photo Not Found"></img> 
    </div>
    <div className="Author-Section">
      <div className="Author-Info-Center">
          <div className="Author-Picture-Container">
            <img className="Author-Picture"/>
          </div>
          <div className="Author/Post-Info">
            <div className="Info-Center-Row">
              <div className="Author-Name">
                AUTHOR NAME
              </div>
              <div className="Likes-Numeric">
                15 LIKES
              </div>
            </div>
            <div className="Info-Center-Row">
              <button className="Like-Button" onClick={e => handleLikeStatus(e) }>
                <img 
                className="LikeButtonImage"
                src={'https://www.pinclipart.com/picdir/big/80-800346_blue-clip-art.png'}
                alt={"failed to load"}
                >
                </img>
                <div className="LikeButtonText">
                  Like
                </div>
              </button>
              <button className="Comment-Button">
                Comment
              </button>
            </div>
            <div className="Info-Center-Row">
              {currentPost && sessionUser && currentPost.userid === sessionUser.id &&
                <div className="PostButtonsForAdmin">
                  <form>
                    <button className='postEditBtn' onClick={e => onEditPost(e)}> Edit Post</button>
                  </form>
                  <form>
                    <button className='postDeleteBtn' onClick={e => onDelete(e)}> Delete Post</button>
                  </form>
                </div>
              }
            </div>
          </div>
          <div className="See-More-Container">
              <div className="See-More-Button"></div>
          </div>
      </div>
    </div>
    <div className="Instructions-Section">
        <div className="Instructions-Header">
            Instructions:
        </div>
        <div className="Instructions-TextBody">
            {pagePost?.instructions}
        </div>
    </div>
        <div className="Comment-Section">
          <div className="Comment-Banner">
            <div className="Comment-Numeric">
                {/* {# of comments}  */}
                Comments:
            </div>
          </div>
        <div className="Comment-Container">
            <div className="Comment-Upper">
                <div className="Commenter-Icon">
                    <img></img>
                </div>
                <div className="Commenter-Name"></div>
                <div className="Comment-Date/Time"></div>
            </div>
            <div className="Comment-Lower">
                <div className="Comment-Text"></div>
            </div>
        </div>
        {sessionUser && 
        <div className="Comment-Creation-Area">
            <form className="CommentForm" onSubmit={onCreateComm}>
                <textarea
                className="CommentInput"
                type="text"
                name="comment"
                onChange={(e) => setComment(e.target.value)}
                value={comment}
                >
                </textarea>
                <button type="submit" className="SubmitCommBtn">
                  Post Comment
                </button>
              </form>
        </div>
        }
        </div>
    </div>

  )
}
export default Post;