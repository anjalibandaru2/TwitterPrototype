import React, { Component } from 'react'


import { Row, Col } from 'react-bootstrap'
import LeftNav from './LeftNav';
import Button from 'react-bootstrap/Button'

import axios from 'axios';
import config from './../Config/settings'

import { Redirect } from 'react-router'


export class DeactivateAccount extends Component {

    constructor(props) {
        super(props)

        this.state = {
            deactivate: false,
            firstname:'',
            username:'',
        }
        
        this.deactivateButton = this.deactivateButton.bind(this)

    }

    componentWillMount = () =>{
        this.setState({
            firstname: localStorage.getItem('firstname'),
            username: localStorage.getItem('username'),
        })
    }


    deactivateButton = () => {

        let username = localStorage.getItem('username')
        let token = localStorage.getItem('token')
        
        axios.defaults.withCredentials = true;
        let data = {
            username
        }
        axios({
            method: 'post',
                url: 'http://'+config.hostname+':3001/deactivateAccount',
                data,
                config: { headers: { 'Content-Type': 'application/json' } },
                headers: { "Authorization": `Bearer ${token}` }
            }).then(response => {
            if (response.status === 200) {
                console.log('Account deactivated');
                this.setState({
                    deactivate: true
                })
               
            } else {
                //alert('failed to Account deactivated');
                console.log('Failed to Account deactivated');
            }
        }).catch(error => {
            console.log(error);
        })
    }

    
    render() {
       // var next;
        if(deactivate){
            return <Redirect to="/" />
        }
        let links = [
            { label: 'Home', link: '/home', className: "fas fa-home", active: true },
            { label: 'Explore', link: '/Explore', className: "fas fa-hashtag" },
            { label: 'Notifications', link: '#home', className: "fas fa-bell" },
            { label: 'Messages', link: '/Messages', className: "fas fa-envelope" },

            { label: 'Bookmarks', link: '#home', className: "fas fa-bookmark" },
            { label: 'Lists', link: '#home', className: "fas fa-list-alt" },
            { label: 'Profile', link: '/profile/'+localStorage.getItem('username'), className: "fas fa-user-circle" },
            { label: 'Deactivate', link: '/deactivate', className: "fa fa-ban" },
            { label: 'Delete', link: '/delete', className: "fa fa-trash-o" },
            { label: 'Logout', link: '/',  className: "fa fa-sign-out" },

        ];
        return (
            <div>
                <Row>
                    <Col className="col-sm-3">
                        <LeftNav links={links} ></LeftNav>
                    </Col>
                    <Col className="col-sm-6">
                        <div>
                            <b>{this.state.firstName}</b>
                        </div>

                        <div>
                            <h3>
                            This will deactivate your account
                            </h3>
                            <br></br>
                            <p>
                            You’re about to start the process of deactivating your Twitter account. 
                            Your display name, <b>@{this.state.username}</b>, and public profile will no longer be viewable on Twitter.com, 
                            Twitter for iOS, or Twitter for Android.
                            </p>
                            <center>
                            <Button  onClick={this.deactivateButton} variant="danger">Deactivate</Button>
                            </center>
                        </div>

                        <div>

                        </div>

                    </Col>
                    <Col className="col-sm-3">
                        <div className="navbar-side-right" id="navbarSide">
                            here
                        </div>

                    </Col>
                </Row>
            </div>
        )
    }
}

export default DeactivateAccount
