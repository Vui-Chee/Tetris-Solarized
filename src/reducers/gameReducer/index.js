import { TOGGLE_PLAY, INCR_SCORE, LEVEL_UP, RESET } from "../../actions/types";
import { NUM_COLS } from "../../utils/constants";

const standardMovementRate = 80;

const initialState = {
  isPlaying: false,
  movementRate: standardMovementRate,
  dropRate: 800,
  score: 0,
  level: 1,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case TOGGLE_PLAY:
      return {
        ...state,
        isPlaying: !state.isPlaying,
      };
    case INCR_SCORE:
      let numRowsRemoved = Object.keys(action.payload).length;
      let numBlocksRemoved = numRowsRemoved * NUM_COLS;
      let scoreToAdd = numBlocksRemoved * 10;
      return {
        ...state,
        score: state.score + scoreToAdd,
      };
    case LEVEL_UP:
      let newLevel =
        action.payload - state.level * 1000 >= 0
          ? Math.min(state.level + 1, 10)
          : state.level;
      let newDropRate = state.dropRate;
      if (newLevel !== state.level && state.dropRate >= 180) {
        newDropRate -= 75;
      }
      return {
        ...state,
        level: newLevel,
        dropRate: newDropRate,
      };
    case RESET:
      console.log("game reducer reset");
      return {
        ...initialState,
        isPlaying: true,
      };
    default:
      return state;
  }
}
