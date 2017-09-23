import React, { Component } from 'react';

import './css/ActiveNumber.css';

/**
 * ActiveNumber takes step, value, textAfter and function handleChange(diff) as its props
 */

class ActiveNumber extends Component {

  render() {
    const stepToDisplay = (this.props.step !== 1) ? this.props.step : "";

    return (
      <div className="active-number">

        <button className="step-button" type="button" onClick={ this.props.handleChange.bind(null, this.props.step) }>
        + { stepToDisplay }
        </button>

        <div className="value">
          <p>{ this.props.value }{ this.props.textAfter }</p>
        </div>

        <button className="step-button" type="button" onClick={ this.props.handleChange.bind(null, (-1)*this.props.step) }>
        - { stepToDisplay }
        </button>
      </div>
    );
  }

}

export default ActiveNumber;