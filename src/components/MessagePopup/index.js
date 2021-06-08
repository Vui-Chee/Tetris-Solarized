import "./messagePopupStyles.css";

import PropTypes from "prop-types";
import React from "react";

const MessagePopup = ({ message, customStyles, children }) => (
  <div className="message-popup" style={customStyles}>
    <h1>{message}</h1>
    {children}
  </div>
);

MessagePopup.propTypes = {
  message: PropTypes.string.isRequired,
  customStyles: PropTypes.object.isRequired,
  children: PropTypes.node,
};

export default MessagePopup;
