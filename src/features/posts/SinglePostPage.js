import React, { useState } from 'react'
import TimeAgo from './TimeAgo'
import ReactionButtons
 from './ReactionButtons'
 import { Link, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { selectAllPosts, selectPostById } from './postsSlice'
import { getUserStatus,fetchusers,selectAllUsers, getUserById } from '../users/userSlice'
import { useEffect } from 'react'
import { UseDispatch } from 'react-redux'
import Author from './Author'
import { Outlet } from 'react-router-dom'
const SinglePostPage = () => {
    const {postId} = useParams();
 const postById =useSelector((state)=>selectPostById(state,postId))

const user = useSelector((state)=> getUserById(state,postById.userId))

    
  return (


    postById ? 




    <article key={postById.id}> 
    

<div className="d-flex justify-content-center align-items-center mt-5 p-5">
    
    <div className="feature  border border-black w-100"  key={postById.id}>
<h3 className="fs-2 text-body-emphasis">{postById.title}</h3>
<p>{postById.body.substring(0,100)}</p>
<Author  user={user.name}/>
<TimeAgo timestamp={postById.date}/>
    <ReactionButtons post={postById}/>
<Link to={`/edit/${postId}`} class="icon-link">
Edit Post
          
        </Link>
    

    </div>
    </div>
    </article>

     :<p>No Post</p>
  
  )
}

export default SinglePostPage;