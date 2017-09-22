import React, { Component } from 'react';
import ProgressBar from '../components/ProgressBar'
import ActiveNumber from '../components/ActiveNumber'

import './css/Dashboard.css'

class Dashboard extends Component {
  render() {
    const team = this.props.teams[0];

    return (
      <div className="Dashboard-table">
        <table>
          <colgroup>
            <col span="1" style={{ width: "30%" }} />
            <col span="1" style={{ width: "50%" }} />
            <col span="1" style={{ width: "20%" }} />
          </colgroup>

          <tbody>
            <tr>
              <th>Name</th>
              <th>Packet loss</th>
              <th>Production</th>
            </tr>
            <tr>
              <td>{ team.name }</td>
              <td>
                <ProgressBar value={ team.packetLoss } maxValue={ 1 } />
                <span className="progress-value">{ team.packetLoss * 100 }%</span>
              </td>
              <td>
                  <ActiveNumber value={ team.pa } step={ 1 } />
                  <div className="NumberDivider">/</div>
                  <ActiveNumber value={ team.max_pa } step={ 1 } />
              </td>
            </tr>
            <tr>

            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

export default Dashboard;