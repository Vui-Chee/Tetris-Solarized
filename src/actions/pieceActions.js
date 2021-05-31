import { NEW_PIECE, JUST_MOVE, ROTATE, INSTANT_MOVE } from "./types";

export const genNewPiece = () => (dispatch) => {
  dispatch({
    type: NEW_PIECE,
  });
};

export const move = (directions) => (dispatch) => {
  dispatch({
    type: JUST_MOVE,
    payload: directions,
  });
};

export const rotate = () => (dispatch) => {
  dispatch({
    type: ROTATE,
  });
};

export const instantMove = () => (dispatch) => {
  dispatch({
    type: INSTANT_MOVE,
  });
};
