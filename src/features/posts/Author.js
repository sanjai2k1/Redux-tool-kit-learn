import React from 'react'
import { UseSelector,useDispatch, useSelector } from 'react-redux';
import { getUserById, getUserStatus,selectAllUsers} from '../users/userSlice';
const Author = ({user}) => {
  return (
    <h5 class=" text-body-emphasis"> by {user ? user : "unknown author"}</h5> 
  )
}

export default Author