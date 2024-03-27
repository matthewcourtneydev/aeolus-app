import React from "react";
import { useRef } from "react";

const Home = (props) => {
  console.log(props);
  const searchRef = useRef(null);

  function onSubmit(input) {
    debugger;
    props.searchFunction(searchRef.current.value)
  }
  return (
    <div className="home">
      <h1>Hello World</h1>
      <label htmlFor="city-input"></label>
      <input type="text" id="city-input" ref={searchRef}/>
      <button className="submit" onClick={() => onSubmit()}>Search</button>
    </div>
  );
};

export default Home;
