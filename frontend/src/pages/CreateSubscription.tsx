import { useState } from "react";
import api from "../services/api";
import { useToast } from "../hooks/useToast";
import { btnPrimary } from "../components/ui/buttonClasses";
import Spinner from "../components/ui/Spinner";
import { cardSurface } from "../components/ui/surfaces";

type Props = {
  onCreated?: () => void;
};

export default function CreateSubscription({ onCreated }: Props) {
  const { showToast } = useToast();
  const [quantity, setQuantity] = useState<string>("1L");
  const [frequency, setFrequency] = useState<string>("daily");
  const [submitting, setSubmitting] = useState(false);

  const token = localStorage.getItem("token");

  const handleCreate = async () => {
    setSubmitting(true);
    try {
      await api.post(
        "/subscriptions",
        { quantity, frequency },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      showToast("success", "Subscription created successfully.");
      onCreated?.();
    } catch {
      showToast("error", "Could not create subscription. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const inputClass =
    "mt-1.5 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm transition duration-200 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 disabled:cursor-not-allowed disabled:opacity-60";

  return (
    <div
      className={`${cardSurface} mx-auto max-w-lg p-8 hover:shadow-indigo-900/10`}
    >
      <h2 className="text-lg font-semibold text-slate-900">
        Create subscription
      </h2>
      <p className="mt-1 text-sm text-slate-500">
        Choose quantity and how often you want milk delivered.
      </p>

      <div className="mt-8 space-y-5">
        <div>
          <label
            htmlFor="qty"
            className="text-sm font-medium text-slate-700"
          >
            Quantity
          </label>
          <select
            id="qty"
            className={inputClass}
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            disabled={submitting}
          >
            <option value="500ml">500ml</option>
            <option value="1L">1L</option>
            <option value="2L">2L</option>
          </select>
        </div>

        <div>
          <label
            htmlFor="freq"
            className="text-sm font-medium text-slate-700"
          >
            Frequency
          </label>
          <select
            id="freq"
            className={inputClass}
            value={frequency}
            onChange={(e) => setFrequency(e.target.value)}
            disabled={submitting}
          >
            <option value="daily">Daily</option>
            <option value="alternate">Alternate days</option>
          </select>
        </div>

        <button
          type="button"
          onClick={() => void handleCreate()}
          disabled={submitting}
          className={`mt-2 w-full ${btnPrimary}`}
        >
          {submitting ? (
            <>
              <Spinner className="h-4 w-4 text-white" />
              Creating…
            </>
          ) : (
            "Subscribe"
          )}
        </button>
      </div>
    </div>
  );
}
