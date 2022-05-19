import React, { Component } from "react";
import store from "../store";
import { connect } from "react-redux";
import Maps from "./Maps";
import Uber from "./Uber";
import Lyft from "./Lyft";

class Pickup extends Component {
  constructor() {
    super();

    this.state = {
      address: "",
      city: "",
      state: "",
      zip: "",
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
  }
  onChange(ev) {
    const change = {};
    change[ev.target.name] = ev.target.value;
    this.setState(change);
  }
  async onSubmit(ev) {
    ev.preventDefault();
    console.log("Submitted!!!");
  }

  render() {
    return (
      <div>
        <Maps />
        <form onSubmit={this.onSubmit}>
          <input
            name="address"
            type="text"
            value={this.state.address}
            onChange={this.onChange}
            placeholder="Address"
          />
          <input
            name="city"
            type="text"
            value={this.state.city}
            onChange={this.onChange}
            placeholder="City"
          />
          <input
            name="state"
            type="text"
            value={this.state.state}
            onChange={this.onChange}
            placeholder="State"
          />
          <input
            name="zip"
            type="text"
            value={this.state.zip}
            onChange={this.onChange}
            placeholder="Zip Code"
          />
        </form>
        <Uber />
        <Lyft />
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    sendPickup: dispatch(sendPickup()),
  };
};

export default Pickup;
