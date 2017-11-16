import React from 'react';
import { Button } from 'react-bootstrap';
import { emit } from '../../scripts/socket';

class Adventure extends React.Component {
  render() {
    return (
      <div>
        <h1>Gameplay Screen</h1>
        <h1>EXCITING GAMEPLAY</h1>
        <Button
          bsStyle='info'
          onClick={()=>emit('adventureEnd')}
        >
          Return Home
        </Button>
      </div>
    );
  }
}

export default Adventure;
