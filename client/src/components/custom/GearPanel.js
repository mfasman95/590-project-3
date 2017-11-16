import React from 'react';
import { Panel } from 'react-bootstrap';

class GearPanel extends React.Component {
  render() {
    return (  
      <Panel>
        <h4>{this.props.gear.name}</h4>
      </Panel>
    );
  }
}


export default GearPanel;
