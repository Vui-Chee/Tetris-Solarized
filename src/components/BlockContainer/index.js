import "./blockContainerStyles.css";

import PropTypes from "prop-types";
import React from "react";
import shortid from "shortid";

import { BLOCK_DIM } from "../../utils/constants";
import Block from "./Block";

const BlockContainer = ({ currentPiece, blocks, fullRowIndices }) => {
  // Blocks which are still moving
  let newBlocks = [];
  newBlocks = currentPiece.blocks.map((blockObj, index) => {
    return (
      <Block
        x={blockObj.x}
        y={blockObj.y}
        color={blockObj.color}
        key={index}
        dim={BLOCK_DIM}
      />
    );
  });

  // Render blocks that have landed.
  Object.keys(blocks).forEach((rowIndex) => {
    Object.keys(blocks[rowIndex]).forEach((colIndex) => {
      // NOTE : keys of objects are treated as strings.
      newBlocks.push(
        <Block
          x={parseInt(rowIndex)}
          y={parseInt(colIndex)}
          color={blocks[rowIndex][colIndex]}
          key={shortid.generate()}
          fullRowFlag={fullRowIndices[rowIndex]}
          dim={BLOCK_DIM}
        />
      );
    });
  });

  return <div className="block-container">{newBlocks}</div>;
};

BlockContainer.propTypes = {
  currentPiece: PropTypes.object.isRequired,
  fullRowIndices: PropTypes.object.isRequired,
  blocks: PropTypes.object.isRequired,
};

export default BlockContainer;
