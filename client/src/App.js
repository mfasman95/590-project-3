import React, { Component } from 'react';
import { Col } from 'react-bootstrap';
import logo from './logo.svg';
import './css/App.css';
import Router from './components/generic/Router';
import { emit } from './scripts/socket';
import Pages, { NotFound } from './components/pages';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img
            src={logo}
            className="App-logo"
            alt="logo"
            onClick={ () => emit('goHome', {}) }
          />
          <h1 className="App-title">Gatcha and Dragons</h1>
        </header>
        <Col xs={10} xsOffset={1}>
          <Router pages={Pages} notFound={NotFound}/>
        </Col>
      </div>
    );
  }
}

export default App;
