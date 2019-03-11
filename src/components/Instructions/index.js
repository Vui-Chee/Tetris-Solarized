import React, {Component} from 'react';
import './instructionsStyles.css';
import {Link} from 'react-router-dom';

const InstructionBox = ({icon, text, customStyles}) => (
  <div className="instruction-box">
    <div className="key-box" style={customStyles}>
      {icon}
    </div>
    <p>{text}</p>
  </div>
);

const Instructions = props => (
  <div className="instructions">
    <h1>Instructions</h1>
    <InstructionBox
      icon={<i className="fas fa-arrow-left fa-lg arrow" />}
      text="move left"
    />
    <InstructionBox
      icon={<i className="fas fa-arrow-down fa-lg arrow" />}
      text="move down"
    />
    <InstructionBox
      icon={<i className="fas fa-arrow-right fa-lg arrow" />}
      text="move right"
    />
    <InstructionBox
      icon={<i className="fas fa-arrow-up fa-lg arrow" />}
      text="rotate piece"
    />
    <InstructionBox icon={<p>p</p>} text="pause game" />
    <InstructionBox
      icon={<p>space</p>}
      text="instant drop piece"
      customStyles={{width: '100px'}}
    />

    <Link className="return-link" to="/">
      Return
    </Link>
  </div>
);

export default Instructions;
