import { useCallback, useMemo, useState } from "react";
import {
  ToastContext,
  type ToastItem,
  type ToastType,
} from "./toastContext";

function uid() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

function ToastIcon({ type }: { type: ToastType }) {
  if (type === "success") {
    return (
      <span
        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-700"
        aria-hidden
      >
        ✓
      </span>
    );
  }
  if (type === "error") {
    return (
      <span
        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-red-100 text-red-700"
        aria-hidden
      >
        !
      </span>
    );
  }
  return (
    <span
      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-indigo-700"
      aria-hidden
    >
      i
    </span>
  );
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const showToast = useCallback((type: ToastType, message: string) => {
    const id = uid();
    setToasts((prev) => [...prev, { id, type, message }]);
    window.setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4500);
  }, []);

  const value = useMemo(() => ({ showToast }), [showToast]);

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div
        className="pointer-events-none fixed bottom-6 right-6 z-[100] flex w-full max-w-sm flex-col gap-3 px-4 sm:px-0"
        aria-live="polite"
      >
        {toasts.map((t) => (
          <div
            key={t.id}
            className={`toast-enter pointer-events-auto flex items-start gap-3 rounded-xl border px-4 py-3 text-sm shadow-lg ${
              t.type === "success"
                ? "border-emerald-200 bg-emerald-50 text-emerald-950"
                : t.type === "error"
                  ? "border-red-200 bg-red-50 text-red-950"
                  : "border-indigo-200 bg-indigo-50 text-indigo-950"
            }`}
            role="status"
          >
            <ToastIcon type={t.type} />
            <p className="min-w-0 flex-1 pt-1 font-medium leading-snug">
              {t.message}
            </p>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}
