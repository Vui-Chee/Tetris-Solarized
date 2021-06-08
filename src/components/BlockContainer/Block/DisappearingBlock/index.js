import "./disappearingBlockStyles.css";

import PropTypes from "prop-types";
import React from "react";

import { BLOCK_DIM } from "../../../../utils/constants";

// Choose CSS properties to animate wisely, otherwise
// performance can be hit badly.
const DisappearingBlock = ({ x, y }) => {
  const simpleStyles = {
    position: "absolute",
    top: x * BLOCK_DIM + x,
    left: y * BLOCK_DIM + y,
    height: BLOCK_DIM,
    width: BLOCK_DIM,
  };

  return <div className="disappearing-block" style={simpleStyles} />;
};

DisappearingBlock.propTypes = {
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
};

export default DisappearingBlock;
