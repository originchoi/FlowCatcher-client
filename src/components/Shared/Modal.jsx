import { useEffect } from "react";
import { IoCloseOutline } from "react-icons/io5";
import { useHeaderStateStore } from "../../store/store";

function Modal({ isOpen, onClose, children, width = "max-w-lg" }) {
  const { headerState } = useHeaderStateStore();
  const isMainPage = headerState === "MainPage";
  const isDashboard = headerState === "Dashboard";

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }

    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 z-40" />
      <div className="fixed inset-0 z-50 overflow-auto bg-smoke-light flex">
        <div
          className={`relative p-8 bg-white w-full ${width} max-h-[70vh] overflow-y-auto m-auto flex-col flex rounded-lg`}
        >
          {isMainPage && (
            <button
              onClick={onClose}
              className="absolute top-20 right-13 p-3 text-black rounded-full hover:bg-red-100"
              aria-label="Close modal"
            >
              <IoCloseOutline size={24} />
            </button>
          )}
          {children}
          <hr className="my-4" />
          {isDashboard && (
            <div className="flex justify-end">
              <button
                onClick={onClose}
                className="px-4 py-2 bg-gray-200 text-black rounded hover:bg-gray-300"
              >
                Close
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Modal;
