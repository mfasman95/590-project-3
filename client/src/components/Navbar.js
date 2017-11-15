import React from 'react';
import { connect } from 'react-redux';
import { Navbar, ButtonGroup, Button, FormGroup } from 'react-bootstrap';
import { emit } from './../scripts/socket';

class MainNav extends React.Component {
  render() {
    return (  
      <Navbar inverse collapseOnSelect>
        <Navbar.Header>
          <Navbar.Brand>
            Gatcha & Dragons
          </Navbar.Brand>
        </Navbar.Header>
        <Navbar.Text>
          Level: {this.props.level}
        </Navbar.Text>
        <Navbar.Text>
          Gold: {this.props.gold}
        </Navbar.Text>
        <Navbar.Text>
          Stamina: {this.props.currentStamina}/{this.props.maxStamina}
        </Navbar.Text>
        <Navbar.Form pullRight>
          <FormGroup>
            <ButtonGroup>
              <Button
                bsStyle='primary'
                onClick={
                  () => {
                    emit('changePage', { page: 'Home' });
                  }
                }
              >
                <i className='fa fa-home'/>
              </Button>
              <Button
                bsStyle='primary'
                onClick={
                  () => {
                    emit('changePage', { page: 'ManageParty' });
                  }
                }
              >
                <i className='fa fa-users'/>
              </Button>
              <Button
                bsStyle='primary'
                onClick={
                  () => {
                    emit('changePage', { page: 'Upgrades' });
                  }
                }
              >
                <i className='fa fa-level-up'/>
              </Button>
              <Button
                bsStyle='primary'
                onClick={
                  () => {
                    emit('changePage', { page: 'Recruit' });
                  }
                }
              >
                <i className='fa fa-superpowers'/>
              </Button>
              <Button
                bsStyle='primary'
                onClick={
                  () => {
                    emit('changePage', { page: 'Friends' });
                  }
                }
              >
                <i className='fa fa-address-book'/>
              </Button>
              <Button
                bsStyle='primary'
                onClick={
                  () => {
                    emit('changePage', { page: 'Options' });
                  }
                }
              >
                <i className='fa fa-gears'/>
              </Button>
              <Button
                bsStyle='danger'
                onClick={() => emit('logout')}
              >
                Logout
              </Button>
            </ButtonGroup>
          </FormGroup>
        </Navbar.Form>
      </Navbar>
    );
  }
}

//Function to map the redux state to object properties
const mapStateToProps = (state, ownProps) => {
  return {
    level: state.session.level,
    experience: state.session.experience,
    gold: state.session.gold,
    currentStamina: state.session.currentStamina,
    maxStamina: state.session.maxStamina,
  }
};

export default connect(mapStateToProps)(MainNav);
