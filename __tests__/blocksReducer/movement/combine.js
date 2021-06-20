import { L_PIECE_1 } from "../../../src/reducers/blocksReducer/pieces";
import {
  LEFT_KEYCODE,
  RIGHT_KEYCODE,
  DOWN_KEYCODE,
} from "../../../src/utils/constants";
import { createState, moveCurrentPiece } from "../utils";

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
