import { Link } from "react-router-dom";
import DeliveryCard from "../components/deliveries/DeliveryCard";
import SubscriptionCard from "../components/subscriptions/SubscriptionCard";
import EmptyState from "../components/ui/EmptyState";
import LoadErrorPanel from "../components/ui/LoadErrorPanel";
import { DashboardSkeleton } from "../components/ui/Skeleton";
import { btnSecondary } from "../components/ui/buttonClasses";
import { cardSurface } from "../components/ui/surfaces";
import { useSubscriptionsDeliveries } from "../hooks/useSubscriptionsDeliveries";

export default function Dashboard() {
  const {
    subscriptions,
    deliveries,
    loading,
    loadError,
    refresh,
    toggleSubscription,
    skipDelivery,
    unskipDelivery,
  } = useSubscriptionsDeliveries();

  const totalSubs = subscriptions.length;
  const activeSubs = subscriptions.filter((s) => s.status === "active").length;
  const todayDeliveries = deliveries.length;

  if (loading) {
    return <DashboardSkeleton />;
  }

  if (loadError) {
    return <LoadErrorPanel message={loadError} onRetry={refresh} />;
  }

  return (
    <div className="space-y-10">
      <div className="grid gap-4 sm:grid-cols-3">
        <StatCard
          label="Total subscriptions"
          value={totalSubs}
          hint="All plans"
        />
        <StatCard
          label="Active subscriptions"
          value={activeSubs}
          hint="Receiving milk"
        />
        <StatCard
          label="Today's deliveries"
          value={todayDeliveries}
          hint="Scheduled slots"
        />
      </div>

      <section>
        <div className="mb-4">
          <h2 className="text-lg font-semibold text-slate-900">
            My subscriptions
          </h2>
          <p className="text-sm text-slate-500">
            Pause or resume anytime.
          </p>
        </div>
        {subscriptions.length === 0 ? (
          <EmptyState
            emoji="🥛"
            title="No subscriptions yet"
            description="Create your first plan to start scheduled milk deliveries."
          >
            <Link to="/subscriptions" className={`${btnSecondary} px-6`}>
              Go to Subscriptions
            </Link>
          </EmptyState>
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
      </section>

      <section>
        <div className="mb-4">
          <h2 className="text-lg font-semibold text-slate-900">
            Today&apos;s deliveries
          </h2>
          <p className="text-sm text-slate-500">
            Skip or restore before the cutoff.
          </p>
        </div>
        {deliveries.length === 0 ? (
          <EmptyState
            emoji="📦"
            title="No deliveries scheduled yet"
            description="When your subscription generates slots, they will appear here."
          >
            <Link to="/deliveries" className={`${btnSecondary} px-6`}>
              View deliveries page
            </Link>
          </EmptyState>
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
      </section>
    </div>
  );
}

function StatCard({
  label,
  value,
  hint,
}: {
  label: string;
  value: number;
  hint: string;
}) {
  return (
    <div
      className={`${cardSurface} p-6 hover:scale-[1.02] hover:shadow-indigo-900/10`}
    >
      <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
        {label}
      </p>
      <p className="mt-2 text-3xl font-bold tracking-tight text-slate-900">
        {value}
      </p>
      <p className="mt-1 text-sm text-slate-500">{hint}</p>
    </div>
  );
}
