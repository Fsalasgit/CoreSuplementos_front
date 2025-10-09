// ToastContext.js
import React, { createContext, useState } from "react";

export const ToastContext = createContext();

export function ToastProvider({ children }) {
  const [showToast, setShowToast] = useState(false);
  const [toastPos, setToastPos] = useState({ top: 0, left: 0 });

  return (
    <ToastContext.Provider value={{ showToast, setShowToast, toastPos, setToastPos }}>
      {children}
    </ToastContext.Provider>
  );
}
