import React from "react";
import PropTypes from "prop-types";

const StatusDisplay = ({ status }) => {
  const { direction, battery, collision, pressure } = status || {};

  return (
    <div>
      <h3>Direction</h3>
      <p>Left: {direction?.left ? "Yes" : "No"}</p>
      <p>Right: {direction?.right ? "Yes" : "No"}</p>

      <h3>Battery</h3>
      <p>Battery Level: {battery?.level || "N/A"}%</p>
      <p>Status: {battery?.status || "N/A"}</p>

      <h3>Collision Detection</h3>
      <p>Risk: {collision?.risk ? "Yes" : "No"}</p>

      <h3>Tire Pressure</h3>
      <p>Pressure: {pressure?.pressure || "N/A"} PSI</p>
      <p>Status: {pressure?.status || "N/A"}</p>
    </div>
  );
};

StatusDisplay.propTypes = {
  status: PropTypes.shape({
    direction: PropTypes.shape({
      left: PropTypes.bool,
      right: PropTypes.bool,
    }),
    battery: PropTypes.shape({
      level: PropTypes.number,
      status: PropTypes.string,
    }),
    collision: PropTypes.shape({
      risk: PropTypes.bool,
    }),
    pressure: PropTypes.shape({
      pressure: PropTypes.number,
      status: PropTypes.string,
    }),
  }),
};

export default StatusDisplay;
