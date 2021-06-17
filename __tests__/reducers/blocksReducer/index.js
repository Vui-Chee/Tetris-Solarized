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
  let newBlocks = {};
  Object.keys(b).forEach((key) => {
    newBlocks[key] = { ...b[key] };
  });

  return {
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

  describe("Can rotate each piece", () => {
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

  describe("Cannot rotate into certain orientations when next to wall", () => {
    it("L_PIECE_1 cannot rotate when touching left wall in upside down orientation", () => {
      let state = createState(L_PIECE_1);
      state = blocksReducer(state, { type: ROTATE });
      state = blocksReducer(state, { type: ROTATE });
      expect(state.currentPiece.orientation).toBe(2);
      let minY = Math.min(...state.currentPiece.blocks.map((block) => block.y));
      // Touching left wall in upside position, cannot rotate.
      state.currentPiece.blocks.forEach((block) => {
        block.y -= minY;
      });
      state = blocksReducer(state, { type: ROTATE });
      expect(state.currentPiece.orientation).toBe(2);
      // Move 1 block away, should be able to move.
      state.currentPiece.blocks.forEach((block) => {
        block.y += 1;
      });
      state = blocksReducer(state, { type: ROTATE });
      expect(state.currentPiece.orientation).toBe(3);
    });

    it("L_PIECE_1 cannot rotate when touching right wall in upright orientation", () => {
      let state = createState(L_PIECE_1);
      // Ensure L piece is upside down
      expect(state.currentPiece.orientation).toBe(0);
      let maxY = Math.max(...state.currentPiece.blocks.map((block) => block.y));
      // Flush L piece touching right wall, cannot rotate.
      state.currentPiece.blocks.forEach((block) => {
        block.y += NUM_COLS - maxY - 1;
      });
      state = blocksReducer(state, { type: ROTATE });
      expect(state.currentPiece.orientation).toBe(0);
      // Move one block away from right wall, should be able to rotate.
      state.currentPiece.blocks.forEach((block) => {
        block.y -= 1;
      });
      state = blocksReducer(state, { type: ROTATE });
      expect(state.currentPiece.orientation).toBe(1);
    });

    it("L_PIECE_2 cannot rotate when touching left wall in upright orientation", () => {
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

    it("L_PIECE_2 cannot rotate when touching right wall in upside down orientation", () => {
      let state = createState(L_PIECE_2);
      state = blocksReducer(state, { type: ROTATE });
      state = blocksReducer(state, { type: ROTATE });
      // Ensure L piece is upside down
      expect(state.currentPiece.orientation).toBe(2);
      let maxY = Math.max(...state.currentPiece.blocks.map((block) => block.y));
      // Flush L piece against wall
      state.currentPiece.blocks.forEach((block) => {
        block.y += NUM_COLS - maxY - 1;
      });
      state = blocksReducer(state, { type: ROTATE });
      expect(state.currentPiece.orientation).toBe(2);
      // Move one block away from right wall, should be able to rotate.
      state.currentPiece.blocks.forEach((block) => {
        block.y -= 1;
      });
      state = blocksReducer(state, { type: ROTATE });
      expect(state.currentPiece.orientation).toBe(3);
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

    it("T_PIECE cannot rotate when flat side is touching wall", () => {
      let state = createState(T_PIECE);
      // Make T piece upright
      state = blocksReducer(state, { type: ROTATE });
      state = blocksReducer(state, { type: ROTATE });
      state = blocksReducer(state, { type: ROTATE });
      expect(state.currentPiece.orientation).toBe(3);

      // T piece touching left wall with flat side
      let minY = Math.min(...state.currentPiece.blocks.map((block) => block.y));
      state.currentPiece.blocks.forEach((block) => {
        block.y -= minY;
      });
      state = blocksReducer(state, { type: ROTATE });
      expect(state.currentPiece.orientation).toBe(3);

      // Not so close, so should be able to rotate
      state.currentPiece.blocks.forEach((block) => {
        block.y += 1;
      });
      state = blocksReducer(state, { type: ROTATE });
      expect(state.currentPiece.orientation).toBe(0);

      // Now for placing T piece flat side touching right wall
      state = blocksReducer(state, { type: ROTATE });
      expect(state.currentPiece.orientation).toBe(1);
      let maxY = Math.max(...state.currentPiece.blocks.map((block) => block.y));
      state.currentPiece.blocks.forEach((block) => {
        block.y += NUM_COLS - maxY - 1;
      });
      state = blocksReducer(state, { type: ROTATE });
      expect(state.currentPiece.orientation).toBe(1);

      // Not so close, so should be able to rotate
      state.currentPiece.blocks.forEach((block) => {
        block.y -= 1;
      });
      state = blocksReducer(state, { type: ROTATE });
      expect(state.currentPiece.orientation).toBe(2);
    });

    it("Z_PIECE_1 cannot rotate against left wall in upright orientation", () => {
      let state = createState(Z_PIECE_1);
      // Make Z piece 1 upright
      state = blocksReducer(state, { type: ROTATE });
      expect(state.currentPiece.orientation).toBe(1);

      // Z piece 1 touching left wall with flat side
      let minY = Math.min(...state.currentPiece.blocks.map((block) => block.y));
      state.currentPiece.blocks.forEach((block) => {
        block.y -= minY;
      });
      state = blocksReducer(state, { type: ROTATE });
      expect(state.currentPiece.orientation).toBe(1);

      // Not so close, so should be able to rotate
      state.currentPiece.blocks.forEach((block) => {
        block.y += 1;
      });
      state = blocksReducer(state, { type: ROTATE });
      expect(state.currentPiece.orientation).toBe(0);
    });

    it("Z_PIECE_2 cannot rotate against right wall in upright orientation", () => {
      let state = createState(Z_PIECE_2);
      // Make Z piece 2 upright
      state = blocksReducer(state, { type: ROTATE });
      expect(state.currentPiece.orientation).toBe(1);

      // Z piece 2 touching right wall with flat side
      let maxY = Math.max(...state.currentPiece.blocks.map((block) => block.y));
      state.currentPiece.blocks.forEach((block) => {
        block.y += NUM_COLS - maxY - 1;
      });
      state = blocksReducer(state, { type: ROTATE });
      expect(state.currentPiece.orientation).toBe(1);

      // Not so close, so should be able to rotate
      state.currentPiece.blocks.forEach((block) => {
        block.y -= 1;
      });
      state = blocksReducer(state, { type: ROTATE });
      expect(state.currentPiece.orientation).toBe(0);
    });
  });

  describe("Each piece retains shape after rotation", () => {
    it("S_PIECE", () => {
      let state = createState(S_PIECE);
      // Rotate into orientation 1
      state = blocksReducer(state, { type: ROTATE });
      expect(state.currentPiece.orientation).toBe(1);
      const expectedY = state.currentPiece.blocks[0].y;
      expect(
        state.currentPiece.blocks.every((blk) => blk.y === expectedY)
      ).toBe(true);

      // Rotate back into orientation 0
      state = blocksReducer(state, { type: ROTATE });
      expect(state.currentPiece.orientation).toBe(0);
      const expectedX = state.currentPiece.blocks[0].x;
      expect(
        state.currentPiece.blocks.every((blk) => blk.x === expectedX)
      ).toBe(true);
    });

    it("T_PIECE", () => {
      let state = createState(T_PIECE);
      // First rotation
      state = blocksReducer(state, { type: ROTATE });
      expect(state.currentPiece.orientation).toBe(1);
      expect(state.currentPiece.blocks).toEqual([
        { x: -3, y: 4, color: 4, type: 1 },
        { x: -2, y: 3, color: 4, type: 1 },
        { x: -2, y: 4, color: 4, type: 2 },
        { x: -1, y: 4, color: 4, type: 1 },
      ]);

      // Second rotation
      state = blocksReducer(state, { type: ROTATE });
      expect(state.currentPiece.orientation).toBe(2);
      expect(state.currentPiece.blocks).toEqual([
        { x: -2, y: 5, color: 4, type: 1 },
        { x: -3, y: 4, color: 4, type: 1 },
        { x: -2, y: 4, color: 4, type: 2 },
        { x: -2, y: 3, color: 4, type: 1 },
      ]);

      // Third rotation
      state = blocksReducer(state, { type: ROTATE });
      expect(state.currentPiece.orientation).toBe(3);
      expect(state.currentPiece.blocks).toEqual([
        { x: -1, y: 4, color: 4, type: 1 },
        { x: -2, y: 5, color: 4, type: 1 },
        { x: -2, y: 4, color: 4, type: 2 },
        { x: -3, y: 4, color: 4, type: 1 },
      ]);

      // Last rotation back into initial orientation
      state = blocksReducer(state, { type: ROTATE });
      expect(state.currentPiece.orientation).toBe(0);
      expect(state.currentPiece.blocks).toEqual([
        { x: -2, y: 3, color: 4, type: 1 },
        { x: -1, y: 4, color: 4, type: 1 },
        { x: -2, y: 4, color: 4, type: 2 },
        { x: -2, y: 5, color: 4, type: 1 },
      ]);
    });

    it("L_PIECE_1", () => {
      let state = createState(L_PIECE_1);

      state = blocksReducer(state, { type: ROTATE });
      expect(state.currentPiece.orientation).toBe(1);
      expect(state.currentPiece.blocks).toEqual([
        { x: -3, y: 3, color: 0, type: 0 },
        { x: -2, y: 3, color: 0, type: 1 },
        { x: -2, y: 4, color: 0, type: 2 },
        { x: -2, y: 5, color: 0, type: 1 },
      ]);

      state = blocksReducer(state, { type: ROTATE });
      expect(state.currentPiece.orientation).toBe(2);
      expect(state.currentPiece.blocks).toEqual([
        { x: -3, y: 5, color: 0, type: 0 },
        { x: -3, y: 4, color: 0, type: 1 },
        { x: -2, y: 4, color: 0, type: 2 },
        { x: -1, y: 4, color: 0, type: 1 },
      ]);

      state = blocksReducer(state, { type: ROTATE });
      expect(state.currentPiece.orientation).toBe(3);
      expect(state.currentPiece.blocks).toEqual([
        { x: -1, y: 5, color: 0, type: 0 },
        { x: -2, y: 5, color: 0, type: 1 },
        { x: -2, y: 4, color: 0, type: 2 },
        { x: -2, y: 3, color: 0, type: 1 },
      ]);

      state = blocksReducer(state, { type: ROTATE });
      expect(state.currentPiece.orientation).toBe(0);
      expect(state.currentPiece.blocks).toEqual([
        { x: -1, y: 3, color: 0, type: 0 },
        { x: -1, y: 4, color: 0, type: 1 },
        { x: -2, y: 4, color: 0, type: 2 },
        { x: -3, y: 4, color: 0, type: 1 },
      ]);
    });
  });
});
