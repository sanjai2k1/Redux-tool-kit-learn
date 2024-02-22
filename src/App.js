import logo from './logo.svg';
import './App.css';
import { PostList } from './features/PostList';
import AddPostForm from './features/posts/AddPostsForm';
import {Routes,Route } from 'react-router-dom'

import Layout from './components/Layout';
import SinglePostPage from './features/posts/SinglePostPage';

import Header from './components/Header';
import { NoPage } from './components/NoPage';
import EditPostForm from './features/posts/EditPostForm';



function App() {

 return <div>
 

<Routes>
<Route path="/" element={<Layout/>}>
<Route index element={<PostList/>} />
<Route path="post">
<Route index  element={<AddPostForm/>} />
<Route path=":postId" element= {<SinglePostPage/>}/>
</Route>
<Route path="edit">
<Route path=":postId" element= {<EditPostForm/>}/>
</Route>
<Route path="*" element={<NoPage/>}/>

</Route>

</Routes>


 </div>
}

export default App;
