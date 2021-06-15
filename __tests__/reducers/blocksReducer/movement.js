import {
  isOutOfBounds,
  isMoveValid,
} from "../../../src/reducers/blocksReducer/movement.js";

describe("isOutOfBounds", () => {
  it("coordinates within dimensions", () => {
    expect(isOutOfBounds(0, 0)).toBe(false);
    expect(isOutOfBounds(17, 0)).toBe(false);
    expect(isOutOfBounds(0, 9)).toBe(false);
    expect(isOutOfBounds(17, 9)).toBe(false);
    expect(isOutOfBounds(17, 4)).toBe(false);
    expect(isOutOfBounds(5, 9)).toBe(false);
  });

  it("coordinates outside dimensions", () => {
    // Beyond width of box
    expect(isOutOfBounds(0, 10)).toBe(true);
    // Beyond height of box
    expect(isOutOfBounds(18, 0)).toBe(true);
    // NOTE: x can be negative (piece can be above the box)
    expect(isOutOfBounds(0, -1)).toBe(true);
  });
});

describe("isMoveValid", () => {
  // Z_PIECE_2
  const blocks = {
    16: { 3: 1, 4: 1 },
    17: { 4: 1, 5: 1 },
  };

  it("Cannot move over piece", () => {
    expect(isMoveValid(16, 3, blocks)).toBe(false);
    expect(isMoveValid(16, 4, blocks)).toBe(false);
    expect(isMoveValid(17, 4, blocks)).toBe(false);
    expect(isMoveValid(17, 5, blocks)).toBe(false);
  });

  it("Can move to places outside piece", () => {
    // Above piece
    expect(isMoveValid(15, 3, blocks)).toBe(true);
    expect(isMoveValid(15, 4, blocks)).toBe(true);
    // On the sides of piece
    expect(isMoveValid(16, 2, blocks)).toBe(true);
    expect(isMoveValid(16, 5, blocks)).toBe(true);
    expect(isMoveValid(17, 3, blocks)).toBe(true);
    expect(isMoveValid(17, 6, blocks)).toBe(true);
  });

  it("Cannot move outside dimensions", () => {
    expect(isOutOfBounds(0, 10)).toBe(true);
    expect(isMoveValid(18, 0, blocks)).toBe(false);
    expect(isOutOfBounds(0, -1)).toBe(true);
  });
});
