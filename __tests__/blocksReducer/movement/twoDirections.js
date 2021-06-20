import {
  L_PIECE_1,
  T_PIECE,
  L_PIECE_2,
  S_PIECE,
  Z_PIECE_1,
  Z_PIECE_2,
  B_PIECE,
} from "../../../src/reducers/blocksReducer/pieces";
import {
  LEFT_KEYCODE,
  RIGHT_KEYCODE,
  DOWN_KEYCODE,
} from "../../../src/utils/constants";
import { testMove } from "../utils";

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
