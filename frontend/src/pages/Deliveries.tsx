import DeliveryCard from "../components/deliveries/DeliveryCard";
import EmptyState from "../components/ui/EmptyState";
import LoadErrorPanel from "../components/ui/LoadErrorPanel";
import { DeliveriesSkeleton } from "../components/ui/Skeleton";
import { useSubscriptionsDeliveries } from "../hooks/useSubscriptionsDeliveries";

export default function Deliveries() {
  const { deliveries, loading, loadError, refresh, skipDelivery, unskipDelivery } =
    useSubscriptionsDeliveries();

  if (loading) {
    return <DeliveriesSkeleton />;
  }

  if (loadError) {
    return <LoadErrorPanel message={loadError} onRetry={refresh} />;
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold text-slate-900">All deliveries</h2>
        <p className="mt-1 text-sm text-slate-500">
          View status, quantity, and skip or restore when allowed.
        </p>
      </div>
      {deliveries.length === 0 ? (
        <EmptyState
          emoji="📦"
          title="No deliveries scheduled yet"
          description="Active subscriptions will generate delivery slots here. Check back after your next billing cycle or subscription update."
        />
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {deliveries.map((del) => (
            <DeliveryCard
              key={del._id}
              del={del}
              onSkip={skipDelivery}
              onRestore={unskipDelivery}
            />
          ))}
        </div>
      )}
    </div>
  );
}
