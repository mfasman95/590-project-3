import React from 'react';
import { Panel, Row, Col, Table, ButtonGroup, Button } from 'react-bootstrap';
import { emit } from './../../scripts/socket';


const panelStyle = {
  padding: '0px 10px',
}

class AdventurerPanel extends React.Component {
  render() {
    const {
      id,
      name,
      race,
      level,
      str,
      dex,
      int,
      wis,
      con,
      cha,
      hp,
      hit,
    } = this.props.adventurer;
    
    // Handle the fact that class is a reserved word
    const className = this.props.adventurer.class;
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
              <Button bsStyle='success' disabled={this.props.fullParty} onClick={
                () => {
                  emit('addToParty', { id });
                  console.log(`Adding ${id}-${name} to party`);
                }
              }>Add To Party</Button>
              <Button bsStyle='danger' disabled>Scrap <i className='fa fa-trash'/></Button>
            </ButtonGroup>
          </Col>
        </Row>
      </Panel>
    );
  }
}


export default AdventurerPanel;
