import React from "react";
import Card from "react-bootstrap/Card";
import blogc from "../images/blog2.webp";
import { Row, Col } from "react-bootstrap";

import { useState } from "react";

import Modal from "react-bootstrap/Modal";
import { Base_url } from "../services/baseurl";

function Blog({blogs}) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
      <Card className="shadow rounded btn" onClick={handleShow}>
        <Card.Img variant="top" src={blogs?`${Base_url}/storeblogs/${blogs.blogimg}`:blogc} />
        <Card.Body>
          <Card.Title>{blogs.title}</Card.Title>
          <Card.Text>
            {blogs.content}
          </Card.Text>
        </Card.Body>
      </Card>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>{blogs.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col md={6}>
              <img width={"100%"} height={"250px"} src={blogs?`${Base_url}/storeblogs/${blogs.blogimg}`:blogc} alt="no image" />
            </Col>

            <Col md={6}>
              <h4>Data</h4>
              <p>
               {blogs.content}.
                
              </p>
              <p>Subject:{blogs.subject}</p>
            </Col>
          </Row>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default Blog;
