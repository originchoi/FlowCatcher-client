import { useEffect, useRef, useState } from "react";

import Header from "../Header";
import Footer from "../Footer";
import Modal from "../Shared/Modal";
import ModalContent from "./ModalContent";
import HeroSection from "./HeroSection";
import TextSection from "./TextSection";
import CardSection from "./CardSection";

import { useHeaderStateStore } from "../../store/store";
import handleScrollToContent from "../../utils/handleScrollToContent";
import useGetStartedClick from "../../hooks/useGetStartedClick";
import useCardEventListeners from "../../hooks/useCardEventListeners";

interface CardProps {
  title: string;
  gifs?: string[];
  customMessage?: string;
}

function MainPage() {
  const { setHeaderState } = useHeaderStateStore();
  const handleGetStartedClick = useGetStartedClick();

  const contentRef = useRef<HTMLDivElement>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState<CardProps | null>(null);

  useEffect(() => {
    setHeaderState("MainPage");
  }, [setHeaderState]);

  useCardEventListeners();

  function handleCardClick(card: CardProps) {
    setSelectedCard(card);
    setIsModalOpen(true);
  }

  return (
    <div className="flex flex-col min-h-screen overflow-x-hidden">
      <Header />
      <div className="flex-grow">
        <HeroSection
          contentRef={contentRef}
          handleScrollToContent={handleScrollToContent}
        />
        <div
          ref={contentRef}
          className="flex flex-col justify-center items-center h-[100vh] px-4 py-10 bg-gray-200"
        >
          <TextSection />
          <button
            onClick={handleGetStartedClick}
            className="flex bg-blue-400 hover:bg-blue-600 text-white py-2 px-10 rounded mb-50 text-xl"
          >
            Get Started
          </button>
          <CardSection handleCardClick={handleCardClick} />
        </div>
      </div>
      <Footer />
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        width="max-w-2xl"
      >
        {selectedCard && (
          <ModalContent
            selectedCard={{
              ...selectedCard,
              gifs: selectedCard.gifs ?? [],
            }}
          />
        )}
      </Modal>
    </div>
  );
}

export default MainPage;
