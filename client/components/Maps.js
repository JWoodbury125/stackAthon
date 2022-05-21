import React, { Component } from "react";
import ReactDOM from "react-dom";
import {
  Map,
  GoogleApiWrapper,
  Marker,
  DirectionsRenderer,
  DirectionsService,
} from "google-maps-react";
import { connect } from "react-redux";
import { googleApiKey } from "../config";

export class FullMap extends Component {
  constructor(props) {
    super(props);

    this.state = {
      stores: [
        {
          latitudeFrom: this.props.search.latFrom,
          longitudeFrom: this.props.search.lngFrom,
        },
        {
          latitudeTo: this.props.search.latTo,
          longitudeTo: this.props.search.lngTo,
        },
      ],
    };
    this.displayMarkers = this.displayMarkers.bind(this);
    this.handleDrawMarkers = this.handleDrawMarkers.bind(this);
  }

  handleDrawMarkers = (latitude, longitude) => {
    const { stores } = this.state;
    new google.maps.Marker({
      position: (latitude, longitude),
      map: this.map,
    });
  };

  displayMarkers = (latitude, longitude) => {
    return this.state.stores.map((store, index) => {
      return (
        <Marker
          key={index}
          id={index}
          position={{
            lat: latitude,
            lng: longitude,
          }}
        />
      );
    });
  };

  render() {
    const mapStyles = {
      maxWidth: "550px",
      height: "550px",
      overflowX: "hidden",
      overflowY: "hidden",
    };
    const containerStyle = {
      maxWidth: "450px",
      height: "350px",
      marginLeft: "50vw",
      marginTop: "80px",
    };
    return (
      <Map
        google={this.props.google}
        zoom={14}
        style={mapStyles}
        containerStyle={containerStyle}
        initialCenter={{
          lat: `${this.props.search.latFrom}` * 1.0,
          lng: `${this.props.search.lngFrom}` * 1.0,
        }}
      >
        {this.displayMarkers(
          parseFloat(`${this.props.search.latFrom}`),
          parseFloat(`${this.props.search.longFrom}`)
        )}
        {this.displayMarkers(
          parseFloat(`${this.props.search.latTo}`),
          parseFloat(`${this.props.search.longTo}`)
        )}
        {/* {this.handleDrawMarkers(
          parseFloat(`${this.props.search.latFrom}`),
          parseFloat(`${this.props.search.longFrom}`)
        )}
        {this.handleDrawMarkers(
          parseFloat(`${this.props.search.latTo}`),
          parseFloat(`${this.props.search.longTo}`)
        )} */}
      </Map>
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

export default connect(mapStateToProps)(
  GoogleApiWrapper({
    apiKey: googleApiKey,
  })(FullMap)
);
