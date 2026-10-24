"use client";

import {
  createContext,
  useCallback,
  useContext,
  useState,
  type ReactNode,
} from "react";
import { CheckCircle2, AlertCircle, Info, XCircle, X } from "lucide-react";

export type ToastType = "success" | "info" | "warning" | "error";

export interface ToastItem {
  id: string;
  title?: string;
  message: string;
  type?: ToastType;
}

export type ToastOptions = {
  message?: string;
  title?: string;
  type?: ToastType;
};

interface ToastContextValue {
  showToast: (message: string, type?: ToastType, title?: string) => void;
  toast: (arg: string | ToastOptions, type?: ToastType, title?: string) => void;
  dismissToast: (id: string) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const dismissToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const toast = useCallback(
    (arg: string | ToastOptions, typeArg: ToastType = "success", titleArg?: string) => {
      const id = Math.random().toString(36).substring(2, 9);
      let message = "";
      let type: ToastType = typeArg;
      let title: string | undefined = titleArg;

      if (typeof arg === "string") {
        message = arg;
      } else if (arg && typeof arg === "object") {
        message = arg.message || "";
        type = arg.type || typeArg;
        title = arg.title || titleArg;
      }

      setToasts((prev) => [...prev, { id, message, type, title }]);
      setTimeout(() => {
        dismissToast(id);
      }, 4500);
    },
    [dismissToast]
  );

  const showToast = useCallback(
    (message: string, type: ToastType = "success", title?: string) => {
      toast(message, type, title);
    },
    [toast]
  );

  return (
    <ToastContext.Provider value={{ toast, showToast, dismissToast }}>
      {children}
      {/* Toast container */}
      <div
        aria-live="polite"
        className="pointer-events-none fixed bottom-5 right-5 z-50 flex max-w-sm flex-col gap-2.5"
      >
        {toasts.map((t) => {
          const isError = t.type === "error";
          const isWarning = t.type === "warning";
          const isInfo = t.type === "info";

          const Icon = isError
            ? XCircle
            : isWarning
            ? AlertCircle
            : isInfo
            ? Info
            : CheckCircle2;

          const colorClass = isError
            ? "border-red-200 bg-red-50 text-brand-red"
            : isWarning
            ? "border-amber-200 bg-amber-50 text-amber-800"
            : isInfo
            ? "border-blue-200 bg-blue-50 text-blue-800"
            : "border-green-200 bg-emerald-50 text-brand-leaf";

          const iconColor = isError
            ? "text-brand-red"
            : isWarning
            ? "text-amber-600"
            : isInfo
            ? "text-blue-600"
            : "text-brand-green";

          return (
            <div
              key={t.id}
              role={isError ? "alert" : "status"}
              className={`pointer-events-auto flex items-start gap-3 rounded-xl border p-4 shadow-lg backdrop-blur-sm transition-all duration-300 ${colorClass}`}
            >
              <Icon className={`mt-0.5 size-5 shrink-0 ${iconColor}`} />
              <div className="flex-1 text-sm">
                {t.title && (
                  <p className="font-semibold text-brand-charcoal">
                    {t.title}
                  </p>
                )}
                <p className="text-brand-charcoal/90">{t.message}</p>
              </div>
              <button
                type="button"
                onClick={() => dismissToast(t.id)}
                aria-label="Dismiss notification"
                className="rounded p-0.5 text-muted hover:text-brand-charcoal"
              >
                <X className="size-4" />
              </button>
            </div>
          );
        })}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) {
    return {
      toast: (msg: string | ToastOptions) => console.log(msg),
      showToast: (msg: string) => console.log(msg),
      dismissToast: () => {},
    };
  }
  return ctx;
}

