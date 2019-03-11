import {
  BLOCK_DIM,
  BLOCK_CONTAINER_HEIGHT,
  BLOCK_CONTAINER_WIDTH,
  LEFT_KEYCODE,
  DOWN_KEYCODE,
  RIGHT_KEYCODE,
} from '../../utils/constants';

import {MOVE_DOWN, MOVE_LEFT, MOVE_RIGHT} from '../../actions/types';

import {combineBlocks} from './blocks';

export function isOutOfBounds(x, y) {
  return (
    x * BLOCK_DIM > BLOCK_CONTAINER_HEIGHT - BLOCK_DIM ||
    y < 0 ||
    y * BLOCK_DIM > BLOCK_CONTAINER_WIDTH - BLOCK_DIM
  );
}

export function isMoveValid(x, y, blocks) {
  try {
    if (isOutOfBounds(x, y) || blocks[x][y] !== undefined) {
      return false;
    }
  } catch (error) {}
  return true;
}

// Combines blocks inside current falling piece into
// the blocks that have already landed.
export function instantLand({currentPiece, blocks}) {
  let minXDistance = 30;

  currentPiece.blocks.forEach(block => {
    minXDistance = Math.min(Math.abs(block.x - 18), minXDistance);
    // 2 cases, there are blocks underneath block,
    // or there is no block beneath.
    Object.keys(blocks).forEach(rowIndex => {
      if (parseInt(rowIndex) <= block.x) return;
      // Update vertical distance between falling block
      // and landed block.
      let vertDistance = Math.abs(block.x - parseInt(rowIndex));
      if (
        blocks[rowIndex][block.y] !== undefined &&
        vertDistance < minXDistance
      ) {
        minXDistance = vertDistance;
      }
    });
  });

  let newPieceBlocks = [];
  currentPiece.blocks.forEach(block => {
    newPieceBlocks.push({
      ...block,
      x: block.x + minXDistance - 1,
    });
  });

  return combineBlocks(newPieceBlocks, blocks);
}

function areDirectionsAllowed({blocks}, directions, landedBlocks) {
  let canMoveDown = directions[DOWN_KEYCODE];
  let canMoveRight = directions[RIGHT_KEYCODE];
  let canMoveLeft = directions[LEFT_KEYCODE];

  // Determine which direction piece can move in.
  blocks.forEach(block => {
    if (directions[DOWN_KEYCODE]) {
      canMoveDown &= isMoveValid(block.x + 1, block.y, landedBlocks);
    }

    if (directions[RIGHT_KEYCODE]) {
      canMoveRight &= isMoveValid(block.x, block.y + 1, landedBlocks);
    }

    if (directions[LEFT_KEYCODE]) {
      canMoveLeft &= isMoveValid(block.x, block.y - 1, landedBlocks);
    }
  });

  // Prevents block overlap when piece moves diagonally.
  blocks.forEach(block => {
    if (canMoveDown && canMoveRight) {
      canMoveRight = isMoveValid(block.x + 1, block.y + 1, landedBlocks);
    }
    if (canMoveDown && canMoveLeft) {
      canMoveLeft = isMoveValid(block.x + 1, block.y - 1, landedBlocks);
    }
  });

  return [canMoveDown, canMoveRight, canMoveLeft];
}

function createNewPieceInDirection(
  currentPiece,
  pieceCanMoveDown,
  pieceCanMoveRight,
  pieceCanMoveLeft,
) {
  let newPiece = {
    ...currentPiece,
    blocks: [],
  };

  currentPiece.blocks.forEach(block => {
    let newBlock = {
      ...block,
    };

    if (pieceCanMoveDown) {
      newBlock.x++;
    }
    if (pieceCanMoveRight) {
      newBlock.y++;
    }
    if (pieceCanMoveLeft) {
      newBlock.y--;
    }

    newPiece.blocks.push(newBlock);
  });

  return newPiece;
}

export function movePiece({currentPiece, blocks}, directions) {
  let [
    pieceCanMoveDown,
    pieceCanMoveRight,
    pieceCanMoveLeft,
  ] = areDirectionsAllowed(currentPiece, directions, blocks);

  if (!pieceCanMoveDown && directions[DOWN_KEYCODE]) {
    return [{blocks: []}, combineBlocks(currentPiece.blocks, blocks), true];
  }

  return [
    createNewPieceInDirection(
      currentPiece,
      pieceCanMoveDown,
      pieceCanMoveRight,
      pieceCanMoveLeft,
    ),
    blocks,
    false,
  ];
}
