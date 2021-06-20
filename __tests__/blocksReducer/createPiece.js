import blocksReducer from "../../src/reducers/blocksReducer";
import { NEW_PIECE } from "../../src/actions/types";
import {
  L_PIECE_1,
  T_PIECE,
  L_PIECE_2,
  S_PIECE,
  Z_PIECE_1,
  Z_PIECE_2,
  B_PIECE,
} from "../../src/reducers/blocksReducer/pieces";
import { createState } from "./utils";

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
  const state = createState();
  const newState = blocksReducer(state, { type: NEW_PIECE });

  it("should create valid current piece", () => {
    // The new piece created must match one of the pieces.
    const index = pieces.findIndex(
      (piece) => piece.type === newState.currentPiece.type
    );
    expect(index).not.toBe(-1);
    expect(newState.currentPiece).toEqual(pieces[index]);
  });

  it("should create valid next piece", () => {
    // The new piece created must match one of the pieces.
    const index = pieces.findIndex(
      (piece) => piece.type === newState.nextPiece.type
    );
    expect(index).not.toBe(-1);
    expect(newState.nextPiece).toEqual(pieces[index]);
  });
});
