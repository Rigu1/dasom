import React, { useState } from "react";
import styled from "styled-components";
import StatusDisplay from "@/components/StatusDisplay";
import SSEData from "@/components/SSEData"; // WebSocketData 컴포넌트 추가
import { flexCenter } from "@/styles/mixins";

const PageWrapper = styled.div`
  ${flexCenter}
  flex-direction: column;
  height: 100vh;
  background-color: #ffffff;
`;

const Page = () => {
  // WebSocket에서 받은 데이터를 상태로 관리
  const [statusData, setStatusData] = useState({
    direction: { left: false, right: false },
    battery: { level: 0, status: "N/A" },
    collision: { risk: false },
    pressure: { pressure: 0, status: "N/A" },
  });

  return (
    <PageWrapper>
      <h1>WebSocket Data Display</h1>
      {/* WebSocketData에서 데이터를 받아와 상태 업데이트 */}
      <SSEData setStatusData={setStatusData} />
      {/* 업데이트된 데이터를 StatusDisplay로 전달 */}
      <StatusDisplay status={statusData} />
    </PageWrapper>
  );
};

export default Page;
