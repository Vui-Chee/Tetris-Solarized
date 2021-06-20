import { L_PIECE_1 } from "../../../src/reducers/blocksReducer/pieces";
import { LEFT_KEYCODE, RIGHT_KEYCODE } from "../../../src/utils/constants";
import { createState, moveCurrentPiece } from "../utils";

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
