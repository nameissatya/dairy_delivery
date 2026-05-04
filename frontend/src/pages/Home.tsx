import { useEffect, useId, useState } from "react";
import { Link } from "react-router-dom";
import milkBottleImage from "../assets/milk-bottle.png";

const CONTACT_EMAIL = "hello@milkroute.in";

const navLinks = [
  { href: "#home", label: "Home" },
  { href: "#products", label: "Products" },
  { href: "#about", label: "About Us" },
  { href: "#reviews", label: "Reviews" },
  { href: "#contact", label: "Contact" },
] as const;

const aboutBadges = ["0.5%", "1.5%", "2.5%", "3.5%", "6%"] as const;

const linkFocus =
  "rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white";

/** Sticky header is taller on small screens (nav pills); keeps #anchors from hiding under it */
const SECTION_ANCHOR = "scroll-mt-36 md:scroll-mt-24";

function CartIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <path d="M6 6h15l-1.5 9h-12z" />
      <path d="M6 6 5 3H2" stroke="#f97316" />
      <circle cx="9" cy="20" r="1.5" fill="currentColor" stroke="none" />
      <circle cx="17" cy="20" r="1.5" fill="currentColor" stroke="none" />
    </svg>
  );
}

function ArrowDownIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor" className={className} aria-hidden>
      <path
        fillRule="evenodd"
        d="M10 3a.75.75 0 01.75.75v10.638l3.96-4.158a.75.75 0 111.08 1.04l-5.25 5.5a.75.75 0 01-1.08 0l-5.25-5.5a.75.75 0 111.08-1.04l3.96 4.158V3.75A.75.75 0 0110 3z"
        clipRule="evenodd"
      />
    </svg>
  );
}

function MilkSplash({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 1440 120" preserveAspectRatio="none" className={className} aria-hidden>
      <path
        fill="#ffffff"
        d="M0,80 C240,40 480,100 720,55 C960,15 1200,70 1440,35 L1440,120 L0,120 Z"
      />
      <path
        fill="#f8fafc"
        d="M0,95 C300,60 540,110 780,75 C1020,40 1260,85 1440,55 L1440,120 L0,120 Z"
      />
    </svg>
  );
}

/** Soft wave between slate-50 page background and the About band */
function SectionWave({ flip, className }: { flip?: boolean; className?: string }) {
  return (
    <svg
      viewBox="0 0 1440 48"
      preserveAspectRatio="none"
      className={`h-10 w-full text-slate-100 sm:h-12 ${flip ? "rotate-180" : ""} ${className ?? ""}`}
      aria-hidden
    >
      <path
        fill="currentColor"
        d="M0,24 C360,48 720,0 1080,20 C1260,30 1380,28 1440,22 L1440,48 L0,48 Z"
      />
    </svg>
  );
}

function IconLeaf({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <path
        d="M12 22C12 22 4 16 4 9C4 4 8 2 12 6C16 2 20 4 20 9C20 16 12 22 12 22Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path d="M12 22V12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function IconBabyBottle({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <path
        d="M10 3h4v3h-4V3zM9 6h6l1 5H8l1-5zM8 11h8v9a2 2 0 01-2 2h-4a2 2 0 01-2-2v-9z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path d="M10 15h4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
    </svg>
  );
}

function IconCow({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <ellipse cx="12" cy="14" rx="7" ry="5" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M7 12c-1.5-1-2.5-3-2-5M17 12c1.5-1 2.5-3 2-5M9 9h.01M15 9h.01"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path d="M10 19v2M14 19v2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

type ShowcaseProduct = {
  id: string;
  name: string;
  size: string;
  price: number;
  oldPrice: number | null;
  imageKind: "milk" | "peanut" | "cheese";
};

const SHOWCASE_PRODUCTS: ShowcaseProduct[] = [
  {
    id: "p1",
    name: "Milk Glass bottle",
    size: "500 ml",
    price: 20,
    oldPrice: null,
    imageKind: "milk",
  },
  {
    id: "p2",
    name: "Milk Glass bottle",
    size: "200 ml",
    price: 30,
    oldPrice: 40,
    imageKind: "milk",
  },
  {
    id: "p3",
    name: "Peanut butter spread",
    size: "100 gm",
    price: 30,
    oldPrice: null,
    imageKind: "peanut",
  },
  {
    id: "p4",
    name: "Goat cheese Milk Ricotta Pecorino Romano",
    size: "200 gm",
    price: 30,
    oldPrice: null,
    imageKind: "cheese",
  },
];

function ProductThumb({
  kind,
  className,
}: {
  kind: ShowcaseProduct["imageKind"];
  className?: string;
}) {
  if (kind === "milk") {
    return (
      <div
        className={`flex items-end justify-center overflow-hidden bg-gradient-to-b from-sky-50 to-white ${className ?? ""}`}
      >
        <img
          src={milkBottleImage}
          alt=""
          className="max-h-[92%] w-[72%] object-contain object-bottom"
        />
      </div>
    );
  }
  if (kind === "peanut") {
    return (
      <div
        className={`flex items-center justify-center overflow-hidden bg-gradient-to-br from-amber-100 to-amber-50 ${className ?? ""}`}
        aria-hidden
      >
        <svg viewBox="0 0 80 80" className="h-14 w-14 shrink-0 sm:h-20 sm:w-20 text-amber-800/80">
          <ellipse cx="40" cy="48" rx="22" ry="14" fill="currentColor" opacity="0.25" />
          <circle cx="28" cy="32" r="6" fill="currentColor" opacity="0.5" />
          <circle cx="48" cy="28" r="5" fill="currentColor" opacity="0.45" />
          <circle cx="52" cy="44" r="4" fill="currentColor" opacity="0.4" />
        </svg>
      </div>
    );
  }
  return (
    <div
      className={`flex items-center justify-center overflow-hidden bg-gradient-to-br from-yellow-50 to-amber-50 ${className ?? ""}`}
      aria-hidden
    >
      <svg viewBox="0 0 80 80" className="h-14 w-14 shrink-0 sm:h-20 sm:w-20 text-amber-700/70">
        <path
          d="M22 52 L40 22 L58 52 Z"
          fill="currentColor"
          opacity="0.35"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
        <path d="M34 48h12" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" opacity="0.4" />
      </svg>
    </div>
  );
}

function AboutSplashBlob({ className }: { className?: string }) {
  const gid = useId().replace(/:/g, "");
  const gradId = `aboutMilkGlow-${gid}`;
  return (
    <svg viewBox="0 0 400 400" className={className} aria-hidden>
      <defs>
        <radialGradient id={gradId} cx="50%" cy="55%" r="50%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
          <stop offset="55%" stopColor="#f8fafc" stopOpacity="0.85" />
          <stop offset="100%" stopColor="#e2e8f0" stopOpacity="0" />
        </radialGradient>
      </defs>
      <ellipse cx="200" cy="220" rx="160" ry="120" fill={`url(#${gradId})`} />
      <path
        fill="#ffffff"
        fillOpacity="0.9"
        d="M120,280 Q200,200 280,260 Q320,290 300,320 Q240,360 160,340 Q100,320 120,280Z"
      />
    </svg>
  );
}

type ContactForm = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

const emptyContactForm: ContactForm = {
  name: "",
  email: "",
  subject: "",
  message: "",
};

export default function Home() {
  const [contactOpen, setContactOpen] = useState(false);
  const [contactForm, setContactForm] = useState<ContactForm>(emptyContactForm);
  const [productQty, setProductQty] = useState<Record<string, number>>({});
  const contactDialogTitleId = useId();

  const addProduct = (id: string) => {
    setProductQty((q) => ({ ...q, [id]: 1 }));
  };

  const incProduct = (id: string) => {
    setProductQty((q) => ({ ...q, [id]: (q[id] ?? 0) + 1 }));
  };

  const decProduct = (id: string) => {
    setProductQty((q) => {
      const n = (q[id] ?? 0) - 1;
      if (n <= 0) {
        const next = { ...q };
        delete next[id];
        return next;
      }
      return { ...q, [id]: n };
    });
  };

  useEffect(() => {
    if (!contactOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setContactOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [contactOpen]);

  useEffect(() => {
    document.body.style.overflow = contactOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [contactOpen]);

  const closeContactModal = () => {
    setContactOpen(false);
    setContactForm(emptyContactForm);
  };

  const submitContactEmail = (e: React.FormEvent) => {
    e.preventDefault();
    const subject =
      contactForm.subject.trim() || "Message from MilkRoute website";
    const body = `Name: ${contactForm.name.trim()}\nEmail: ${contactForm.email.trim()}\n\n${contactForm.message.trim()}`;
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    closeContactModal();
  };

  const contactFieldClass =
    "mt-1.5 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20";

  return (
    <div className="relative min-h-dvh min-h-[100svh] overflow-x-hidden bg-slate-50 text-slate-900">
      <header className="sticky top-0 z-50 border-b border-slate-200/90 bg-white/95 shadow-sm backdrop-blur-md supports-[backdrop-filter]:bg-white/90">
        <div className="mx-auto max-w-6xl px-3 sm:px-6">
          <div className="flex min-h-[3.75rem] items-center justify-between gap-2 py-2 sm:min-h-[4.25rem] sm:gap-3 sm:py-0">
            <Link
              to="/"
              className={`flex min-w-0 shrink items-center gap-2 text-base font-bold tracking-tight text-slate-900 sm:gap-2.5 sm:text-lg md:text-xl ${linkFocus}`}
            >
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-sky-50 text-sky-600 ring-1 ring-sky-100 sm:h-10 sm:w-10">
                <CartIcon className="h-5 w-5" />
              </span>
              <span className="truncate">MilkRoute</span>
            </Link>

            <nav
              className="hidden flex-1 items-center justify-center gap-0.5 md:flex lg:justify-center lg:gap-1"
              aria-label="Primary"
            >
              {navLinks.map(({ href, label }) => (
                <a
                  key={href}
                  href={href}
                  className={`whitespace-nowrap rounded-lg px-2 py-2 text-xs font-medium text-slate-600 transition hover:bg-slate-50 hover:text-slate-900 sm:px-3 sm:text-sm ${linkFocus}`}
                >
                  {label}
                </a>
              ))}
            </nav>

            <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
              <Link
                to="/login"
                className={`min-h-11 touch-manipulation rounded-full bg-[#007BFF] px-3 py-2.5 text-xs font-semibold text-white shadow-md shadow-sky-900/10 transition hover:bg-[#0066dd] hover:shadow-lg active:scale-[0.98] sm:min-h-0 sm:px-4 sm:text-sm md:px-5 ${linkFocus}`}
              >
                Log in
              </Link>
              <Link
                to="/register"
                className={`hidden min-h-11 touch-manipulation rounded-full border border-slate-200 bg-white px-3 py-2.5 text-xs font-semibold text-slate-800 shadow-sm transition hover:border-slate-300 hover:bg-slate-50 sm:inline-flex sm:min-h-0 sm:px-4 sm:text-sm ${linkFocus}`}
              >
                Sign up
              </Link>
              <Link
                to="/login"
                className={`flex h-11 w-11 min-h-11 min-w-11 touch-manipulation items-center justify-center rounded-full bg-[#007BFF] text-white shadow-md transition hover:bg-[#0066dd] active:scale-[0.98] sm:h-10 sm:w-10 sm:min-h-0 sm:min-w-0 ${linkFocus}`}
                aria-label="Open account"
              >
                <CartIcon className="h-5 w-5 text-white" />
              </Link>
            </div>
          </div>

          <nav
            className="-mx-1 flex snap-x snap-mandatory gap-1.5 overflow-x-auto overscroll-x-contain px-1 pb-3 pt-0.5 [-ms-overflow-style:none] [scrollbar-width:none] md:hidden [&::-webkit-scrollbar]:hidden"
            aria-label="Sections"
          >
            {navLinks.map(({ href, label }) => (
              <a
                key={href}
                href={href}
                className="snap-start shrink-0 touch-manipulation rounded-full border border-slate-200/90 bg-white px-3 py-2 text-xs font-medium text-slate-600 shadow-sm transition active:bg-slate-50 hover:border-sky-200 hover:text-slate-900 min-[360px]:px-3.5"
              >
                {label}
              </a>
            ))}
          </nav>
        </div>
      </header>

      <div className="relative overflow-hidden bg-gradient-to-b from-sky-200 via-sky-100 to-sky-50 pb-6 pt-5 sm:pb-8 sm:pt-10">
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage: `
              radial-gradient(ellipse 70% 45% at 15% 25%, rgba(34, 197, 94, 0.12) 0%, transparent 50%),
              radial-gradient(ellipse 55% 40% at 85% 15%, rgba(34, 197, 94, 0.1) 0%, transparent 45%),
              radial-gradient(circle at 50% 70%, rgba(255,255,255,0.45) 0%, transparent 50%)
            `,
          }}
        />

        <main className="relative z-10 mx-auto max-w-6xl px-3 sm:px-6">
          <section
            id="home"
            className={`${SECTION_ANCHOR} grid grid-cols-1 gap-8 sm:gap-10 lg:grid-cols-12 lg:items-end lg:gap-10 lg:gap-y-10`}
          >
            <div className="flex flex-col items-center text-center lg:col-span-4 lg:items-start lg:text-left">
              <p className="font-[family-name:var(--font-script)] text-lg text-slate-800 sm:text-xl md:text-2xl">
                Healthy and tasty?
              </p>
              <p className="mt-3 max-w-md text-sm leading-relaxed text-slate-600 sm:text-base lg:max-w-none">
                Farm-fresh milk on your schedule—no store runs required.
              </p>
              <a
                href="#products"
                className={`mt-8 hidden min-h-11 touch-manipulation items-center gap-2 rounded-full bg-[#007BFF] px-8 py-3 text-base font-semibold text-white shadow-lg shadow-sky-900/20 transition hover:bg-[#0066dd] active:scale-[0.98] sm:px-10 sm:py-3.5 lg:inline-flex ${linkFocus}`}
              >
                See more items
                <ArrowDownIcon className="h-5 w-5 opacity-90" />
              </a>
            </div>

            <div className="relative flex min-h-[200px] flex-col items-center justify-end sm:min-h-[240px] lg:col-span-8 lg:min-h-[300px]">
              <h1 className="mb-4 font-[family-name:var(--font-display)] text-[clamp(2.25rem,9vw,3.75rem)] font-black uppercase leading-none tracking-tight text-slate-900 sm:mb-5 sm:text-[clamp(2.75rem,10vw,4rem)] lg:hidden">
                Fresh milk
              </h1>

              <div className="relative flex w-full max-w-full items-end justify-center">
                <h1 className="pointer-events-none absolute inset-x-0 bottom-[6%] z-0 hidden max-w-full items-end justify-center gap-0 overflow-hidden px-1 font-[family-name:var(--font-display)] text-[clamp(2rem,5.5vw,4.75rem)] font-black uppercase leading-none tracking-tight text-slate-900 lg:flex xl:text-[clamp(2.75rem,6vw,4.75rem)]">
                  <span className="translate-x-[6%] sm:translate-x-[8%]">Fresh</span>
                  <span className="w-[clamp(4rem,20vw,14rem)] shrink-0 sm:w-[clamp(6rem,24vw,14rem)]" aria-hidden />
                  <span className="-translate-x-[6%] sm:-translate-x-[8%]">Milk</span>
                </h1>
                <div className="absolute inset-0 flex items-end justify-center opacity-20 blur-3xl">
                  <div className="mb-4 h-36 w-24 rounded-full bg-white sm:h-44 sm:w-28 lg:mb-8 lg:h-52 lg:w-36" />
                </div>
                <img
                  src={milkBottleImage}
                  alt="Fresh milk in a glass bottle and a glass"
                  width={960}
                  height={640}
                  decoding="async"
                  sizes="(max-width: 1024px) 92vw, 600px"
                  className="relative z-[2] h-auto max-h-[min(36dvh,280px)] w-full max-w-[min(100%,520px)] object-contain object-bottom drop-shadow-2xl min-[400px]:max-h-[min(38dvh,340px)] sm:max-h-[min(40vh,360px)] lg:max-h-[min(48dvh,440px)] lg:max-w-[600px] lg:translate-y-2"
                />
              </div>

              <a
                href="#products"
                className={`mt-6 inline-flex min-h-11 w-full max-w-xs touch-manipulation items-center justify-center gap-2 rounded-full bg-[#007BFF] px-8 py-3 text-base font-semibold text-white shadow-lg shadow-sky-900/20 transition hover:bg-[#0066dd] active:scale-[0.98] sm:mt-8 sm:w-auto sm:max-w-none sm:px-10 sm:py-3.5 lg:hidden ${linkFocus}`}
              >
                See more items
                <ArrowDownIcon className="h-5 w-5 opacity-90" />
              </a>
            </div>
          </section>
        </main>

        <div className="relative z-[1] mt-2 h-12 w-full sm:mt-4 sm:h-16">
          <MilkSplash className="absolute bottom-0 left-1/2 h-full w-[120%] min-w-full -translate-x-1/2 text-white" />
        </div>
      </div>

      <div className="relative z-20 border-b border-slate-100 bg-white px-3 py-8 sm:px-6 sm:py-12 md:py-14">
        <div className="mx-auto max-w-6xl">
          <section
            id="products"
            className={SECTION_ANCHOR}
            aria-labelledby="products-heading"
          >
            <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-end sm:justify-between sm:gap-4">
              <h2
                id="products-heading"
                className="max-w-[20ch] text-balance font-[family-name:var(--font-display)] text-xl font-bold tracking-tight text-[#007BFF] min-[400px]:max-w-none sm:text-2xl md:text-3xl"
              >
                Milk, Butter &amp; Cheese
              </h2>
              <Link
                to="/register"
                className={`inline-flex min-h-11 shrink-0 touch-manipulation items-center text-sm font-semibold text-sky-600 transition hover:text-sky-800 sm:self-auto ${linkFocus}`}
              >
                See more
              </Link>
            </div>

            <div className="mt-6 grid grid-cols-1 gap-4 min-[400px]:grid-cols-2 min-[400px]:gap-4 sm:mt-8 sm:gap-5 lg:mt-10 lg:grid-cols-4 lg:gap-6">
              {SHOWCASE_PRODUCTS.map((p) => {
                const qty = productQty[p.id] ?? 0;
                return (
                  <article
                    key={p.id}
                    className={`flex min-w-0 flex-col rounded-2xl border bg-white p-3 shadow-sm transition sm:p-4 ${
                      qty > 0
                        ? "border-sky-200 shadow-lg ring-1 ring-sky-100"
                        : "border-slate-200 hover:border-slate-300 hover:shadow-md"
                    }`}
                  >
                    <ProductThumb kind={p.imageKind} className="aspect-square w-full rounded-xl" />
                    <h3 className="mt-3 line-clamp-2 text-sm font-semibold leading-snug text-slate-900 sm:text-base">
                      {p.name}
                    </h3>
                    <p className="mt-1 text-xs text-slate-500">{p.size}</p>
                    <div className="mt-2 flex flex-wrap items-baseline gap-2">
                      <span className="text-base font-bold text-slate-900 sm:text-lg">
                        ₹{p.price}
                      </span>
                      {p.oldPrice != null ? (
                        <span className="text-sm text-slate-400 line-through">₹{p.oldPrice}</span>
                      ) : null}
                    </div>
                    <div className="mt-4 flex flex-1 flex-col justify-end">
                      {qty > 0 ? (
                        <div className="flex w-full max-w-full items-stretch justify-stretch gap-0 rounded-full border-2 border-[#007BFF] bg-white p-0.5 shadow-sm">
                          <button
                            type="button"
                            onClick={() => decProduct(p.id)}
                            className="flex min-h-11 min-w-11 flex-1 touch-manipulation items-center justify-center rounded-full text-lg font-semibold text-[#007BFF] transition hover:bg-sky-50 sm:min-h-0 sm:flex-none sm:px-0"
                            aria-label="Decrease quantity"
                          >
                            −
                          </button>
                          <span className="flex min-h-11 min-w-[2.5rem] flex-none items-center justify-center text-center text-sm font-semibold text-slate-900 sm:min-h-0">
                            {qty}
                          </span>
                          <button
                            type="button"
                            onClick={() => incProduct(p.id)}
                            className="flex min-h-11 min-w-11 flex-1 touch-manipulation items-center justify-center rounded-full text-lg font-semibold text-[#007BFF] transition hover:bg-sky-50 sm:min-h-0 sm:flex-none sm:px-0"
                            aria-label="Increase quantity"
                          >
                            +
                          </button>
                        </div>
                      ) : (
                        <div className="flex justify-end">
                          <button
                            type="button"
                            onClick={() => addProduct(p.id)}
                            className={`flex h-11 w-11 min-h-11 min-w-11 touch-manipulation items-center justify-center rounded-full bg-[#007BFF] text-white shadow-md transition hover:bg-[#0066dd] active:scale-95 sm:h-10 sm:w-10 sm:min-h-0 sm:min-w-0 ${linkFocus}`}
                            aria-label={`Add ${p.name} to cart`}
                          >
                            <CartIcon className="h-5 w-5 text-white" />
                          </button>
                        </div>
                      )}
                    </div>
                  </article>
                );
              })}
            </div>
          </section>
        </div>
      </div>

      <div className="relative z-20 bg-slate-50 px-3 pb-28 pt-6 sm:px-6 sm:pb-24 sm:pt-8">
        <div className="mx-auto max-w-6xl">
          <section
            id="about"
            className={`${SECTION_ANCHOR} pt-6 sm:pt-8`}
            aria-labelledby="about-heading"
          >
            <div className="overflow-hidden rounded-3xl border border-slate-200/80 bg-slate-100 shadow-sm">
              <SectionWave className="block w-full text-slate-50" />
              <div className="grid gap-10 px-4 py-10 sm:gap-12 sm:px-8 sm:py-14 lg:grid-cols-12 lg:items-center lg:gap-10">
                <div className="lg:col-span-5">
                  <h2
                    id="about-heading"
                    className="font-[family-name:var(--font-display)] text-2xl font-bold leading-tight tracking-tight text-slate-900 sm:text-3xl"
                  >
                    Our products are based on high quality milk
                  </h2>
                  <p className="mt-4 text-sm leading-relaxed text-slate-600 sm:text-base">
                    MilkRoute partners with trusted local dairies so every delivery meets strict
                    quality checks—from temperature-controlled transport to tamper-evident packaging
                    at your doorstep.
                  </p>
                  <div className="mt-6 flex flex-wrap gap-2">
                    {aboutBadges.map((label) => (
                      <span
                        key={label}
                        className="inline-flex h-11 min-w-[2.75rem] items-center justify-center rounded-full border border-slate-200/90 bg-white px-3 text-xs font-semibold text-slate-700 shadow-sm"
                      >
                        {label}
                      </span>
                    ))}
                  </div>
                  <h3 className="mt-8 text-lg font-bold text-slate-900 sm:text-xl">
                    Environmentally friendly
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-slate-600 sm:text-base">
                    We optimize delivery routes to cut unnecessary miles, use returnable glass where
                    possible, and recycle packaging so your daily milk habit stays kinder to the
                    planet.
                  </p>
                  <a
                    href="#contact"
                    className={`mt-8 inline-flex w-full min-h-11 touch-manipulation items-center justify-center rounded-sm bg-[#007BFF] px-8 py-3 text-sm font-bold uppercase tracking-wide text-white shadow-md transition hover:bg-[#0066dd] sm:w-auto ${linkFocus} ring-offset-slate-100`}
                  >
                    Read more
                  </a>
                </div>

                <div className="relative flex min-h-[220px] items-center justify-center sm:min-h-[260px] lg:col-span-4">
                  <AboutSplashBlob className="pointer-events-none absolute inset-0 -m-6 h-full max-h-[min(100%,380px)] w-full opacity-90 sm:-m-8 sm:max-h-[min(100%,420px)]" />
                  <img
                    src={milkBottleImage}
                    alt="Fresh milk bottle and glass"
                    width={960}
                    height={640}
                    decoding="async"
                    sizes="(max-width: 1024px) 90vw, 400px"
                    className="relative z-[1] mx-auto h-auto max-h-[min(40dvh,320px)] w-full max-w-[min(100%,300px)] object-contain drop-shadow-xl min-[400px]:max-w-[340px] sm:max-h-[min(48vh,420px)] sm:max-w-[400px]"
                  />
                </div>

                <ul className="flex min-w-0 flex-col gap-6 sm:gap-8 lg:col-span-3">
                  <li className="flex gap-3 sm:gap-4">
                    <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-sky-100 text-sky-600 ring-1 ring-sky-200/60">
                      <IconLeaf className="h-7 w-7" />
                    </span>
                    <div className="min-w-0">
                      <p className="font-semibold text-slate-900">100% organic products</p>
                      <p className="mt-1 text-sm leading-relaxed text-slate-600">
                        Certified sources and clear labeling so you always know what is in your
                        bottle.
                      </p>
                    </div>
                  </li>
                  <li className="flex gap-3 sm:gap-4">
                    <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-sky-100 text-sky-600 ring-1 ring-sky-200/60">
                      <IconBabyBottle className="h-7 w-7" />
                    </span>
                    <div className="min-w-0">
                      <p className="font-semibold text-slate-900">Recommended for babies</p>
                      <p className="mt-1 text-sm leading-relaxed text-slate-600">
                        Gentle handling and pasteurization standards suited for growing families.
                      </p>
                    </div>
                  </li>
                  <li className="flex gap-3 sm:gap-4">
                    <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-sky-100 text-sky-600 ring-1 ring-sky-200/60">
                      <IconCow className="h-7 w-7" />
                    </span>
                    <div className="min-w-0">
                      <p className="font-semibold text-slate-900">High quality raw milk</p>
                      <p className="mt-1 text-sm leading-relaxed text-slate-600">
                        Cold chain from farm to you, with batch traceability you can trust.
                      </p>
                    </div>
                  </li>
                </ul>
              </div>
              <SectionWave flip className="block w-full text-slate-50" />
            </div>
          </section>

          <div className="mt-10 flex flex-col gap-8">
            <section
              id="reviews"
              className={`${SECTION_ANCHOR} rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-8`}
            >
              <p className="text-sm font-semibold uppercase tracking-wide text-sky-700">Reviews</p>
              <h2 className="mt-2 text-xl font-bold text-slate-900 sm:text-2xl">
                Loved by families in Hyderabad
              </h2>
              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-600 sm:text-base">
                Real feedback from subscribers who count on MilkRoute for fresh milk, every day.
              </p>

              <ul className="mt-8 flex flex-col gap-5">
                <li className="rounded-xl border border-slate-100 bg-slate-50/80 p-5">
                  <p className="text-amber-400" aria-label="5 out of 5 stars">
                    ★★★★★
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-slate-700 sm:text-base">
                    &ldquo;We switched six months ago and the milk tastes noticeably fresher. Delivery
                    is always before 7 a.m.—perfect before school and office.&rdquo;
                  </p>
                  <p className="mt-4 text-sm font-semibold text-slate-900">Ananya Reddy</p>
                  <p className="text-xs text-slate-500">Jubilee Hills, Hyderabad</p>
                </li>

                <li className="rounded-xl border border-slate-100 bg-slate-50/80 p-5">
                  <p className="text-amber-400" aria-label="5 out of 5 stars">
                    ★★★★★
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-slate-700 sm:text-base">
                    &ldquo;The app makes it easy to pause when we travel. Support on WhatsApp is quick
                    and polite. Highly recommend for busy parents.&rdquo;
                  </p>
                  <p className="mt-4 text-sm font-semibold text-slate-900">Vikram &amp; Priya K.</p>
                  <p className="text-xs text-slate-500">Kondapur, Hyderabad</p>
                </li>

                <li className="rounded-xl border border-slate-100 bg-slate-50/80 p-5">
                  <p className="text-amber-400" aria-label="5 out of 5 stars">
                    ★★★★★
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-slate-700 sm:text-base">
                    &ldquo;Glass bottles and consistent quality matter to us. MilkRoute feels like a
                    local dairy with the reliability of a bigger brand.&rdquo;
                  </p>
                  <p className="mt-4 text-sm font-semibold text-slate-900">Mohammed Irfan</p>
                  <p className="text-xs text-slate-500">Banjara Hills, Hyderabad</p>
                </li>
              </ul>
            </section>

            <section
              id="contact"
              className={`${SECTION_ANCHOR} rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-8`}
            >
              <p className="text-sm font-semibold uppercase tracking-wide text-sky-700">Contact</p>
              <h2 className="mt-2 text-xl font-bold text-slate-900 sm:text-2xl">Visit or reach us</h2>
              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-slate-600 sm:text-base">
                Walk-ins by appointment. For deliveries and account help, sign in or call our
                Hyderabad office—we are happy to assist.
              </p>

              <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-10">
                <div>
                  <h3 className="text-sm font-bold uppercase tracking-wide text-slate-500">
                    Office address
                  </h3>
                  <address className="mt-3 not-italic text-sm leading-relaxed text-slate-700 sm:text-base">
                    <span className="font-semibold text-slate-900">MilkRoute</span>
                    <br />
                    Plot 42, 2nd Floor, SBR Tech Park
                    <br />
                    Hitech City Main Road, Madhapur
                    <br />
                    Hyderabad, Telangana 500081
                    <br />
                    India
                  </address>
                  <button
                    type="button"
                    onClick={() => setContactOpen(true)}
                    className={`mt-4 inline-flex w-full min-h-11 touch-manipulation items-center justify-center rounded-full bg-[#007BFF] px-5 py-2.5 text-sm font-semibold text-white shadow-md transition hover:bg-[#0066dd] active:scale-[0.98] md:w-auto ${linkFocus}`}
                  >
                    Contact us
                  </button>
                </div>

                <div>
                  <h3 className="text-sm font-bold uppercase tracking-wide text-slate-500">
                    Phone &amp; email
                  </h3>
                  <dl className="mt-3 space-y-3 text-sm text-slate-700 sm:text-base">
                    <div>
                      <dt className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                        Phone
                      </dt>
                      <dd>
                        <a
                          href="tel:+914071234567"
                          className="font-medium text-slate-900 hover:text-[#007BFF]"
                        >
                          +91 40 7123 4567
                        </a>
                      </dd>
                    </div>
                    <div>
                      <dt className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                        Email
                      </dt>
                      <dd>
                        <a
                          href={`mailto:${CONTACT_EMAIL}`}
                          className="font-medium text-slate-900 hover:text-[#007BFF]"
                        >
                          {CONTACT_EMAIL}
                        </a>
                      </dd>
                    </div>
                    <div>
                      <dt className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                        Hours
                      </dt>
                      <dd>Mon–Sat: 8:00 a.m. – 6:00 p.m.</dd>
                      <dd>Sunday: Closed</dd>
                    </div>
                  </dl>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 z-40 flex justify-center px-4 pb-[max(1rem,env(safe-area-inset-bottom,0px))] pt-2 sm:hidden">
        <Link
          to="/register"
          className={`min-h-11 w-full max-w-sm touch-manipulation rounded-full bg-white px-7 py-3 text-center text-sm font-semibold text-[#007BFF] shadow-lg ring-1 ring-slate-200/90 ${linkFocus}`}
        >
          Sign up
        </Link>
      </div>

      {contactOpen ? (
        <div
          className="fixed inset-0 z-[100] flex items-end justify-center bg-slate-900/50 p-0 sm:items-center sm:p-4"
          role="presentation"
          onClick={closeContactModal}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby={contactDialogTitleId}
            className="max-h-[min(92dvh,calc(100dvh-env(safe-area-inset-top,0px)-1rem))] w-full max-w-lg overflow-y-auto overscroll-y-contain rounded-t-2xl border border-slate-200 border-b-0 bg-white p-4 pb-[max(1.25rem,env(safe-area-inset-bottom,0px))] shadow-2xl sm:mx-2 sm:rounded-2xl sm:border-b sm:p-8"
            onClick={(ev) => ev.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-4">
              <h2 id={contactDialogTitleId} className="text-lg font-bold text-slate-900">
                Email us
              </h2>
              <button
                type="button"
                onClick={closeContactModal}
                className={`rounded-lg p-1.5 text-slate-500 transition hover:bg-slate-100 hover:text-slate-800 ${linkFocus}`}
                aria-label="Close"
              >
                <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden>
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
            <p className="mt-2 text-sm text-slate-600">
              Your email app will open with this message addressed to{" "}
              <span className="font-medium text-slate-800">{CONTACT_EMAIL}</span>.
            </p>

            <form className="mt-6 space-y-4" onSubmit={submitContactEmail}>
              <div>
                <label htmlFor="contact-name" className="text-sm font-medium text-slate-700">
                  Your name
                </label>
                <input
                  id="contact-name"
                  name="name"
                  required
                  autoComplete="name"
                  value={contactForm.name}
                  onChange={(e) => setContactForm((f) => ({ ...f, name: e.target.value }))}
                  className={contactFieldClass}
                  placeholder="Full name"
                />
              </div>
              <div>
                <label htmlFor="contact-email" className="text-sm font-medium text-slate-700">
                  Your email
                </label>
                <input
                  id="contact-email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  value={contactForm.email}
                  onChange={(e) => setContactForm((f) => ({ ...f, email: e.target.value }))}
                  className={contactFieldClass}
                  placeholder="you@example.com"
                />
              </div>
              <div>
                <label htmlFor="contact-subject" className="text-sm font-medium text-slate-700">
                  Subject <span className="font-normal text-slate-400">(optional)</span>
                </label>
                <input
                  id="contact-subject"
                  name="subject"
                  value={contactForm.subject}
                  onChange={(e) => setContactForm((f) => ({ ...f, subject: e.target.value }))}
                  className={contactFieldClass}
                  placeholder="How can we help?"
                />
              </div>
              <div>
                <label htmlFor="contact-message" className="text-sm font-medium text-slate-700">
                  Message
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  required
                  rows={5}
                  value={contactForm.message}
                  onChange={(e) => setContactForm((f) => ({ ...f, message: e.target.value }))}
                  className={`${contactFieldClass} resize-y min-h-[120px]`}
                  placeholder="Write your message here…"
                />
              </div>
              <div className="flex flex-col-reverse gap-3 pt-2 sm:flex-row sm:flex-wrap">
                <button
                  type="submit"
                  className={`min-h-11 w-full touch-manipulation rounded-full bg-[#007BFF] px-6 py-2.5 text-sm font-semibold text-white shadow-md transition hover:bg-[#0066dd] sm:w-auto ${linkFocus}`}
                >
                  Open in email app
                </button>
                <button
                  type="button"
                  onClick={closeContactModal}
                  className={`min-h-11 w-full touch-manipulation rounded-full border border-slate-200 bg-white px-6 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 sm:w-auto ${linkFocus}`}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : null}
    </div>
  );
}
