import React, {Component} from 'react';
import {Bar, Line, Pie} from 'react-chartjs-2';
import './Chart.css';

class Chart extends Component{
  constructor(props){
    super(props);
    this.state = {
      chartData:props.chartData
    }
  }

  static defaultProps = {
    displayTitle:true,
    displayLegend: true,
    legendPosition:'right',
    Enterprise:'City'
  }

  render(){
    return (
      <div className="countrylist">
        <div className="country">
        <Bar
          data={this.state.chartData}
          
  options={{ maintainAspectRatio: false }}
        />
        </div>
        </div>
    )
  }
}

export default Chart;
