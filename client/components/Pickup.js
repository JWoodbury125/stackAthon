import React, { Component } from "react";
import store from "../store";
import { connect } from "react-redux";
import Maps from "./Maps";
import Uber from "./Uber";
import Lyft from "./Lyft";
import axios from "axios";
import { googleApiKey } from "../config";

class Pickup extends Component {
  constructor() {
    super();

    this.state = {
      address: "",
      city: "",
      state: "",
      zip: "",
      lat: "",
      lng: "",
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
    this.geocodingQuery = this.geocodingQuery.bind(this);
  }

  async geocodingQuery(address, city, state) {
    const geocoderQuery = `${address.split(" ").join("+")},+${city
      .split(" ")
      .join("+")},+${state}`;

    const uri = `https://maps.googleapis.com/maps/api/geocode/json?address=${geocoderQuery}&key=${googleApiKey}`;

    return await axios.get(uri).then((response) => {
      let lngLat = {
        lat: response.data.results["0"].geometry.location.lat,
        lng: response.data.results["0"].geometry.location.lng,
      };
      return lngLat;
    });
  }

  onChange(ev) {
    const change = {};
    change[ev.target.name] = ev.target.value;
    this.setState(change);
  }

  async onSubmit(ev) {
    ev.preventDefault();
    const { address, city, state, zip } = this.state;
    const { lat, lng } = await this.geocodingQuery(address, city, state);
    this.setState({
      address: address,
      city: city,
      state: state,
      zip: zip,
      lat: lat,
      lng: lng,
    });
  }

  render() {
    return (
      <div>
        <form onSubmit={this.onSubmit}>
          Pickup Location:
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
          <button>Submit</button>
        </form>
        <hr />
        <Maps text={this.state} />
        <Uber />
        <Lyft />
      </div>
    );
  }
}

export default Pickup;
