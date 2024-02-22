import {useEffect, useState} from "react";
import {  useDispatch ,useSelector} from "react-redux";

import { postAdded } from "./postsSlice";
import { selectAllUsers,getUserStatus,getUserError,fetchusers } from "../users/userSlice";
import { useNavigate } from "react-router-dom";

const AddPostForm =()=>{

    const [newpost,setNewPost]=useState({
        title:"",
        body:"",
    });
    const dispatch = useDispatch();
   
    const [userId,setUserId]=useState("");
    const userstatus = useSelector(getUserStatus);
    useEffect(()=>{
        if(userstatus=='idle')
        {
          dispatch(fetchusers())
        }
    },[userstatus,dispatch])

    
    const users = useSelector(selectAllUsers);
    const navigate = useNavigate();






    const canSave= Boolean(newpost.title) && Boolean(newpost.body) && Boolean(userId); 
    function handleChange(event)
    {
        const {name,value}= event.target;
        setNewPost(prev=>  {return {...prev,[name]:value}});
        setUserId(document.querySelector("#postAuthor").value)
    }
    function onSave(event){
        event.preventDefault();
        const title = newpost.title;
        const body= newpost.body;
       
        dispatch(postAdded(title,body,userId))
        setNewPost({
            title:"",
            body:"",
        })

        setUserId("")
        navigate("/")

    }
    
    return (
       
        <div className="container my-5">
            <h2>Add a new post...</h2>
            <form onSubmit={onSave}>
            <div className="mb-3">
                <label htmlFor="title" className="form-label">title</label>
                <input id="title" className="form-control" name="title" onChange={handleChange} type="text" value={newpost.title} required/>
                </div>

                <div className="mb-3">
                <label htmlFor="postAuthor" className="form-label">Author</label>
                <select id ="postAuthor"  className="form-control" name="postAuthor" value={userId}>{users.map(user=><option value="">{user.name}</option>)}</select>
                </div>
                <div className="mb-3">
                <label htmlFor="body" className="form-label">content</label>
                <input id="body" name="body" className="form-control" onChange={handleChange} type="text" value={newpost.body} required/>
                </div>
                <button type ="submit" class="btn btn-primary" disabled={!canSave}>submit</button>
            
            </form>
            </div>
        
    );
}
export default AddPostForm;


