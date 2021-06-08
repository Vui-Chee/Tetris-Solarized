import { ROTATE, SET_COMBINED } from "../actions/types";
import { playSound } from "../utils/playsound";

import quirkySound from "../sounds/quirky.mp3";
import chime2 from "../sounds/chime2.mp3";
import bumpSound from "../sounds/bump.mp3";

const playRotateSound = () => (next) => (action) => {
  if (action.type === ROTATE) {
    playSound(quirkySound, 500);
  }
  next(action);
};

const playLandPieceSound = () => (next) => (action) => {
  if (action.type === SET_COMBINED) {
    let rowsToClear = action.payload[1];
    if (rowsToClear) {
      playSound(chime2, 600);
    } else {
      playSound(bumpSound, 200);
    }
  }
  next(action);
};

export const soundMiddlewares = [playRotateSound, playLandPieceSound];
