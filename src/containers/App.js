import React, { Component } from 'react';
import Dashboard from './Dashboard.js';

import './css/App.css';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      pause : false,
      showResults : true,
      teams : [],
    }

    this.addTeam = this.addTeam.bind(this);
    //this.changeStat = this.changeStat.bind(this);
  }

  addTeam(teamName) {
    this.setState({teams: this.state.teams.concat([
      {
        name : teamName,
        packetLoss : 5,
        pa : 0,
        max_pa : 10,
        score : 0,
      }
    ])});
  }

  changeStat(teamIndex, statName, diff, eventObject) {
    this.setState((prevState) => {
      var teams = prevState.teams.slice();
      var newValue = teams[teamIndex][statName] + diff;

      if (newValue < 0) {
        return { };
      }

      if (statName == "packetLoss" && newValue > 100) {
        newValue = 100;
      }

      if (statName == "pa" && newValue > teams[teamIndex]["max_pa"]) {
        newValue = teams[teamIndex]["max_pa"];
      }

      teams[teamIndex][statName] = newValue;

      return { teams : teams };
    });
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h1>Packet run</h1>
        </div>
        <Dashboard teams={ this.state.teams } addTeam={ this.addTeam } />
        <button onClick={ this.changeStat.bind(this, 0, "pa", 3) }>sem klikaj</button>
      </div>
    );
  }
}

export default App;
