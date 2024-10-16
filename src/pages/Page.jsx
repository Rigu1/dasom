// src/pages/Page.jsx
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
`;

const Page = () => {
  const [statusData, setStatusData] = useState({
    direction: { left: false, right: false },
    battery: { level: 0, status: "N/A" },
    collision: { risk: false },
    pressure: { pressure: 0, status: "N/A" },
  });

  return (
    <PageWrapper>
      <h1>Real-Time Data Display</h1>
      <SSEData setStatusData={setStatusData} />
      <StatusDisplay status={statusData} />
    </PageWrapper>
  );
};

export default Page;
