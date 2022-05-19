import React, { Component } from "react";
import { connect } from "react-redux";
import RoutesManager from "./RoutesManager";
import me from "./store/auth";

class App extends Component {
  render() {
    return (
      <div>
        <RoutesManager />
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    auth: dispatch(me),
  };
};

export default connect(null, mapDispatchToProps)(App);
