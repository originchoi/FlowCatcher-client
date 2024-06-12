import { useEffect, useRef } from "react";

import Header from "../Header";
import Footer from "../Footer";

import { useHeaderStateStore } from "../../store/store";
import handleScrollToContent from "../../utils/handleScrollToContent";
import useGetStartedClick from "../../hooks/useGetStartedClick";

function MainPage() {
  const { setHeaderState } = useHeaderStateStore();
  const handleGetStartedClick = useGetStartedClick();
  const contentRef = useRef(null);

  useEffect(() => {
    setHeaderState("MainPage");
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex-grow">
        <div className="relative h-[90vh] text-center">
          <video
            autoPlay
            loop
            muted
            className="absolute top-0 left-0 w-full h-full object-cover"
            style={{ filter: "blur(1px)" }}
          >
            <source src="/videos/background.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <div className="relative z-10 flex flex-col justify-center items-center h-full bg-black bg-opacity-40 p-3 rounded">
            <div className="text-5xl font-bold text-green-400 animate-floatUp mb-15">
              FlowCatcher
            </div>
            <div className="text-2xl font-bold text-white mt-15 mb-15 animate-floatUp">
              사용자 행동에 대한 귀중한 데이터를 확보해 보세요
            </div>
            <div className="absolute bottom-30 left-1/2 transform -translate-x-1/2">
              <button
                aria-label="Scroll down"
                className="bg-white rounded-full shadow-md hover:shadow-lg transition"
                onClick={() => handleScrollToContent(contentRef)}
              >
                <span className="relative pt-[70px]">
                  <span className="absolute top-0 left-1/2 w-24 h-24 -ml-12 border-l-4 border-b-4 border-white transform rotate-[-45deg] animate-sdb box-border" />
                </span>
              </button>
              <div className="mt-60 text-white text-sm">Scroll</div>
            </div>
          </div>
        </div>
        <div
          ref={contentRef}
          className="flex flex-col justify-center items-center h-[100vh] px-4 py-10 bg-gray-200"
        >
          <div className="w-full p-4 flex flex-col items-center mb-30">
            <div className="text-center">
              <p className="text-lg leading-loose md:text-xl md:leading-loose lg:text-2xl lg:leading-loose font-bold">
                모든 사용자 행동 데이터를 한눈에 확인하고 한 곳에서 관리하세요.
                <br />
                이제껏 경험하지 못한 쉽고 편리한 사용자 행동 분석 서비스,
                <br />
                FlowCatcher와 함께라면 당신의 사용자 데이터 관리가 새로워질
                거예요.
              </p>
            </div>
          </div>
          <button
            onClick={handleGetStartedClick}
            className="flex bg-blue-400 hover:bg-blue-600 text-white py-2 px-10 rounded mb-50 text-xl"
          >
            Get Started
          </button>
          <div className="w-full p-4 flex flex-wrap justify-center items-center">
            <div className="bg-white rounded-lg shadow-lg p-4 w-full md:w-1/2 lg:w-1/3 mb-4 md:mr-2">
              <img
                src="/assets/user_flow.png"
                alt="Description"
                className="w-full h-150 object-contain rounded-t-lg"
              />
              <div className="border-t border-gray-300 mt-4 pt-4">
                <h3 className="font-bold text-lg">User Flow Analytics</h3>
                <p>Track User Interactions 🚀</p>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-4 w-full md:w-1/2 lg:w-1/3 mb-4 md:ml-2">
              <img
                src="/assets/conversion_analysis.png"
                alt="Description"
                className="w-full h-150 object-contain rounded-t-lg"
              />
              <div className="border-t border-gray-300 mt-4 pt-4">
                <h3 className="font-bold text-lg">Conversion Rate Analytics</h3>
                <p>Optimize User Flow 🔍</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default MainPage;
