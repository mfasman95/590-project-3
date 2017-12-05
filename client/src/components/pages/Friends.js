import React from 'react';
import FriendPanel from './../custom/FriendPanel';
import { Well, PageHeader, Col, Row } from 'react-bootstrap';
import { connect } from 'react-redux';
import AddFriend from './../custom/AddFriend';

class Friends extends React.Component {
  render() {
    const friendKeys = Object.keys(this.props.friends);
    return (
      <div>
        <PageHeader>Friends Page</PageHeader>
        <Row>
          <Col xs={12} lg={4}>
            <AddFriend />
          </Col>
          <Col xs={12} lg={8}>
            <Well>
            {
              friendKeys.length <= 0 ?
                // Render the no friends result
                <h3>You have yet to add any friends!</h3> :
                // Render the friends list
                friendKeys.map((key) => <FriendPanel key={key} friend={this.props.friends[key]}/>)
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
    friends: state.friends
  }
};

export default connect(mapStateToProps)(Friends);
