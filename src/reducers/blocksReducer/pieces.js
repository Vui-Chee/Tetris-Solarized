import { isMoveValid } from "./movement";

const CORNER_BLOCK = 0;
const EDGE_BLOCK = 1;
const CENTER_BLOCK = 2;

const TYPE_L_PIECE_1 = "TYPE_L_PIECE_1";
const TYPE_L_PIECE_2 = "TYPE_L_PIECE_2";
const TYPE_Z_PIECE_1 = "TYPE_Z_PIECE_1";
const TYPE_Z_PIECE_2 = "TYPE_Z_PIECE_2";
const TYPE_T_PIECE = "TYPE_T_PIECE";
const TYPE_S_PIECE = "TYPE_S_PIECE";
const TYPE_B_PIECE = "TYPE_B_PIECE";

const PIECE_TYPES = [
  TYPE_L_PIECE_1,
  TYPE_T_PIECE,
  TYPE_L_PIECE_2,
  TYPE_S_PIECE,
  TYPE_Z_PIECE_1,
  TYPE_Z_PIECE_2,
  TYPE_B_PIECE,
];

export const L_PIECE_1 = {
  type: TYPE_L_PIECE_1,
  orientation: 0,
  blocks: [
    {
      x: -1,
      y: 3,
      color: 0,
      type: CORNER_BLOCK,
    },

    {
      x: -1,
      y: 4,
      color: 0,
      type: EDGE_BLOCK,
    },

    {
      x: -2,
      y: 4,
      color: 0,
      type: CENTER_BLOCK,
    },

    {
      x: -3,
      y: 4,
      color: 0,
      type: EDGE_BLOCK,
    },
  ],
};

export const L_PIECE_2 = {
  type: TYPE_L_PIECE_2,
  orientation: 0,
  blocks: [
    {
      x: -1,
      y: 5,
      color: 3,
      type: CORNER_BLOCK,
    },

    {
      x: -1,
      y: 4,
      color: 3,
      type: EDGE_BLOCK,
    },

    {
      x: -2,
      y: 4,
      color: 3,
      type: CENTER_BLOCK,
    },

    {
      x: -3,
      y: 4,
      color: 3,
      type: EDGE_BLOCK,
    },
  ],
};

export const T_PIECE = {
  type: TYPE_T_PIECE,
  orientation: 0,
  blocks: [
    {
      x: -2,
      y: 3,
      color: 4,
      type: EDGE_BLOCK,
    },

    {
      x: -1,
      y: 4,
      color: 4,
      type: EDGE_BLOCK,
    },

    {
      x: -2,
      y: 4,
      color: 4,
      type: CENTER_BLOCK,
    },

    {
      x: -2,
      y: 5,
      color: 4,
      type: EDGE_BLOCK,
    },
  ],
};

export const Z_PIECE_1 = {
  type: TYPE_Z_PIECE_1,
  orientation: 0,
  blocks: [
    {
      x: -2,
      y: 3,
      color: 1,
      type: CORNER_BLOCK,
    },

    {
      x: -2,
      y: 4,
      color: 1,
      type: EDGE_BLOCK,
    },

    {
      x: -1,
      y: 4,
      color: 1,
      type: CENTER_BLOCK,
    },

    {
      x: -1,
      y: 5,
      color: 1,
      type: EDGE_BLOCK,
    },
  ],
};

export const Z_PIECE_2 = {
  type: TYPE_Z_PIECE_2,
  orientation: 0,
  blocks: [
    {
      x: -1,
      y: 3,
      color: 2,
      type: CORNER_BLOCK,
    },

    {
      x: -1,
      y: 4,
      color: 2,
      type: EDGE_BLOCK,
    },

    {
      x: -2,
      y: 4,
      color: 2,
      type: CENTER_BLOCK,
    },

    {
      x: -2,
      y: 5,
      color: 2,
      type: EDGE_BLOCK,
    },
  ],
};

export const S_PIECE = {
  type: TYPE_S_PIECE,
  orientation: 0,
  blocks: [
    {
      x: -1,
      y: 3,
      color: 5,
      type: EDGE_BLOCK,
    },

    {
      x: -1,
      y: 4,
      color: 5,
      type: EDGE_BLOCK,
    },

    {
      x: -1,
      y: 5,
      color: 5,
      type: CENTER_BLOCK,
    },

    {
      x: -1,
      y: 6,
      color: 5,
      type: EDGE_BLOCK,
    },
  ],
};

export const B_PIECE = {
  type: TYPE_B_PIECE,
  orientation: 0,
  blocks: [
    {
      x: -1,
      y: 4,
      color: 6,
      type: EDGE_BLOCK,
    },

    {
      x: -1,
      y: 5,
      color: 6,
      type: EDGE_BLOCK,
    },

    {
      x: -2,
      y: 4,
      color: 6,
      type: CENTER_BLOCK,
    },

    {
      x: -2,
      y: 5,
      color: 6,
      type: EDGE_BLOCK,
    },
  ],
};

function isType2(type) {
  const typesWith2Orientations = [TYPE_Z_PIECE_1, TYPE_Z_PIECE_2, TYPE_S_PIECE];
  return typesWith2Orientations.filter((t) => t === type).length > 0;
}

function edgeBlockMap(edgeBlock, centerBlock) {
  let radius = Math.max(
    Math.abs(edgeBlock.x - centerBlock.x),
    Math.abs(edgeBlock.y - centerBlock.y)
  );
  if (edgeBlock.x < centerBlock.x) {
    // Above center block
    return {
      ...edgeBlock,
      x: edgeBlock.x + radius,
      y: edgeBlock.y + radius,
    };
  } else if (edgeBlock.y > centerBlock.y) {
    // Right of center block
    return {
      ...edgeBlock,
      x: edgeBlock.x + radius,
      y: edgeBlock.y - radius,
    };
  } else if (edgeBlock.x > centerBlock.x) {
    // Bottom of center block
    return {
      ...edgeBlock,
      x: edgeBlock.x - radius,
      y: edgeBlock.y - radius,
    };
  } else if (edgeBlock.y < centerBlock.y) {
    // Left of center block
    return {
      ...edgeBlock,
      x: edgeBlock.x - radius,
      y: edgeBlock.y + radius,
    };
  }
}

function cornerBlockMap(cornerBlock, centerBlock) {
  if (cornerBlock.x < centerBlock.x && cornerBlock.y < centerBlock.y) {
    // top-left corner
    return {
      ...cornerBlock,
      y: cornerBlock.y + 2,
    };
  } else if (cornerBlock.x < centerBlock.x && cornerBlock.y > centerBlock.y) {
    // top-right corner
    return {
      ...cornerBlock,
      x: cornerBlock.x + 2,
    };
  } else if (cornerBlock.x > centerBlock.x && cornerBlock.y > centerBlock.y) {
    // bottom-right corner
    return {
      ...cornerBlock,
      y: cornerBlock.y - 2,
    };
  } else if (cornerBlock.x > centerBlock.x && cornerBlock.y < centerBlock.y) {
    // bottom-left corner
    return {
      ...cornerBlock,
      x: cornerBlock.x - 2,
    };
  }
}

export function rotatePiece(currentPiece, blocks) {
  // Block piece does not rotate
  if (currentPiece.type === TYPE_B_PIECE) return currentPiece;

  let newBlocks = [];
  let centerBlock = currentPiece.blocks[CENTER_BLOCK];
  const has2Orientations = isType2(currentPiece.type);

  for (let block of currentPiece.blocks) {
    let newBlock = {
      ...block,
    };
    if (block.type === CORNER_BLOCK) {
      newBlock = cornerBlockMap(block, centerBlock);
      if (has2Orientations && currentPiece.orientation === 1) {
        newBlock = cornerBlockMap(newBlock, centerBlock);
        newBlock = cornerBlockMap(newBlock, centerBlock);
      }
    } else if (block.type === EDGE_BLOCK) {
      newBlock = edgeBlockMap(block, centerBlock);
      if (has2Orientations && currentPiece.orientation === 1) {
        newBlock = edgeBlockMap(newBlock, centerBlock);
        newBlock = edgeBlockMap(newBlock, centerBlock);
      }
    }

    if (!isMoveValid(newBlock.x, newBlock.y, blocks)) {
      return currentPiece;
    }

    newBlocks.push(newBlock);
  }

  let newOrientation = has2Orientations
    ? ~currentPiece.orientation + 2
    : (currentPiece.orientation + 1) % 4;

  return {
    ...currentPiece,
    orientation: newOrientation,
    blocks: newBlocks,
  };
}

function selectDefaultPiece(pieceType) {
  if (pieceType === TYPE_L_PIECE_1) {
    return L_PIECE_1;
  } else if (pieceType === TYPE_L_PIECE_2) {
    return L_PIECE_2;
  } else if (pieceType === TYPE_Z_PIECE_1) {
    return Z_PIECE_1;
  } else if (pieceType === TYPE_Z_PIECE_2) {
    return Z_PIECE_2;
  } else if (pieceType === TYPE_T_PIECE) {
    return T_PIECE;
  } else if (pieceType === TYPE_S_PIECE) {
    return S_PIECE;
  } else if (pieceType === TYPE_B_PIECE) {
    return B_PIECE;
  }
}

function createRandomPiece() {
  let pieceType = PIECE_TYPES[Math.floor(Math.random() * PIECE_TYPES.length)];
  return selectDefaultPiece(pieceType); // Default orientation is 0.
}

export function createPiece(currentPiece, nextPiece) {
  if (currentPiece.blocks.length === 0 && nextPiece.blocks.length === 0) {
    // Create 2 pieces when starting game for the first time.
    return {
      currentPiece: createRandomPiece(),
      nextPiece: createRandomPiece(),
    };
  } else {
    // Else just move nextPiece into currentPiece.
    return {
      currentPiece: nextPiece,
      nextPiece: createRandomPiece(),
    };
  }
}
