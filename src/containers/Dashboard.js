import React, { Component } from 'react';
import ProgressBar from '../components/ProgressBar'
import ActiveNumber from '../components/ActiveNumber'

import './css/Dashboard.css'

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.handleAddTeam = this.handleAddTeam.bind(this);
  }

  handleAddTeam() {
    var teamName = prompt("Enter the name of a new team");
    if (teamName !== null && teamName !== "") {
      this.props.addTeam(teamName);
    }
  }

  getTableRows() {

    return this.props.teams.map((team, i) => {
      return (
        <tr className="hoverable" key={ i }>
          <td>{ team.name }</td>
          <td>
            <div className="packet-loss-container">
              <div className="vertically-centered">&#8599;</div>
              <ActiveNumber
                value={ Number(team.packetLossGrow).toFixed(1) }
                textAfter="% / 1 min."
                step={ 0.5 }
                handleChange={ this.props.changeStat.bind(null, i, "packetLossGrow") }
              />
              <ProgressBar value={ team.packetLoss } maxValue={ 100 } />
              <ActiveNumber
                value={ Number(team.packetLoss).toFixed(1) }
                step={ 5 }
                textAfter="%"
                handleChange={ this.props.changeStat.bind(null, i, "packetLoss") }
              />
            </div>
          </td>
          <td className="centered">
              <ActiveNumber value={ team.pa } step={ 1 } handleChange={ this.props.changeStat.bind(null, i, "pa") } />
              <div className="vertically-centered">/</div>
              <ActiveNumber value={ team.maxPa } step={ 1 } handleChange={ this.props.changeStat.bind(null, i, "maxPa") } />
          </td>
        </tr>
      )
    });
  }

  render() {
    return (
      <div className="dashboard-table">
        <table>
          <colgroup>
            <col span="1" style={{ width: "25%" }} />
            <col span="1" style={{ width: "60%" }} />
            <col span="1" style={{ width: "15%" }} />
          </colgroup>

          <tbody>
            <tr>
              <th>Name</th>
              <th>Packet loss</th>
              <th style={{ textAlign : "center"}}>PA / max_PA</th>
            </tr>
            {this.getTableRows()}
            <tr>
              <td colSpan={3}>
                <div className="add-team">
                  <button className="button-white" onClick={ this.handleAddTeam }>+ Add team</button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

export default Dashboard;