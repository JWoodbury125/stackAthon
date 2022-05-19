import axios from "axios";
import React from "react";

class Uber extends React.Component {
  render() {
    const boxStyle = {
      color: "green",
      backgroundColor: "Black",
      padding: "10px",
      fontFamily: "Helvetica",
      border: "2px solid green",
      height: "250px",
      width: "200px",
    };
    return (
      <div className="price-box">
        <h1 style={boxStyle}>HERE IS UBER PRICING</h1>
      </div>
    );
  }
}

export default Uber;
