import React from 'react';
import { connect } from 'react-redux';
import { Navbar, ButtonGroup, Button, FormGroup, OverlayTrigger, Tooltip } from 'react-bootstrap';
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
          <OverlayTrigger
            placement='bottom'
            overlay={
              <Tooltip
                id='ExperienceTooltip'
              >
                <strong>EXP: </strong>{this.props.experience}/{this.props.experienceToNextLevel}
              </Tooltip>
            }
          >
            <span>Level: {this.props.level}</span>
          </OverlayTrigger>
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
              <OverlayTrigger
                placement='bottom'
                overlay={<Tooltip id='GoHomeTooltip'>Return Home</Tooltip>}
              >
                <Button
                  bsStyle='primary'
                  onClick={() => emit('changePage', { page: 'Home' })}
                  disabled={this.props.inGame}
                >
                  <i className='fa fa-home'/>
                </Button>
              </OverlayTrigger>
              <OverlayTrigger
                placement='bottom'
                overlay={<Tooltip id='ManagePartyTooltip'>Manage Party</Tooltip>}
              >
                <Button
                  bsStyle='primary'
                  onClick={() => emit('changePage', { page: 'ManageParty' })}
                  disabled={this.props.inGame}
                >
                  <i className='fa fa-users'/>
                </Button>
              </OverlayTrigger>
              <OverlayTrigger
                placement='bottom'
                overlay={<Tooltip id='RecruitTooltip'>Recruitment Page</Tooltip>}
              >
                <Button
                  bsStyle='primary'
                  onClick={() => emit('changePage', { page: 'Recruit' })}
                  disabled={this.props.inGame}
                >
                  <i className='fa fa-superpowers'/>
                </Button>
              </OverlayTrigger>
              <OverlayTrigger
                placement='bottom'
                overlay={<Tooltip id='FriendsTooltip'>Friends List</Tooltip>}
              >
                <Button
                  bsStyle='primary'
                  onClick={() => emit('changePage', { page: 'Friends' })}
                  disabled={this.props.inGame}
                >
                  <i className='fa fa-address-book'/>
                </Button>
              </OverlayTrigger>
              <OverlayTrigger
                placement='bottom'
                overlay={<Tooltip id='PurchaseCurrencyTooltip'>Purchase Currency</Tooltip>}
              >
                <Button
                  bsStyle='primary'
                  onClick={() => emit('changePage', { page: 'MicroTransactions' })}
                  disabled={this.props.inGame}
                >
                  <i className='fa fa-dollar'/>
                </Button>
              </OverlayTrigger>
              <OverlayTrigger
                placement='bottom'
                overlay={<Tooltip id='OptionsTooltip'>Options</Tooltip>}
              >
                <Button
                  bsStyle='primary'
                  onClick={() => emit('changePage', { page: 'Options' })}
                  disabled={this.props.inGame}
                >
                  <i className='fa fa-gears'/>
                </Button>
              </OverlayTrigger>
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
    experienceToNextLevel: state.session.experienceToNextLevel,
    gold: state.session.gold,
    currentStamina: state.session.currentStamina,
    maxStamina: state.session.maxStamina,
    inGame: state.main.inGame,
  }
};

export default connect(mapStateToProps)(MainNav);
