import {NUM_ROWS, NUM_COLS} from '../../utils/constants';

export function copyBlocks(oldBlocks) {
  // Still has old reference to objects per row.
  let newBlocks = {...oldBlocks};
  // Copy each old row object into a new object reference.
  Object.keys(newBlocks).forEach(rowIndex => {
    newBlocks[rowIndex] = {...newBlocks[rowIndex]};
  });
  return newBlocks;
}

export function combineBlocks(piece, blocks) {
  let newBlocks = copyBlocks(blocks);
  piece.forEach(pieceBlock => {
    if (newBlocks[pieceBlock.x] === undefined) {
      newBlocks[pieceBlock.x] = {};
    }
    newBlocks[pieceBlock.x][pieceBlock.y] = pieceBlock.color;
  });
  return newBlocks;
}

export function isRowFull(blocks, rowIndex) {
  return blocks[rowIndex] && Object.keys(blocks[rowIndex]).length >= NUM_COLS;
}

export function getFullRows(blocks) {
  let rowIndices = {};
  Object.keys(blocks).forEach(rowIndex => {
    if (isRowFull(blocks, rowIndex)) {
      rowIndices[rowIndex] = true;
    }
  });
  return rowIndices;
}

export function clearFullRows(blocks, fullRowIndices) {
  let newBlocks = copyBlocks(blocks);

  Object.keys(fullRowIndices).forEach(rowIndex => {
    delete newBlocks[rowIndex];
  });

  let lastRowIndex = NUM_ROWS - 1;
  Object.keys(newBlocks)
    .reverse()
    .forEach(rowIndex => {
      if (lastRowIndex !== parseInt(rowIndex)) {
        newBlocks[lastRowIndex] = newBlocks[rowIndex];
        newBlocks[rowIndex] = {};
      }
      lastRowIndex--;
    });

  return newBlocks;
}

// There exists a row in the negative region.
export function isBlockOvershot(blocks) {
  return blocks[-1] ? true : false;
}
