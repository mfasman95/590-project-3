import React from 'react';
import { Button } from 'react-bootstrap';

export default class Recruit extends React.Component {
  render() {
    return (
      <div>
        <h1>Recruit Page</h1>
        <Button bsStyle='success'>
          <span style={{ textDecoration: 'line-through' }}>Give Dollars</span>Roll Gatcha Machine
        </Button>
      </div>
    );
  }
}
