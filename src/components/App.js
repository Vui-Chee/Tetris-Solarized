import React, {Component} from 'react';
import {Provider} from 'react-redux';
import store from '../store';
import './app.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

import {HashRouter as Router} from 'react-router-dom';
import routes from '../routes';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="app-container">{routes}</div>
        </Router>
      </Provider>
    );
  }
}

export default App;
