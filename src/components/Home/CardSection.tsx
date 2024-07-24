import Card from "../Shared/Card";

interface CardProps {
  title: string;
  description: string;
  image: string;
  gifs?: string[];
  customMessage?: string;
}

interface CardSectionProps {
  handleCardClick: (card: CardProps) => void;
}

function CardSection({ handleCardClick }: CardSectionProps) {
  const cards: CardProps[] = [
    {
      title: "행동 흐름 분석",
      description: "접속한 유저들의 페이지 이동을 시각화 🚀",
      image: "/assets/user_flow.png",
      gifs: [
        "/assets/servicecode_issued.gif",
        "/assets/servicecode_apply.gif",
        "/assets/behavior_analytics.gif",
      ],
    },
    {
      title: "전환율 분석",
      description: "설정한 페이지까지 유저 도달을 분석 🔍",
      image: "/assets/conversion_analytics.png",
      gifs: [],
      customMessage:
        "해당 기능 업데이트 중입니다. 간단한 전환율 계산은 사용 가능합니다! 🙇🏻‍♂️",
    },
  ];

  return (
    <div className="w-full p-4 flex flex-wrap justify-center items-center gap-30">
      {cards.map((card, index) => (
        <Card key={index} card={card} onClick={() => handleCardClick(card)} />
      ))}
    </div>
  );
}

export default CardSection;
