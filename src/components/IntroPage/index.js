import "./introPageStyles.css";

import PropTypes from "prop-types";
import React, { Component } from "react";
import { Link } from "react-router-dom";

import headerImage from "../../images/tetris-header.png";
import clickSound from "../../sounds/click.mp3";
import { checkSettings } from "../../utils/database";
import { playSound } from "../../utils/playsound";

const ListItemLink = ({ to, name }) => (
  <li
    onMouseOver={() => {
      checkSettings(
        {
          volumeOn: true,
        },
        (newFields) => {
          if (newFields.volumeOn) {
            playSound(clickSound, 100);
          }
        }
      );
    }}
  >
    <Link to={to} className="intro-page-link">
      {name}
    </Link>
  </li>
);

ListItemLink.propTypes = {
  to: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

class IntroPage extends Component {
  render() {
    return (
      <div className="intro-page">
        <ul>
          <img src={headerImage} alt="" height="200" width="450" />
          <ListItemLink to="/game" name="Start" />
          <ListItemLink to="/hiscores" name="High Scores" />
          <ListItemLink to="/instructions" name="Instructions" />
        </ul>
      </div>
    );
  }
}

export default IntroPage;
