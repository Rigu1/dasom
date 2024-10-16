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

    eventSource.addEventListener(`${eventType}-event`, (event) => {
      try {
        const parsedMessage = JSON.parse(event.data);
        console.log(`${eventType} 데이터 수신:`, parsedMessage);

        // 상태 업데이트
        setStatusData((prevState) => ({
          ...prevState,
          [eventType]: parsedMessage.data,
        }));
      } catch (error) {
        console.error(`${eventType} 데이터 파싱 오류:`, error);
      }
    });

    eventSource.onerror = () => {
      console.error(`${eventType} SSE 연결 오류. 재연결 대기 중...`);

      // 기존 연결 해제 후 5초 후 재연결 시도
      eventSource.close();
      setTimeout(() => initializeSSEConnection(eventType), 5000);
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
