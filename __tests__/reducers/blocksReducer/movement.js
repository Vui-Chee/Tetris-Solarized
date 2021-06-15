import { isOutOfBounds } from "../../../src/reducers/blocksReducer/movement.js";

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
