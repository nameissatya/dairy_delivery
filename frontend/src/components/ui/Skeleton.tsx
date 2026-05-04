export function SkeletonCard() {
  return (
    <div className="animate-pulse rounded-xl border border-slate-200/90 bg-white p-6 shadow-md">
      <div className="mb-4 flex justify-between">
        <div className="h-4 w-1/3 rounded-lg bg-slate-200" />
        <div className="h-6 w-16 rounded-full bg-slate-100" />
      </div>
      <div className="mb-2 h-3 w-full rounded bg-slate-100" />
      <div className="h-10 w-full rounded-xl bg-slate-100" />
    </div>
  );
}

export function SkeletonStat() {
  return (
    <div className="animate-pulse rounded-xl border border-slate-200/90 bg-white p-6 shadow-md">
      <div className="mb-3 h-3 w-28 rounded-lg bg-slate-200" />
      <div className="h-9 w-14 rounded-lg bg-slate-100" />
      <div className="mt-3 h-3 w-20 rounded bg-slate-100" />
    </div>
  );
}

function SkeletonLine({ className }: { className: string }) {
  return (
    <div
      className={`animate-pulse rounded-lg bg-slate-200/90 ${className}`}
    />
  );
}

export function SkeletonSectionTitle() {
  return (
    <div className="mb-4 space-y-2">
      <SkeletonLine className="h-5 w-48" />
      <SkeletonLine className="h-3 w-72 max-w-full" />
    </div>
  );
}

/** Full dashboard placeholder: stats + two sections with cards */
export function DashboardSkeleton() {
  return (
    <div className="space-y-10">
      <div className="grid gap-4 sm:grid-cols-3">
        <SkeletonStat />
        <SkeletonStat />
        <SkeletonStat />
      </div>
      <section className="space-y-4">
        <SkeletonSectionTitle />
        <div className="grid gap-4 md:grid-cols-2">
          <SkeletonCard />
          <SkeletonCard />
        </div>
      </section>
      <section className="space-y-4">
        <SkeletonSectionTitle />
        <div className="grid gap-4 md:grid-cols-2">
          <SkeletonCard />
          <SkeletonCard />
        </div>
      </section>
    </div>
  );
}

/** Create form card + list area */
export function SubscriptionsSkeleton() {
  return (
    <div className="space-y-10">
      <div className="mx-auto max-w-lg animate-pulse rounded-xl border border-slate-200/90 bg-white p-8 shadow-md">
        <SkeletonLine className="h-5 w-48" />
        <SkeletonLine className="mt-2 h-3 w-full max-w-xs" />
        <div className="mt-8 space-y-5">
          <div>
            <SkeletonLine className="h-3 w-20" />
            <SkeletonLine className="mt-2 h-12 w-full rounded-xl" />
          </div>
          <div>
            <SkeletonLine className="h-3 w-24" />
            <SkeletonLine className="mt-2 h-12 w-full rounded-xl" />
          </div>
          <SkeletonLine className="h-12 w-full rounded-xl" />
        </div>
      </div>
      <section className="space-y-4">
        <SkeletonSectionTitle />
        <div className="grid gap-4 md:grid-cols-2">
          <SkeletonCard />
          <SkeletonCard />
        </div>
      </section>
    </div>
  );
}

export function DeliveriesSkeleton() {
  return (
    <div className="space-y-6">
      <SkeletonSectionTitle />
      <div className="grid gap-4 md:grid-cols-2">
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />
        <SkeletonCard />
      </div>
    </div>
  );
}
