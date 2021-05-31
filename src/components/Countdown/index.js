import React, { Component } from "react";
import "./countdownStyles.css";
import { checkSettings } from "../../utils/database";
import { playSound, playMusic } from "../../utils/playsound";
import quirkySound from "../../sounds/quirky.mp3";

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
        from: --this.state.from,
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

export default Countdown;
