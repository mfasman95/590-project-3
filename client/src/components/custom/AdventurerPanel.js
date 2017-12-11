import React from 'react';
import { Panel, Row, Col, Table, ButtonGroup, Button } from 'react-bootstrap';
import { emit } from './../../scripts/socket';


const panelStyle = {
  padding: '0px 10px',
}

class AdventurerPanel extends React.Component {
  render() {
    const {
      name,
      race,
      className,
      level,
      str,
      dex,
      int,
      wis,
      con,
      cha,
      hp,
      hit,
      key,
      id,
    } = this.props.adventurer;
    
    let disableAddToParty = false;
    const partyKeys = Object.keys(this.props.party);
    if (partyKeys.length >= 3) disableAddToParty = false;
    for (let i = 0; i < partyKeys.length; i++) {
      const partyMember = this.props.party[partyKeys[i]];
      // Cannot add the same instance to my party twice
      if (key === partyMember.key) disableAddToParty = true;
      // Cannot add the same stat block to my party twice
      if (id === partyMember.id) disableAddToParty = true;
    }

    // If this user is marked as support, cannot mark them again
    let disableMarkAsSupport = (key === this.props.mySupport);

    return (  
      <Panel style={panelStyle}>
        <Row>
          <h4><u><b>{name}</b> - {race} {className} - Level {level}</u></h4>
        </Row>
        <Row>
          <Col xs={12} md={9} lg={12}>
            <Table striped bordered responsive>
              <thead>
                <tr>
                  <th>Str</th>
                  <th>Dex</th>
                  <th>Int</th>
                  <th>Wis</th>
                  <th>Con</th>
                  <th>Cha</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{str}</td>
                  <td>{dex}</td>
                  <td>{int}</td>
                  <td>{wis}</td>
                  <td>{con}</td>
                  <td>{cha}</td>
                </tr>
                <tr>
                  <td colSpan='3'><b>Max Health: {hp}</b></td>
                  <td colSpan='3'><b>Attack: {hit}</b></td>
                </tr>
              </tbody>
            </Table>
          </Col>
          <Col xs={12} md={3} lg={12}>
            <ButtonGroup vertical block>
              <Button
                bsStyle='success'
                disabled={disableAddToParty}
                onClick={() => { emit('addToParty', { key }) }}
              >
                Add To Party
              </Button>
              <Button
                bsStyle='info'
                disabled={disableMarkAsSupport}
                onClick={() => { emit('setSupport', { key }) }}
              >
                Share This Adventurer With Friends
              </Button>
              <Button
                bsStyle='danger'
                disabled
              >
                Scrap <i className='fa fa-trash'/>
              </Button>
            </ButtonGroup>
          </Col>
        </Row>
      </Panel>
    );
  }
}


export default AdventurerPanel;
