import React from 'react';
import { Button } from 'react-bootstrap';
import { emit } from './../../scripts/socket';

export default class Home extends React.Component {
  render() {
    return (
      <div>
        <h1>Home Page</h1>
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
