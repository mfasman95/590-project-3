import React from 'react';
import { connect } from 'react-redux';
import { Button, Row, Col, Well } from 'react-bootstrap';
import { emit } from '../../scripts/socket';

class Adventure extends React.Component {
  render() {
    return (
      <div>
        <h1>Gameplay Screen</h1>
        <p>{JSON.stringify(this.props.gameState)}</p>
        <h1>EXCITING GAMEPLAY</h1>
        <Row>
        <Col xs={6}>
          <Well>
            <h4>Gameplay Flow</h4>
            <ol>
              <li>Initiative rolled before units arrive</li>
              <li>When one of your units' turn's comes up, tell it who to attack</li>
              <li>When either side dies, combat is done</li>
              <li>Victory screen shows rewards, loss screen is sadness</li>
              <li>Accept final screen to return to home</li>
            </ol>
          </Well>
        </Col>
        <Col xs={6}>
          <Well>
            <h4>UI Description</h4>
            <ul>
              <li>Gameplay is shown in the center of the screen</li>
              <li>To the right of gameplay is a text feed, showing a scrollable history of who attacked who and how much damage they did</li>
              <li>When one of your units turns comes up, you click the enemy on the screen that you wish that unit to attack, and a confirmation popup will show up</li>
              <li>Health will be shown as a bar and/or numbers below each enemy</li>
            </ul>
          </Well>
        </Col>
        </Row>
        <Button
          bsStyle='info'
          onClick={()=>emit('adventureEnd')}
        >
          Return Home
        </Button>
      </div>
    );
  }
}

//Function to map the redux state to object properties
const mapStateToProps = (state, ownProps) => ({ gameState: state.gameState });

export default connect(mapStateToProps)(Adventure);
