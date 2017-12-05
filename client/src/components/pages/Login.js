import React from 'react';
import { Button, PageHeader } from 'react-bootstrap';
import TextInput from './../generic/TextInput';
import { emit } from './../../scripts/socket';

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      username: '',
      password: '',
    }

    this.handleUsername = this.handleUsername.bind(this);
    this.handlePassword = this.handlePassword.bind(this);
    this.login = this.login.bind(this);
    this.handleEnter = this.handleEnter.bind(this);
  }

  handleUsername(e) { this.setState({ username: e.target.value }); }
  handlePassword(e) { this.setState({ password: e.target.value }); }

  handleEnter(e) { if (e.key === 'Enter') this.login(); }

  login() {
    emit('login', {
      username: this.state.username,
      password: this.state.password,
    });
  }

  
  componentDidMount() {
    document.querySelector('input').focus();
  }

  render() {
    return (      
      <div onKeyUp={this.handleEnter}>
        <PageHeader>Login</PageHeader>
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
          value={this.state.password}
          updateValue={this.handlePassword}
        />
        <hr/>
        <Button
          bsStyle='success'
          bsSize='large'
          onClick={this.login}
          disabled={(this.state.password.length <= 0) || (this.state.username.length <= 0)}
        >
          Login
        </Button>
      </div>
    );
  }
}
