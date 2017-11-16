import React from 'react';
import { Button } from 'react-bootstrap';

class MicroTransactions extends React.Component {
  render() {
    return (
      <div>
        <h1>Micro-Transactions Page</h1>
        <h4>Gib Dollars Plz</h4>
        <Button bsStyle='success'>$</Button>
      </div>
    );
  }
}

export default MicroTransactions;
