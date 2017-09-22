import React, { Component } from 'react';
import ProgressBar from '../components/ProgressBar'
import ActiveNumber from '../components/ActiveNumber'

import './css/Dashboard.css'

class Dashboard extends Component {

  getTableRows() {
    return this.props.teams.map((team, i) => {
      return (
        <tr className="hoverable">
          <td>{ team.name }</td>
          <td>
            <div className="packet-loss-container">
              <div className="vertically-centered">&#8599;</div>
              <ActiveNumber value={ 1.42 } textAfter="% / 1 min."/>
              <ProgressBar value={ team.packetLoss } maxValue={ 100 } />
              <ActiveNumber value={ team.packetLoss } step={ 5 } textAfter="%" />
            </div>
          </td>
          <td className="centered">
              <ActiveNumber value={ team.pa } />
              <div className="vertically-centered">/</div>
              <ActiveNumber value={ team.max_pa } />
          </td>
        </tr>
      )
    });
  }

  render() {
    const team = this.props.teams[0];

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
                  <button className="button-white">+ Add team</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

export default Dashboard;