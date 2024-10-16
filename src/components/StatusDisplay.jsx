// src/components/StatusDisplay.jsx
import React from "react";
import PropTypes from "prop-types";
import styled, { keyframes } from "styled-components";
import { boxShadow, flexCenter } from "@/styles/mixins";

// 깜박이는 애니메이션
const blink = keyframes`
  0%, 100% { border-color: red; }
  50% { border-color: transparent; }
`;

// 이미지 컨테이너 스타일
const ImageWrapper = styled.div`
  ${boxShadow}
  ${flexCenter}
  width: 100px;
  height: 100px;
  margin: 10px;
  border: 5px solid transparent;
  animation: ${({ $danger }) => ($danger ? blink : "none")} 1s infinite;
`;

// 방향 블록 스타일
const DirectionBlock = styled.div`
  flex: 1;
  height: 100px;
  margin: 5px;
  background-color: ${({ $active }) => ($active ? "#4caf50" : "#d3d3d3")};
  ${flexCenter}
`;

const StatusDisplay = ({ status }) => {
  const { direction, battery, collision, pressure } = status;

  return (
    <div>
      <div style={{ display: "flex" }}>
        <DirectionBlock $active={direction?.left}>
          <h3>Left</h3>
        </DirectionBlock>
        <DirectionBlock $active={direction?.right}>
          <h3>Right</h3>
        </DirectionBlock>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          marginTop: "20px",
        }}
      >
        <ImageWrapper $danger={collision?.risk}>
          <img
            src="/imgs/collision.png"
            alt="Collision"
            style={{ width: "80%" }}
          />
        </ImageWrapper>

        <ImageWrapper $danger={battery?.status === "low"}>
          <img src="/imgs/battery.png" alt="Battery" style={{ width: "80%" }} />
        </ImageWrapper>

        <ImageWrapper $danger={pressure?.status === "low"}>
          <img
            src="/imgs/tirePressure.png"
            alt="Tire Pressure"
            style={{ width: "80%" }}
          />
        </ImageWrapper>
      </div>
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
  }).isRequired,
};

export default StatusDisplay;
