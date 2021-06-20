import blocksReducer, {
  initialState as blocksReducerState,
} from "../../src/reducers/blocksReducer";
import { JUST_MOVE, ROTATE } from "../../src/actions/types";

export function createState(
  c = {
    blocks: [],
  },
  n = {
    blocks: [],
  },
  b = {},
  i = false
) {
  let newBlocks = {};
  Object.keys(b).forEach((key) => {
    newBlocks[key] = { ...b[key] };
  });

  return {
    ...blocksReducerState,
    currentPiece: {
      ...c,
      blocks: c.blocks.map((block) => ({ ...block })),
    },
    nextPiece: {
      ...n,
      blocks: n.blocks.map((block) => ({ ...block })),
    },
    blocks: newBlocks,
    isCombined: i,
  };
}

export function moveCurrentPiece(state, directions, numMoves = 1) {
  const payload = {};
  directions.forEach((direction) => {
    payload[direction] = true;
  });
  for (let i = 0; i < numMoves; i++) {
    state = blocksReducer(state, { type: JUST_MOVE, payload });
  }
  return state;
}

export function rotateCurrentPiece(state, numRotations) {
  for (let i = 0; i < numRotations; i++) {
    state = blocksReducer(state, { type: ROTATE });
  }
  return state;
}

export function testMove(piece, directions, expectedPieceBlocks, numMoves = 1) {
  let state = createState(piece);
  const initialOrientation = state.currentPiece.orientation;
  const initialType = state.currentPiece.type;
  state = moveCurrentPiece(state, directions, numMoves);
  expect(state.currentPiece.blocks).toEqual(expectedPieceBlocks);
  expect(state.currentPiece.orientation).toBe(initialOrientation);
  expect(state.currentPiece.type).toBe(initialType);
  expect(state.blocks).toEqual({});
}
