import React, { Component } from 'react';

import Chart from '../components/Chart';

class Home extends Component {
  constructor(){
    super();
    this.state = {
      chartData:{}
    }
  }

  componentWillMount(){
   
    this.getChartData();
  }

  getChartData(){
    // This is where ajax call to backend is done
    this.setState({
      chartData:{
        labels: ['ShipNode1', 'ShipNode2', 'ShipNode3', 'ShipNode4'],
        datasets:[
          {
            label:'Total Orders',
            data:[
              39,
              12,
              48,
              31
            ],
            backgroundColor:[
              'rgba(255, 99, 132, 0.6)',
              'rgba(54, 162, 235, 0.6)',
              'rgba(255, 206, 86, 0.6)',
              'rgba(75, 192, 192, 0.6)'
            ]
          }
        ]
      }
    });
  }

  render() {
    return (
      <div className="App">
        <Chart chartData={this.state.chartData} Enterprise="VANS" legendPosition="bottom"/>
      </div>
    );
  }
}

export default Home;
