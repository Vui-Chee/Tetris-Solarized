import blocksReducer from "../../src/reducers/blocksReducer";
import { JUST_MOVE, NEW_PIECE, ROTATE } from "../../src/actions/types";
import {
  L_PIECE_1,
  T_PIECE,
  L_PIECE_2,
  S_PIECE,
  Z_PIECE_1,
  Z_PIECE_2,
  B_PIECE,
} from "../../src/reducers/blocksReducer/pieces";
import {
  LEFT_KEYCODE,
  RIGHT_KEYCODE,
  DOWN_KEYCODE,
} from "../../src/utils/constants";
import { createState, testMove, moveCurrentPiece } from "./utils";

const pieces = [
  L_PIECE_1,
  T_PIECE,
  L_PIECE_2,
  S_PIECE,
  Z_PIECE_1,
  Z_PIECE_2,
  B_PIECE,
];

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

  describe("Can move piece left,right,down (no combine blocks)", () => {
    it("L_PIECE_1", () => {
      testMove(
        L_PIECE_1,
        [LEFT_KEYCODE],
        [
          { x: -1, y: 2, color: 0, type: 0 },
          { x: -1, y: 3, color: 0, type: 1 },
          { x: -2, y: 3, color: 0, type: 2 },
          { x: -3, y: 3, color: 0, type: 1 },
        ]
      );
      testMove(
        L_PIECE_1,
        [RIGHT_KEYCODE],
        [
          { x: -1, y: 4, color: 0, type: 0 },
          { x: -1, y: 5, color: 0, type: 1 },
          { x: -2, y: 5, color: 0, type: 2 },
          { x: -3, y: 5, color: 0, type: 1 },
        ]
      );
      testMove(
        L_PIECE_1,
        [DOWN_KEYCODE],
        [
          { x: 0, y: 3, color: 0, type: 0 },
          { x: 0, y: 4, color: 0, type: 1 },
          { x: -1, y: 4, color: 0, type: 2 },
          { x: -2, y: 4, color: 0, type: 1 },
        ]
      );
    });

    it("L_PIECE_2", () => {
      testMove(
        L_PIECE_2,
        [LEFT_KEYCODE],
        [
          { x: -1, y: 4, color: 3, type: 0 },
          { x: -1, y: 3, color: 3, type: 1 },
          { x: -2, y: 3, color: 3, type: 2 },
          { x: -3, y: 3, color: 3, type: 1 },
        ]
      );
      testMove(
        L_PIECE_2,
        [RIGHT_KEYCODE],
        [
          { x: -1, y: 6, color: 3, type: 0 },
          { x: -1, y: 5, color: 3, type: 1 },
          { x: -2, y: 5, color: 3, type: 2 },
          { x: -3, y: 5, color: 3, type: 1 },
        ]
      );
      testMove(
        L_PIECE_2,
        [DOWN_KEYCODE],
        [
          { x: 0, y: 5, color: 3, type: 0 },
          { x: 0, y: 4, color: 3, type: 1 },
          { x: -1, y: 4, color: 3, type: 2 },
          { x: -2, y: 4, color: 3, type: 1 },
        ]
      );
    });

    it("S_PIECE", () => {
      testMove(
        S_PIECE,
        [LEFT_KEYCODE],
        [
          { x: -1, y: 2, color: 5, type: 1 },
          { x: -1, y: 3, color: 5, type: 1 },
          { x: -1, y: 4, color: 5, type: 2 },
          { x: -1, y: 5, color: 5, type: 1 },
        ]
      );
      testMove(
        S_PIECE,
        [RIGHT_KEYCODE],
        [
          { x: -1, y: 4, color: 5, type: 1 },
          { x: -1, y: 5, color: 5, type: 1 },
          { x: -1, y: 6, color: 5, type: 2 },
          { x: -1, y: 7, color: 5, type: 1 },
        ]
      );
      testMove(
        S_PIECE,
        [DOWN_KEYCODE],
        [
          { x: 0, y: 3, color: 5, type: 1 },
          { x: 0, y: 4, color: 5, type: 1 },
          { x: 0, y: 5, color: 5, type: 2 },
          { x: 0, y: 6, color: 5, type: 1 },
        ]
      );
    });

    it("B_PIECE", () => {
      testMove(
        B_PIECE,
        [LEFT_KEYCODE],
        [
          { x: -1, y: 3, color: 6, type: 1 },
          { x: -1, y: 4, color: 6, type: 1 },
          { x: -2, y: 3, color: 6, type: 2 },
          { x: -2, y: 4, color: 6, type: 1 },
        ]
      );
      testMove(
        B_PIECE,
        [RIGHT_KEYCODE],
        [
          { x: -1, y: 5, color: 6, type: 1 },
          { x: -1, y: 6, color: 6, type: 1 },
          { x: -2, y: 5, color: 6, type: 2 },
          { x: -2, y: 6, color: 6, type: 1 },
        ]
      );
      testMove(
        B_PIECE,
        [DOWN_KEYCODE],
        [
          { x: 0, y: 4, color: 6, type: 1 },
          { x: 0, y: 5, color: 6, type: 1 },
          { x: -1, y: 4, color: 6, type: 2 },
          { x: -1, y: 5, color: 6, type: 1 },
        ]
      );
    });

    it("T_PIECE", () => {
      testMove(
        T_PIECE,
        [LEFT_KEYCODE],
        [
          { x: -2, y: 2, color: 4, type: 1 },
          { x: -1, y: 3, color: 4, type: 1 },
          { x: -2, y: 3, color: 4, type: 2 },
          { x: -2, y: 4, color: 4, type: 1 },
        ]
      );
      testMove(
        T_PIECE,
        [RIGHT_KEYCODE],
        [
          { x: -2, y: 4, color: 4, type: 1 },
          { x: -1, y: 5, color: 4, type: 1 },
          { x: -2, y: 5, color: 4, type: 2 },
          { x: -2, y: 6, color: 4, type: 1 },
        ]
      );
      testMove(
        T_PIECE,
        [DOWN_KEYCODE],
        [
          { x: -1, y: 3, color: 4, type: 1 },
          { x: 0, y: 4, color: 4, type: 1 },
          { x: -1, y: 4, color: 4, type: 2 },
          { x: -1, y: 5, color: 4, type: 1 },
        ]
      );
    });

    it("Z_PIECE_1", () => {
      testMove(
        Z_PIECE_1,
        [LEFT_KEYCODE],
        [
          { x: -2, y: 2, color: 1, type: 0 },
          { x: -2, y: 3, color: 1, type: 1 },
          { x: -1, y: 3, color: 1, type: 2 },
          { x: -1, y: 4, color: 1, type: 1 },
        ]
      );
      testMove(
        Z_PIECE_1,
        [RIGHT_KEYCODE],
        [
          { x: -2, y: 4, color: 1, type: 0 },
          { x: -2, y: 5, color: 1, type: 1 },
          { x: -1, y: 5, color: 1, type: 2 },
          { x: -1, y: 6, color: 1, type: 1 },
        ]
      );
      testMove(
        Z_PIECE_1,
        [DOWN_KEYCODE],
        [
          { x: -1, y: 3, color: 1, type: 0 },
          { x: -1, y: 4, color: 1, type: 1 },
          { x: 0, y: 4, color: 1, type: 2 },
          { x: 0, y: 5, color: 1, type: 1 },
        ]
      );
    });

    it("Z_PIECE_2", () => {
      testMove(
        Z_PIECE_2,
        [LEFT_KEYCODE],
        [
          { x: -1, y: 2, color: 2, type: 0 },
          { x: -1, y: 3, color: 2, type: 1 },
          { x: -2, y: 3, color: 2, type: 2 },
          { x: -2, y: 4, color: 2, type: 1 },
        ]
      );
      testMove(
        Z_PIECE_2,
        [RIGHT_KEYCODE],
        [
          { x: -1, y: 4, color: 2, type: 0 },
          { x: -1, y: 5, color: 2, type: 1 },
          { x: -2, y: 5, color: 2, type: 2 },
          { x: -2, y: 6, color: 2, type: 1 },
        ]
      );
      testMove(
        Z_PIECE_2,
        [DOWN_KEYCODE],
        [
          { x: 0, y: 3, color: 2, type: 0 },
          { x: 0, y: 4, color: 2, type: 1 },
          { x: -1, y: 4, color: 2, type: 2 },
          { x: -1, y: 5, color: 2, type: 1 },
        ]
      );
    });
  });

  describe("Can move piece in 2 directions (left/right, down)", () => {
    it("L_PIECE_1", () => {
      testMove(
        L_PIECE_1,
        [LEFT_KEYCODE, DOWN_KEYCODE],
        [
          { x: 0, y: 2, color: 0, type: 0 },
          { x: 0, y: 3, color: 0, type: 1 },
          { x: -1, y: 3, color: 0, type: 2 },
          { x: -2, y: 3, color: 0, type: 1 },
        ]
      );
      testMove(
        L_PIECE_1,
        [RIGHT_KEYCODE, DOWN_KEYCODE],
        [
          { x: 0, y: 4, color: 0, type: 0 },
          { x: 0, y: 5, color: 0, type: 1 },
          { x: -1, y: 5, color: 0, type: 2 },
          { x: -2, y: 5, color: 0, type: 1 },
        ]
      );
    });

    it("L_PIECE_2", () => {
      testMove(
        L_PIECE_2,
        [LEFT_KEYCODE, DOWN_KEYCODE],
        [
          { x: 0, y: 4, color: 3, type: 0 },
          { x: 0, y: 3, color: 3, type: 1 },
          { x: -1, y: 3, color: 3, type: 2 },
          { x: -2, y: 3, color: 3, type: 1 },
        ]
      );
      testMove(
        L_PIECE_2,
        [RIGHT_KEYCODE, DOWN_KEYCODE],
        [
          { x: 0, y: 6, color: 3, type: 0 },
          { x: 0, y: 5, color: 3, type: 1 },
          { x: -1, y: 5, color: 3, type: 2 },
          { x: -2, y: 5, color: 3, type: 1 },
        ]
      );
    });

    it("Z_PIECE_1", () => {
      testMove(
        Z_PIECE_1,
        [LEFT_KEYCODE, DOWN_KEYCODE],
        [
          { x: -1, y: 2, color: 1, type: 0 },
          { x: -1, y: 3, color: 1, type: 1 },
          { x: 0, y: 3, color: 1, type: 2 },
          { x: 0, y: 4, color: 1, type: 1 },
        ]
      );
      testMove(
        Z_PIECE_1,
        [RIGHT_KEYCODE, DOWN_KEYCODE],
        [
          { x: -1, y: 4, color: 1, type: 0 },
          { x: -1, y: 5, color: 1, type: 1 },
          { x: 0, y: 5, color: 1, type: 2 },
          { x: 0, y: 6, color: 1, type: 1 },
        ]
      );
    });

    it("Z_PIECE_2", () => {
      testMove(
        Z_PIECE_2,
        [LEFT_KEYCODE, DOWN_KEYCODE],
        [
          { x: 0, y: 2, color: 2, type: 0 },
          { x: 0, y: 3, color: 2, type: 1 },
          { x: -1, y: 3, color: 2, type: 2 },
          { x: -1, y: 4, color: 2, type: 1 },
        ]
      );
      testMove(
        Z_PIECE_2,
        [RIGHT_KEYCODE, DOWN_KEYCODE],
        [
          { x: 0, y: 4, color: 2, type: 0 },
          { x: 0, y: 5, color: 2, type: 1 },
          { x: -1, y: 5, color: 2, type: 2 },
          { x: -1, y: 6, color: 2, type: 1 },
        ]
      );
    });

    it("S_PIECE", () => {
      testMove(
        S_PIECE,
        [LEFT_KEYCODE, DOWN_KEYCODE],
        [
          { x: 0, y: 2, color: 5, type: 1 },
          { x: 0, y: 3, color: 5, type: 1 },
          { x: 0, y: 4, color: 5, type: 2 },
          { x: 0, y: 5, color: 5, type: 1 },
        ]
      );
      testMove(
        S_PIECE,
        [RIGHT_KEYCODE, DOWN_KEYCODE],
        [
          { x: 0, y: 4, color: 5, type: 1 },
          { x: 0, y: 5, color: 5, type: 1 },
          { x: 0, y: 6, color: 5, type: 2 },
          { x: 0, y: 7, color: 5, type: 1 },
        ]
      );
    });

    it("B_PIECE", () => {
      testMove(
        B_PIECE,
        [LEFT_KEYCODE, DOWN_KEYCODE],
        [
          { x: 0, y: 3, color: 6, type: 1 },
          { x: 0, y: 4, color: 6, type: 1 },
          { x: -1, y: 3, color: 6, type: 2 },
          { x: -1, y: 4, color: 6, type: 1 },
        ]
      );
      testMove(
        B_PIECE,
        [RIGHT_KEYCODE, DOWN_KEYCODE],
        [
          { x: 0, y: 5, color: 6, type: 1 },
          { x: 0, y: 6, color: 6, type: 1 },
          { x: -1, y: 5, color: 6, type: 2 },
          { x: -1, y: 6, color: 6, type: 1 },
        ]
      );
    });

    it("T_PIECE", () => {
      testMove(
        T_PIECE,
        [LEFT_KEYCODE, DOWN_KEYCODE],
        [
          { x: -1, y: 2, color: 4, type: 1 },
          { x: 0, y: 3, color: 4, type: 1 },
          { x: -1, y: 3, color: 4, type: 2 },
          { x: -1, y: 4, color: 4, type: 1 },
        ]
      );
      testMove(
        T_PIECE,
        [RIGHT_KEYCODE, DOWN_KEYCODE],
        [
          { x: -1, y: 4, color: 4, type: 1 },
          { x: 0, y: 5, color: 4, type: 1 },
          { x: -1, y: 5, color: 4, type: 2 },
          { x: -1, y: 6, color: 4, type: 1 },
        ]
      );
    });
  });

  describe("Can move piece and combine with floor", () => {
    it("L_PIECE_1", () => {
      let state = createState(L_PIECE_1);
      // Must bring L piece closer to landed blocks
      state = moveCurrentPiece(state, [DOWN_KEYCODE], 19);
      // Current piece is removed when combined with floor
      expect(state.currentPiece).toEqual({ blocks: [] });
      expect(state.blocks).toEqual({
        15: { 4: 0 },
        16: { 4: 0 },
        17: { 3: 0, 4: 0 },
      });
    });
  });

  describe("Can move piece and combine with landed blocks", () => {
    // Landed L_PIECE_1
    const landedBlocks = {
      15: { 4: 0 },
      16: { 4: 0 },
      17: { 3: 0, 4: 0 },
    };
    // Ignore
    const nextPiece = { blocks: [] };

    it("L_PIECE_1 single direction", () => {
      let state = createState(L_PIECE_1, nextPiece, landedBlocks);
      // Must bring L piece closer to landed blocks
      state = moveCurrentPiece(state, [DOWN_KEYCODE], 16);
      // Current piece is removed when combined with landed blocks
      expect(state.currentPiece).toEqual({ blocks: [] });
      expect(state.blocks).toEqual({
        12: { 4: 0 },
        13: { 4: 0 },
        14: { 3: 0, 4: 0 },
        15: { 4: 0 },
        16: { 4: 0 },
        17: { 3: 0, 4: 0 },
      });
    });

    it("L_PIECE_1 two directions", () => {
      let state = createState(L_PIECE_1, nextPiece, landedBlocks);
      state = moveCurrentPiece(state, [LEFT_KEYCODE], 2);
      state = moveCurrentPiece(state, [DOWN_KEYCODE], 16);
      // Now move in 2 directions
      state = moveCurrentPiece(state, [RIGHT_KEYCODE, DOWN_KEYCODE], 2);
      expect(state.currentPiece).toEqual({ blocks: [] });
      expect(state.blocks).toEqual({
        14: { 3: 0 },
        15: { 3: 0, 4: 0 },
        16: { 2: 0, 3: 0, 4: 0 },
        17: { 3: 0, 4: 0 },
      });
    });
  });

  describe("Cannot move into walls", () => {
    it("L_PIECE_1", () => {
      let state = createState(L_PIECE_1);
      state = moveCurrentPiece(state, [LEFT_KEYCODE], 10);
      // Cannot move into left wall
      expect(state.currentPiece.blocks).toEqual([
        { x: -1, y: 0, color: 0, type: 0 },
        { x: -1, y: 1, color: 0, type: 1 },
        { x: -2, y: 1, color: 0, type: 2 },
        { x: -3, y: 1, color: 0, type: 1 },
      ]);
      state = moveCurrentPiece(state, [RIGHT_KEYCODE], 10);
      // Cannot move into right wall
      expect(state.currentPiece.blocks).toEqual([
        { x: -1, y: 8, color: 0, type: 0 },
        { x: -1, y: 9, color: 0, type: 1 },
        { x: -2, y: 9, color: 0, type: 2 },
        { x: -3, y: 9, color: 0, type: 1 },
      ]);
    });
  });
});
