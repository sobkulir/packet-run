import React, { Component } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

import './css/Dashboard.css'

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
      <div className="results">
        <BarChart height={300} width={ this.props.width } data={ this.getChartData() }
              margin={{top: 5, right: 30, left: 20, bottom: 5}}>
         <XAxis dataKey="name"/>
         <YAxis/>
         <CartesianGrid strokeDasharray="3 3"/>
         <Tooltip/>
         <Bar dataKey="score" fill="#8884d8" />
        </BarChart>
      </div>
    );
  }
}

class Options extends Component {

  render() {
    return (
      <div className="options">
        <div className="option-single">
          <button className="button-white" onClick={ this.props.handlePausedChange } >
            { (this.props.paused) ? "Run" : "Pause" }
          </button>
        </div>

        <div className="option-single">
          <button className="button-white" onClick={ this.props.handleShowResultsChange } >
            { (this.props.showResults) ? "Hide results" : "Show results" }
          </button>
        </div>
      </div>
    )
  }
}

class Dashboard extends Component {

  constructor(props) {
    super(props)

    this.state = {
      showResults : true
    }

    this.resultsWidth = Math.floor(0.8 * this.props.width);

    this.handleShowResultsChange = this.handleShowResultsChange.bind(this)
  }

  handleShowResultsChange() {
    this.setState({
      showResults : !this.state.showResults
    })
  }

  render() {
    return (
      <div className="dashboard">
        <Options
          paused={ this.props.paused }
          handlePausedChange={ this.props.handlePausedChange }
          showResults={ this.state.showResults }
          handleShowResultsChange={ this.handleShowResultsChange }
        />

        <div className={ (this.state.showResults) ? "visible" : "hidden" }>
          <Results teams={ this.props.teams } width={ this.resultsWidth } />
        </div>
      </div>
    )
  }
}

export default Dashboard;
