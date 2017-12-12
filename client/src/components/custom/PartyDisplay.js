import React from 'react';
import { connect } from 'react-redux';
import { Panel, Col, Well, Row, Button } from 'react-bootstrap';
import { emit } from './../../scripts/socket';


const PartyMember = ({ partyMember, canRemove }) => {
  const { name, race, className, level, hp, hit, key } = partyMember;

  return (
    <Panel>
      <h4><u><b>{name}</b> - {race} {className} - Level {level}</u></h4>
      <Col xs={6}><h4>Health: {hp}</h4></Col>
      <Col xs={6}><h4>Attack: {hit}</h4></Col>
      {
        canRemove &&
          <Button
            bsSize='small'
            bsStyle='danger'
            onClick={() => {  emit('removeFromParty', { key }); }}
          >
            <i className='fa fa-times-circle-o'/>
          </Button>
      }
    </Panel>
  );
}

class PartyDisplay extends React.Component {
  render() {
    const myPartyKeys = Object.keys(this.props.party.myParty);

    console.log(this.props.party);

    return (
      <Well>
        <Row>
          {
            myPartyKeys.length <= 0 ?
              // If there are no party members to display
              <h3>Your party is empty</h3> :
              // If there are party memebers to display
              myPartyKeys.map((key) => (
                <Col key={key} xs={Math.floor(12 / myPartyKeys.length)}>
                  <PartyMember partyMember={this.props.party.myParty[key]} canRemove={this.props.canRemove} />
                </Col>
              ))
          }
        </Row>
        <Row>
          {
            Object.keys(this.props.party.activeFriend).length > 0 &&
              <PartyMember partyMember={this.props.party.activeFriend} />
          }
        </Row>
      </Well>
    );
  }
}

//Function to map the redux state to object properties
const mapStateToProps = (state, ownProps) => {
  return {
    party: state.party,
  }
};

export default connect(mapStateToProps)(PartyDisplay);
