//This LandingPage.js has both landing page and login

import React, { Component } from 'react'

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import image from './twitterLandingPage.png'
import './../../CSS/LandingPage.css'
import './../../CSS/Signup.css'
import axios from 'axios';
import { Redirect } from 'react-router'


import rooturl from './../../Config/settings.js'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

class LandingPage extends Component {

    constructor(props) {
        super(props)
        this.state = {
            usermame: "",
            userPassword: "",
            SignedUpFlag: false,
            message: "",
        }

        this.usernameChangeHandler = this.usernameChangeHandler.bind(this)
        this.passwordChangeHandler = this.passwordChangeHandler.bind(this)
        this.submitLogin = this.submitLogin.bind(this)
        this.submitSignup = this.submitSignup.bind(this)

    }

    usernameChangeHandler = (e) => {
        this.setState({
            username: e.target.value
        })
    }
    passwordChangeHandler = (e) => {
        this.setState({
            userPassword: e.target.value
        })
    }

    submitLogin = (e) => {
        console.log("in submit Login")
        const data = {
            username: this.state.username,
            userPassword: this.state.userPassword
        }
        console.log("data is..")
        console.log(data);
        e.preventDefault();
        axios.defaults.withCredentials = true;
        
        axios({
        method: 'get',
            url: 'http://'+rooturl+':3001/login',
            params: {data  },
            config: { headers: { 'Content-Type': 'application/json' } },
            //headers: { "Authorization": `Bearer ${token}` }
        })
            .then(response => {
                console.log("Status Code : ", response.status);
                console.log("Response from Sign Up " + response);
                console.log(response);
                if (response.data.validUser === true) {
                    
                    this.setState({
                        SignedUpFlag: true,
                        message: "User Logged in successfully"
                    })
                } else {
                    this.setState({
                        SignedUpFlag: false,
                        message: "Invalid Credentials"
                    })
                }
            });
    }

    render() {
        if (this.state.SignedUpFlag === true) {
            return <Redirect to="/home" />
        }
        return (
            <div>
                <Col sm={7} className = "leftHome">
                    <div className="imgbox">
                        <img className="left-fit" src={image} alt="twitterLandingPage" />
                    </div>
                </Col>
                <Col sm={5} className = "leftHome">
                    <Container>
                        <Form className="input">
                            <Form.Row>
                                <Col>
                                    <Form.Control placeholder="Username" />
                                </Col>
                                <Col>
                                    <Form.Control placeholder="Password" />
                                    <h6 className="password">Forget Password?</h6>

                                </Col>
                                <Col>
                                    <Button className = "button" >Login</Button>
                                </Col>

                            </Form.Row>
                            <div className = "signup">
                                <span className="fab fa-twitter" style={{
                                    marginRight: "10px",
                                    fontSize: "2rem",
                                    color: "rgba(29,161,242,1.00)"
                                }}></span>
                                <h2 className = "font">See what's happening in the world now</h2>
                                
                                <h5>Join Twitter today.</h5>

                                <Button className = "button" block>
                                    Sign up
                                </Button>

                            </div>

                        </Form>
                    </Container>
                </Col>

            </div>
        )
    }
}

export default LandingPage
