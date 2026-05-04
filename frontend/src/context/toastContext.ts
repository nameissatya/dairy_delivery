import { createContext } from "react";

export type ToastType = "success" | "error" | "info";

export type ToastItem = {
  id: string;
  type: ToastType;
  message: string;
};

export type ToastContextValue = {
  showToast: (type: ToastType, message: string) => void;
};

export const ToastContext = createContext<ToastContextValue | null>(null);
