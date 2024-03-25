import React, { useContext } from 'react'
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import blogo from '../images/blglogo.avif'
import { Link, useNavigate } from 'react-router-dom';
import { isauthtokencontext } from '../statecontext/Context';

function Header({dashview}) {
  const [isauthtoken,setisauthtoken]=useContext(isauthtokencontext)
  const navigate=useNavigate()
  const logout=()=>{
  
    sessionStorage.removeItem("token")
    sessionStorage.removeItem("existingUser")
    navigate('/')
    setisauthtoken(false)
    
  }
  return (
    <div>
        <Navbar style={{backgroundColor:'teal'}}>
        <Container>
            <Link to={'/'} style={{textDecoration:'none'}}>
            <Navbar.Brand  href="#home">
            <img
              alt=""
              src={blogo}
              width="40"
              height="40"
              className="d-inline-block align-top"
            />{' '}
           Blog<span style={{color:'darkred',fontWeight:'bold'}}>MERN</span>ia
          </Navbar.Brand>
            </Link>
            {
              dashview &&
              <button onClick={logout} className='btn rounded ' style={{backgroundColor:'tan'}}>Logout</button>
            }
          
        </Container>
        </Navbar>

    </div>
  )
}

export default Header