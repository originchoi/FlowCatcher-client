import Card from "../Shared/Card";

function CardSection({ handleCardClick }) {
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

  return (
    <div className="w-full p-4 flex flex-wrap justify-center items-center gap-30">
      {cards.map((card, index) => (
        <Card key={index} card={card} onClick={() => handleCardClick(card)} />
      ))}
    </div>
  );
}

export default CardSection;
