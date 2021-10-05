import React from "react";
import PropTypes from "prop-types";

const Card = ({ title, children, lov }) => {
  return lov ? (
    children
  ) : (
    <div className="card shadow">
      {title && <div className="card-header">{title}</div>}
      <div className="card-body">{children}</div>
    </div>
  );
};
Card.propTypes = {
  title: PropTypes.string.isRequired
};
export default Card;
