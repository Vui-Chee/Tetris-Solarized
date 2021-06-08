import "./gameDetailsStyles.css";

import PropTypes from "prop-types";
import React, { Component } from "react";

import { checkSettings, updateSettings } from "../../utils/database";
import { playMusic, stopMusic } from "../../utils/playsound";
import Block from "../BlockContainer/Block";

class GameDetails extends Component {
  state = {
    volumeOn: true,
    musicOn: true,
  };

  componentDidMount() {
    checkSettings(
      {
        volumeOn: true,
        musicOn: true,
      },
      (newFields) => {
        this.setState(newFields);
      }
    );
  }

  componentWillUnmount() {
    stopMusic();
  }

  toggleVolumeButton = () => {
    updateSettings(
      {
        volumeOn: true,
      },
      (newFields) => this.setState(newFields)
    );
  };

  toggleMusicButton = () => {
    updateSettings(
      {
        musicOn: true,
      },
      (newFields) => {
        if (newFields.musicOn) {
          playMusic();
        } else {
          stopMusic();
        }
        this.setState(newFields);
      }
    );
  };

  render() {
    const { score, level, piece, gameover, showExitMenu } = this.props;

    let nextPieceDom = <div className="next-piece" />;
    const { blocks } = piece;

    if (blocks.length > 0) {
      let closestY = blocks[0].y;
      blocks.forEach((block) => {
        closestY = block.y < closestY ? block.y : closestY;
      });

      nextPieceDom = blocks.map((block, index) => {
        return (
          <Block
            x={block.x + 12}
            y={block.y - closestY + 2}
            dim={20}
            color={block.color}
            fullRowFlag={false}
            report={() => {}}
            key={index}
            style={{
              position: "relative",
            }}
          />
        );
      });
    }

    return (
      <div className="game-details">
        <h2>
          Level <span>{level}</span>
        </h2>
        <h2>Score</h2>
        <b>
          <p> {score}</p>
        </b>
        <h2>Next Piece</h2>
        {nextPieceDom}
        <i
          className="fa fa-music music-icon fa-2x"
          aria-hidden="true"
          onClick={this.toggleMusicButton}
        >
          {this.state.musicOn ? null : <div className="music-icon-slash" />}
        </i>
        <i
          className={`fas ${
            this.state.volumeOn ? "fa-volume-up" : "fa-volume-mute"
          } fa-2x volume-icon`}
          onClick={this.toggleVolumeButton}
        />
        <button disabled={gameover} onClick={showExitMenu}>
          Exit
        </button>
      </div>
    );
  }
}

GameDetails.propTypes = {
  score: PropTypes.number.isRequired,
  level: PropTypes.number.isRequired,
  gameover: PropTypes.bool.isRequired,
  piece: PropTypes.object.isRequired,
  showExitMenu: PropTypes.func.isRequired,
};

export default GameDetails;
