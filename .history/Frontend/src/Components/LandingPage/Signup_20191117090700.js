
import React, { Component } from 'react'
import axios from 'axios';
import { Redirect } from 'react-router'
import rooturl from './../../Config/settings.js'

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import './../../CSS/SignupPage.css'

class Signup extends Component {

    constructor(props) {
        super(props)
        this.state = {
            firstName: "",
            lastName:"",
            username: "",
            userPassword: "",
            zipcode: "",
            state:"",
            city:"",
            finishedSignUp: false,
            message: ""
        }

        this.firstNameChangeHandler = this.firstNameChangeHandler.bind(this)
        this.lastNameChangeHandler = this.lastNameChangeHandler.bind(this)
        this.usernameChangeHandler = this.usernameChangeHandler.bind(this)
        this.passwordChangeHandler = this.passwordChangeHandler.bind(this)

        this.cityChangeHandler = this.cityChangeHandler.bind(this)
        this.stateChangeHandler = this.stateChangeHandler.bind(this)
        this.zipcodeChangeHandler = this.zipcodeChangeHandler.bind(this)

        this.submitSignUp = this.submitSignUp.bind(this)
       
    }
    firstNameChangeHandler = (e) => {
        this.setState({
            firstName: e.target.value
        })
    }
    lastNameChangeHandler = (e) => {
        this.setState({
            lastName: e.target.value
        })
    }
    passwordChangeHandler = (e) => {
        this.setState({
            userPassword: e.target.value
        })
    }

    usernameChangeHandler = (e) => {
        this.setState({
            username: e.target.value
        })
    }

    stateChangeHandler = (e) => {
        this.setState({
            state: e.target.value
        })
    }
    cityChangeHandler = (e) => {
        this.setState({
            city: e.target.value
        })
    }
    zipcodeChangeHandler = (e) => {
        this.setState({
            zipcode: e.target.value
        })
    }

    submitSignUp = (e) => {
        //console.log("in submit ")
        e.preventDefault();
        console.log(this.state.message)
        const data = {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            userPassword: this.state.userPassword,
            username: this.state.username,
            state: this.state.state,
            city: this.state.city,
            zipcode: this.state.zipcode,
        }

        console.log("data is..")
        console.log(data);

        this.setState({
            message: "Username already exists"
        })

        axios.defaults.withCredentials = true;
        axios.post('http://' + rooturl + ':3001/signup', data)
            .then(response => {
                console.log("frontend")
                //console.log("Status Code : ", response.status);
                console.log("Response from Sign Up " + response);
                console.log(response);
                //console.log(response.message)
                if (response.data.responseMessage === "Successfully Added!") {
                    this.setState({
                        finishedSignUp: true,
                        message: "User signed up successfully"
                    })
                } else {
                    this.setState({
                        finishedSignUp: false,
                        message: "username already exists"
                    })
                }
            });
    }

    render() {
        var nextpage = null
        if (this.state.finishedSignUp === true) {
            nextpage = <Redirect to="/home" />
        }
        return (
            <div>
                {nextpage}
                <br></br>
                <center>
                    <Card style={{ width: '24rem' }} >
                        <br></br>
                        <span className="fab fa-twitter" style={{
                            marginRight: "10px",
                            fontSize: "1.5rem",
                            color: "rgba(29,161,242,1.00)"
                        }}></span>

                        <h4>Create your account</h4>
                        <br></br>
                        <center>
                            <Form style={{ width: '20rem' }}>
                                <Form.Group controlId="formGridName" >
                                    <Row>
                                        <Col>
                                            <Form.Control placeholder="First name" onChange={this.firstNameChangeHandler}/>
                                        </Col>
                                        <Col>
                                            <Form.Control placeholder="Last name" onChange={this.lastNameChangeHandler}/>
                                        </Col>
                                    </Row>
                                </Form.Group>
                                <Form.Group controlId="formBasicEmail">
                                    <Form.Control required placeholder="Username" name="Username" onChange={this.usernameChangeHandler} />
                                </Form.Group>

                                <Form.Group controlId="formBasicPassword">
                                    <Form.Control type="password" required placeholder="Password" required name="userPassword" onChange={this.passwordChangeHandler} />
                                </Form.Group>
                               
                                <Form.Group controlId="formGridAddress1">
                                    <Row>
                                        <Col>
                                            <Form.Control placeholder="City" onChange={this.cityChangeHandler} />
                                        </Col>
                                        <Col>
                                            <Form.Control placeholder="Zip Code" onChange={this.zipcodeChangeHandler} />
                                        </Col>
                                        <Col>
                                            <Form.Control placeholder="State" onChange={this.stateChangeHandler} />
                                        </Col>
                                    </Row>

                                </Form.Group>

                                <Button variant="primary" type="submit" onClick={this.submitSignUp}>
                                    Create your account
                            </Button>

                            </Form>
                            <br></br>
                        </center>
                    </Card>
                </center>
            </div>
        )
    }
}

export default Signup