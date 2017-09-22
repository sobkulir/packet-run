import React, { Component } from 'react';

import './css/ProgressBar.css';

/**
 * ProgressBar takes value and maxValue as its props
 */

class ProgressBar extends Component {

  render() {
    return (
      <span className="html5-progress-bar">
        <span className="progress-bar-wrapper">
          <progress value={ this.props.value } max={ this.props.maxValue }></progress>
        </span>
      </span>
    );
  }

}

export default ProgressBar;