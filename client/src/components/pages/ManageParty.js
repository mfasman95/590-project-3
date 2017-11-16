import React from 'react';
import GearPanel from './../custom/GearPanel';
import AdventurerPanel from './../custom/AdventurerPanel';
import { Well, Row, Col } from 'react-bootstrap';
import { connect } from 'react-redux';

class ManageParty extends React.Component {
  render() {
    const gearKeys = Object.keys(this.props.gear);
    const adventurerKeys = Object.keys(this.props.adventurers);
    return (
      <div>
        <h1>Manage Party Page</h1>
        <Row>
          <Col xs={6}>
            <h3>Adventurers</h3>
            <Well>
              {
                adventurerKeys.length <= 0 ?
                  // Render the no adventurers result
                  <h3>You do not have adventurers yet</h3> :
                  // Render the adventurers list
                  adventurerKeys.map((key) => <AdventurerPanel key={key} adventurer={this.props.adventurers[key]}/>)
              }
            </Well>
          </Col>
          <Col xs={6}>
            <h3>Gear</h3>
            <Well>
              {
                gearKeys.length <= 0 ?
                  // Render the no gear result
                  <h3>You do not have gear yet</h3> :
                  // Render the gear list
                  gearKeys.map((key) => <GearPanel key={key} gear={this.props.gear[key]}/>)
              }
            </Well>
          </Col>
        </Row>
      </div>
    );
  }
}

//Function to map the redux state to object properties
const mapStateToProps = (state, ownProps) => {
  return {
    adventurers: state.adventurers,
    gear: state.gear,
  }
};

export default connect(mapStateToProps)(ManageParty);
