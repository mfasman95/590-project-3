import React from 'react';
import { Panel, Col, Button, Row } from 'react-bootstrap';
import { emit } from './../../scripts/socket';

class FriendPanel extends React.Component {
  render() {
    const { name, support, id } = this.props.friend;
    return (
      <Panel>
        <Row>
          <Col xs={4} lg={3}>
            <h4>{name}</h4>
          </Col>
          {
            support ?
              <Col xs={8} lg={6}>
                <Row>
                  <h4><u><b>{support.name}</b> - {support.race} {support.className} - Level {support.level}</u></h4>
                </Row>
                <Row>
                  <Col xs={6}><h4>Health: {support.hp}</h4></Col>
                  <Col xs={6}><h4>Attack: {support.hit}</h4></Col>
                </Row>
              </Col>:
              <Col xs={8} lg={6}>
                <Row>This User Does Not Have A Support</Row>
              </Col>
          }
          <Col xs={12} lg={3}>
            <Button
              bsStyle='info'
              disabled={false} // TODO: disable if friend is selected as active
              onClick={() => emit('setActiveFriend', { id })}
            >
              Set Active Friend
            </Button>
          </Col>
        </Row>
      </Panel>
    );
  }
}


export default FriendPanel;
