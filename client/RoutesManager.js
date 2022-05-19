import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter, Route, Switch, Redirect } from "react-router-dom";
import Pickup from "./components/Pickup";
import Uber from "./components/Uber";
import { me } from "./store";

class RoutesManager extends Component {
  render() {
    return (
      <Switch>
        <Route path="/" component={Pickup} />
      </Switch>
    );
  }
}
export default withRouter(RoutesManager);
