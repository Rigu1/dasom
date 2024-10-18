// src/components/SSEData.jsx
import { useEffect, useRef } from "react";
import PropTypes from "prop-types";

// 서버의 기본 URL 설정
const BASE_URL = "https://tory-lola-huitae-05796dff.koyeb.app";

// 각 이벤트 타입별 SSE 경로 정의
const ENDPOINTS = {
  direction: `${BASE_URL}/direction/sse`,
  battery: `${BASE_URL}/battery/sse`,
  collision: `${BASE_URL}/collision/sse`,
  pressure: `${BASE_URL}/pressure/sse`,
};

const SSEData = ({ setStatusData }) => {
  const eventSourceRef = useRef({}); // 여러 이벤트 소스 참조 관리

  // SSE 구독 설정
  const initializeSSEConnection = (eventType) => {
    console.log(`${eventType} 구독 시작...`);

    const eventSource = new EventSource(ENDPOINTS[eventType]);

    // 기본 메시지 수신 처리
    eventSource.onmessage = (event) => {
      try {
        const parsedMessage = JSON.parse(event.data);
        console.log(`${eventType} 기본 메시지 수신:`, parsedMessage);

        // 상태 업데이트
        setStatusData((prevState) => ({
          ...prevState,
          [eventType]: parsedMessage.data,
        }));
      } catch (error) {
        console.error(`${eventType} 데이터 파싱 오류:`, error);
      }
    };

    // 특정 이벤트 처리 (예: direction-event, battery-event 등)
    eventSource.addEventListener(`${eventType}-event`, (event) => {
      try {
        const parsedMessage = JSON.parse(event.data);
        console.log(`${eventType}-event 데이터 수신:`, parsedMessage);

        // 상태 업데이트
        setStatusData((prevState) => ({
          ...prevState,
          [eventType]: parsedMessage.data,
        }));

        // 충돌 이벤트, 배터리, 공기압 이벤트의 경우 3초 후 상태를 false로 변경
        if (eventType === "collision" && parsedMessage.data.risk) {
          setTimeout(() => {
            setStatusData((prevState) => ({
              ...prevState,
              collision: { risk: false },
            }));
            console.log("충돌 상태가 3초 후에 false로 변경되었습니다.");
          }, 3000); // 3초 후에 상태를 false로 변경
        }

        // 배터리 insufficient 상태 3초 후 false로 변경
        if (eventType === "battery" && parsedMessage.data.insufficient) {
          setTimeout(() => {
            setStatusData((prevState) => ({
              ...prevState,
              battery: { ...prevState.battery, insufficient: false },
            }));
            console.log("배터리 상태가 3초 후에 false로 변경되었습니다.");
          }, 3000);
        }

        // 공기압 insufficient 상태 3초 후 false로 변경
        if (eventType === "pressure" && parsedMessage.data.insufficient) {
          setTimeout(() => {
            setStatusData((prevState) => ({
              ...prevState,
              pressure: { ...prevState.pressure, insufficient: false },
            }));
            console.log("공기압 상태가 3초 후에 false로 변경되었습니다.");
          }, 3000);
        }
      } catch (error) {
        console.error(`${eventType}-event 데이터 파싱 오류:`, error);
      }
    });

    // 연결이 열릴 때 실행
    eventSource.onopen = () => {
      console.log(`${eventType} SSE 연결이 열렸습니다.`);
    };

    // 오류 처리 및 재연결 로직
    eventSource.onerror = () => {
      console.error(`${eventType} SSE 연결 오류. 재연결 대기 중...`);
      eventSource.close();
      setTimeout(() => initializeSSEConnection(eventType), 5000); // 5초 후 재연결 시도
    };

    eventSourceRef.current[eventType] = eventSource; // 이벤트 소스 참조 저장
  };

  useEffect(() => {
    // 모든 이벤트 타입에 대해 구독 초기화
    Object.keys(ENDPOINTS).forEach(initializeSSEConnection);

    // 컴포넌트 언마운트 시 모든 SSE 연결 해제
    return () => {
      console.log("모든 SSE 연결 종료.");
      Object.values(eventSourceRef.current).forEach((es) => es.close());
    };
  }, [setStatusData]);

  return null;
};

SSEData.propTypes = {
  setStatusData: PropTypes.func.isRequired,
};

export default SSEData;
