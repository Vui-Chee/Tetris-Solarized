import React, {Component} from 'react';
import {BLOCK_DIM} from '../../../../utils/constants';
import './disappearingBlockStyles.css';

// Choose CSS properties to animate wisely, otherwise
// performance can be hit badly.
const DisappearingBlock = ({x, y}) => {
  const simpleStyles = {
    position: 'absolute',
    top: x * BLOCK_DIM + x,
    left: y * BLOCK_DIM + y,
    height: BLOCK_DIM,
    width: BLOCK_DIM,
  };

  return <div className="disappearing-block" style={simpleStyles} />;
};

export default DisappearingBlock;
