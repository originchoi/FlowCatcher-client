function Modal({ isOpen, onClose, children }) {
  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 z-40" />
      <div className="fixed inset-0 z-50 overflow-auto bg-smoke-light flex">
        <div className="relative p-8 bg-white w-full max-w-md m-auto flex-col flex rounded-lg">
          {children}
          <hr className="my-4" />
          <div className="flex justify-end">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 text-black rounded hover:bg-gray-300"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Modal;
