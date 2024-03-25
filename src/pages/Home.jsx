import React, { useEffect, useState } from "react";
import { Row } from "react-bootstrap";
import Col from "react-bootstrap/Col";

import cimg2 from '../images/carousel img2.avif'

import Figure from 'react-bootstrap/Figure';

import Button from 'react-bootstrap/Button';
import Blog from "../components/Blog";
import { Link } from "react-router-dom";
import { homeBlogsApi } from "../services/allApi";

function Home() {
  const[login,setlogin]=useState(false)
  const [homeblogs,sethomeblogs]= useState([])

  useEffect(()=>{
    if(sessionStorage.getItem("token"))
    setlogin(true)
  },[])

  const gethomeblogs=async()=>{
    const result=await homeBlogsApi()
    console.log(result.data);
    sethomeblogs(result.data)
  }

  useEffect(()=>{
    gethomeblogs()
  },[])
  return (
    <>
      <div
        style={{ width: "100%", height: "100vh", backgroundColor: "steelblue" }}
      >
        <div className="container-fluid rounded">
          <Row className="align-items-center">
            <Col sm={12} md={6}>
              <h1 style={{ fontSize: "50px" }}>
                Blog
                <span style={{ color: "darkred", fontWeight: "bold" }}>
                  MERN
                </span>
                ia
              </h1>
              <p>
                Welcome to our vibrant community of passionate writers and
                readers, where each word paints a story. Explore BlogMERNia,
                ignite your curiosity, and join us on an inspiring journey
                through diverse perspectives.
              </p>
              {login?
              <Link to={'/dashview'}><Button className="w-25 " variant="outline-light">BlogSpace</Button>{' '}</Link>:
              <Link to={'/login'}><Button className="w-25" variant="outline-light">Get Started</Button>{' '}</Link>
               }
             
            </Col>
            

            <Col sm={12} md={6} className="mt-5">
            <Figure>
      <Figure.Image
        width={700}
        height={300}
        alt="171x180"
        src={cimg2}
      />
      <Figure.Caption style={{color:'white'}}>
      Transform your space into a haven of comfort and style. 
Welcome home to tranquility and elegance
      </Figure.Caption>
    </Figure>
            </Col>
          </Row>
        </div>
      </div>

      <div className="mt-5 blg ">
        <h1 className="text-center">Blog View</h1>
        <div className="d-flex mt-5 justify-content-center">
          {homeblogs.length>0?
          homeblogs?.map((item)=>(
            <div className="ms-5 " style={{width:'400px'}}>
            <Blog blogs={item}/>
          </div>
          ))
          :null
           }
          
        </div>
        <div className="mt-5 text-center">
          <Link to={'/Blogs'}><Button className="btn btn-success rounded">Blog World</Button></Link>
        </div>

      </div>
    </>
  );
}

export default Home;
