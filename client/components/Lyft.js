import axios from "axios";
import React from "react";
import { connect } from "react-redux";

class Lyft extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lat: "",
      lng: "",
    };
  }
  render() {
    const {
      addressFrom,
      cityFrom,
      stateFrom,
      zipFrom,
      latFrom,
      lngFrom,
      addressTo,
      cityTo,
      stateTo,
      latTo,
      lngTo,
      zipTo,
    } = this.props.search ? this.props.search : "";

    const boxStyle = {
      color: "White",
      backgroundColor: "Pink",
      padding: "10px",
      fontFamily: "Helvetica",
      border: "2px solid black",
      height: "250px",
      width: "300px",
      marginRight: "100px",
    };
    return (
      <div className="price-box">
        <h3 style={boxStyle}>
          Lyft Pricing:
          <p>
            From:
            {addressFrom}
            {"  "}
            {cityFrom}
            {"  "}
            {stateFrom}
            {"  "}
            {zipFrom}
          </p>
          <p>
            To:
            {addressTo}
            {"  "}
            {cityTo}
            {"  "}
            {stateTo}
            {"  "}
            {zipTo}
          </p>
          <p>Distance: 2.2 miles</p>
          <p>Price: $38.50</p>
        </h3>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  const { searches } = state;
  const lastElement = searches.length;
  const search = searches.filter((_search) => _search.id === lastElement)[0];
  console.log("HERE IS SEARCH IN UBER--->", search);
  return {
    search,
  };
};
export default connect(mapStateToProps)(Lyft);
