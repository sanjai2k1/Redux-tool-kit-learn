import React from 'react'
import { getPostStatus } from './posts/postsSlice';
import { fetchPosts } from './posts/postsSlice';
import { getPostsError } from './posts/postsSlice';

const PostExceptions = () => {
  return (
    <h1>{getPostStatus} </h1>
  )
}

export default PostExceptions