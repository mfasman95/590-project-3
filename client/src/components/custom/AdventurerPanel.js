import React from 'react';
import { Panel } from 'react-bootstrap';

class AdventurerPanel extends React.Component {
  render() {
    return (  
      <Panel>
        <h4>{this.props.adventurer.name}</h4>
      </Panel>
    );
  }
}


export default AdventurerPanel;
