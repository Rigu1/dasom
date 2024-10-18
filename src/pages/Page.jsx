import React, { useState } from "react";
import styled from "styled-components";
import SSEData from "@/components/SSEData";
import StatusDisplay from "@/components/StatusDisplay";
import { flexCenter } from "@/styles/mixins";

const PageWrapper = styled.div`
  ${flexCenter}
  flex-direction: column;
  height: 100vh;
  background-color: #f0f0f0;
  position: relative;
`;

// 로고 스타일: 왼쪽 상단에 고정
const LogoWrapper = styled.div`
  position: absolute;
  top: 20px;
  left: 20px;
  width: 100px;
  height: 100px;

  img {
    width: 100%;
    height: auto;
  }

  // 반응형 스타일: 화면 크기가 커질 때 로고 크기를 조정
  @media (min-width: 768px) {
    width: 120px;
    height: 120px;
  }

  @media (min-width: 1024px) {
    width: 150px;
    height: 150px;
  }
`;

const Page = () => {
  const [statusData, setStatusData] = useState({
    direction: { left: false, right: false },
    battery: { insufficient: false },
    collision: { risk: false },
    pressure: { insufficient: false },
  });

  return (
    <PageWrapper>
      {/* 왼쪽 상단에 고정된 로고 */}
      <LogoWrapper>
        <img src="/imgs/logo.webp" alt="Logo" />
      </LogoWrapper>

      {/* 실시간 데이터 수신 */}
      <SSEData setStatusData={setStatusData} />

      {/* 상태 데이터 표시 */}
      <StatusDisplay status={statusData} />
    </PageWrapper>
  );
};

export default Page;
