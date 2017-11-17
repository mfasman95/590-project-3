import React from 'react';
import { Col } from 'react-bootstrap';

export default class Router extends React.Component {
  constructor(props) {
    super(props);

    // Determine the 404 page for this component
    this.NotFoundPage = (this.props.custom404) ?
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
  }
  render() {
    const Page = this.props.pages[this.props.currentPage];

    // Render the current page in pages
    // Fallback to the 404 page if the current page is not in pages
    return Page ? <Page/> : this.NotFoundPage({ pageWanted: this.props.currentPage });
  }
}
