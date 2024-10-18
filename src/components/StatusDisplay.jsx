import React, { useEffect } from "react";
import PropTypes from "prop-types";
import styled, { keyframes } from "styled-components";
import { flexCenter } from "@/styles/mixins";

// 깜박이는 애니메이션
const blink = keyframes`
  0%, 100% { border-color: red; }
  50% { border-color: transparent; }
`;

// 이미지 컨테이너 스타일
const ImageWrapper = styled.div`
  ${flexCenter}
  width: 100px;
  height: 100px;
  margin: 10px;
  border: 5px solid transparent;
  animation: ${({ $danger }) => ($danger ? blink : "none")} 1s infinite;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }

  @media (min-width: 1024px) {
    width: 120px;
    height: 120px;

    img {
      width: 100%;
      height: 100%;
    }
  }
`;

// 3:4 비율을 유지하는 방향 블록 스타일
const DirectionBlock = styled.div`
  flex: 1;
  width: calc(100vw * 0.3);
  height: calc(100vw * 0.4);
  margin: 2em;
  background-color: ${({ $active }) => ($active ? "#a3a3a3" : "#d3d3d3")};
  ${flexCenter}
  font-size: 1rem;

  @media (min-width: 1024px) {
    width: calc(100vw * 0.2);
    height: calc(100vw * 0.2667);
    font-size: 1.5rem;
  }
`;

// 컨테이너 스타일
const DirectionContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;

  @media (min-width: 768px) {
    flex-direction: row;
  }
`;

// 상태 컨테이너 스타일
const StatusContainer = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 20px;

  @media (min-width: 1024px) {
    margin-top: 40px;
  }
`;

const StatusDisplay = ({ status }) => {
  const { direction, battery, collision, pressure } = status;

  // 상태 값 로그 확인
  useEffect(() => {
    console.log("Battery status:", battery);
    console.log("Pressure status:", pressure);
  }, [battery, pressure]);

  return (
    <div>
      <DirectionContainer>
        <DirectionBlock $active={direction?.left}>
          <h3>Left</h3>
        </DirectionBlock>
        <DirectionBlock $active={direction?.right}>
          <h3>Right</h3>
        </DirectionBlock>
      </DirectionContainer>

      <StatusContainer>
        <ImageWrapper $danger={collision?.risk}>
          <img src="/imgs/collision.png" alt="Collision" />
        </ImageWrapper>

        <ImageWrapper $danger={battery?.insufficient}>
          <img src="/imgs/battery.png" alt="Battery" />
        </ImageWrapper>

        <ImageWrapper $danger={pressure?.insufficient}>
          <img src="/imgs/tirePressure.png" alt="Tire Pressure" />
        </ImageWrapper>
      </StatusContainer>
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
      insufficient: PropTypes.bool,
    }),
    collision: PropTypes.shape({
      risk: PropTypes.bool,
    }),
    pressure: PropTypes.shape({
      insufficient: PropTypes.bool,
    }),
  }).isRequired,
};

export default StatusDisplay;
