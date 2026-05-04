type Props = {
  emoji?: string;
  title: string;
  description: string;
  children?: React.ReactNode;
};

export default function EmptyState({
  emoji,
  title,
  description,
  children,
}: Props) {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-slate-200/90 bg-gradient-to-b from-slate-50 to-white px-8 py-16 text-center shadow-sm transition duration-200">
      {emoji ? (
        <span
          className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-white text-4xl shadow-md ring-1 ring-slate-100"
          aria-hidden
        >
          {emoji}
        </span>
      ) : null}
      <p className="text-base font-semibold text-slate-900">{title}</p>
      <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-slate-500">
        {description}
      </p>
      {children ? <div className="mt-6">{children}</div> : null}
    </div>
  );
}
