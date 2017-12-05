import React from 'react';
import { Panel } from 'react-bootstrap';
import TextInput from './../generic/TextInput';
import { emit } from './../../scripts/socket';

class AddFriend extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      friendName: '',
    }

    this.handleFriendName = this.handleFriendName.bind(this);
    this.addFriend = this.addFriend.bind(this);
    this.handleEnter = this.handleEnter.bind(this);
  }

  handleFriendName(e) { this.setState({ friendName: e.target.value }); }

  handleEnter(e) { if (e.key === 'Enter') this.addFriend(); }

  addFriend() {
    emit('addFriend', {
      friendName: this.state.friendName,
    });
  }

  render() {
    return (  
      <Panel>
        <h4>Add Some Friends I Guess?</h4>
        <TextInput
          title='Add Friend'
          type='text'
          placeholder='Friend Name'
          value={this.state.friendName}
          updateValue={this.handleFriendName}
          submit={this.addFriend}
        />
      </Panel>
    );
  }
}


export default AddFriend;
