import React, { useContext, useEffect } from "react";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Row } from "react-bootstrap";
import Col from "react-bootstrap/Col";
import {  addBlogsApi } from "../services/allApi";
import { blogResponse, editResponse } from "../statecontext/Context";

function Blogsstack() {

  const {addblogs,setblogsresponse}=useContext(blogResponse)

  
  //state to hold values from input box
  const [blog, setblogs] = useState({
    title: "",
    headline: "",
    subject: "",
    content: "",
    timestamp: "",
    blogimg: "",
  });
 
  const [show, setShow] = useState(false);
  //state to hold url of the file
  const [imgpreview,setimgPreview]=useState("")

  const [token,setToken]=useState("")

  useEffect(()=>{
    if(sessionStorage.getItem("token"))
    {setToken(sessionStorage.getItem("token"))}
  },[])

  useEffect(()=>{
    blog.blogimg&&
    setimgPreview(URL.createObjectURL(blog.blogimg))
  },[blog.blogimg])

  console.log(imgpreview);

  console.log(blog);
  const handleClose=()=>{
    setShow(false)
    handleClose1()
  } 

  const handleClose1 = () =>{
    setblogs({
      title: "",
    headline: "",
    subject: "",
    content: "",
    timestamp: "",
    blogimg: ""
    })
    setimgPreview("")
  }
   /* setShow(false); */
  const handleShow = () => setShow(true);

  //fn to add blogs

  const handleBlogs=async(e)=>{
    e.preventDefault()
    const {title ,headline ,subject ,content ,timestamp ,blogimg }=blog
    if(!title || !headline || !subject || !content || !timestamp || !blogimg ){
      alert('Please fill the form completely')

    }else{

      //reqbody
       const reqBody=new FormData()

       //add data -append()
       reqBody.append("title",title)
       reqBody.append("headline",headline)
       reqBody.append("subject",subject)
       reqBody.append("content",content)
       reqBody.append("timestamp",timestamp)
       reqBody.append("blogimg",blogimg)
      
      //reqheader
      if(token){
      const reqHeader={
        "Content-Type":"multipart/form-data",
        "Authorization": `Bearer ${token}`

      
      }
      const result= await addBlogsApi(reqBody,reqHeader)
      console.log(result);
       if(result.status===200){
        console.log(result.data);
        alert('blog added successfully')
        handleClose()

        setblogsresponse(result.data)
      }else{
        alert(result.response.data);
        handleClose1()

      } 
 
    }

    }
  }
  return (
    <div>
      <Button variant="primary" onClick={handleShow}>
        Add Blogs
      </Button>

      <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col md={6}>
              <label htmlFor="upload">
                <input id="upload" type="file" style={{ display: "none" }} onChange={(e)=>setblogs({...blog,blogimg:e.target.files[0]})} />
                <img
                  className="img-fluid"
                  src={imgpreview?imgpreview:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAT4AAACfCAMAAABX0UX9AAAAgVBMVEX29/j6+vrw8fPR0tPz9Pbj5OXZ2tu8vL7////29vbPz9DHx8jt7vC+v8De3t3W1tZKSkqTk5Nqamro6Oh1dXW1tbV9fX1GRkYvLy+lpaVgYGCEhIStra2dnZ1mZmZaWloaGhopKSlSUlKNjY0AAAA6OjoiIiIWFhY+Pj4ODg55eXmcSK/LAAAEaElEQVR4nO3cC3OiSBiFYWkG+Lg2CIgKatRNspP//wO3xcuoM06SPSYKnrcqhahJVT/ptjFVZuAO2P/OGZAPiHxQ5IMiHxT5oMgHRT4o8kGRD4p8UOSDIh8U+aDIB0U+KPJBkQ+KfFDkgyIfFPmgyAdFPijyQZEPinxQ5IMiHxT5oMgHRT4o8kGRD4p8UOSDIh8U+aDIB0U+KPJBkQ+KfFDkgyIfFPmgyAdFPijyQZEPinxQX8Fn3W1XH+oX8FlB6d1pV/f7Cr5Q/bjLBnE3+CJ1l/0gHxL5oMgHRT4o8kF1ju/WlyrbusqXB3dR1FE+x/Vvn9VdvuTWb3JNYpMPiHxQ5IMiHxT5oHrF50d5HpHvL/2FL9LbC9nEJ9+lLvMlQaCdPHcMokO+C13k04HrSzsiMwu/7WWxL3zJMZkO8l8D3H3tT49uHzO09194sP98KtBHZ75t72/mmViSHVazU4zUnxRmo9A8bx1/1q8nfElwopIfpl9SGZZKm3nVTi0VPG235u1Ek918k6SYmGfUpWym6v7OD1j2hO9k8pnpdzh3UsORaks7pd2uz3HUcnnh5lHthWabFsfTmeELtPkdiPbtMjHfFMVx7j4GnzrfLPR+9e741D+rbDGUHZ9kz9mwUjJfZMVzJM04K54a8euxWbyyGk6zV1v0S12/DN+bgP3gi86vVdzgjG9p1uLCk5ZP3LE5W9fim8VblP5Tbs42i7do+QqRWSZVLBI/CJ8650vOFq8am6E26x1fU5sbbirhdLwcN+5qs7sc+NJQpKytV/MN4YPw+eeLd17vbuTjDZmjNodstuPzDIuxy18DkbrJn0/4VnrDJ0+RbPlON5Kz/aQffL9e67aD0ul6N0ypJn7zr0Q/YxW8OuLnS7M/+MtSJc9xssxV+bOR1UwlqeHL5020maotX7Zw9bQwnGXZbjle0x7CyYlfT/ick9Uro9TejzIfVnNHouVbNTX3JavhwryoOUVqXghlllbrSSzqLZ2OPPGn82kmMkoM0kykmQ+zzSzNstZtUreH8q2PfJZ9dOEnZXo0yPbaLhrL/o3F0UHk6Hi4c/uwuXiROnuQxWv2XjvaczXpIrdOi5bW55L4ZZ6u3v3bTV/4zBuNIFHGzg/Nwkx+2zHPPd/38/XvP6W/fJbSgT0bDldVtY4+/db/jzQfeU5v+MwKddarRTFxroL3sfrEtx3QN+L1kO97Ix8U+aDIB0U+qC7zfese2zu+IHFvXhJ2lS9y7iLVUb47i3xQ5IMiHxT5oMgHRT6ozvHd+tNsp3Xlw/ju7nrVte8qXXaBbxDZetutvc5zrj5U/hscKPJBkQ+KfFDkgyIfFPmgyAdFPijyQZEPinxQ5IMiHxT5oMgHRT4o8kGRD4p8UOSDIh8U+aDIB0U+KPJBkQ+KfFDkgyIfFPmgyAdFPijyQZEPinxQ5IMiHxT5oMgHRT4o8kGRD4p8UOSDIh8U+aDIB0U+KPJBGb6rf8D/cbKcgXfr/zDQ5eL/AHLmgJMvyJA4AAAAAElFTkSuQmCC"}
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
                  onChange={(e) => setblogs({ ...blog, title: e.target.value })}
                />
              </div>

              <div className="mb-5 w-100">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Blog-headline"
                  value={blog.headline}
                  onChange={(e) =>
                    setblogs({ ...blog, headline: e.target.value })
                  }
                />
              </div>

              <div className="mb-5 w-100">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Blog-subject"
                  value={blog.subject}
                  onChange={(e) =>
                    setblogs({ ...blog, subject: e.target.value })
                  }
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
                  onChange={(e) =>
                    setblogs({ ...blog, content: e.target.value })
                  }
                />
              </div>

              <div className="mb-5 w-100">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Blog-timestamp"
                  value={blog.timestamp}
                  onChange={(e) =>
                    setblogs({ ...blog, timestamp: e.target.value })
                  }
                />
              </div>
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose1}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleBlogs}>
            Stack Blogs
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Blogsstack;
