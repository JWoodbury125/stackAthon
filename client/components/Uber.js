import React, { Component } from "react";
import { fetchSearches, addSearches } from "../store/searches";
import { connect } from "react-redux";

class Uber extends React.Component {
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
      color: "green",
      backgroundColor: "Black",
      padding: "10px",
      fontFamily: "Helvetica",
      border: "2px solid green",
      height: "250px",
      width: "300px",
    };
    const prices = [35.4, 48.9, 15.1, 7.19, 12.5];
    return (
      <div className="price-box">
        <h3 style={boxStyle}>
          UBER Pricing:
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
          <p>Price: ${prices[Math.floor(Math.random() * prices.length)]}</p>
        </h3>
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
export default connect(mapStateToProps)(Uber);
