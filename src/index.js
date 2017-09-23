import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './containers/App';
import registerServiceWorker from './registerServiceWorker';

let rootElement = document.getElementById('root')

ReactDOM.render(<App width={ rootElement.offsetWidth }/>, rootElement);
registerServiceWorker();
