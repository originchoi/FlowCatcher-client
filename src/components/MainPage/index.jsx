import { useEffect, useRef, useState } from "react";

import Header from "../Header";
import Footer from "../Footer";
import Modal from "../Shared/Modal";

import { useHeaderStateStore } from "../../store/store";
import handleScrollToContent from "../../utils/handleScrollToContent";
import useGetStartedClick from "../../hooks/useGetStartedClick";

function MainPage() {
  const { setHeaderState } = useHeaderStateStore();
  const handleGetStartedClick = useGetStartedClick();

  const contentRef = useRef(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);

  const cards = [
    {
      title: "User Flow Analytics",
      description: "Track User Interactions 🚀",
      image: "/assets/user_flow.png",
      gifs: [
        "/assets/servicecode_issued.gif",
        "/assets/servicecode_apply.gif",
        "/assets/behavior_analytics.gif",
      ],
    },
    {
      title: "Conversion Rate Analytics",
      description: "Optimize User Flow 🔍",
      image: "/assets/conversion_analytics.png",
      gifs: [],
      customMessage: "해당 기능 업데이트 중입니다. 🙇🏻‍♂️",
    },
  ];

  useEffect(() => {
    setHeaderState("MainPage");

    const container = document.querySelectorAll(".card-container");

    container.forEach((card) => {
      card.style.willChange = "transform";

      card.addEventListener("mousemove", function (e) {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;

        const dampenFactor = 0.1;
        const rotateY = -x * dampenFactor;
        const rotateX = y * dampenFactor;

        const maxRotate = 20;
        const clampedRotateY = Math.min(
          Math.max(rotateY, -maxRotate),
          maxRotate,
        );
        const clampedRotateX = Math.min(
          Math.max(rotateX, -maxRotate),
          maxRotate,
        );

        card.style.transform = `perspective(350px) rotateX(${clampedRotateX}deg) rotateY(${clampedRotateY}deg)`;
        card.style.transition = "transform 0.1s";
      });

      card.addEventListener("mouseout", function () {
        card.style.transform = "perspective(350px) rotateY(0deg) rotateX(0deg)";
        card.style.transition = "transform 0.5s";
      });
    });
  }, []);

  function handleCardClick(card) {
    setSelectedCard(card);
    setIsModalOpen(true);
  }

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
          <div className="w-full p-4 flex flex-wrap justify-center items-center gap-30">
            {cards.map((card, index) => (
              <div
                key={index}
                className="card-container bg-white rounded-lg shadow-lg p-4 w-full sm:w-1/2 md:w-1/3 lg:w-1/4 mb-4 relative cursor-pointer"
                onClick={() => handleCardClick(card)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    handleCardClick(card);
                  }
                }}
              >
                <div className="absolute w-full h-full bg-gradient-to-r from-transparent transition-all"></div>
                <img
                  src={card.image}
                  alt="Description"
                  className="w-full h-150 object-contain rounded-t-lg"
                />
                <div className="border-t border-gray-300 mt-4 pt-4">
                  <h3 className="font-bold text-lg">{card.title}</h3>
                  <p>{card.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <Footer />
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        width="max-w-2xl"
      >
        {selectedCard && (
          <div className="flex flex-col items-center">
            <h3 className="text-2xl font-bold mt-10 mb-30">
              How to use {selectedCard.title}
            </h3>
            {selectedCard.gifs.length > 0 && (
              <>
                <div className="w-full h-auto mb-4 rounded-lg">
                  <p className="inline-block text-lg text-white bg-blue-500 bg-opacity-80 px-5 py-1 rounded mb-2">
                    Step 1
                  </p>
                  <img
                    src={selectedCard.gifs[0]}
                    alt={`${selectedCard.title} gif 1`}
                    className="w-full h-auto rounded-lg"
                  />
                </div>
                <ul className="list-disc ml-25 mt-10 mb-40 text-left text-gray-600">
                  <li>
                    본인의 웹사이트에 사용할 서비스 코드를 발급받기 위해
                    사용자는 프로젝트를 만들 수 있습니다.
                  </li>
                  <li>
                    프로젝트별로 서비스 코드를 발급 받을 수 있고, copy 버튼으로
                    복사할 수 있습니다.
                  </li>
                </ul>
                <div className="w-full h-auto mb-4 rounded-lg">
                  <p className="inline-block text-lg text-white bg-blue-500 bg-opacity-80 px-5 py-1 rounded mb-2">
                    Step 2
                  </p>
                  <img
                    src={selectedCard.gifs[1]}
                    alt={`${selectedCard.title} gif 2`}
                    className="w-full h-auto rounded-lg"
                  />
                </div>
                <ul className="list-disc ml-25 mt-10 mb-40 text-left text-gray-600">
                  <li>
                    발급받은 서비스 코드(스크립트 코드)를 사용자의 비즈니스
                    웹사이트에 붙여넣기 하여 사용합니다.
                  </li>
                </ul>
                <div className="w-full h-auto mb-4 rounded-lg">
                  <p className="inline-block text-lg text-white bg-blue-500 bg-opacity-80 px-5 py-1 rounded mb-2">
                    Step 3
                  </p>
                  <img
                    src={selectedCard.gifs[2]}
                    alt={`${selectedCard.title} gif 2`}
                    className="w-full h-auto rounded-lg"
                  />
                </div>
                <ul className="list-disc ml-25 mt-15 text-left text-gray-600">
                  <li>
                    행동 흐름 분석 탭에서 서비스 코드를 적용한 웹 사이트 내
                    방문자들의 페이지 이동 흐름을 볼 수 있습니다.
                  </li>
                  <li>
                    가장 많이 방문한 페이지 5개가 메인페이지 주소 이하 url로
                    나열되어 그래프와 함께 나타냅니다.
                  </li>
                  <li>
                    가장 하단에 방문자들의 페이지 흐름을 시각화 하여 나타냅니다.
                  </li>
                </ul>
              </>
            )}
            <p className="text-lg mt-4">{selectedCard.customMessage}</p>
          </div>
        )}
      </Modal>
    </div>
  );
}

export default MainPage;
