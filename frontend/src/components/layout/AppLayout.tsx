import { useEffect, useState } from "react";
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

function MenuIcon({ open }: { open: boolean }) {
  return (
    <svg
      className="h-6 w-6"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      aria-hidden
    >
      {open ? (
        <>
          <path d="M6 6l12 12M18 6L6 18" />
        </>
      ) : (
        <>
          <path d="M4 7h16M4 12h16M4 17h16" />
        </>
      )}
    </svg>
  );
}

export default function AppLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const title = titles[location.pathname] ?? "Milk delivery";
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    setSidebarOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (!sidebarOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSidebarOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [sidebarOpen]);

  useEffect(() => {
    document.body.style.overflow = sidebarOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [sidebarOpen]);

  const logout = () => {
    localStorage.removeItem("token");
    setSidebarOpen(false);
    navigate("/", { replace: true });
  };

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `relative flex min-h-11 touch-manipulation items-center rounded-xl px-3 py-3 text-sm font-medium transition duration-200 ease-out ${
      isActive
        ? "bg-indigo-50 text-indigo-800 shadow-sm ring-1 ring-indigo-200/60"
        : "text-slate-600 hover:bg-slate-100 hover:text-slate-900 active:scale-[0.99]"
    } ${isActive ? "font-semibold" : ""}`;

  return (
    <div className="min-h-dvh min-h-[100svh] overflow-x-hidden bg-slate-50">
      {sidebarOpen ? (
        <button
          type="button"
          className="fixed inset-0 z-40 cursor-default bg-slate-900/50 backdrop-blur-[1px] lg:hidden"
          aria-label="Close menu"
          onClick={() => setSidebarOpen(false)}
        />
      ) : null}

      <aside
        id="app-sidebar"
        className={`fixed inset-y-0 left-0 z-50 flex w-[min(18rem,88vw)] max-w-[20rem] flex-col border-r border-slate-200/90 bg-white shadow-lg transition-transform duration-200 ease-out lg:w-64 lg:max-w-none lg:translate-x-0 lg:shadow-sm ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-14 shrink-0 items-center justify-between gap-2 border-b border-slate-100 px-4 sm:px-5">
          <span className="truncate text-lg font-bold tracking-tight text-indigo-600">
            MilkRoute
          </span>
          <button
            type="button"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-slate-600 hover:bg-slate-100 lg:hidden"
            onClick={() => setSidebarOpen(false)}
            aria-label="Close menu"
          >
            <MenuIcon open />
          </button>
        </div>

        <nav className="flex flex-1 flex-col gap-1.5 overflow-y-auto overscroll-y-contain p-3 sm:p-4">
          {nav.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={linkClass}
              end
              onClick={() => setSidebarOpen(false)}
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

        <div className="shrink-0 border-t border-slate-200 bg-slate-50/90 p-3 sm:p-4">
          <p className="mb-2 px-1 text-[10px] font-semibold uppercase tracking-wider text-slate-400">
            Session
          </p>
          <button
            type="button"
            onClick={logout}
            className="flex min-h-11 w-full touch-manipulation items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition duration-200 hover:border-red-200 hover:bg-red-50 hover:text-red-800 active:scale-[0.99]"
          >
            Logout
          </button>
        </div>
      </aside>

      <div className="flex min-h-dvh min-h-[100svh] flex-col lg:pl-64">
        <header className="sticky top-0 z-30 flex h-14 shrink-0 items-center gap-3 border-b border-slate-200/90 bg-white/95 px-3 shadow-sm backdrop-blur supports-[backdrop-filter]:bg-white/80 sm:px-5 lg:px-6">
          <button
            type="button"
            className="flex h-11 w-11 shrink-0 touch-manipulation items-center justify-center rounded-xl text-slate-700 hover:bg-slate-100 lg:hidden"
            onClick={() => setSidebarOpen((o) => !o)}
            aria-expanded={sidebarOpen}
            aria-controls="app-sidebar"
            aria-label={sidebarOpen ? "Close menu" : "Open menu"}
          >
            <MenuIcon open={sidebarOpen} />
          </button>
          <h1 className="min-w-0 flex-1 truncate text-base font-semibold tracking-tight text-slate-900">
            {title}
          </h1>
        </header>
        <main className="min-h-0 flex-1 p-3 pb-[max(1.25rem,env(safe-area-inset-bottom,0px))] sm:p-5 lg:p-6">
          <div className="mx-auto min-w-0 max-w-6xl">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
