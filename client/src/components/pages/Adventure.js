import React from 'react';
import { connect } from 'react-redux';
import { Button, PageHeader, Well, Col, Row } from 'react-bootstrap';
import { emit } from '../../scripts/socket';
import AdventurerCombatCard from './../custom/AdventurerCombatCard';
import EnemyCombatCard from './../custom/EnemyCombatCard';

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
    const heroKeys = Object.keys(heroes || {});
    const enemyKeys = Object.keys(enemies || {});
    return (
      <div>
        <PageHeader>Gameplay Screen</PageHeader>
        <Well>
          <Row>
            {
              enemyKeys.map((key) => (
                <Col xs={Math.floor(12 / enemyKeys.length)} key={key}>
                  <EnemyCombatCard enemy={enemies[key]} />
                </Col>
              ))
            }
          </Row>
        </Well>
        <hr/>
        <Well>
          <Row>
            {
              heroKeys.map((key) => (
                <Col xs={Math.floor(12 / heroKeys.length)} key={key}>
                  <AdventurerCombatCard adventurer={heroes[key]} />
                </Col>
              ))
            }
          </Row>
        </Well>
        <Button
          bsStyle='success'
          bsSize='large'
          onClick={()=>this.adventureEnd(true, this.props.friendKey, encounterData.encounterId)}
        >
          Win Combat
        </Button>
        <Button
          bsStyle='danger'
          bsSize='large'
          onClick={()=>this.adventureEnd(false, this.props.friendKey, encounterData.encounterId)}
        >
          Lose Combat
        </Button>
      </div>
    );
  }
}

//Function to map the redux state to object properties
const mapStateToProps = (state, ownProps) => ({
  gameState: state.gameState,
  friendKey: state.party.activeFriend.owner,
});

export default connect(mapStateToProps)(Adventure);
