import { NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";

const nav = [
  { to: "/dashboard", label: "Dashboard" },
  { to: "/subscriptions", label: "Subscriptions" },
  { to: "/deliveries", label: "Deliveries" },
];

const titles: Record<string, string> = {
  "/dashboard": "Dashboard",
  "/subscriptions": "Subscriptions",
  "/deliveries": "Deliveries",
};

export default function AppLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const title = titles[location.pathname] ?? "Milk delivery";

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/", { replace: true });
  };

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `relative flex items-center rounded-xl px-3 py-3 text-sm font-medium transition duration-200 ease-out ${
      isActive
        ? "bg-indigo-50 text-indigo-800 shadow-sm ring-1 ring-indigo-200/60"
        : "text-slate-600 hover:bg-slate-100 hover:text-slate-900 active:scale-[0.99]"
    } ${isActive ? "font-semibold" : ""}`;

  return (
    <div className="min-h-screen bg-slate-50">
      <aside className="fixed inset-y-0 left-0 z-40 flex w-64 flex-col border-r border-slate-200/90 bg-white shadow-sm">
        <div className="flex h-14 shrink-0 items-center border-b border-slate-100 px-5">
          <span className="text-lg font-bold tracking-tight text-indigo-600">
            MilkRoute
          </span>
        </div>

        <nav className="flex flex-1 flex-col gap-1.5 overflow-y-auto p-4">
          {nav.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={linkClass}
              end
            >
              {({ isActive }) => (
                <>
                  {isActive ? (
                    <span
                      className="absolute left-0 top-1/2 h-7 w-1 -translate-y-1/2 rounded-r-full bg-indigo-600 shadow-sm"
                      aria-hidden
                    />
                  ) : null}
                  <span className="pl-2.5">{item.label}</span>
                </>
              )}
            </NavLink>
          ))}
        </nav>

        <div className="shrink-0 border-t border-slate-200 bg-slate-50/90 p-4">
          <p className="mb-2 px-1 text-[10px] font-semibold uppercase tracking-wider text-slate-400">
            Session
          </p>
          <button
            type="button"
            onClick={logout}
            className="flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition duration-200 hover:border-red-200 hover:bg-red-50 hover:text-red-800 active:scale-[0.99]"
          >
            Logout
          </button>
        </div>
      </aside>

      <div className="pl-64">
        <header className="sticky top-0 z-30 flex h-14 items-center border-b border-slate-200/90 bg-white/95 px-6 shadow-sm backdrop-blur supports-[backdrop-filter]:bg-white/80">
          <h1 className="text-base font-semibold tracking-tight text-slate-900">
            {title}
          </h1>
        </header>
        <main className="min-h-[calc(100vh-3.5rem)] p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
