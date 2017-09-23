import React, { Component } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

import './css/Results.css'

class Results extends Component {

  getChartData() {
    return  this.props.teams.map((team) => {
      return {
        name : team.name,
        score : team.score,
      }
    })
  }

  render () {
    return (
      <BarChart height={300} width={ this.props.chartWidth } data={ this.getChartData() }
            margin={{top: 5, right: 30, left: 20, bottom: 5}}>
       <XAxis dataKey="name"/>
       <YAxis/>
       <CartesianGrid strokeDasharray="3 3"/>
       <Tooltip/>
       <Bar dataKey="score" fill="#8884d8" />
      </BarChart>
    );
  }
}

export default Results;