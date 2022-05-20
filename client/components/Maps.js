import React, { Component } from "react";
import { Map, GoogleApiWrapper, Marker } from "google-maps-react";
import { googleApiKey } from "../config";

export class GoogleMap extends Component {
  constructor(props) {
    super(props);

    const { lat, lng } = this.props.text;

    this.state = {
      stores: [
        {
          latitude: this.props.text ? lat : null,
          longitude: this.props.text ? lng : null,
        },
      ],
    };
    this.displayMarkers = this.displayMarkers.bind(this);
    this.recenterMap = this.recenterMap.bind(this);
    this.loadMap = this.loadMap.bind(this);
  }

  componentDidUpdate(prevProps, prevState) {
    console.log(`HERE IS PREV PROPS ---> ${prevProps.text.lat}`);
    if (prevProps.google !== this.props.google) {
      this.loadMap();
    }
    if (prevProps.text.lat !== this.state.stores[0].latitude) {
      this.recenterMap();
    }
  }

  // ...

  loadMap() {
    if (this.props && this.props.google) {
      // checks if google is available
      const { google } = this.props;
      const maps = google.maps;

      const mapRef = this.refs.map;

      // reference to the actual DOM element
      const node = ReactDOM.findDOMNode(mapRef);

      let { zoom } = this.props;
      const { lat, lng } = this.state.stores[0];
      const center = new maps.LatLng(lat, lng);

      const mapConfig = Object.assign(
        {},
        {
          center: center,
          zoom: zoom,
        }
      );

      // maps.Map() is constructor that instantiates the map
      this.map = new maps.Map(node, mapConfig);
    }
  }

  // ...
  recenterMap() {
    const map = this.map;
    const current = this.state.stores[0];
    const google = this.props.google;
    const maps = google.maps;

    if (map) {
      let center = new maps.LatLng(current.latitude, current.longitude);
      map.panTo(center);
    }
  }

  displayMarkers = () => {
    return this.state.stores.map((store, index) => {
      return (
        <Marker
          key={index}
          id={index}
          position={{
            lat: store.latitude,
            lng: store.longitude,
          }}
        />
      );
    });
  };

  render() {
    console.log(
      `HERE IS MAP PROPS----> ${this.props.text.lat} ${this.props.text.lng}`
    );
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
        zoom={16}
        style={mapStyles}
        containerStyle={containerStyle}
        initialCenter={
          this.props.text.lat
            ? { lat: this.props.text.lat, lng: this.props.text.lng }
            : { lat: 40.632769, lng: -73.90728 }
        }
      >
        {this.displayMarkers()}
      </Map>
    );
  }
}

export default GoogleApiWrapper({
  apiKey: googleApiKey,
})(GoogleMap);
