type Variant = "active" | "paused" | "pending" | "delivered" | "skipped" | "neutral";

const styles: Record<Variant, string> = {
  active:
    "bg-emerald-50 text-emerald-800 ring-1 ring-inset ring-emerald-600/20",
  paused: "bg-slate-100 text-slate-600 ring-1 ring-inset ring-slate-500/15",
  pending:
    "bg-indigo-50 text-indigo-800 ring-1 ring-inset ring-indigo-600/20",
  delivered:
    "bg-emerald-50 text-emerald-800 ring-1 ring-inset ring-emerald-600/20",
  skipped: "bg-red-50 text-red-800 ring-1 ring-inset ring-red-600/15",
  neutral: "bg-slate-100 text-slate-700 ring-1 ring-inset ring-slate-500/15",
};

function subscriptionVariant(status: string): Variant {
  if (status === "active") return "active";
  return "paused";
}

function deliveryVariant(status: string): Variant {
  if (status === "delivered") return "delivered";
  if (status === "skipped") return "skipped";
  if (status === "pending") return "pending";
  return "neutral";
}

type Props =
  | { kind: "subscription"; status: string }
  | { kind: "delivery"; status: string };

export default function StatusBadge(props: Props) {
  const label =
    props.kind === "subscription"
      ? props.status === "active"
        ? "Active"
        : "Paused"
      : props.status.charAt(0).toUpperCase() + props.status.slice(1);

  const variant =
    props.kind === "subscription"
      ? subscriptionVariant(props.status)
      : deliveryVariant(props.status);

  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold capitalize ${styles[variant]}`}
    >
      {label}
    </span>
  );
}
