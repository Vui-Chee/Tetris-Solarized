import { checkSettings } from "../utils/database";
import music from "../sounds/tetris_background.mp3";

let backgroundMusic = new Audio(music);

// TODO fetch database settings for sound effects.
export function playSound(file, timeToPause) {
  checkSettings(
    {
      volumeOn: true,
      volumeLevel: 1,
    },
    (newFields) => {
      if (!newFields.volumeOn) return;
      let sound = new Audio(file);
      sound.volume = newFields.volumeLevel;
      sound.play();
      setTimeout(() => sound.pause(), timeToPause);
    }
  );
}

export function playMusic() {
  checkSettings(
    {
      musicLevel: 1,
    },
    (newFields) => {
      backgroundMusic.loop = true;
      backgroundMusic.volume = newFields.musicLevel;
      backgroundMusic.play();
    }
  );
}

export function stopMusic() {
  backgroundMusic.pause();
  backgroundMusic.currentTime = 0;
}
