import "@babel/polyfill";
import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import "./gameStyles.css";
import BlockContainer from "../BlockContainer";
import GameDetails from "../GameDetails";
import Countdown from "../Countdown";
import MessagePopup from "../MessagePopup";
import GameoverMenu from "../GameoverMenu";
import ExitMenu from "../ExitMenu";

import { clearRows, setIsCombined } from "../../actions/blockActions";

import {
  togglePlayMode,
  increaseScore,
  resetGame,
  levelUp,
} from "../../actions/gameActions";

import {
  genNewPiece,
  move,
  rotate,
  instantMove,
} from "../../actions/pieceActions";

import {
  getFullRows,
  isBlockOvershot,
} from "../../reducers/blocksReducer/blocks";

import {
  DOWN_KEYCODE,
  UP_KEYCODE,
  SPACE_KEYCODE,
  P_KEYCODE,
} from "../../utils/constants";

var keyPresses = {};
var timeStamps = {
  dropRateTimeStamp: null,
  movementTimeStamp: null,
};

// Initial game state creator.
const createGameState = () => ({
  isSpaceKeyDown: false,
  fullRowIndices: {},
  hasCompletedCountdown: false,
  gameover: false,
  showExitMenu: false,
});

class Game extends Component {
  state = createGameState();

  componentDidMount() {
    this.attachListeners();
    const { genNewPiece, isPlaying, togglePlayMode } = this.props;
    // begin the game immediately
    genNewPiece();
    if (!isPlaying) {
      togglePlayMode();
    }
    this.loop();
  }

  componentWillUnmount() {
    this.detachListeners();
  }

  async UNSAFE_componentWillReceiveProps(nextProps) {
    const { isPlaying, isCombined, blocks, togglePlayMode } = nextProps;
    const { hasCompletedCountdown, fullRowIndices } = this.state;
    const { score, levelUp } = this.props;

    if (isBlockOvershot(blocks)) {
      this.detachListeners();
      if (isPlaying) {
        await new Promise((resolve) => {
          this.setState({
            gameover: true,
          });
          resolve();
        });
        togglePlayMode();
      }
      // Nothing else should be performed once the game ends.
      return;
    }

    if (isPlaying) {
      if (nextProps.score > score) {
        levelUp(nextProps.score);
      }
      if (hasCompletedCountdown && isCombined) {
        this.clearFullRows(fullRowIndices, nextProps);
      }
    } else {
      this.setState({
        hasCompletedCountdown: false,
      });
    }
  }

  clearFullRows = (
    fullRowIndices,
    { blocks, genNewPiece, clearRows, increaseScore, setIsCombined }
  ) => {
    let rows = getFullRows(blocks);

    let fullRowsPresent =
      Object.keys(fullRowIndices).length === 0 && Object.keys(rows).length > 0;
    // There are rows to clear
    if (fullRowsPresent) {
      this.setState({
        fullRowIndices: rows,
      });

      // Allow time for animation to complete.
      setTimeout(() => {
        clearRows(rows);
        increaseScore(rows);
        genNewPiece();
        this.setState({
          fullRowIndices: {},
        });
      }, 300);
    } else {
      genNewPiece();
    }

    setIsCombined(false, fullRowsPresent);
  };

  updateTimeStamp = (whichTimeStamp, timestamp, intervalDuration, action) => {
    const { currentPiece } = this.props;

    if (currentPiece.blocks.length <= 0) return;

    if (!timeStamps[whichTimeStamp]) {
      timeStamps[whichTimeStamp] = timestamp;
    } else {
      let progress = timestamp - timeStamps[whichTimeStamp];
      if (progress >= intervalDuration) {
        action();
        timeStamps[whichTimeStamp] = timestamp;
      }
    }
  };

  hasGameStarted = () =>
    this.props.isPlaying && this.state.hasCompletedCountdown;

  loop = (timestamp) => {
    const { movementRate, dropRate, move } = this.props;
    // const {hasCompletedCountdown} = this.state;

    if (this.hasGameStarted()) {
      // if (isPlaying && hasCompletedCountdown) {
      // Fire action only when keys are pressed.
      if (Object.keys(keyPresses).length > 0) {
        this.updateTimeStamp(
          "movementTimeStamp",
          timestamp,
          movementRate,
          () => {
            move(keyPresses);
          }
        );
      }

      // Already pressing down, do not double move.
      if (!keyPresses[DOWN_KEYCODE]) {
        this.updateTimeStamp("dropRateTimeStamp", timestamp, dropRate, () => {
          move({
            40: true,
          });
        });
      }
    }
    window.requestAnimationFrame(this.loop);
  };

  dropPiece = (e) => {
    if (this.hasGameStarted() && e.keyCode === SPACE_KEYCODE) {
      if (!this.props.isSpaceKeyDown && e.type === "keydown") {
        this.props.instantMove();
        this.setState({
          isSpaceKeyDown: true,
        });
      } else if (e.type === "keyup") {
        this.setState({
          isSpaceKeyDown: false,
        });
      }
    }
  };

  rotatePiece = (e) => {
    if (this.hasGameStarted() && e.keyCode === UP_KEYCODE) {
      this.props.rotate();
    }
  };

  updateKeysPressed = (e) => {
    if (!this.props.isPlaying || this.props.isCombined) return;
    if (e.type === "keydown") {
      keyPresses[e.keyCode] = true;
    } else if (e.type === "keyup") {
      keyPresses = {};
    }
  };

  pauseGame = (e) => {
    if (this.state.gameover) return;
    if (
      e.keyCode === P_KEYCODE &&
      (!this.props.isPlaying || this.hasGameStarted()) &&
      e.type === "keydown"
    ) {
      this.props.togglePlayMode();
    }
  };

  restartGame = async () => {
    // Must update state first before firing action.
    this.attachListeners();
    // Resets component level game state.
    await new Promise((resolve) => {
      this.setState(createGameState());
      resolve();
    });
    const { resetGame, genNewPiece } = this.props;
    // Resets redux level game state.
    resetGame();
    genNewPiece();
  };

  displayExitMenu = async () => {
    const { isPlaying, togglePlayMode } = this.props;
    const { hasCompletedCountdown } = this.state;
    // Do not allow player to quit when counting down.
    if (isPlaying && !hasCompletedCountdown) return;
    // Pause the game when the exit menu displays.
    await new Promise((resolve) => {
      if (isPlaying) {
        togglePlayMode();
      }
      resolve();
    });
    this.setState({ showExitMenu: true });
  };

  handleStayInGameState = async () => {
    await new Promise((resolve) => {
      // starting playing.
      if (!this.props.isPlaying) this.props.togglePlayMode();
      resolve();
    });
    this.setState({ hasCompletedCountdown: false, showExitMenu: false });
  };

  attachListeners = () => {
    window.addEventListener("keydown", this.pauseGame, false);
    window.addEventListener("keyup", this.pauseGame, false);
    window.addEventListener("keydown", this.updateKeysPressed, false);
    window.addEventListener("keyup", this.updateKeysPressed, false);
    window.addEventListener("keydown", this.rotatePiece, false);
    window.addEventListener("keydown", this.dropPiece, false);
    window.addEventListener("keyup", this.dropPiece, false);
  };

  detachListeners = () => {
    window.removeEventListener("keydown", this.pauseGame);
    window.removeEventListener("keyup", this.pauseGame);
    window.removeEventListener("keydown", this.updateKeysPressed);
    window.removeEventListener("keyup", this.updateKeysPressed);
    window.removeEventListener("keydown", this.rotatePiece);
    window.removeEventListener("keydown", this.dropPiece);
    window.removeEventListener("keyup", this.dropPiece);
  };

  render() {
    const {
      currentPiece,
      blocks,
      score,
      level,
      nextPiece,
      isPlaying,
      resetGame,
    } = this.props;

    const { fullRowIndices, gameover, hasCompletedCountdown, showExitMenu } =
      this.state;

    return (
      <div className="game">
        <h1>Tetris Solarized</h1>
        <BlockContainer
          currentPiece={currentPiece}
          blocks={blocks}
          fullRowIndices={fullRowIndices}
        />
        <GameDetails
          score={score}
          level={level}
          piece={nextPiece}
          gameover={gameover}
          showExitMenu={this.displayExitMenu}
        />
        {gameover ? (
          <MessagePopup
            message="Game Over"
            customStyles={{ fontSize: "1.2rem", marginTop: "-200px" }}
          >
            <GameoverMenu
              level={level}
              score={score}
              restart={this.restartGame}
              reset={resetGame}
            />
          </MessagePopup>
        ) : showExitMenu ? (
          <MessagePopup
            message="Do you want to leave?"
            customStyles={{
              height: "200px",
              marginTop: "-110px",
            }}
          >
            <ExitMenu stay={this.handleStayInGameState} reset={resetGame} />
          </MessagePopup>
        ) : hasCompletedCountdown ? null : isPlaying ? (
          <Countdown
            reset={() => this.setState({ hasCompletedCountdown: true })}
          />
        ) : (
          <MessagePopup
            message="Game Paused"
            customStyles={{
              fontSize: "1.2rem",
              height: "150px",
              paddingTop: "50px",
              marginTop: "-100px",
            }}
          />
        )}
      </div>
    );
  }
}

Game.propTypes = {
  isPlaying: PropTypes.bool.isRequired,
  isSpaceKeyDown: PropTypes.bool.isRequired,
  isCombined: PropTypes.bool.isRequired,

  movementRate: PropTypes.number.isRequired,
  dropRate: PropTypes.number.isRequired,
  score: PropTypes.number.isRequired,
  level: PropTypes.number.isRequired,

  currentPiece: PropTypes.object.isRequired,
  nextPiece: PropTypes.object.isRequired,
  blocks: PropTypes.object.isRequired,

  togglePlayMode: PropTypes.func.isRequired,
  genNewPiece: PropTypes.func.isRequired,
  move: PropTypes.func.isRequired,
  rotate: PropTypes.func.isRequired,
  instantMove: PropTypes.func.isRequired,
  clearRows: PropTypes.func.isRequired,
  increaseScore: PropTypes.func.isRequired,
  resetGame: PropTypes.func.isRequired,
  levelUp: PropTypes.func.isRequired,
  setIsCombined: PropTypes.func.isRequired,
};

Game.defaultProps = {
  isSpaceKeyDown: false,
};

const mapStateToProps = (state) => ({
  isPlaying: state.gameState.isPlaying,
  movementRate: state.gameState.movementRate,
  dropRate: state.gameState.dropRate,
  score: state.gameState.score,
  level: state.gameState.level,
  currentPiece: state.blocksState.currentPiece,
  nextPiece: state.blocksState.nextPiece,
  blocks: state.blocksState.blocks,
  isCombined: state.blocksState.isCombined,
});

export default connect(mapStateToProps, {
  togglePlayMode,
  genNewPiece,
  move,
  rotate,
  instantMove,
  clearRows,
  increaseScore,
  resetGame,
  levelUp,
  setIsCombined,
})(Game);
