import { useEffect } from "react";
import PropTypes from "prop-types"; // PropTypes를 임포트

const WebSocketData = ({ setStatusData }) => {
  const connectWebSocket = () => {
    const directionSocket = new WebSocket(
      "ws://tory-lola-huitae-05796dff.koyeb.app/topic/direction"
    );

    directionSocket.onopen = () => {
      console.log("WebSocket connection opened");
    };

    directionSocket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log("Direction Data Received:", data);
      setStatusData((prevState) => ({
        ...prevState,
        direction: data.data,
      }));
    };

    directionSocket.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    directionSocket.onclose = (event) => {
      if (event.wasClean) {
        console.log(
          `WebSocket connection closed cleanly: code=${event.code}, reason=${event.reason}`
        );
      } else {
        console.error(
          "WebSocket connection closed unexpectedly. Reconnecting in 3 seconds..."
        );
        setTimeout(connectWebSocket, 3000); // 3초 후 재연결 시도
      }
    };
  };

  useEffect(() => {
    connectWebSocket();
  }, [setStatusData]);

  return null;
};

// PropTypes 설정
WebSocketData.propTypes = {
  setStatusData: PropTypes.func.isRequired, // setStatusData가 함수임을 명시
};

export default WebSocketData;
