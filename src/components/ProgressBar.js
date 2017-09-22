import React, { Component } from 'react';

import './css/ProgressBar.css';

/**
 * ProgressBar takes value and maxValue as its props
 */

class ProgressBar extends Component {

  render() {
    return (
      <div className="html5-progress-bar">
        <div className="progress-bar-wrapper">
          <progress value={ this.props.value } max={ this.props.maxValue }></progress>
        </div>
      </div>
    );
  }

}

export default ProgressBar;