import React,{Component} from 'react';
import {Bar, Line, Pie} from 'react-chartjs-2';
import axios from 'axios';
import config from '../../config/settings'


class GraphLine  extends Component{
    // width={100}
    // height={50}

    constructor(props){

        super(props);
        this.state={
             chartData:{
               
             }

        }
    }

    componentDidMount(){

        
            var username=localStorage.getItem('username')
        
       // var rooturl="localhost";
        axios.get('http://'+config.hostname+':3001/fetchProfileViews/'+username)
        .then(response => {
        console.log("Status Code : ",response.status); 
        if(response.status === 200){
        
            console.log("Response data:", response.data.graphData);

        }
        const result=response.data.graphData;
        
        var viewCount=result.viewCount;
        var username=result.username;
      
        console.log("viewCount:", viewCount);
        console.log("usernames:", username);
        
        const chartData1={
            labels:[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30],
            datasets:[{
                label:['Profile Views Per Day'],
                data:[10,15,15,16,20,25,19,17,10,20,25,17,19,23,20,17,18,11,24,16,14,14,15,10,6,17,14,17,viewCount]
            ,
            backgroundColor:[
              
                'rgba(255, 99, 132, 0.6)',
                'rgba(54, 162, 235, 0.6)',
                'rgba(255, 206, 86, 0.6)',
                'rgba(75, 192, 192, 0.6)',
                'rgba(153, 102, 255, 0.6)',
                'rgba(255, 159, 64, 0.6)',
                'rgba(105, 179, 64, 0.6)',
                'rgba(205, 159, 68, 0.6)',
                'rgba(200, 200, 64, 0.6)',
                'rgba(250, 200,185, 0.6)',
                'rgba(255, 99, 132, 0.6)',
               'rgba(54, 162, 235, 0.6)',
               'rgba(255, 206, 86, 0.6)',
               'rgba(75, 192, 192, 0.6)',
               'rgba(153, 102, 255, 0.6)',
               'rgba(255, 159, 64, 0.6)',
               'rgba(105, 179, 64, 0.6)',
               'rgba(205, 159, 68, 0.6)',
               'rgba(200, 200, 64, 0.6)',
               'rgba(250, 200,185, 0.6)',
               'rgba(255, 99, 132, 0.6)',
               'rgba(54, 162, 235, 0.6)',
               'rgba(255, 206, 86, 0.6)',
               'rgba(75, 192, 192, 0.6)',
               'rgba(153, 102, 255, 0.6)',
               'rgba(255, 159, 64, 0.6)',
               'rgba(105, 179, 64, 0.6)',
               'rgba(205, 159, 68, 0.6)',
               'rgba(200, 200, 64, 0.6)',
               'rgba(250, 200,185, 0.6)',
               
            
            ]
           }
       ]
         
        }
        this.setState({
            chartData:chartData1
        })
    
    });
    }


    static defaultProps={
        displayTitle:true,
        displayLegend:true,
        legendPosition:'bottom'
    }
    render(){

        return(
            <div classname="chart" style={{width:700}}>
                <Line
                    height={500}
                    width={900}
                    data={this.state.chartData}
                    options={{
                       maintainAspectRatio:false,
                        title:{
                            display:this.props.displayTitle,
                            text:"PROFILES VIEWS/DAY",
                            fontSize:25
                        },
                        legend:{
                            display:this.props.displayLegend,
                            position:this.props.legendPosition,
                            labels:{
                                fontColor:'#000'
                            }
                        }, 
                        layout:{
                            padding:{
                                left:50,
                                right:0
                            }
                            
                        }
                    }}
                    
                    />

            </div>
        );
    }

}

export default GraphLine ;