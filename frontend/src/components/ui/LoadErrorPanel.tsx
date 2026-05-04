import { useState } from "react";
import Spinner from "./Spinner";
import { btnPrimary } from "./buttonClasses";

type Props = {
  message: string;
  onRetry: () => Promise<void>;
};

export default function LoadErrorPanel({ message, onRetry }: Props) {
  const [busy, setBusy] = useState(false);

  const handleRetry = async () => {
    setBusy(true);
    try {
      await onRetry();
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="flex min-h-[min(420px,50vh)] flex-col items-center justify-center rounded-xl border border-red-100 bg-gradient-to-b from-red-50/90 to-white px-8 py-12 text-center shadow-sm">
      <span className="mb-4 text-3xl" role="img" aria-label="Error">
        ⚠️
      </span>
      <p className="max-w-md text-sm font-medium text-red-900">{message}</p>
      <p className="mt-2 max-w-sm text-xs text-red-800/80">
        Check your connection or sign in again if the problem continues.
      </p>
      <button
        type="button"
        onClick={() => void handleRetry()}
        disabled={busy}
        className={`${btnPrimary} mt-8 min-w-[140px]`}
      >
        {busy ? (
          <>
            <Spinner className="h-4 w-4 text-white" />
            Retrying…
          </>
        ) : (
          "Try again"
        )}
      </button>
    </div>
  );
}
