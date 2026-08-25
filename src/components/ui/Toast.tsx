"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, XCircle, X } from "lucide-react";

export interface ToastMessage {
  id: string;
  type: "success" | "error";
  message: string;
}

interface ToastProps {
  toasts: ToastMessage[];
  onRemove: (id: string) => void;
}

export default function Toast({ toasts, onRemove }: ToastProps) {
  return (
    <div className="fixed bottom-6 right-6 z-[100] flex flex-col gap-3">
      <AnimatePresence>
        {toasts.map((toast) => (
          <ToastItem key={toast.id} toast={toast} onRemove={onRemove} />
        ))}
      </AnimatePresence>
    </div>
  );
}

function ToastItem({
  toast,
  onRemove,
}: {
  toast: ToastMessage;
  onRemove: (id: string) => void;
}) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(() => onRemove(toast.id), 300);
    }, 4000);
    return () => clearTimeout(timer);
  }, [toast.id, onRemove]);

  const icon =
    toast.type === "success" ? (
      <CheckCircle className="h-5 w-5 text-emerald-400" />
    ) : (
      <XCircle className="h-5 w-5 text-red-400" />
    );

  const borderColor =
    toast.type === "success"
      ? "border-emerald-500/30"
      : "border-red-500/30";

  return (
    <motion.div
      initial={{ opacity: 0, x: 50, scale: 0.95 }}
      animate={{
        opacity: isVisible ? 1 : 0,
        x: isVisible ? 0 : 50,
        scale: isVisible ? 1 : 0.95,
      }}
      exit={{ opacity: 0, x: 50, scale: 0.95 }}
      transition={{ duration: 0.3, ease: [0, 0, 0.2, 1] }}
      className={`flex items-center gap-3 rounded-xl border ${borderColor} bg-dark-card/95 px-4 py-3 shadow-2xl backdrop-blur-sm min-w-[300px]`}
    >
      {icon}
      <p className="flex-1 text-sm text-foreground">{toast.message}</p>
      <button
        onClick={() => onRemove(toast.id)}
        className="text-muted hover:text-foreground transition-colors cursor-pointer"
      >
        <X className="h-4 w-4" />
      </button>
    </motion.div>
  );
}

/* ============================================
   Toast Hook
   ============================================ */

export function useToast() {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const addToast = (type: "success" | "error", message: string) => {
    const id = Date.now().toString() + Math.random().toString(36).slice(2, 9);
    setToasts((prev) => [...prev, { id, type, message }]);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  return { toasts, addToast, removeToast };
}
