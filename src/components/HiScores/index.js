import React, { Component } from "react";
import { gameDb } from "../../utils/database";
import { Link } from "react-router-dom";
import "./hiscoresStyles.css";

class HiScores extends Component {
  state = {
    scores: [],
  };

  componentDidMount() {
    gameDb.scores.find({}, (_err, docs) => {
      docs.sort((a, b) => {
        if (a.score === b.score) {
          // Earlier person who gets that score is rank higher.
          return a.timeStamp - b.timeStamp;
        }
        return b.score - a.score;
      });
      this.setState({
        scores: docs,
      });
    });
  }

  render() {
    const { scores } = this.state;

    let scoreRows = scores.map((score, index) => (
      <tr key={index}>
        <td>{score.name}</td>
        <td>{score.level}</td>
        <td>{score.score}</td>
      </tr>
    ));

    if (scores.length < 10) {
      for (let i = 0; i < 10 - scores.length; i++) {
        scoreRows.push(
          <tr key={i + scores.length}>
            <td>---</td>
            <td>---</td>
            <td>---</td>
          </tr>
        );
      }
    }

    return (
      <div className="hiscores">
        <h1>High Scores</h1>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Level</th>
              <th>Score</th>
            </tr>
          </thead>
          <tbody>{scoreRows}</tbody>
        </table>
        <Link className="return-link" to="/">
          Return
        </Link>
      </div>
    );
  }
}

export default HiScores;
