import React, { Component } from 'react';
import { Router, Route, Switch, NavLink } from "react-router-dom";
import history from './history'

import NavBar from './components/NavBar'
import Home from './components/Home'
import Installation from './components/Installation'
import Dataset from './components/Dataset'

import './App.css';

class App extends Component {
  render() {
    return (
      <Router history={history}>
        <div >
          <NavBar />
          <main>
            <Switch>
              <Route exact path="/" render={(props) => <Home />} />
              <Route path="/dataset" render={(props) => <Dataset />} />
              <Route path="/installation" render={(props) => <Installation />} />
              <Route component={NoMatch} />
            </Switch>
          </main>
        </div>
      </Router>
    );
  }
}

const NoMatch = ({ location }) => (
  <div>
    <h3>
      404 - No match for <code>{location.pathname}</code>
    </h3>
  </div>
);

export default App;
