import React from "react";
import "./exitMenuStyles.css";
import { withRouter } from "react-router-dom";

const ExitMenu = ({ stay, reset, history }) => {
  return (
    <div className="exit-menu">
      <button
        onClick={() => {
          new Promise((resolve, reject) => {
            reset();
            resolve();
          }).then(() => {
            history.push("/");
          });
        }}
      >
        Yes
      </button>
      <button onClick={() => stay()}>No</button>
    </div>
  );
};

export default withRouter(ExitMenu);
