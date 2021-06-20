import {
  isOutOfBounds,
  isMoveValid,
} from "../../src/reducers/blocksReducer/movement.js";
import { NUM_COLS, NUM_ROWS } from "../../src/utils/constants";

describe("isOutOfBounds", () => {
  it("coordinates within dimensions", () => {
    expect(isOutOfBounds(0, 0)).toBe(false);
    expect(isOutOfBounds(NUM_ROWS - 1, 0)).toBe(false);
    expect(isOutOfBounds(0, NUM_COLS - 1)).toBe(false);
    expect(isOutOfBounds(NUM_ROWS - 1, NUM_COLS - 1)).toBe(false);
    expect(isOutOfBounds(NUM_ROWS - 1, 4)).toBe(false);
    expect(isOutOfBounds(5, NUM_COLS - 1)).toBe(false);
  });

  it("coordinates outside dimensions", () => {
    // Beyond width of box
    expect(isOutOfBounds(0, NUM_COLS)).toBe(true);
    // Beyond height of box
    expect(isOutOfBounds(NUM_ROWS, 0)).toBe(true);
    // NOTE: x can be negative (piece can be above the box)
    expect(isOutOfBounds(0, -1)).toBe(true);
  });
});

describe("isMoveValid", () => {
  // Z_PIECE_2
  const blocks = {
    [NUM_ROWS - 2]: { 3: 1, 4: 1 },
    [NUM_ROWS - 1]: { 4: 1, 5: 1 },
  };

  it("Cannot move over piece", () => {
    expect(isMoveValid(NUM_ROWS - 2, 3, blocks)).toBe(false);
    expect(isMoveValid(NUM_ROWS - 2, 4, blocks)).toBe(false);
    expect(isMoveValid(NUM_ROWS - 1, 4, blocks)).toBe(false);
    expect(isMoveValid(NUM_ROWS - 1, 5, blocks)).toBe(false);
  });

  it("Can move to places outside piece", () => {
    // Above piece
    expect(isMoveValid(15, 3, blocks)).toBe(true);
    expect(isMoveValid(15, 4, blocks)).toBe(true);
    // On the sides of piece
    expect(isMoveValid(NUM_ROWS - 2, 2, blocks)).toBe(true);
    expect(isMoveValid(NUM_ROWS - 2, 5, blocks)).toBe(true);
    expect(isMoveValid(NUM_ROWS - 1, 3, blocks)).toBe(true);
    expect(isMoveValid(NUM_ROWS - 1, 6, blocks)).toBe(true);
  });

  it("Cannot move outside dimensions", () => {
    expect(isOutOfBounds(0, NUM_COLS)).toBe(true);
    expect(isMoveValid(NUM_ROWS, 0, blocks)).toBe(false);
    expect(isOutOfBounds(0, -1)).toBe(true);
  });
});
