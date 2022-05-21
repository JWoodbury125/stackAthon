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
          lat: this.props.search.latFrom,
          lng: this.props.search.lngFrom,
        },
        {
          lat: this.props.search.latTo,
          lat: this.props.search.lngTo,
        },
      ],
    };
    this.displayMarkers = this.displayMarkers.bind(this);
    this.handleDrawMarkers = this.handleDrawMarkers.bind(this);
  }

  handleDrawMarkers = () => {
    const { stores } = this.state;
    return stores.forEach((store, index) => {
      return <Marker key={index} postion={store}></Marker>;
    });
  };

  displayMarkers = () => {
    return this.state.stores.map((store, index) => {
      return <Marker key={index} id={index} position={store} />;
    });
  };
  componentDidMount() {
    this.displayMarkers();
    this.handleDrawMarkers();
  }

  render() {
    const mapStyles = {
      maxWidth: "550px",
      height: "600px",
      overflowX: "hidden",
      overflowY: "hidden",
    };
    const containerStyle = {
      maxWidth: "450px",
      height: "600px",
      marginLeft: "25vw",
      marginTop: "10px",
    };
    const markers = this.state.stores;
    return (
      <div>
        <Map
          google={this.props.google}
          zoom={9}
          style={mapStyles}
          containerStyle={containerStyle}
          initialCenter={{
            lat: `${this.props.search.latTo}` * 1.0,
            lng: `${this.props.search.lngTo}` * 1.0,
          }}
        >
          <Marker
            position={{
              lat: `${markers[0].lat}` * 1.0,
              lng: `${markers[0].lng}` * 1.0,
            }}
          />
          <Marker
            position={{
              lat: `${markers[0].lat}` * 1.0,
              lng: `${markers[0].lng}` * 1.0,
            }}
          />
        </Map>
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

export default connect(mapStateToProps)(
  GoogleApiWrapper({
    apiKey: googleApiKey,
  })(FullMap)
);
