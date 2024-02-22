import {createSlice, nanoid,createAsyncThunk} from "@reduxjs/toolkit";
import {sub }from "date-fns";
import axios from "axios";
// const initialState = [{
//     id:'1',
//     title:'learning redux toolkit',
//     content:"It's easy",
//     userId:0,
//     date: sub(new Date(),{minutes:5}).toISOString(),
//     reactions:{
//         thumsup:0,
//         like:0
//     }
// },
// {
//     id:'2',
//     title:'Subscribe...',
//     content:"Like and Share this video..",
//     userId:2,
//     date: sub(new Date(),{minutes:10}).toISOString(),
//     reactions:{
//         thumsup:0,
//         like:0
//     }
// }

// ]
const POSTS_URL = 'https://jsonplaceholder.typicode.com/posts';

const initialState = {
    posts:[],
    status : 'idle',
    error:null
}

export const fetchPosts  = createAsyncThunk('posts/fetchPosts',async ()=>{
    const response = await axios.get(POSTS_URL);
    return response.data
})


// export const addnewPost = createAsyncThunk('posts/addNewPost',async(initialPost)=>{
//     const response = await axios.post(POSTS_URL,initialPost)
//     return response.data
// })


// export const updatePost = createAsyncThunk('posts/updatePost',async(initialPost)=>{
//     const {id}= initialPost;
//     try{
//         const response = await axios.put(`${POSTS_URL}/${id}`,initialPost)
//         if (response?.status===200) return initialPost;
//         return `${response?.status} : ${response?.statusText}`
//     }catch(err){
//         return err.message
//     }
// })


// export const deletePost = createAsyncThunk('posts/deletePost',async(initialPost)=>{
//     const {id}= initialPost;
//     try{
//         const response = await axios.delete(`${POSTS_URL}/${id}`)
//         return response.data
//     }catch(err){
//         return err.message
//     }
// })







const postsSlice = createSlice({
    name:'posts',
    initialState,
    reducers:{
        postAdded:{
            reducer(state,action){
            state.posts.unshift(action.payload)
        },prepare(title,body,userId){
            return {
                payload:{
                    id:nanoid(),
                    title,
                    body,
                    userId,
                    date:new Date().toISOString(),
                    reactions:{
                        thumsup:0,
                        like:0
                    }
                }
            }
        }
    },reactionAdded:{
        reducer(state,action){
        const{postId,reaction}=action.payload;
        
        const existingPost = state.posts.find(post=>post.id==postId)
        if(existingPost){
            existingPost.reactions[reaction]++;
        }
    }
    },
    updatePost:{
        reducer(state,action){
            console.log(action.payload)
            const index = state.posts.findIndex(post=>post.id===action.payload.id);
            state.posts[index]=action.payload;

        },prepare(updatepost){
            return{
                payload:{
                    id:updatepost.id,
                    title:updatepost.title,
                    body:updatepost.body,
                    userId:updatepost.userId,
                    reactions:updatepost.reactions,
                }
            }
        }

    },
    deletePost:{
        reducer(state,action){
            console.log(action.payload)
            const index = state.posts.findIndex(post=>post.id===action.payload.id);
            console.log(index)
            state.posts.splice(index,1);

        },prepare(deletepost){
           return{ payload:{ id:deletepost.id}}
        }

    }
},extraReducers(builder){
        builder
        .addCase(fetchPosts.pending,(state,action)=>{
            state.status='loading';
           
        })
        .addCase(fetchPosts.fulfilled,(state,action)=>{
            state.status = 'succeded'
            let min =1
            const loadedPosts = action.payload.map(post=>{
                post.date = sub(new Date(),{minutes:min++}).toISOString()
                post.reactions={
                    thumsup:0,
                    like:0
                }
                return post;
            })
            state.posts = state.posts.concat(loadedPosts)
        })
        .addCase(fetchPosts.rejected,(state,action)=>{
            state.status='failed'
           
            state.error = action.error.message
        })

    }
    
})
export const selectAllPosts =(state)=>state.posts.posts;
export const getPostStatus = (state)=>state.posts.status
export const getPostsError = (state)=>state.posts.error
export const selectPostById = (state,postId)=>  state.posts.posts.find(post=> post.id==postId)
export const {postAdded,reactionAdded,updatePost,deletePost} = postsSlice.actions;
export default postsSlice.reducer



