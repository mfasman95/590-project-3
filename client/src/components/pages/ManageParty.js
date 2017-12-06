import React from 'react';
import GearPanel from './../custom/GearPanel';
import AdventurerPanel from './../custom/AdventurerPanel';
import { Well, Row, Col, PageHeader, Panel, Button } from 'react-bootstrap';
import { connect } from 'react-redux';

class ManageParty extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      adventurersInParty: ['Example1', 'Example2', 'Example3'],
    }

    this.removeAdventurerFromParty = this.removeAdventurerFromParty.bind(this);
  }

  removeAdventurerFromParty(name) {
    const { adventurersInParty } = this.state;
    const index = adventurersInParty.indexOf(name);
    this.setState({ adventurersInParty: adventurersInParty.slice(0, index).concat(adventurersInParty.slice(index + 1)) });
  }

  render() {
    const gearKeys = Object.keys(this.props.gear);
    const adventurerKeys = Object.keys(this.props.adventurers);
    return (
      <div>
        <PageHeader>Manage Party Page</PageHeader>
        <Row>
          <Col xs={12}>
            <h3><b>Party</b></h3>
            <Well>
              <Row>
                {
                  this.state.adventurersInParty.length <= 0 ?
                    // Render the no adventurers result
                    <h3>Your party is empty</h3> :
                    // Render the adventurers list
                    this.state.adventurersInParty.map((name) => (
                      <Col key={name} xs={Math.floor(12 / this.state.adventurersInParty.length)}>
                        <Panel>
                          {name} {' '}
                          <Button
                            bsSize='small'
                            bsStyle='danger'
                            onClick={() => {this.removeAdventurerFromParty(name)}}
                          >
                            <i className='fa fa-times-circle-o'/>
                          </Button>
                        </Panel>
                      </Col>
                    ))
                }
              </Row>
            </Well>
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
                  adventurerKeys.map((key) => (
                    <AdventurerPanel
                      key={key}
                      adventurer={this.props.adventurers[key]}
                      fullParty={(this.state.adventurersInParty.length >= 3)}
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
  }
};

export default connect(mapStateToProps)(ManageParty);
