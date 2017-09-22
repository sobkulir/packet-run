import React, { Component } from 'react';

import './css/ActiveNumber.css';

/**
 * ActiveNumber takes step, value and function handleChange(newValue) as its props
 */

class ActiveNumber extends Component {

  render() {
    const stepToDisplay = (this.props.step !== 1 && this.props.step !== null) ? this.props.step : "";

    return (
      <div className="ActiveNumber">
        <button className="StepButton" type="button">
        + { stepToDisplay }
        </button>

        <div className="Value">
          <p>{ this.props.value }</p>
        </div>

        <button className="StepButton" type="button">
        - { stepToDisplay }
        </button>
      </div>
    );
  }

}

export default ActiveNumber;