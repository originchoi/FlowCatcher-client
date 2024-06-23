function ModalContent({ selectedCard }) {
  return (
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
            <hr className="my-4 w-full border-gray-300" />
            <img
              src={selectedCard.gifs[0]}
              alt={`${selectedCard.title} gif 1`}
              className="w-full h-auto rounded-lg"
            />
          </div>
          <ul className="list-disc ml-25 mt-10 mb-40 text-left text-gray-600">
            <li>
              본인의 웹사이트에 사용할 서비스 코드를 발급받기 위해 사용자는
              프로젝트를 만들 수 있습니다.
            </li>
            <li>
              프로젝트별로 서비스 코드를 발급 받을 수 있고, copy 버튼으로 복사할
              수 있습니다.
            </li>
          </ul>
          <div className="w-full h-auto mb-4 rounded-lg">
            <p className="inline-block text-lg text-white bg-blue-500 bg-opacity-80 px-5 py-1 rounded mb-2">
              Step 2
            </p>
            <hr className="my-4 w-full border-gray-300" />
            <img
              src={selectedCard.gifs[1]}
              alt={`${selectedCard.title} gif 2`}
              className="w-full h-auto rounded-lg"
            />
          </div>
          <ul className="list-disc ml-25 mt-10 mb-40 text-left text-gray-600">
            <li>
              발급받은 서비스 코드(스크립트 코드)를 사용자의 비즈니스 웹사이트에
              붙여넣기 하여 사용합니다.
            </li>
          </ul>
          <div className="w-full h-auto mb-4 rounded-lg">
            <p className="inline-block text-lg text-white bg-blue-500 bg-opacity-80 px-5 py-1 rounded mb-2">
              Step 3
            </p>
            <hr className="my-4 w-full border-gray-300" />
            <img
              src={selectedCard.gifs[2]}
              alt={`${selectedCard.title} gif 2`}
              className="w-full h-auto rounded-lg"
            />
          </div>
          <ul className="list-disc ml-25 mt-15 text-left text-gray-600">
            <li>
              행동 흐름 분석 탭에서 서비스 코드를 적용한 웹 사이트 내 방문자들의
              페이지 이동 흐름을 볼 수 있습니다.
            </li>
            <li>
              가장 많이 방문한 페이지 5개가 메인페이지 주소 이하 url로 나열되어
              그래프와 함께 나타냅니다.
            </li>
            <li>
              가장 하단에 방문자들의 페이지 흐름을 시각화 하여 나타냅니다.
            </li>
          </ul>
        </>
      )}
      {selectedCard.customMessage && (
        <p className="text-lg mt-4">{selectedCard.customMessage}</p>
      )}
    </div>
  );
}

export default ModalContent;
