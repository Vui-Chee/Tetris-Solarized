import { ROTATE, CLEAR_ROWS, SET_COMBINED } from "../actions/types";
import { playSound } from "../utils/playsound";

import quirkySound from "../sounds/quirky.mp3";
import chime2 from "../sounds/chime2.mp3";
import bumpSound from "../sounds/bump.mp3";

const playRotateSound = (state) => (next) => (action) => {
  if (action.type === ROTATE) {
    playSound(quirkySound, 500);
  }
  next(action);
};

const playLandPieceSound = (state) => (next) => (action) => {
  if (action.type === SET_COMBINED) {
    let [_, rowsToClear] = action.payload;
    if (rowsToClear) {
      playSound(chime2, 600);
    } else {
      playSound(bumpSound, 200);
    }
  }
  next(action);
};

export const soundMiddlewares = [playRotateSound, playLandPieceSound];
