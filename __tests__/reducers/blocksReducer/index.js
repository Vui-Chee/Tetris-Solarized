import blocksReducer from "../../../src/reducers/blocksReducer";
import { NEW_PIECE, ROTATE } from "../../../src/actions/types";
import {
  L_PIECE_1,
  T_PIECE,
  L_PIECE_2,
  S_PIECE,
  Z_PIECE_1,
  Z_PIECE_2,
  B_PIECE,
} from "../../../src/reducers/blocksReducer/pieces";
import { NUM_COLS } from "../../../src/utils/constants";

const pieces = [
  L_PIECE_1,
  T_PIECE,
  L_PIECE_2,
  S_PIECE,
  Z_PIECE_1,
  Z_PIECE_2,
  B_PIECE,
];

function createState(
  c = {
    blocks: [],
  },
  n = {
    blocks: [],
  },
  b = {},
  i = false
) {
  return {
    currentPiece: c,
    nextPiece: n,
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

  describe("can rotate each piece", () => {
    it("L_PIECE_1 can rotate all orientations", () => {
      const state = createState(L_PIECE_1);
      expect(state.currentPiece.orientation).toBe(0);
      let newState = blocksReducer(state, { type: ROTATE });
      expect(newState.currentPiece.orientation).toBe(1);
      newState = blocksReducer(newState, { type: ROTATE });
      expect(newState.currentPiece.orientation).toBe(2);
      newState = blocksReducer(newState, { type: ROTATE });
      expect(newState.currentPiece.orientation).toBe(3);
      newState = blocksReducer(newState, { type: ROTATE });
      expect(newState.currentPiece.orientation).toBe(0);
    });

    it("L_PIECE_2 can rotate all orientations", () => {
      const state = createState(L_PIECE_2);
      expect(state.currentPiece.orientation).toBe(0);
      let newState = blocksReducer(state, { type: ROTATE });
      expect(newState.currentPiece.orientation).toBe(1);
      newState = blocksReducer(newState, { type: ROTATE });
      expect(newState.currentPiece.orientation).toBe(2);
      newState = blocksReducer(newState, { type: ROTATE });
      expect(newState.currentPiece.orientation).toBe(3);
      newState = blocksReducer(newState, { type: ROTATE });
      expect(newState.currentPiece.orientation).toBe(0);
    });

    it("T_PIECE can rotate all orientations", () => {
      const state = createState(T_PIECE);
      expect(state.currentPiece.orientation).toBe(0);
      let newState = blocksReducer(state, { type: ROTATE });
      expect(newState.currentPiece.orientation).toBe(1);
      newState = blocksReducer(newState, { type: ROTATE });
      expect(newState.currentPiece.orientation).toBe(2);
      newState = blocksReducer(newState, { type: ROTATE });
      expect(newState.currentPiece.orientation).toBe(3);
      newState = blocksReducer(newState, { type: ROTATE });
      expect(newState.currentPiece.orientation).toBe(0);
    });

    it("S_PIECE can rotate only in 2 orientations", () => {
      const state = createState(S_PIECE);
      expect(state.currentPiece.orientation).toBe(0);
      let newState = blocksReducer(state, { type: ROTATE });
      expect(newState.currentPiece.orientation).toBe(1);
      newState = blocksReducer(newState, { type: ROTATE });
      expect(newState.currentPiece.orientation).toBe(0);
    });

    it("Z_PIECE_1 can rotate only in 2 orientations", () => {
      const state = createState(Z_PIECE_1);
      expect(state.currentPiece.orientation).toBe(0);
      let newState = blocksReducer(state, { type: ROTATE });
      expect(newState.currentPiece.orientation).toBe(1);
      newState = blocksReducer(newState, { type: ROTATE });
      expect(newState.currentPiece.orientation).toBe(0);
    });

    it("Z_PIECE_2 can rotate only in 2 orientations", () => {
      const state = createState(Z_PIECE_2);
      expect(state.currentPiece.orientation).toBe(0);
      let newState = blocksReducer(state, { type: ROTATE });
      expect(newState.currentPiece.orientation).toBe(1);
      newState = blocksReducer(newState, { type: ROTATE });
      expect(newState.currentPiece.orientation).toBe(0);
    });

    it("B_PIECE cannot rotate", () => {
      const state = createState(B_PIECE);
      expect(state.currentPiece.orientation).toBe(0);
      let newState = blocksReducer(state, { type: ROTATE });
      expect(newState.currentPiece.orientation).toBe(0);
    });
  });

  describe("cannot rotate into certain orientations when next to wall", () => {
    it("L_PIECE_2 cannot rotate when flushed left to the wall", () => {
      let state = createState(L_PIECE_2);
      // Ensure L piece is standing upright
      expect(state.currentPiece.orientation).toBe(0);
      let minY = Math.min(...state.currentPiece.blocks.map((block) => block.y));
      // Flush L piece against wall
      state.currentPiece.blocks.forEach((block) => {
        block.y -= minY;
      });
      const newState = blocksReducer(state, { type: ROTATE });
      expect(newState.currentPiece.orientation).toBe(0);
    });

    it("S_PIECE cannot rotate when too close to left wall in upright orientation", () => {
      let state = createState(S_PIECE);
      // Make S piece upright
      state = blocksReducer(state, { type: ROTATE });
      expect(state.currentPiece.orientation).toBe(1);
      // S piece 1 block away from touching left wall
      state.currentPiece.blocks.forEach((block) => {
        block.y = 1;
      });
      state = blocksReducer(state, { type: ROTATE });
      expect(state.currentPiece.orientation).toBe(1);
      // Now make S piece touch left wall
      state.currentPiece.blocks.forEach((block) => {
        block.y = 0;
      });
      state = blocksReducer(state, { type: ROTATE });
      expect(state.currentPiece.orientation).toBe(1);
      // Not so close, so should be able to rotate
      state.currentPiece.blocks.forEach((block) => {
        block.y = 2;
      });
      state = blocksReducer(state, { type: ROTATE });
      expect(state.currentPiece.orientation).toBe(0);
    });

    it("S_PIECE cannot rotate when touching right wall in upright orientation", () => {
      let state = createState(S_PIECE);
      // Make S piece upright
      state = blocksReducer(state, { type: ROTATE });
      expect(state.currentPiece.orientation).toBe(1);
      // S piece 1 block away from touching left wall
      state.currentPiece.blocks.forEach((block) => {
        block.y = NUM_COLS - 1;
      });
      state = blocksReducer(state, { type: ROTATE });
      expect(state.currentPiece.orientation).toBe(1);
      // Not so close, so should be able to rotate
      state.currentPiece.blocks.forEach((block) => {
        block.y = NUM_COLS - 2;
      });
      state = blocksReducer(state, { type: ROTATE });
      expect(state.currentPiece.orientation).toBe(0);
    });
  });
});
