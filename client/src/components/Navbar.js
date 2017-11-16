import React from 'react';
import { connect } from 'react-redux';
import { Navbar, ButtonGroup, Button, FormGroup, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { emit } from './../scripts/socket';

/**
 * @param props.tooltipId - Id of the tooltip 
 * @param props.tooltipText - Text of the tooltip 
 * @param props.pageTarget - The page this button navigates to 
 * @param props.disabled - Disabled state of the button (true/false)
 * @param props.iconString - The font awesome icon string for this button 
 */
const OverlayNavButton = (props) => (
  <OverlayTrigger
    placement='bottom'
    overlay={<Tooltip id={`${props.tooltipId}Tooltip`}>{props.tooltipText}</Tooltip>}
  >
    <Button
      bsStyle='primary'
      onClick={() => emit('changePage', { page: props.pageTarget })}
      disabled={props.disabled}
    >
      <i className={`fa ${props.iconString}`}/>
    </Button>
  </OverlayTrigger>
);

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
              <OverlayNavButton
                tooltipId='ReturnHome'
                tooltipText='Return Home'
                pageTarget='Home'
                disabled={this.props.inGame}
                iconString='fa-home'
              />
              <OverlayNavButton
                tooltipId='ManageParty'
                tooltipText='Manage Party'
                pageTarget='ManageParty'
                disabled={this.props.inGame}
                iconString='fa-users'
              />
              <OverlayNavButton
                tooltipId='Recruit'
                tooltipText='Recruitment Page'
                pageTarget='Recruit'
                disabled={this.props.inGame}
                iconString='fa-superpowers'
              />
              <OverlayNavButton
                tooltipId='Friends'
                tooltipText='Friend List'
                pageTarget='Friends'
                disabled={this.props.inGame}
                iconString='fa-address-book'
              />
              <OverlayNavButton
                tooltipId='PurchaseCurrency'
                tooltipText='Purchase Currency'
                pageTarget='MicroTransactions'
                disabled={this.props.inGame}
                iconString='fa-dollar'
              />
              <OverlayNavButton
                tooltipId='Options'
                tooltipText='Options'
                pageTarget='Options'
                disabled={this.props.inGame}
                iconString='fa-gears'
              />
              <Button bsStyle='danger' onClick={() => emit('logout')}>
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
