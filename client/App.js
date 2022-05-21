import React, { Component } from "react";
import { connect } from "react-redux";
import RoutesManager from "./RoutesManager";
import me from "./store/auth";
import { fetchSearches } from "./store";

class App extends Component {
  componentDidMount() {
    this.props.fetchSearches;
  }
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
    fetchSearches: dispatch(fetchSearches()),
  };
};

export default connect(null, mapDispatchToProps)(App);
