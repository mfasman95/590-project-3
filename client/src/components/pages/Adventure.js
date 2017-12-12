import React from 'react';
import { connect } from 'react-redux';
import { Button, PageHeader } from 'react-bootstrap';
import { emit } from '../../scripts/socket';

class Adventure extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.adventureEnd = this.adventureEnd.bind(this);
  }

  adventureEnd(success, friendId, encounterId) {
    return emit('adventureEnd', { success, friendId, encounterId });
  }

  render() {
    const { heroes, enemies, encounterData } = this.props.gameState;
    return (
      <div>
        <PageHeader>Gameplay Screen</PageHeader>
        <p>{JSON.stringify(heroes)}</p>
        <hr/>
        <p>{JSON.stringify(enemies)}</p>
        <hr/>
        <p>{JSON.stringify(encounterData)}</p>
        <hr/>
        <Button
          bsStyle='info'
          onClick={()=>this.adventureEnd(true, this.props.friendKey, encounterData.encounterId)}
        >
          Success!
        </Button>
        <Button
          bsStyle='danger'
          onClick={()=>this.adventureEnd(false, this.props.friendKey, encounterData.encounterId)}
        >
          Failure!!!
        </Button>
      </div>
    );
  }
}

//Function to map the redux state to object properties
const mapStateToProps = (state, ownProps) => ({
  gameState: state.gameState,
  friendKey: state.party.activeFriend.key,
});

export default connect(mapStateToProps)(Adventure);
