import React from 'react';
import { Panel } from 'react-bootstrap';

export default ({ enemy }) => (
  <Panel header={`${enemy.name} - CR ${enemy.challenge}`} bsStyle='danger'>
    An Exciting Enemy  
  </Panel>
);
