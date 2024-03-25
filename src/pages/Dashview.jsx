import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import { Row,Col } from "react-bootstrap";
import Myblogs from '../components/Myblogs';



function Dashview() {
  const [username,setUsername]=useState("")

  useEffect(()=>{
    setUsername(JSON.parse(sessionStorage.getItem("existingUser")).username)
  })
  return (
    <>
   <Header dashview/>
   <h2 className='mt-3 ms-3'>Welcome {username}</h2>
    <Row className='container-fluid mt-5 mb-5'>
       <Col md={12}>
         <Myblogs/>
       </Col>

      

       
    </Row>
    </>
    
  )
}

export default Dashview