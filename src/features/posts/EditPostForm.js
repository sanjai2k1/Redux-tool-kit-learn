import React, { useState } from 'react'
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectPostById } from './postsSlice';
import { getUserById } from '../users/userSlice';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { selectAllUsers } from '../users/userSlice';
import {updatePost,deletePost} from "./postsSlice"








const EditPostForm = () => {
const {postId} = useParams();


const postById =useSelector((state)=>selectPostById(state,postId))

const user = useSelector((state)=> getUserById(state,postById.userId))

const [title,setTitle] = useState(postById?.title)
const[content,setContent] = useState(postById?.body)
const [userId,setUserId] = useState(postById?.userId)
const [requestStatus,setRequestStatus] = useState('idle');
const dispatch = useDispatch()
const navigate = useNavigate()
const users = useSelector(selectAllUsers);

if(!postById){
    return (
        <section>
            <h2>Post not Found</h2>
        </section>
    )
}


const onTitleChanged = e=> setTitle(e.target.value)
const onContentChanged = e=>setContent(e.target.value)
const onAuthorChanged = e => setUserId(e.target.value)

const canSave = [title,content,userId].every(Boolean) && requestStatus === 'idle';

const onSavePostClicked = () => {
    if(canSave){
        try{
            setRequestStatus('pending')
            dispatch(updatePost({
                id :postById.id,
                title,
                body:content,
                userId,
                reactions: postById.reactions
            }))
            setTitle('')
            setContent('')
            setUserId('')
            navigate(`/post/${postId}`)
        }
        catch (err){
            console.error("failed to save",err)
        }
        finally{
            setRequestStatus('idle')
        }
    }
}

const onDeletePostClicked = () => {
    if(canSave){
        try{
            setRequestStatus('pending')
            dispatch(deletePost({
                id :postById.id
            }))
            setTitle('')
            setContent('')
            setUserId('')
            navigate(`/`)
        }
        catch (err){
            console.error("failed to delete",err)
        }
        finally{
            setRequestStatus('idle')
        }
    }
}
  return (
    <div className="container my-5">
        <h2 className="text-center">Edit Post</h2>
        <form>
        <div class="mb-3">
        <label htmlFor="title" className="form-label">Post Title :</label>
        <input
            type="text"
            id="postTitle"
            name="postTitle"
            value={title}
            className="form-control"
            onChange={onTitleChanged}
        />
        </div>
        <div class="mb-3">
        <label htmlFor="postAuthor" className="form-label">Author :</label>
        <select id="postAuthor" className="form-control" value={userId} onChange={onAuthorChanged}>
        {users.map(user=><option value={user.id}>{user.name}</option>)}</select>
       </div>
       <div class="mb-3">
        <label htmlFor="titlpostContent" className="form-label">Post content :</label>
       
        <input
            type="text"
            className="form-control"
            id="postContent"
            name="postContent"
            value={content}
            onChange={onContentChanged}
            
        />
        </div>
        <button type="button" className="btn btn-primary w-100" onClick={onSavePostClicked} disabled={!canSave}>
            Save Post
        </button>
        <button type="button"  className="btn btn-danger mt-3 w-100"  onClick={onDeletePostClicked}>
            Delete Post
        </button>
        </form>
    </div>
    
  )

}


export default EditPostForm