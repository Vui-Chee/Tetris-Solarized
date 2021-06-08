import {
  NEW_PIECE,
  JUST_MOVE,
  ROTATE,
  INSTANT_MOVE,
  CLEAR_ROWS,
  RESET,
  SET_COMBINED,
} from "../../actions/types";

import { movePiece, instantLand } from "./movement";
import { rotatePiece, createPiece } from "./pieces";
import { clearFullRows } from "./blocks";

const initialState = {
  currentPiece: {
    blocks: [],
  },
  nextPiece: {
    blocks: [],
  },
  blocks: {},
  isCombined: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case NEW_PIECE: {
      const pieces = createPiece(state.currentPiece, state.nextPiece);
      return {
        ...state,
        isCombined: false,
        currentPiece: pieces.currentPiece,
        nextPiece: pieces.nextPiece,
      };
    }
    case ROTATE: {
      return {
        ...state,
        currentPiece: rotatePiece(state.currentPiece, state.blocks),
      };
    }
    case JUST_MOVE: {
      let [newPiece, newBlocks, isCombined] = movePiece(state, action.payload);
      return {
        ...state,
        currentPiece: newPiece,
        blocks: newBlocks,
        isCombined: isCombined,
      };
    }
    case INSTANT_MOVE: {
      return {
        ...state,
        currentPiece: {
          blocks: [],
        },
        blocks: instantLand(state),
        isCombined: true,
      };
    }
    case CLEAR_ROWS: {
      return {
        ...state,
        blocks: clearFullRows(state.blocks, action.payload),
      };
    }
    case RESET: {
      return initialState;
    }
    case SET_COMBINED: {
      let [flag] = action.payload;
      return {
        ...state,
        isCombined: flag,
      };
    }
    default:
      return state;
  }
}
