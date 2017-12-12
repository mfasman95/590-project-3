import React from 'react';
import { Panel, Col, Button, Row } from 'react-bootstrap';
import { emit } from './../../scripts/socket';

class FriendPanel extends React.Component {
  render() {
    const { name, support, id } = this.props.friend;
    const supportObj = support[Object.keys(support)[0]]
    const { race, className, level, hp, hit } = supportObj;
    const charName = supportObj.name;
    return (
      <Panel>
        <Row>
          <Col xs={4} lg={3}>
            <h4>{name}</h4>
          </Col>
          <Col xs={8} lg={6}>
            <Row>
              <h4><u><b>{charName}</b> - {race} {className} - Level {level}</u></h4>
            </Row>
            <Row>
              <Col xs={6}><h4>Health: {hp}</h4></Col>
              <Col xs={6}><h4>Attack: {hit}</h4></Col>
            </Row>
          </Col>
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
