import "./countdownStyles.css";

import PropTypes from "prop-types";
import React, { Component } from "react";

import quirkySound from "../../sounds/quirky.mp3";
import { checkSettings } from "../../utils/database";
import { playSound, playMusic } from "../../utils/playsound";

class Countdown extends Component {
  constructor(props) {
    super(props);
    this.state = {
      from: 3,
      reset: props.reset, // From Game parent.
    };
  }

  componentDidMount() {
    let timerId = setInterval(() => {
      checkSettings(
        {
          volumeOn: true,
        },
        (newFields) => {
          if (newFields.volumeOn) {
            playSound(quirkySound, 500);
          }
        }
      );
      this.setState({
        from: this.state.from - 1,
      });
      if (this.state.from <= 0) {
        checkSettings(
          {
            musicOn: true,
          },
          (newFields) => {
            if (newFields.musicOn) {
              playMusic();
            }
          }
        );
        clearInterval(timerId);
        this.state.reset();
      }
    }, 600);
  }

  render() {
    return <div className="countdown">{this.state.from}</div>;
  }
}

Countdown.propTypes = {
  reset: PropTypes.func.isRequired,
};

export default Countdown;
