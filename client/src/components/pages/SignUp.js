import React from 'react';
import { Button, PageHeader } from 'react-bootstrap';
import TextInput from './../generic/TextInput';
import { emit } from './../../scripts/socket';

export default class SignUp extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      username: '',
      pass1: '',
      pass2: '',
    };

    this.handleUsername = this.handleUsername.bind(this);
    this.handlePass1 = this.handlePass1.bind(this);
    this.handlePass2 = this.handlePass2.bind(this);
    this.signUp = this.signUp.bind(this);
    this.handleEnter = this.handleEnter.bind(this);
  }

  handleUsername(e) { this.setState({ username: e.target.value }); }
  handlePass1(e) { this.setState({ pass1: e.target.value }); }
  handlePass2(e) { this.setState({ pass2: e.target.value }); }

  handleEnter(e) { if (e.key === 'Enter') this.signUp(); }

  signUp() {
    emit('signup', {
      username: this.state.username,
      pass1: this.state.pass1,
      pass2: this.state.pass2,
    });
  }

  componentDidMount() {
    document.querySelector('input').focus();
  }

  render() {
    return (
      <div onKeyUp={this.handleEnter}>
        <PageHeader>Sign Up</PageHeader>
        <TextInput
          title='Username'
          type='text'
          placeholder='Username goes here'
          value={this.state.username}
          updateValue={this.handleUsername}
        />
        <br/>
        <TextInput
          title='Password'
          type='password'
          placeholder='Password goes here'
          value={this.state.pass1}
          updateValue={this.handlePass1}
        />
        <br/>
        <TextInput
          title='Confirm Password'
          type='password'
          placeholder='Repeat your password'
          value={this.state.pass2}
          updateValue={this.handlePass2}
        />
        <br/>
        {
          this.state.pass1.length > 0 && (this.state.pass1 === this.state.pass2) &&
              <h4 className='text-success'>Passwords Match</h4>
        }
        {
          this.state.pass1.length > 0 && (this.state.pass1 !== this.state.pass2) &&
            <h4 className='text-danger'>Passwords Do Not Match</h4>
        }
        <hr/>
        <Button
          bsStyle='success'
          bsSize='large'
          onClick={this.signUp}
          disabled={
            (this.state.username.length <= 0) ||
            (this.state.pass1.length <= 0) ||
            (this.state.pass1 !== this.state.pass2)
          }
        >
          Sign Up
        </Button>
      </div>
    );
  }
}
