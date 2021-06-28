import React, { Component } from "react";
import Layout from "./container/Layout/Layout";
import { withRouter } from "react-router";
class App extends Component {
  render() {
    return (
      <div>
        <Layout />
      </div>
    );
  }
}

export default withRouter(App);
