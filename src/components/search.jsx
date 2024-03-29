import React from "react";

const Search = (props) => {
  const isUsingCoords = props.isUsingCoords;
  return (
    <div className="search">
      {isUsingCoords ? (
        <div className="wrapper">
          <button className="get-started" onClick={() => props.onSubmit()}>
            Get Started
          </button>
          <a href="#" onClick={() => props.setIsUsingCoords()}>Or click here to choose a city</a>
        </div>
      ) : (
        <div className="wrapper">
            <input type="text" className="search-input" />
          <button className="get-started" onClick={() => props.onSubmit()}>
            Get Started
          </button>
          <a href="#" onClick={() => props.setIsUsingCoords()}>Or click here to use your location.</a>
        </div>
      )}
    </div>
  );
};

export default Search;
