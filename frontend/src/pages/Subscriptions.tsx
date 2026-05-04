import CreateSubscription from "./CreateSubscription";
import SubscriptionCard from "../components/subscriptions/SubscriptionCard";
import LoadErrorPanel from "../components/ui/LoadErrorPanel";
import EmptyState from "../components/ui/EmptyState";
import { SubscriptionsSkeleton } from "../components/ui/Skeleton";
import { useSubscriptionsDeliveries } from "../hooks/useSubscriptionsDeliveries";
import { useToast } from "../hooks/useToast";

export default function Subscriptions() {
  const { showToast } = useToast();
  const {
    subscriptions,
    loading,
    loadError,
    refresh,
    refreshSilent,
    toggleSubscription,
  } = useSubscriptionsDeliveries();

  const handleCreated = async () => {
    try {
      await refreshSilent();
    } catch (e) {
      const msg =
        e instanceof Error ? e.message : "Could not refresh the list.";
      showToast("error", msg);
    }
  };

  if (loading) {
    return <SubscriptionsSkeleton />;
  }

  if (loadError) {
    return <LoadErrorPanel message={loadError} onRetry={refresh} />;
  }

  return (
    <div className="space-y-10">
      <CreateSubscription onCreated={() => void handleCreated()} />

      <section>
        <h2 className="text-lg font-semibold text-slate-900">
          Your subscriptions
        </h2>
        <p className="mt-1 text-sm text-slate-500">
          Manage delivery frequency and pause when needed.
        </p>
        <div className="mt-6">
          {subscriptions.length === 0 ? (
            <EmptyState
              emoji="📋"
              title="No subscriptions yet. Create your first plan 🥛"
              description="Use the form above to pick quantity and frequency, then tap Subscribe."
            />
          ) : (
            <div className="grid gap-4 md:grid-cols-2">
              {subscriptions.map((sub) => (
                <SubscriptionCard
                  key={sub._id}
                  sub={sub}
                  onToggle={toggleSubscription}
                />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
