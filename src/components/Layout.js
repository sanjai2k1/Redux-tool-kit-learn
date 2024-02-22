import { Outlet,Link } from "react-router-dom";

import Header from "./Header";

import React from 'react'

const Layout = () => {
  return (
   <>
   
   <div class="d-flex flex-row mx-5 mt-5">
  
        <div class="p-2 flex-fill"><h1 className="text-center">Redux-Tool-Kit-Practice</h1></div>
  <div class="p-2 flex-fill text-center"><Link to="/"><button className="w-100 h-100 btn btn-primary" type="button" >Post List</button></Link> </div>
  <div class="p-2 flex-fill r"><Link className="" to ="/post"><button className="w-100 h-100 btn btn-primary" type="button" >ADD Post</button></Link></div>
      
   </div>
   
   <Outlet/>
   </>
  )
}

export default Layout;