
import React, { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';

import { SiSimplelogin } from "react-icons/si";

import {Link} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import {handleError, handleSuccess} from './Util'
import { useNavigate } from 'react-router-dom';
const Login = () => {
    const [logininfo, setlogininfo] = useState({

        email:'',
        password:''

    });


const navigate=useNavigate();
    const handlechange = (e) => {
        // e.preventDefault();
        // Handle signup logic here
        const {name,value}=e.target;
        // console.log(name ,value);
        // const copylogin={...signup};
        // copylogin[name]=value;
        setlogininfo((prev)=>({...prev,[name]:value}));
    };







    const handleSubmit = async (e) => {
        e.preventDefault(); // Ensure parentheses are present
        const {  email, password } = logininfo;

        if ( !email || !password) {
            return handleError('Name, email, and password are required');
        }

        try {
            const url = "http://localhost:9090/auth/login";
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(logininfo) // Use lowercase 'body'
            });

            const result = await response.json(); // Await JSON parsing
            console.log(result);

            const { success,jwtToken,name, message, error } = result || {};

            if (success) {
                handleSuccess(message);
                localStorage.setItem('jwtToken',jwtToken);
                localStorage.setItem('loggedInUser',name);
                setTimeout(() => {
                    navigate('/home');
                }, 1000);
            } else if (error) {
                // const details = error?.details?.[0]?.message || 'Something went wrong';
                const details=error?.details[0]?.message;
                handleError(details);
            }
            else if(!success)
            {
                handleError(message)
            }

        } catch (err) {
            handleError(err.message || 'An unexpected error occurred');
        }
    };


    return (
        <div className="mt-5 signup" style={{backgroundColor:"aqua",height:"520px",width:"500px",marginLeft:"250px"}}>
            <Row className="justify-content-center">
                <Col md={6}>
                    <div className="text-center mb-4" style={{color:"black"}}>
                        {/* <FaSpotify size={50} color="#1DB954" /> */}
                        <img src='download.png' style={{width:"50px",height:"50px",marginTop:"20px"}}></img>
                        <h2>Login for Spotify<SiSimplelogin /></h2>
                    </div>
                    <Form onSubmit={handleSubmit}>


                        <Form.Group controlId="formEmail">
                            <Form.Label style={{color:"black"}}><b>Email address</b></Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Enter your email"
                                // value={signup.email}
                                // email="email"
                                name='email'

                                autoFocus
                                onChange={handlechange}
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId="formPassword">
                            <Form.Label style={{color:"black"}}><b>Password</b></Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Password"
                                // value={signup.password}
                                // password="password"
                                name='password'
                                autoFocus
                                onChange={handlechange}
                                required
                            />
                        </Form.Group>
                            <br />
                        <Button  className="button "variant="success" type="submit" block style={{backgroundColor:"indigo", marginLeft:"7px"}}>
                            Login
                        </Button>
                        <br />
                        
                            <p style={{color:"black"}}>Don't have an account ? </p><Link to="/signup">signup</Link>
                        
                    </Form>

                    <ToastContainer />
                </Col>
            </Row>
        </div>
    );
};

export default Login;