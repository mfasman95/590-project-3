import React from 'react';
import { Button, PageHeader } from 'react-bootstrap';
import { emit } from './../../scripts/socket';
import PartyDisplay from './../custom/PartyDisplay';

export default class Home extends React.Component {
  render() {
    return (
      <div>
        <PageHeader>Home Page</PageHeader>
        <PartyDisplay canRemove={false} />
        <Button
          bsStyle='warning'
          onClick={()=>emit('adventureStart')}
        >
          Go On An Adventure!
        </Button>
      </div>
    );
  }
}
