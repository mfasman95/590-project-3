import React from 'react';
import { Button } from 'react-bootstrap';
import { emit } from './../../scripts/socket';

export default class Login extends React.Component {
  constructor(props) {
    super();
    
    this.state = {
      username: '',
      password: '',
    }
  }

  render() {
    return (
      <div>
        <h1>Log In</h1>
        <Button
          bsStyle='success'
          bsSize='large'
          onClick={
            () => {
              emit('login', {
                username: this.state.username,
                password: this.state.password,
              });
            }
          }
        >
          Log In
        </Button>
      </div>
    );
  }
}
