import {CLEAR_ROWS, SET_COMBINED} from './types';

export const clearRows = rowIndices => dispatch => {
  dispatch({
    type: CLEAR_ROWS,
    payload: rowIndices,
  });
};

export const setIsCombined = (flag, rowsToClear) => dispatch => {
  dispatch({
    type: SET_COMBINED,
    payload: [flag, rowsToClear],
  });
};
