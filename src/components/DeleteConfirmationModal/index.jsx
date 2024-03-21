function DeleteConfirmationModal({ isOpen, onClose, onConfirm }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-40 flex justify-center items-center">
      <div className="bg-white p-4 rounded-lg">
        <p className="mb-4">정말로 프로젝트를 삭제하시겠습니까?</p>
        <p className="mb-4">
          프로젝트를 삭제하시면 해당 프로젝트의 모든 데이터가 사라집니다.
        </p>
        <div className="flex justify-end space-x-2">
          <button
            className="px-4 py-2 mt-10 text-white bg-red-500 rounded hover:bg-red-700"
            onClick={onConfirm}
          >
            삭제
          </button>
          <button
            className="px-4 py-2 mt-10 text-black bg-gray-200 rounded hover:bg-gray-300"
            onClick={onClose}
          >
            취소
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteConfirmationModal;
