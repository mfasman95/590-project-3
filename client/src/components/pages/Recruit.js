import React from 'react';
import { connect } from 'react-redux';
import { Button, PageHeader, Row, Col } from 'react-bootstrap';
import { emit } from './../../scripts/socket';

const GatchaButton = (props) => {
  return (
    <Col xs={12} sm={6} lg={3}>
      <Button
        bsStyle='primary'
        bsSize='large'
        onClick={() => props.gatchaRoll(props.gatchaType)}
        disabled={props.disabled || false}
        style={{ marginBottom: '10px' }}
      >
        Roll for {props.gatchaType} Hero ({props.gatchaCost} Gold)
      </Button>
    </Col>
  )
}

class Recruit extends React.Component {
  constructor(props) {
    super(props);

    this.gatchaRollTypes = [{
      name: 'Bronze',
      goldReq: 10
    }, {
      name: 'Silver',
      goldReq: 100
    }, {
      name: 'Gold',
      goldReq: 1000
    }, {
      name: 'Platinum',
      goldReq: 10000
    }];

    this.rollGatcha = this.rollGatcha.bind(this);
  }

  rollGatcha(type) { emit('gatchaRoll', { type }) }

  render() {
    return (
      <div>
        <PageHeader>Recruit Page</PageHeader>
        <Row>
          {
            this.gatchaRollTypes.map((type) => (
              <GatchaButton
                gatchaRoll={this.rollGatcha}
                gatchaType={type.name}
                gatchaCost={type.goldReq}
                disabled={this.props.gold < type.goldReq}
                key={type.name}
              />
            ))
          }
        </Row>
      </div>
    );
  }
}

//Function to map the redux state to object properties
const mapStateToProps = (state, ownProps) => {
  return {
    gold: state.session.gold,
  }
};

export default connect(mapStateToProps)(Recruit);
