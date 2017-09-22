import React, { Component } from 'react';
import Dashboard from './Dashboard.js';

import './css/App.css';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      pause : false,
      showResults : true,
      teams : [
        {
          name : "Strasne dobry tim",
          packetLoss : 0.41,
          pa : 0,
          max_pa : 10,
          score : 0,
        },
      ],
    }
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h1>Packet run</h1>
        </div>
        <Dashboard teams={ this.state.teams }/>
      </div>
    );
  }
}

export default App;
