import React, { Component } from 'react';
import ProgressBar from '../components/ProgressBar'
import ActiveNumber from '../components/ActiveNumber'

import './css/TeamTable.css'

class TeamTable extends Component {
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
        <Row changeStat={ this.props.changeStat.bind(null, i) } team={ team } key={ i } />
      )
    });
  }

  render() {
    return (
      <div className="team-table">
        <table>
          <colgroup>
            <col span="1" style={{ width: "25%" }} />
            <col span="1" style={{ width: "60%" }} />
            <col span="1" style={{ width: "15%" }} />
          </colgroup>

          <thead>
            <tr>
              <th>Team name</th>
              <th>Packet loss</th>
              <th style={{ textAlign : "center"}}>PA / max_PA</th>
            </tr>
          </thead>

          <tbody>
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

class Row extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isPacketLost: false
    }

    this.handlePaChange = this.handlePaChange.bind(this);
  }

  componentWillUpdate() {
    this.alertHeight = this.InfoRow.clientHeight
  }

  handlePaChange(diff, EventObject) {

    if (this.props.team.pa === this.props.team.maxPa && diff > 0) {
      alert("Value pa already reached maxPa.");
    }

    if (diff > 0) {
      var lost = 0;
      var packetLoss = this.props.team.packetLoss;

      for (var i = 0; i < diff; ++i) {
        if (Math.random() * 100 < packetLoss) {
          lost++;
        }
      }

      if (lost > 0) {
        this.setState({
          isPacketLost : true
        });
        setTimeout(() => {
          this.setState((prevState) => {
            return {
              isPacketLost : !prevState.isPacketLost
            };
          }
        )}, 800);
        this.props.changeStat("lostPa", lost, EventObject)
      }

      diff = diff - lost;
    }

    if (diff !== 0) {
      this.props.changeStat("pa", diff, EventObject);
    }
  }

  render() {
    const team = this.props.team

    if (this.state.isPacketLost && team.pa < team.maxPa) {
      return (
        <tr style={{ height: this.alertHeight }} className="alert" ref={ InfoRow => { this.InfoRow = InfoRow; } }>
          <td colSpan={ 3 }>
            Packet lost
          </td>
        </tr>
      )
    } else {
      return (
        <tr className="hoverable" ref={ InfoRow => { this.InfoRow = InfoRow; } } >
          <td>{ team.name }</td>
          <td>
            <div className="packet-loss-container">
              { /* <div className="vertically-centered">&#8599; { Number(team.packetLossGrow).toFixed(1) }</div> */ }
              {
                /*
                <div className="vertically-centered">&#8599;</div>
                <ActiveNumber
                  value={ Number(team.packetLossGrow).toFixed(1) }
                  textAfter="% / 1 min."
                  step={ 0.5 }
                  handleChange={ this.props.changeStat.bind(null, i, "packetLossGrow") }
                />
                */
              }
              <div className="vertically-centered">
                <p className="lost-pa">[{ team.lostPa }]</p>
              </div>
              <ProgressBar value={ Math.floor(team.packetLoss) } maxValue={ 100 } />
              <ActiveNumber
                value={ Number(team.packetLoss).toFixed(1) }
                step={ 5 }
                textAfter="%"
                handleChange={ this.props.changeStat.bind(null, "packetLoss") }
              />
            </div>
          </td>
          <td className="centered">
              <ActiveNumber
                value={ team.pa }
                step={ 1 }
                handleChange={ this.handlePaChange }
              />
              <div className="vertically-centered">/</div>
              <ActiveNumber value={ team.maxPa } step={ 1 } handleChange={ this.props.changeStat.bind(null, "maxPa") } />
          </td>
        </tr>
      )
    }
  }

}
export default TeamTable;