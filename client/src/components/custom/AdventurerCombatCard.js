import React from 'react';
import { Panel } from 'react-bootstrap';

export default ({ adventurer }) => (
  <Panel header={`${adventurer.name} - ${adventurer.race} ${adventurer.className} - Level ${adventurer.level}`} bsStyle='success'>
    An Adventurous Adventurer  
  </Panel>
);
