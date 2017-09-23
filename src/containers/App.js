import React, { Component } from 'react';
import Dashboard from './Dashboard.js';

import './css/App.css';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      paused : false,
      showResults : true,
      teams : [],
    }

    setInterval(this.updateGame.bind(this), 1000);

    this.addTeam = this.addTeam.bind(this);
    this.changeStat = this.changeStat.bind(this);
  }

  addTeam(teamName) {
    this.setState({teams: this.state.teams.concat([
      {
        name : teamName,
        packetLoss : 4,
        packetLossGrow : 3.0,
        pa : 0,
        maxPa : 10,
        score : 0,
      }
    ])});
  }

  updateGame() {
    if (this.state.paused) {
      return;
    }

    this.setState((prevState) => {
      var newTeams = prevState.teams.map(
        (curTeam) => {
          curTeam.score = curTeam.score + curTeam.pa;
          curTeam.packetLoss = curTeam.packetLoss + (curTeam.packetLossGrow / 60);

          if (curTeam.packetLoss > 100) {
            curTeam.packetLoss = 100;
          }

          if (curTeam.packetLoss < 0) {
            curTeam.packetLoss = 0;
          }

          return curTeam;
        }
      )
      return { teams : newTeams };
    });
  }

  changeStat(teamIndex, statName, diff, eventObject) {

    if (statName === "maxPa" && diff < 0) {
      return;
    }

    this.setState((prevState) => {
      var newTeams = prevState.teams.slice();
      var oldValue = newTeams[teamIndex][statName]
      var newValue = oldValue + diff;

      if (newValue < 0) {
        newValue = 0;
      }

      if (statName === "packetLoss" && newValue > 100) {
        newValue = 100;
      }

      if (statName === "pa") {
        if (newValue > newTeams[teamIndex]["maxPa"]) {
          newValue = newTeams[teamIndex]["maxPa"];
        }

        if (newValue > oldValue) {
          newTeams[teamIndex]["packetLossGrow"] = newTeams[teamIndex]["packetLossGrow"] + (newValue - oldValue) / 10;
        }
      }

      newTeams[teamIndex][statName] = newValue;

      return { teams : newTeams };
    });
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h1>Packet run</h1>
        </div>
        <Dashboard teams={ this.state.teams } addTeam={ this.addTeam } changeStat={ this.changeStat } />
      </div>
    );
  }
}

export default App;
