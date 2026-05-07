import { createContext, useContext, useState } from "react";
import Toast from "../components/Toast";

const ToastContext = createContext();

const showToast = (type, message, action = null) => {
  setToast({ type, message, action });
};

export function ToastProvider({ children }) {
  const [toast, setToast] = useState(null);

  const showToast = (type, message) => {
    setToast({ type, message });
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}

      {toast && (
        <Toast
          type={toast.type}
          message={toast.message}
          onClose={() => setToast(null)}
        />
      )}
    </ToastContext.Provider>
  );
}

export const useToast = () => useContext(ToastContext);