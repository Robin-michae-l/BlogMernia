import React, { useEffect, useState } from "react";
import Blogsstack from "./Blogsstack";
import { userBlogsApi } from "../services/allApi";
import { useContext } from "react";
import { blogResponse } from "../statecontext/Context";
import Blogsedit from "./Blogsedit";
import { editResponse } from "../statecontext/Context";
import { deleteBlogsApi } from "../services/allApi";

function Myblogs() {
  const {addblogs,setblogsresponse}=useContext(blogResponse)

  const {editblogs,seteditresponse}=useContext(editResponse)
  const [usrblogs,setusrblogs]=useState([])

 
  const getUsrblogs=async()=>{
    const token=sessionStorage.getItem("token")

    const reqHeader= {
      "Content-Type":"application/json",
      "Authorization": `Bearer ${token}`
    }

    const result=await userBlogsApi(reqHeader)
   console.log(result.data);
   setusrblogs(result.data)
  }

  useEffect(()=>{
    getUsrblogs()
  },[addblogs,editblogs])

  const deleteblog=async(id)=>{
    const token=sessionStorage.getItem("token")

    const reqHeader= {
      "Content-Type":"application/json",
      "Authorization": `Bearer ${token}`
    }
    const result=await deleteBlogsApi(id,reqHeader)
    console.log(result);
    if(result.status===200){
      getUsrblogs()
    }
    else{
      console.log(result.response.data);
    }

  }
  return (
    <div className="card shadow p-3 ms-3 me-3 ">
      <div className="d-flex justify-content-between mb-5">
        <h2 className="text-success" style={{}}>
          BlogSpace
        </h2>
        <h1>Welcome to the world of Blogs</h1>
        <div>
          <Blogsstack />
        </div>
      </div>
      <div className="mt-4">
        {usrblogs?.length>0?
        usrblogs?.map((item)=>(
          <div className="border align-items-center rounded p-2 d-flexvmb-3">
          <h5>{item.title}</h5>

          <div className="icon ms-auto ">
           <Blogsedit blogsupdt={item}/>
          <button onClick={()=>deleteblog(item._id)} style={{color:'black',backgroundColor:'red'}} className="btn rounded">Delete Blogs</button>
          </div>
        </div>

      
        )):
        
      <p>No Blogs Uploaded</p>}
    </div>
    </div>
  );
}

export default Myblogs;
