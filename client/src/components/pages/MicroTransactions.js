import React from 'react';
import { Button, PageHeader } from 'react-bootstrap';

export default class MicroTransactions extends React.Component {
  render() {
    return (
      <div>
        <PageHeader>Micro-Transactions Page</PageHeader>
        <h4>Gib Dollars Plz</h4>
        <Button bsStyle='success'>$</Button>
      </div>
    );
  }
}
