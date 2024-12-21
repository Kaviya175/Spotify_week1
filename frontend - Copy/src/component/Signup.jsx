
import React, { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import { FaSpotify } from 'react-icons/fa';
import {Link} from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import {handleError, handleSuccess} from './Util'
import { useNavigate } from 'react-router-dom';
const Signup = () => {
    const [signup, setsignup] = useState({
        name:'',
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
        setsignup((prev)=>({...prev,[name]:value}));
    };







    const handleSubmit = async (e) => {
        e.preventDefault(); // Ensure parentheses are present
        const { name, email, password } = signup;

        if (!name || !email || !password) {
            return handleError('Name, email, and password are required');
        }

        try {
            const url = "http://localhost:9090/auth/signup";
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(signup) // Use lowercase 'body'
            });

            if (!response.ok) {
                const errorResult = await response.json(); // Parse error response
                if (response.status === 409) { // Conflict: data already exists
                    throw new Error(errorResult.error || "Email already exists");
                } else {
                    throw new Error(`HTTP Error: ${response.status}`);
                }
            }


            const result = await response.json(); // Await JSON parsing
            console.log(result);

            const { success, message, error } = result || {};

            if (success) {
                handleSuccess(message);
                setTimeout(() => {
                    navigate('/login');
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
        <Container className="mt-5 signup" style={{backgroundColor:"aqua",height:"500px",width:"500px",marginLeft:"250px"}}>
            <Row className="justify-content-center">
                <Col md={6}>
                    <div className="text-center mb-4" style={{color:"black"}}>
                        <FaSpotify size={50} color="#1DB954" />
                        <h2>Sign up for Spotify</h2>
                    </div>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="formName">
                            <Form.Label style={{color:"black"}}>Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter your name"
                                // value={signup.name}
                                name="name"
                                autoFocus
                                onChange={handlechange}
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId="formEmail">
                            <Form.Label style={{color:"black"}}>Email address</Form.Label>
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
                            <Form.Label style={{color:"black"}}>Password</Form.Label>
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
                            Sign Up
                        </Button>
                        <br />
                        
                           <b> Aready have account ? </b><Link to="/login">Login</Link>
                        
                    </Form>

                    <ToastContainer />
                </Col>
            </Row>
        </Container>
    );
};

export default Signup;