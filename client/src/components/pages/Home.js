import React from 'react';
import { Button, PageHeader } from 'react-bootstrap';
import { emit } from './../../scripts/socket';

export default class Home extends React.Component {
  render() {
    return (
      <div>
        <PageHeader>Home Page</PageHeader>
        <Button
          bsStyle='warning'
          onClick={()=>emit('adventureStart')}
        >
          Go On An Adventure!
        </Button>
      </div>
    );
  }
}
