function Card({ card, onClick }) {
  return (
    <div
      className="card-container bg-white rounded-lg shadow-lg p-4 w-full sm:w-1/2 md:w-1/3 lg:w-1/4 mb-4 relative cursor-pointer"
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          onClick();
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
  );
}

export default Card;
