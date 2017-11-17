import React from 'react';
import { connect } from 'react-redux';
import { Col } from 'react-bootstrap';

class Router extends React.Component {
  render() {
    // Determine the page to render
    const Page = this.props.pages[this.props.page];
    const NotFoundPage = (this.props.custom404) ?
      // If a custom 404 page is passed to the router, use it
      this.props.custom404 :
      // Otherwise, use the generic 404 page
      (props) => (
        <div>
          <h1>404: Page Not Found</h1>
          <Col xs={6} xsOffset={3}>
            <h3>The page <b>{props.pageWanted}</b> could not be found...</h3>
          </Col>
        </div>
      );

    // If the page does not exist, present the 404 pages
    if (!Page) return <NotFoundPage pageWanted={this.props.page}/>;
    else return <Page/>;
  }
}

//Function to map the redux state to object properties
const mapStateToProps = (state, ownProps) => {
  return {
    page: state.route.page
  }
};

export default connect(mapStateToProps)(Router);
