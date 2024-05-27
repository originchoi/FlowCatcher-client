import { useEffect } from "react";
import { Link } from "react-router-dom";

import Header from "../Header";
import Footer from "../Footer";

import { useHeaderStateStore } from "../../store/store";

function MainPage() {
  const { setHeaderState } = useHeaderStateStore();

  useEffect(() => {
    setHeaderState("MainPage");
  }, []);

  return (
    <div className="flex flex-col min-h-screen mt-3">
      <Header />
      <div className="flex-grow">
        <div className="relative my-32 sm:my-10 text-center h-250">
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
          <div className="relative z-10 flex flex-col justify-center items-center h-full">
            <div className="text-5xl font-bold text-green-600 animate-floatUp mb-15">
              FlowCatcher
            </div>
            <div className="text-xl font-bold mt-15 mb-15 animate-floatUp">
              사용자 행동에 대한 귀중한 데이터를 확보해보세요
            </div>
            <Link
              to="/"
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mt-15 mb-15 animate-floatUp"
            >
              Get Started
            </Link>
          </div>
        </div>
        <div className="flex justify-between px-4 py-10">
          <div className="w-1/2 p-4 flex items-center justify-center">
            <div className="text-center">
              <p className="text-2xl font-bold">
                FlowCather 가 제공하는 기능을 사용해 보세요!
              </p>
            </div>
          </div>
          <div className="w-1/2 p-4 flex flex-row justify-between">
            <div className="bg-white rounded-lg shadow-lg p-4 w-1/2 mr-2">
              <img
                src="/assets/user_flow.png"
                alt="Description"
                className="w-full h-150 object-contain rounded-t-lg"
              />
              <div className="p-2">
                <h3 className="font-bold text-lg">User Flow Analysis</h3>
                <p>Track User interactions 🚀</p>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-lg p-4 w-1/2 ml-2">
              <img
                src="/assets/conversion_analysis.png"
                alt="Description"
                className="w-full h-150 object-contain rounded-t-lg"
              />
              <div className="p-2">
                <h3 className="font-bold text-lg">Conversion Rate Analysis</h3>
                <p>Optimize user flow 🔍</p>
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
