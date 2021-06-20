import {
  isOutOfBounds,
  isMoveValid,
} from "../../src/reducers/blocksReducer/movement.js";
import { NUM_COLS, NUM_ROWS } from "../../src/utils/constants";

describe("isOutOfBounds", () => {
  it("should return false for coordinates within the box", () => {
    // corners
    expect(isOutOfBounds(0, 0)).toBe(false);
    expect(isOutOfBounds(NUM_ROWS - 1, 0)).toBe(false);
    expect(isOutOfBounds(0, NUM_COLS - 1)).toBe(false);
    expect(isOutOfBounds(NUM_ROWS - 1, NUM_COLS - 1)).toBe(false);
    // edges
    expect(isOutOfBounds(NUM_ROWS - 1, 4)).toBe(false);
    expect(isOutOfBounds(5, NUM_COLS - 1)).toBe(false);
    // neither edges/corners
    expect(isOutOfBounds(1, 1)).toBe(false);
    expect(isOutOfBounds(10, 5)).toBe(false);
  });

  it("should return false for coordinates above the box", () => {
    // NOTE: x can be negative (piece can be above the box)
    expect(isOutOfBounds(-3, 5)).toBe(false);
    expect(isOutOfBounds(-2, 5)).toBe(false);
    expect(isOutOfBounds(-1, 5)).toBe(false);
  });

  it("should return true for coordinates outside the box", () => {
    // Beyond left/right walls of the box
    expect(isOutOfBounds(0, NUM_COLS)).toBe(true);
    expect(isOutOfBounds(0, -1)).toBe(true);
    // Beneath the floor of box
    expect(isOutOfBounds(NUM_ROWS, 0)).toBe(true);
  });
});

describe("isMoveValid", () => {
  // Z_PIECE_2
  const blocks = {
    [NUM_ROWS - 2]: { 3: 1, 4: 1 },
    [NUM_ROWS - 1]: { 4: 1, 5: 1 },
  };

  it("should return false for coordinates within blocks", () => {
    expect(isMoveValid(NUM_ROWS - 2, 3, blocks)).toBe(false);
    expect(isMoveValid(NUM_ROWS - 2, 4, blocks)).toBe(false);
    expect(isMoveValid(NUM_ROWS - 1, 4, blocks)).toBe(false);
    expect(isMoveValid(NUM_ROWS - 1, 5, blocks)).toBe(false);
  });

  it("should return true for coordinates outside blocks", () => {
    // Above piece
    expect(isMoveValid(15, 3, blocks)).toBe(true);
    expect(isMoveValid(15, 4, blocks)).toBe(true);
    // On the sides of piece
    expect(isMoveValid(NUM_ROWS - 2, 2, blocks)).toBe(true);
    expect(isMoveValid(NUM_ROWS - 2, 5, blocks)).toBe(true);
    expect(isMoveValid(NUM_ROWS - 1, 3, blocks)).toBe(true);
    expect(isMoveValid(NUM_ROWS - 1, 6, blocks)).toBe(true);
  });

  it("should return false for coordinates outside the box", () => {
    expect(isOutOfBounds(0, NUM_COLS)).toBe(true);
    expect(isMoveValid(NUM_ROWS, 0, blocks)).toBe(false);
    expect(isOutOfBounds(0, -1)).toBe(true);
  });
});
