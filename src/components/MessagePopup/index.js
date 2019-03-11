import React, {Component} from 'react';
import './messagePopupStyles.css';

const MessagePopup = ({message, customStyles, children}) => (
  <div className="message-popup" style={customStyles}>
    <h1>{message}</h1>
    {children}
  </div>
);

export default MessagePopup;
