import React, { useContext, useEffect } from 'react'
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useState } from 'react';
import { Row } from "react-bootstrap";
import Col from "react-bootstrap/Col";
import { Base_url } from '../services/baseurl';
import { editBlogsApi } from '../services/allApi';
import { editResponse } from '../statecontext/Context';

function Blogsedit({blogsupdt}) {

  const {editblogs,seteditresponse}=useContext(editResponse)

    const [blog, setblogs] = useState({
        id:blogsupdt._id,
        title: blogsupdt.title,
        headline: blogsupdt.headline,
        subject: blogsupdt.subject,
        content: blogsupdt.content,
        timestamp: blogsupdt.timestamp,
        blogimg: "",
      });
    const [show, setShow] = useState(false);

    const [imgpreview,setimgPreview]=useState("")

    const handleClose=()=>setShow(false)

    const handleShow = () => setShow(true);

    useEffect(()=>{
        if(blog.blogimg){
       setimgPreview(URL.createObjectURL(blog.blogimg))
        }
    },[blog.blogimg])

    const handleClosed=()=>{
        setblogs({
            title: blogsupdt.title,
        headline: blogsupdt.headline,
        subject: blogsupdt.subject,
        content: blogsupdt.content,
        timestamp: blogsupdt.timestamp,
        blogimg: ""
        })
        setimgPreview("")
    }

    const updateblogs=async(e)=>{
        e.preventDefault()

        const {id,title,headline,subject,content,timestamp,blogimg}=blog

        if(!title || !headline || !subject || !content || !timestamp){
            alert('please fill the form completely')
        }
        else{
            const reqBody=new FormData()

            reqBody.append("title",title)
            reqBody.append("headline",headline)
            reqBody.append("subject",subject)
            reqBody.append("content",content)
            reqBody.append("timestamp",timestamp)
            imgpreview?reqBody.append("blogimg",blogimg):reqBody.append("blogimg",blogsupdt.blogimg)
        

        const token= sessionStorage.getItem("token")


        if(imgpreview){
            const reqHeader={
                "Content-Type":"multipart/form-data",
                "Authorization": `Bearer ${token}`
        
              
              }

              const result=await editBlogsApi(id,reqBody,reqHeader)
              console.log(result);
              if(result.status===200){
                alert('blogs updated successfully')
                handleClose()
                seteditresponse(result.data)
              }
              else{
                console.log(result.response.data);
              }
        }

        else{
            const reqHeader= {
                "Content-Type":"application/json",
                "Authorization": `Bearer ${token}`
              }
              const result=await editBlogsApi(id,reqBody,reqHeader)
              console.log(result);
              if(result.status===200){
                alert('blogs updated successfully')
                handleClose()
                seteditresponse(result.data)
              }
              else{
                console.log(result.response.data);
              }
        }

      }



        
    }
  return (
    <>
     <button onClick={handleShow} style={{color:'black',backgroundColor:'royalblue'}}  className="btn rounded">Edit Blogs</button>

     <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Edit your blogs</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col md={6}>
              <label htmlFor="upload">
                <input id="upload" type="file" style={{ display: "none" }}  onChange={e=>setblogs({...blog,blogimg:e.target.files[0]})} />
                <img
                  className="img-fluid"
                  src={imgpreview?imgpreview:`${Base_url}/Storeblogs/${blogsupdt.blogimg}`}
                  alt="No image"
                />
              </label>
            </Col>
            <Col md={6}>
              <div className="mb-5 w-100">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Blog-title"
                  value={blog.title}
                  onChange={e=>setblogs({...blog,title:e.target.value})}
                  
                />
              </div>

              <div className="mb-5 w-100">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Blog-headline"
                  value={blog.headline}
                  onChange={e=>setblogs({...blog,headline:e.target.value})}
                  
                />
              </div>

              <div className="mb-5 w-100">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Blog-subject"
                  value={blog.subject}
                  onChange={e=>setblogs({...blog,subject:e.target.value})}
                  
                />
              </div>

              <div className="mb-5 w-100">
                <textarea
                  rows={3}
                  cols={30}
                  type="text"
                  className="form-control"
                  placeholder="Blog-content"
                  value={blog.content}
                  onChange={e=>setblogs({...blog,content:e.target.value})}
                  
                />
              </div>

              <div className="mb-5 w-100">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Blog-timestamp"
                  value={blog.timestamp}
                  onChange={e=>setblogs({...blog,timestamp:e.target.value})}
                  
                />
              </div>
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClosed}>
            Cancel
          </Button>
          <Button variant="primary" onClick={updateblogs} >
            Update Blogs
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default Blogsedit