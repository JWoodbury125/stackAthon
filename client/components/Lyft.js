import axios from "axios";
import React from "react";

class Lyft extends React.Component {
  render() {
    const boxStyle = {
      color: "White",
      backgroundColor: "Pink",
      padding: "10px",
      fontFamily: "Helvetica",
      border: "2px solid black",
      height: "250px",
      width: "200px",
      marginRight: "100px",
    };
    return (
      <div className="price-box">
        <h1 style={boxStyle}>HERE IS LYFT PRICING</h1>
      </div>
    );
  }
}

export default Lyft;
