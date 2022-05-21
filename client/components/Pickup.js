import React, { Component } from "react";
import { fetchSearches, addSearches } from "../store/searches";
import { connect } from "react-redux";
import FullMap from "./Maps";
import Uber from "./Uber";
import Lyft from "./Lyft";
import axios from "axios";
import { googleApiKey } from "../config";
import {
  Map,
  GoogleApiWrapper,
  Marker,
  DirectionsRenderer,
  DirectionsService,
} from "google-maps-react";

class Pickup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      addressFrom: "",
      cityFrom: "",
      stateFrom: "",
      zipFrom: "",
      latFrom: 0,
      lngFrom: 0,
      addressTo: "",
      cityTo: "",
      stateTo: "",
      zipTo: "",
      latTo: 0,
      lngTo: 0,
    };
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
    this.geocodingQuery = this.geocodingQuery.bind(this);
    this.loadMap = this.loadMap.bind(this);
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

  loadMap() {
    document.getElementById("map").style.display = "block";
    const { latFrom, lngFrom, latTo, lngTo } = this.state;
    return (
      <div>
        <Map
          google={this.props.google}
          zoom={14}
          initialCenter={{
            lat: { latFrom },
            lng: { lngFrom },
          }}
        >
          <Marker position={{ latFrom, lngFrom }} />
          <Marker position={{ latTo, lngTo }} />
        </Map>
      </div>
    );
  }

  onChange(ev) {
    const change = {};
    change[ev.target.name] = ev.target.value;
    this.setState(change);
  }

  async onSubmit(ev) {
    ev.preventDefault();
    const {
      addressFrom,
      cityFrom,
      stateFrom,
      zipFrom,
      addressTo,
      cityTo,
      stateTo,
      zipTo,
    } = this.state;

    const latlng1 = await this.geocodingQuery(addressFrom, cityFrom, stateFrom);
    const latlng2 = await this.geocodingQuery(addressTo, cityTo, stateTo);

    this.setState({
      addressFrom: addressFrom,
      cityFrom: cityFrom,
      stateFrom: stateFrom,
      zipFrom: zipFrom,
      latFrom: latlng1["lat"],
      lngFrom: latlng1["lng"],
      addressTo: addressTo,
      cityTo: cityTo,
      stateTo: stateTo,
      zipTo: zipTo,
      latTo: latlng2["lat"],
      lngTo: latlng2["lng"],
    });
    this.props.addSearches(this.state);
    this.loadMap();
  }

  render() {
    return (
      <div>
        <form onSubmit={this.onSubmit}>
          Pickup Location:
          <input
            name="addressFrom"
            type="text"
            value={this.state.addressFrom}
            onChange={this.onChange}
            placeholder="Address"
          />
          <input
            name="cityFrom"
            type="text"
            value={this.state.cityFrom}
            onChange={this.onChange}
            placeholder="City"
          />
          <input
            name="stateFrom"
            type="text"
            value={this.state.stateFrom}
            onChange={this.onChange}
            placeholder="State"
          />
          <input
            name="zipFrom"
            type="text"
            value={this.state.zipFrom}
            onChange={this.onChange}
            placeholder="Zip Code"
          />
          <div>
            DropOff Location:
            <input
              name="addressTo"
              type="text"
              value={this.state.addressTo}
              onChange={this.onChange}
              placeholder="Address"
            />
            <input
              name="cityTo"
              type="text"
              value={this.state.cityTo}
              onChange={this.onChange}
              placeholder="City"
            />
            <input
              name="stateTo"
              type="text"
              value={this.state.stateTo}
              onChange={this.onChange}
              placeholder="State"
            />
            <input
              name="zipTo"
              type="text"
              value={this.state.zipTo}
              onChange={this.onChange}
              placeholder="Zip Code"
            />
          </div>
          <button>Submit</button>
        </form>
        <hr />
        <FullMap />
        <Uber />
        <Lyft />
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  const { searches } = state;
  const lastElement = searches.length;
  const search = searches.filter((_search) => _search.id === lastElement)[0];
  return {
    search,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchSearches: () => dispatch(fetchSearches()),
    addSearches: (searches) => dispatch(addSearches(searches)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Pickup);
