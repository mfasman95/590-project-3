import React from 'react';
import { Panel } from 'react-bootstrap';

class FriendPanel extends React.Component {
  render() {
    return (  
      <Panel>
        <h4>{this.props.friend.name}</h4>
      </Panel>
    );
  }
}


export default FriendPanel;
