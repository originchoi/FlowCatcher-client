import { useEffect, useRef } from "react";

function HeroSection({ contentRef, handleScrollToContent }) {
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.setAttribute("playsinline", "true");
    }
  }, []);

  return (
    <div className="relative h-[90vh] text-center">
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
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
  );
}

export default HeroSection;
