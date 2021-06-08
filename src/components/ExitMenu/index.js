import "./exitMenuStyles.css";

import PropTypes from "prop-types";
import React from "react";
import { withRouter } from "react-router-dom";

const ExitMenu = ({ stay, reset, history }) => {
  return (
    <div className="exit-menu">
      <button
        onClick={() => {
          new Promise((resolve) => {
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

ExitMenu.propTypes = {
  stay: PropTypes.func.isRequired,
  reset: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
};

export default withRouter(ExitMenu);
