import React from "react";

function Start(props) {
  return (
    <div className="start-pg">
      <h1 className="quizzical">Quizzical</h1>
      <p className="some-desc">Some description if needed</p>
      <button onClick={props.click} className="start-btn">Start quiz</button>
    </div>
  );
}

export default Start;
