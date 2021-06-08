import "./gameoverMenuStyles.css";

import PropTypes from "prop-types";
import React, { Component } from "react";
import { withRouter } from "react-router-dom";

import gameoverSound from "../../sounds/gameover.mp3";
import {
  checkSettings,
  insertScore,
  withinHighScores,
} from "../../utils/database";
import { playSound, stopMusic } from "../../utils/playsound";

class GameoverMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      playerName: "",
      userCanInputScore: false,
      fieldTooShort: false,
      fieldTooLong: false,
      nameAlreadyExists: false,
    };
  }

  componentDidMount() {
    checkSettings(
      {
        volumeOn: true,
      },
      (newFields) => {
        if (newFields.volumeOn) {
          playSound(gameoverSound, 4000);
        }
        stopMusic();
      }
    );

    withinHighScores(this.props.score, (docs, score, numHiScores) => {
      this.setState({
        userCanInputScore: docs.length < numHiScores || score > docs[0].score,
      });
    });
  }

  handleChange = (e) => {
    this.setState({
      nameAlreadyExists: false,
      playerName: e.target.value,
      fieldTooShort: e.target.value.length < 6,
      fieldTooLong: e.target.value.length > 15,
    });
  };

  handleExit = async () => {
    const { level, score, reset, history } = this.props;
    const { userCanInputScore, playerName } = this.state;

    if (
      userCanInputScore &&
      (playerName.length < 6 || playerName.length > 15)
    ) {
      this.setState({
        fieldTooShort: playerName.length < 6,
        fieldTooLong: playerName.length > 15,
      });
      return;
    }

    if (userCanInputScore) {
      let [err] = await insertScore(playerName, level, score);
      this.setState({ nameAlreadyExists: err ? true : false });
      if (err) return;
    }

    await new Promise((resolve) => {
      reset(); // Resets redux state.
      resolve();
    });

    history.push("/");
  };

  render() {
    const { level, score, restart } = this.props;
    const {
      userCanInputScore,
      fieldTooShort,
      fieldTooLong,
      nameAlreadyExists,
    } = this.state;

    return (
      <div className="gameover-menu">
        <h2>Level {level}</h2>
        <h2>Final Score</h2>
        <h1>{score}</h1>
        {userCanInputScore ? (
          <React.Fragment>
            {fieldTooShort || fieldTooLong || nameAlreadyExists ? (
              <label id="gameover-warning">
                {nameAlreadyExists
                  ? "Name already taken, try another."
                  : fieldTooShort
                  ? "Name must be at least 6 characters long."
                  : "Name must be at most 15 characters long."}
              </label>
            ) : (
              <label>High score! Score will be saved when you exit.</label>
            )}
            <input
              type="text"
              placeholder="enter your name"
              onChange={this.handleChange}
            />
          </React.Fragment>
        ) : null}
        <button onClick={this.handleExit}>Exit</button>
        <button onClick={restart}>Retry</button>
      </div>
    );
  }
}

GameoverMenu.propTypes = {
  level: PropTypes.number.isRequired,
  score: PropTypes.number.isRequired,
  reset: PropTypes.func.isRequired,
  restart: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
};

export default withRouter(GameoverMenu);
