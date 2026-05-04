import { useState } from "react";
import { useToast } from "../../hooks/useToast";
import { isWithinSkipCutoff } from "../../lib/dateUtils";
import type { Delivery } from "../../types/models";
import { btnPrimary } from "../ui/buttonClasses";
import Spinner from "../ui/Spinner";
import { cardSurface } from "../ui/surfaces";
import StatusBadge from "../ui/StatusBadge";

const btnAmber =
  "mt-2 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-amber-500 px-4 py-2.5 text-sm font-semibold text-white shadow-md shadow-amber-500/20 transition duration-200 hover:bg-amber-600 hover:shadow-lg disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98]";

type Props = {
  del: Delivery;
  onSkip: (id: string) => Promise<void>;
  onRestore: (id: string) => Promise<void>;
};

export default function DeliveryCard({ del, onSkip, onRestore }: Props) {
  const { showToast } = useToast();
  const [busy, setBusy] = useState(false);
  const withinSkipWindow = isWithinSkipCutoff(del.date);

  const run = async (
    fn: (id: string) => Promise<void>,
    successMessage: string
  ) => {
    setBusy(true);
    try {
      await fn(del._id);
      showToast("success", successMessage);
    } catch (e) {
      const msg =
        e instanceof Error ? e.message : "Something went wrong. Try again.";
      showToast("error", msg);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div
      className={`${cardSurface} group p-6 hover:scale-[1.01] active:scale-[0.99]`}
    >
      <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            Delivery date
          </p>
          <p className="text-lg font-semibold text-slate-900">
            {new Date(del.date).toDateString()}
          </p>
        </div>
        <StatusBadge kind="delivery" status={del.status} />
      </div>
      <p className="mb-1 text-sm text-slate-600">
        <span className="font-medium text-slate-800">Quantity:</span>{" "}
        {del.quantity}
      </p>
      {del.status === "skipped" && (
        <p className="mb-4 text-xs text-slate-500">No delivery on this day.</p>
      )}

      {del.status === "pending" && withinSkipWindow && (
        <button
          type="button"
          disabled={busy}
          onClick={() => void run(onSkip, "Delivery skipped for this date.")}
          className={btnAmber}
        >
          {busy ? (
            <>
              <Spinner className="h-4 w-4 text-white" />
              Working…
            </>
          ) : (
            "Skip this date"
          )}
        </button>
      )}
      {del.status === "skipped" && withinSkipWindow && (
        <button
          type="button"
          disabled={busy}
          onClick={() =>
            void run(onRestore, "Delivery restored for this date.")
          }
          className={`mt-2 w-full ${btnPrimary}`}
        >
          {busy ? (
            <>
              <Spinner className="h-4 w-4 text-white" />
              Working…
            </>
          ) : (
            "Restore delivery"
          )}
        </button>
      )}
      {(del.status === "pending" || del.status === "skipped") &&
        !withinSkipWindow && (
          <p className="mt-3 rounded-xl border border-slate-100 bg-slate-50 px-3 py-2 text-xs text-slate-600">
            Skip or restore closes at 9 PM the day before this delivery.
          </p>
        )}
    </div>
  );
}
