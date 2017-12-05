import React from 'react';
import { connect } from 'react-redux';
import { Navbar, ButtonGroup, Button, FormGroup, OverlayTrigger, Tooltip, Nav } from 'react-bootstrap';
import { emit } from './../scripts/socket';

/**
 * @param props.tooltipId - Id of the tooltip 
 * @param props.tooltipText - Text of the tooltip 
 * @param props.onClick - The function executed by this button on click 
 * @param props.disabled - Disabled state of the button (true/false)
 * @param props.iconString - The font awesome icon string for this button 
 * @param props.bsStyle - The bsStyle prop to pass to the button. Default to 'primary'. 
 */
const OverlayNavButton = (props) => (
  <OverlayTrigger
    placement='bottom'
    overlay={<Tooltip id={`${props.tooltipId}Tooltip`}>{props.tooltipText}</Tooltip>}
  >
    <Button
      bsStyle={props.bsStyle || 'primary'}
      onClick={props.onClick}
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
        {
          this.props.loggedIn &&
            <Nav>
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
            </Nav>
          }
        <Navbar.Form pullRight>
          <FormGroup>
            {
              !this.props.loggedIn &&
                <ButtonGroup>
                {
                  this.props.page !== 'Login' &&
                    <OverlayNavButton
                      tooltipId='LogIn'
                      tooltipText='Log In Page'
                      onClick={()=>emit('changePage', { page: 'Login'})}
                      disabled={this.props.loggedIn}
                      iconString='fa fa-sign-in'
                    />
                }
                {
                  this.props.page !== 'SignUp' &&
                    <OverlayNavButton
                      tooltipId='SignUp'
                      tooltipText='Sign Up Page'
                      onClick={()=>emit('changePage', { page: 'SignUp'})}
                      disabled={this.props.loggedIn}
                      iconString='fa fa-user-plus'
                    />
                }
                </ButtonGroup>
            }
            {
              this.props.loggedIn &&
                <ButtonGroup>
                  {
                    this.props.page !== 'Home' &&
                      <OverlayNavButton
                        tooltipId='ReturnHome'
                        tooltipText='Return Home'
                        onClick={() => {emit('changePage', { page: 'Home' })}}
                        disabled={this.props.inGame}
                        iconString='fa-home'
                      />
                  }
                  {
                    this.props.page !== 'ManageParty' &&
                      <OverlayNavButton
                        tooltipId='ManageParty'
                        tooltipText='Manage Party'
                        onClick={() => {emit('changePage', { page: 'ManageParty' })}}
                        disabled={this.props.inGame}
                        iconString='fa-users'
                      />
                  }
                  {
                    this.props.page !== 'Recruit' &&
                      <OverlayNavButton
                        tooltipId='Recruit'
                        tooltipText='Recruitment Page'
                        onClick={() => {emit('changePage', { page: 'Recruit' })}}
                        disabled={this.props.inGame}
                        iconString='fa-superpowers'
                      />
                  }
                  {
                    this.props.page !== 'Friends' &&
                      <OverlayNavButton
                        tooltipId='Friends'
                        tooltipText='Friend List'
                        onClick={() => {emit('changePage', { page: 'Friends' })}}
                        disabled={this.props.inGame}
                        iconString='fa-address-book'
                      />
                  }
                  {
                    this.props.page !== 'MicroTransactions' &&
                      <OverlayNavButton
                        tooltipId='PurchaseCurrency'
                        tooltipText='Purchase Currency'
                        onClick={() => {emit('changePage', { page: 'MicroTransactions' })}}
                        disabled={this.props.inGame}
                        iconString='fa-dollar'
                      />
                  }
                  {
                    this.props.page !== 'Options' &&
                      <OverlayNavButton
                        tooltipId='Options'
                        tooltipText='Options'
                        onClick={() => {emit('changePage', { page: 'Options' })}}
                        disabled={this.props.inGame}
                        iconString='fa-gears'
                      />
                  }
                  <OverlayNavButton
                    tooltipId='Logout'
                    tooltipText='Log Out'
                    onClick={() => {emit('logout')}}
                    disabled={false}
                    iconString='fa fa-sign-out'
                    bsStyle='danger'
                  />
                </ButtonGroup>
            }
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
    loggedIn: state.main.loggedIn,
    page: state.route.page,
  }
};

export default connect(mapStateToProps)(MainNav);
