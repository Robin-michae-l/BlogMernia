import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import Figure from "react-bootstrap/Figure";
import autheimg from "../images/Authimg.webp";
import Form from "react-bootstrap/Form";
import { useState } from "react";
import { loginAPI, registerAPI } from "../services/allApi";
import { isauthtokencontext } from "../statecontext/Context";

function Auth({ register }) {

  const [isauthtoken,setisauthtoken]=useContext(isauthtokencontext)
  
  const [regData, setregData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const navigate=useNavigate()
  
  /*  console.log(regData);  */
  const Regform = register ? true : false;

  //function to register
  const Registerhandle=async(e)=>{
    e.preventDefault()
    const {username,email,password}=regData

    if(!username || !email || !password){
      alert('Please fill the form completely')
    }else{
      const result=await registerAPI(regData)
      console.log(result);
      if(result.status===200){
        alert(`${result.data.username} registered successfully`)
        setregData({
          username:"",email:"",password:""
        })
        navigate('/login')
      }else{
        alert(`${result.response.data}`)
      }
    }
  }

  //function to login

  const loginHandle=async(e)=>{
    e.preventDefault()

    const {email,password}=regData
    if(! email || !password){
      alert('Please fill the form ')
    }else{
      const result=await loginAPI(regData)
      console.log(result);

      if(result.status===200){

        setisauthtoken(true)
        
        //store data
        sessionStorage.setItem("existingUser",JSON.stringify(result.data. existingUser))
        sessionStorage.setItem("token",result.data.token)

        alert('login successful')

        setregData({
          username:"",email:"",password:""
        })
        navigate('/')
      }
      else{
        alert(result.response.data)
      }
    }
  }
  return (
    <div
      style={{ width: "100%", height: "100vh" }}
      className="d-flex justify-content-center align-items-center"
    >
      <div className="w-75 container">
        <Link to={"/"}>
          <button
            className="btn rounded "
            style={{ backgroundColor: "blueviolet", color: "white" }}
          >
            Back to <i class="fa-sharp fa-solid fa-house me-3"></i>
          </button>
        </Link>
        <div
          className="card shadow rounded p-5 mt-2"
          style={{ backgroundColor: "midnightblue" }}
        >
          <div className="row align-items-center">
            <div className="col-lg-6">
              <Figure>
                <Figure.Image
                  width={700}
                  height={300}
                  alt="171x180"
                  src={autheimg}
                />
                <Figure.Caption style={{ color: "white" }}>
                  Log in to connect or register to discover exclusive content
                  and engage with fellow members
                </Figure.Caption>
              </Figure>
            </div>
            <div className="col-lg-6">
              <div className="d-flex justify-content-center align-items-center flex-column">
                <h1 className="text-light">BlogMERNia</h1>
                <h5 style={{ color: "sandybrown" }}>
                  {Regform
                    ? "Sign up to your account"
                    : "Sign in to your account"}
                </h5>

                <Form className="w-100 p-4">
                  {Regform && (
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                      <Form.Control
                        type="text"
                        placeholder="Enter Username"
                        value={regData.username}
                        onChange={(e)=>setregData({...regData,username:e.target.value})}
                      />
                    </Form.Group>
                  )}

                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Control
                      type="email"
                      placeholder="Enter Email id"
                      value={regData.email}
                      onChange={(e)=>setregData({...regData,email:e.target.value})}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Control
                      type="password"
                      placeholder="Enter Password"
                      value={regData.password}
                      onChange={(e)=>setregData({...regData,password:e.target.value})}
                    />
                  </Form.Group>

                  {Regform ? (
                    <div>
                      <button onClick={Registerhandle} className="btn btn-warning mt-4">Register</button>
                      <p className="text-light">
                        Already a user? Click here to{" "}
                        <Link
                          to={"/login"}
                          style={{
                            textDecoration: "none",
                            fontWeight: "bold",
                            color: "green",
                          }}
                        >
                          Login
                        </Link>
                      </p>
                    </div>
                  ) : (
                    <div>
                      <button onClick={loginHandle} className="btn btn-warning mt-4">Login</button>
                      <p className="text-light">
                        New user? Click here to{" "}
                        <Link
                          to={"/register"}
                          style={{
                            textDecoration: "none",
                            fontWeight: "bold",
                            color: "green",
                          }}
                        >
                          Register
                        </Link>
                      </p>
                    </div>
                  )}
                </Form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Auth;
