const generateUsePageViewTrackerCode = ({
  userId,
  _id,
  apiKey,
}) => `import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

// 서버로 데이터를 전송하기 위한 도우미 함수
async function postData(url = "", data = {}) {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
    credentials: "include",
  });

  return response.json();
}

// 페이지 뷰 및 세션 데이터 추적을 위한 커스텀 훅
function usePageViewTracker() {
  const location = useLocation();
  const [previousUrl, setPreviousUrl] = useState(
    sessionStorage.getItem("referrer") || "",
  );
  const [sessionId, setSessionId] = useState(
    sessionStorage.getItem("sessionId"),
  );

  const userId = "${userId}";
  const projectId = "${_id}";
  const apiKey = "${apiKey}";

  useEffect(() => {
    // 현재 URL과 이전 URL을 추적
    const currentUrl = window.location.href;
    const pageTitle = location.pathname;
    const referrer = previousUrl;

    // 세션 및 페이지 뷰 데이터 전송 처리 함수
    async function handleDataSending() {
      // 세션 데이터 전송
      if (!sessionId) {
        try {
          const sessionData = await postData(
            "http://localhost:3000/api/sessions",
            {
              userId,
              projectId,
              apiKey,
            },
          );

          const newSessionId = sessionData.sessionId; // 서버로부터 받은 세션 ID
          sessionStorage.setItem("sessionId", newSessionId);
          setSessionId(newSessionId);

          console.log("Session saved:", sessionData);
        } catch (error) {
          console.error("Error saving session:", error);
        }
      } else {
        // 페이지 뷰 데이터 전송
        try {
          sessionStorage.setItem("referrer", currentUrl);

          const pageViewResponse = await postData(
            "http://localhost:3000/api/pageViews",
            {
              sessionId,
              url: currentUrl,
              pageTitle,
              timestamp: new Date().toISOString(),
              referrer,
            },
          );
          console.log("Page view recorded:", pageViewResponse);
        } catch (error) {
          console.error("Error recording page view:", error);
        }
      }
    }

    handleDataSending();
    // 현재 URL을 이전 URL로 업데이트
    setPreviousUrl(currentUrl);
  }, [location, sessionId]); // location과 userId가 변경될 때마다 이 효과를 재실행

  // 컴포넌트가 마운트될 때 한 번만 실행되도록 설정
  useEffect(() => {
    // 페이지 로드 시 sessionStorage에서 referrer 정보를 가져옴
    const referrer = sessionStorage.getItem("referrer") || "";
    sessionStorage.setItem("referrer", referrer);
    setPreviousUrl(referrer);
  }, []);
}

export default usePageViewTracker;
`;

export default generateUsePageViewTrackerCode;
