import {createSlice,createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";


const initialState ={
    users:[],
    status:'idle',
    error:null
}
const USER_API = "https://jsonplaceholder.typicode.com/users";

export const fetchusers = createAsyncThunk('users/fetchusers', async ()=>{
    const response = await axios.get(USER_API);
    return response.data;
})

const userSlice = createSlice({
    name:'users',
    initialState,
    reducers:{

    },extraReducers(builder){
        builder
        .addCase(fetchusers.pending,(state,action)=>{
            state.status='loading'

        })
        .addCase(fetchusers.fulfilled,(state,action)=>{
            state.status='succeded'
            const loadedusers = action.payload.map((user)=>{return user}).slice(0,10)
            state.users =  state.users.concat(loadedusers);
            
        })
        .addCase(fetchusers.rejected,(state,action)=>{
            state.status='failed'
            state.error = action.error.message
        })

    }
})

export const selectAllUsers = (state)=>state.users.users;
export const getUserStatus = (state)=>state.users.status
export const getUserError = (state)=>state.users.error
export const getUserById = (state,id)=>state.users.users.find(user=>user.id==id)
export default userSlice.reducer;