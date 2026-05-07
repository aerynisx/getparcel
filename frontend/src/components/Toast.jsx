import { FaCheckCircle, FaTimesCircle, FaTimes } from "react-icons/fa";
import { useEffect, useState } from "react";

export default function Toast({ type, message, onClose }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // allow render first, THEN trigger fade-in
    const showTimer = setTimeout(() => {
      setVisible(true);
    }, 10);

    // start fade-out earlier
    const hideTimer = setTimeout(() => {
      setVisible(false);

      // wait for fade-out animation before removing
      setTimeout(onClose, 200);
    }, 2200);

    return () => {
      clearTimeout(showTimer);
      clearTimeout(hideTimer);
    };
  }, [onClose]);

  return (
    <div
      className={`
        fixed top-5 right-5 z-[9999]
        flex items-center gap-3 px-4 py-3 rounded shadow text-white
        transition-all duration-300 ease-in-out
        ${visible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-3"}
        ${type === "success" ? "bg-green-500" : "bg-red-500"}
      `}
    >
      {type === "success" ? <FaCheckCircle /> : <FaTimesCircle />}

      <span>{message}</span>

      <button onClick={() => setVisible(false)}>
        <FaTimes />
      </button>
    </div>
  );

  {toast.action && (
  <button
    onClick={() => {
      toast.action();
      onClose();
    }}
    className="ml-3 underline text-white font-semibold"
  >
    Undo
  </button>
)}
}