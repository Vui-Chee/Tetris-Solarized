import blocksReducer from "../../../src/reducers/blocksReducer";
import { NEW_PIECE } from "../../../src/actions/types";
import {
  L_PIECE_1,
  T_PIECE,
  L_PIECE_2,
  S_PIECE,
  Z_PIECE_1,
  Z_PIECE_2,
  B_PIECE,
} from "../../../src/reducers/blocksReducer/pieces";

const pieces = [
  L_PIECE_1,
  T_PIECE,
  L_PIECE_2,
  S_PIECE,
  Z_PIECE_1,
  Z_PIECE_2,
  B_PIECE,
];

function createState(c = [], n = [], b = {}, i = false) {
  return {
    currentPiece: {
      blocks: c,
    },
    nextPiece: {
      blocks: n,
    },
    blocks: b,
    isCombined: i,
  };
}

describe("blocks reducer", () => {
  it("can create new piece from initial state", () => {
    const state = createState();
    const newState = blocksReducer(state, { type: NEW_PIECE });
    expect(newState.isCombined).toBe(false);
    expect(newState.blocks).toStrictEqual({});
    // The new piece created must match one of the pieces.
    const foundCurrentPiece = pieces.findIndex(
      (piece) => piece.type === newState.currentPiece.type
    );
    expect(foundCurrentPiece).not.toBe(-1);
    const foundNextPiece = pieces.findIndex(
      (piece) => piece.type === newState.nextPiece.type
    );
    expect(foundNextPiece).not.toBe(-1);
  });
});
