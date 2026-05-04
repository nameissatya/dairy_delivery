import { useState } from "react";
import { useToast } from "../../hooks/useToast";
import type { Subscription } from "../../types/models";
import { btnDanger, btnSuccess } from "../ui/buttonClasses";
import Spinner from "../ui/Spinner";
import { cardSurface } from "../ui/surfaces";
import StatusBadge from "../ui/StatusBadge";

type Props = {
  sub: Subscription;
  onToggle: (id: string) => Promise<void>;
};

export default function SubscriptionCard({ sub, onToggle }: Props) {
  const { showToast } = useToast();
  const [busy, setBusy] = useState(false);

  const handleToggle = async () => {
    setBusy(true);
    try {
      await onToggle(sub._id);
      showToast("success", "Subscription updated.");
    } catch (e) {
      const msg =
        e instanceof Error ? e.message : "Could not update subscription.";
      showToast("error", msg);
    } finally {
      setBusy(false);
    }
  };

  const isActive = sub.status === "active";

  return (
    <div
      className={`${cardSurface} group p-6 hover:scale-[1.01] active:scale-[0.99]`}
    >
      <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            Plan
          </p>
          <p className="text-lg font-semibold text-slate-900">
            {sub.quantity} · {sub.frequency}
          </p>
        </div>
        <StatusBadge kind="subscription" status={sub.status} />
      </div>
      <button
        type="button"
        onClick={handleToggle}
        disabled={busy}
        className={`w-full ${isActive ? btnDanger : btnSuccess}`}
      >
        {busy ? (
          <>
            <Spinner className="h-4 w-4 text-white" />
            Updating…
          </>
        ) : isActive ? (
          "Pause subscription"
        ) : (
          "Resume"
        )}
      </button>
    </div>
  );
}
