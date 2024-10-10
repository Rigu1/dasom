import { useEffect } from "react";
import axios from "axios";
import PropTypes from "prop-types"; // PropTypes 추가

const SSEData = ({ setStatusData }) => {
  useEffect(() => {
    // HTTP 요청으로 데이터 받아오기
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://tory-lola-huitae-05796dff.koyeb.app/api/direction"
        );
        const data = response.data;
        console.log("Direction Data Received:", data);
        setStatusData((prevState) => ({
          ...prevState,
          direction: data.data,
        }));
      } catch (error) {
        console.error("HTTP error:", error);
      }
    };

    fetchData();
  }, [setStatusData]);

  return null;
};

// PropTypes 설정
SSEData.propTypes = {
  setStatusData: PropTypes.func.isRequired, // 함수로 전달되는 setStatusData 검증
};

export default SSEData;
