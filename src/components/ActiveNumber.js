import React, { Component } from 'react';

import './css/ActiveNumber.css';

/**
 * ActiveNumber takes step, value, textAfter and function handleChange(newValue) as its props
 */

class ActiveNumber extends Component {

  render() {
    const stepToDisplay = (this.props.step !== 1 && this.props.step !== null) ? this.props.step : "";

    return (
      <div className="active-number">

        <button className="step-button" type="button">
        + { stepToDisplay }
        </button>

        <div className="value">
          <p>{ this.props.value }{ this.props.textAfter }</p>
        </div>

        <button className="step-button" type="button">
        - { stepToDisplay }
        </button>
      </div>
    );
  }

}

export default ActiveNumber;