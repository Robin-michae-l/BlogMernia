import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import { Row , Col} from "react-bootstrap"
import Blog from '../components/Blog'
import { allBlogsApi } from '../services/allApi'
import { Link } from 'react-router-dom'

function Blogs() {

  const [allblogs,setallblogs]=useState([])
  const [skey,setskey]=useState("")

  const getAllblogs=async()=>{

    if(sessionStorage.getItem("token")){
      const token= sessionStorage.getItem("token")

      const reqHeader= {
        "Content-Type":"application/json",
        "Authorization": `Bearer ${token}`
      }
    
    const result=await allBlogsApi(skey,reqHeader)
    console.log(result);
    if(result.status===200){
       setallblogs(result.data)
    }else{
      console.log(result.response.data);
    }
  }
}
console.log(allblogs);
console.log(skey);

  useEffect(()=>{
    getAllblogs()
  },[skey])
  return (
    <>
      <Header/>

      <div className="text-center mb-5" style={{marginTop:'100px'}}>
       <h1>All Blogs</h1>
       <div className="d-flex justify-content-center align-items-center">
        <div className="d-flex mt-5 w-25">
          <input type="text" value={skey} onChange={(e)=>setskey(e.target.value)} className='form-control' placeholder='search using subjects' />
        </div>

       </div>

      </div>
      <Row className='container-fluid mb-5 mt-5'>
        {allblogs?.length>0?
        allblogs?.map((item)=>(
          <Col className='mb-5' sm={12} md={6} lg={4}>
        <Blog blogs={item}/> 
        </Col>
        ))
       
       : <div className='d-flex justify-content-center align-items-center'>
        
         <p className='fs-3 mt-4 text-danger'>Please login  to see more project</p>
         <button className='btn btn-success rounded ms-3' ><Link style={{textDecoration:"none"}} to={'/login'}>login</Link></button>
       </div> 
       }
      </Row>
    </>
  )
}

export default Blogs