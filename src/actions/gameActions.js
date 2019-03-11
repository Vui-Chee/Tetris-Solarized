import {TOGGLE_PLAY, INCR_SCORE, LEVEL_UP, RESET} from './types';

export const togglePlayMode = () => dispatch => {
  dispatch({
    type: TOGGLE_PLAY,
  });
};

export const increaseScore = rows => dispatch => {
  dispatch({
    type: INCR_SCORE,
    payload: rows,
  });
};

export const levelUp = score => dispatch => {
  dispatch({
    type: LEVEL_UP,
    payload: score,
  });
};

export const resetGame = () => dispatch => {
  dispatch({
    type: RESET,
  });
};
