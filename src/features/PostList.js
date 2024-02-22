import React from 'react'
import {  useDispatch, useSelector } from 'react-redux'
import { selectAllPosts } from './posts/postsSlice';
import { fetchusers, getUserError,getUserStatus, selectAllUsers } from './users/userSlice';
import { useEffect } from 'react';
import TimeAgo from './posts/TimeAgo';
import ReactionButtons from './posts/ReactionButtons';
import { getPostStatus } from './posts/postsSlice';
import { fetchPosts } from './posts/postsSlice';
import { getPostsError } from './posts/postsSlice';
import { Link } from 'react-router-dom';
import Author from './posts/Author';






export const PostList = () => {
  const posts = useSelector(selectAllPosts);
  const postStatus = useSelector(getPostStatus)
  const postError = useSelector(getPostsError)
 
  const userstatus = useSelector(getUserStatus);
  const dispatch = useDispatch();
  useEffect(()=>{
   
    if(postStatus == 'idle' ){
    dispatch(fetchPosts())
    
    }
   
      if(userstatus=='idle')
      {
        dispatch(fetchusers())
      }
    
    

  },[postStatus,dispatch,userstatus])
  const users=useSelector(selectAllUsers);
let renderedPosts;

if(postStatus == 'loading'){

  renderedPosts = <p>Loading...</p>
}
else if (postStatus==='succeded'){
  
  if(userstatus=='succeded')
  {

   renderedPosts = posts.map((post,index)=>
   <div className="feature col border border-black "  key={index}>
<h3 className="fs-2 text-body-emphasis">{post.title}</h3>
<p>{post.body.substring(0,100)}</p>
<Author  user={users.find(user=>user.id==post.userId).name}/>
<TimeAgo timestamp={post.date}/>
    <ReactionButtons post={post}/>
<Link to= {`post/${post.id}`} class="icon-link">
View Post
          
        </Link>
    

    </div>
  )
  }else 
  {
    renderedPosts = userstatus
  }
}
else if (postStatus==='failed'){
  renderedPosts=<p>{postError}</p>
}





  return (
  
  
      <div className="container px-4 py-5" id="featured-3">
      <h2 className="pb-2 border-bottom">Posts</h2>
      <div className="row g-4 py-5 row-cols-1 row-cols-lg-3">
      

      {renderedPosts}

      </div>


      </div>
   
  )
}









