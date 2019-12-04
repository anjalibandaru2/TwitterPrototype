import React, { Component } from "react";
import 'react-bootstrap';
import Navbar from 'react-bootstrap/Navbar';

import GraphBar from './Graphs/GraphBar';
import GraphPie from './Graphs/GraphPie';
import GraphDoughnut from './Graphs/GraphDoughnut';
import GraphLine from './Graphs/GraphLine';
import GraphPolar from './Graphs/GraphPolar';
import GraphHorizontalBar from './Graphs/GraphHorizontalBar';
import HourlyGraph from "./Graphs/HourlyGraph";
import ProfileViews from "./Graphs/ProfileViews";
import MonthlyGraph from "./Graphs/MonthlyGraph";

class Analytics extends Component {

    render(){

        return(
            <div>
                <div>
                    <Navbar bg="light" >
                        <Navbar.Brand >
                            <a style={{
                            paddingLeft: "2rem"
                            }} href="/">

                            <span className="fab fa-twitter" style={{
                            marginRight: "10px",
                            fontSize: "2rem",
                            color: "rgba(29,161,242,1.00)"
                            }}></span>
                        </a>

                        </Navbar.Brand>
                    <h5>Analytics</h5>
                    </Navbar>
                </div>
                <div style={{display:'inline-block',float:'right'}}>
                <div >
                    <div>
                        <GraphBar/>
                    </div>
                </div>
                <div >
                    <div>
                        <br/>
                        <br/>
                        <br/>
                        <HourlyGraph/>
                    </div>
                </div>
                </div>
                <div style={{display:'inline-block',float:'left'}}>
                <div>
                    <div>
                   < GraphHorizontalBar/>
                    </div>
                </div>
                <div>
                    <div>
                        <br/>
                        <br/>
                        <br/>
                        <GraphDoughnut/>
                   
                    </div>
                </div>
                </div>
                <div style={{display:'inline-block'}}>
                <div >
                    <div>
                    < MonthlyGraph/>
                    </div>
                </div>
                <div>
                    <div>
                        <GraphPie/>
                    </div>
                </div>
                </div>
                
                <div style={{display:'inline-block',float:'right'}}>
                <div>
                    <div>
                    <GraphLine />
                    </div>
                
                </div>
                </div>
                </div>

            
      );
    }
    
}

export default Analytics;
