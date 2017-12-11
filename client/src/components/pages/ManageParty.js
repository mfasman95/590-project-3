import React from 'react';
import GearPanel from './../custom/GearPanel';
import AdventurerPanel from './../custom/AdventurerPanel';
import PartyDisplay from './../custom/PartyDisplay';
import { Well, Row, Col, PageHeader } from 'react-bootstrap';
import { connect } from 'react-redux';

class ManageParty extends React.Component {
  render() {
    const gearKeys = Object.keys(this.props.gear);
    const adventurerKeys = Object.keys(this.props.adventurers);
    return (
      <div>
        <PageHeader>Manage Party Page</PageHeader>
        <Row>
          <Col xs={12}>
            <PartyDisplay canRemove={true} />
          </Col>
        </Row>
        <Row>
          <Col xs={12} lg={6}>
            <h3>Adventurers</h3>
            <Well>
              {
                adventurerKeys.length <= 0 ?
                  // Render the no adventurers result
                  <h3>You do not have adventurers yet</h3> :
                  // Render the adventurers list
                  adventurerKeys.map(key => (
                    <AdventurerPanel
                      key={key}
                      adventurer={this.props.adventurers[key]}
                      party={(this.props.party)}
                      mySupport={this.props.mySupport}
                    />
                  ))
              }
            </Well>
          </Col>
          <Col xs={12} lg={6}>
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
    party: state.party,
    mySupport: state.friends.support,
  }
};

export default connect(mapStateToProps)(ManageParty);
