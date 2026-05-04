import { useState } from "react";
import api from "../services/api";
import { Link, useNavigate } from "react-router-dom";
import { useToast } from "../hooks/useToast";
import { btnPrimary } from "../components/ui/buttonClasses";
import Spinner from "../components/ui/Spinner";
import { cardSurface } from "../components/ui/surfaces";

export default function Login() {
  const [phone, setPhone] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();
  const { showToast } = useToast();

  const handleLogin = async () => {
    setSubmitting(true);
    try {
      const res = await api.post<{ token: string }>("/auth/login", {
        phone,
        password,
      });

      localStorage.setItem("token", res.data.token);
      showToast("success", "Signed in successfully.");
      navigate("/dashboard");
    } catch {
      showToast("error", "Invalid phone or password. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const fieldClass =
    "mt-1.5 w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm transition duration-200 outline-none placeholder:text-slate-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 disabled:cursor-not-allowed disabled:opacity-60";

  return (
    <div className="flex min-h-screen flex-col bg-slate-50">
      <div className="flex flex-1 flex-col items-center justify-center px-4 py-12">
        <div className="mb-8 text-center">
          <Link
            to="/"
            className="inline-block text-2xl font-bold tracking-tight text-indigo-600 transition hover:text-indigo-700"
          >
            MilkRoute
          </Link>
          <p className="mt-2 text-sm text-slate-500">
            Sign in to manage your milk deliveries.
          </p>
        </div>

        <div className={`${cardSurface} w-full max-w-lg p-8`}>
          <h1 className="text-lg font-semibold text-slate-900">Welcome back</h1>
          <p className="mt-1 text-sm text-slate-500">
            Enter your phone and password.
          </p>

          <div className="mt-8 space-y-5">
            <div>
              <label htmlFor="phone" className="text-sm font-medium text-slate-700">
                Phone
              </label>
              <input
                id="phone"
                className={fieldClass}
                placeholder="10-digit number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                autoComplete="tel"
                disabled={submitting}
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="text-sm font-medium text-slate-700"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                className={fieldClass}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                disabled={submitting}
              />
            </div>

            <button
              type="button"
              onClick={() => void handleLogin()}
              disabled={submitting}
              className={`mt-2 w-full ${btnPrimary}`}
            >
              {submitting ? (
                <>
                  <Spinner className="h-4 w-4 text-white" />
                  Signing in…
                </>
              ) : (
                "Sign in"
              )}
            </button>
          </div>

          <p className="mt-8 text-center text-sm text-slate-500">
            New here?{" "}
            <Link
              to="/register"
              className="font-semibold text-indigo-600 hover:text-indigo-700"
            >
              Create an account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
