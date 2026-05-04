import { useState } from "react";
import api from "../services/api";
import { Link, useNavigate } from "react-router-dom";
import { useToast } from "../hooks/useToast";
import { btnPrimary } from "../components/ui/buttonClasses";
import Spinner from "../components/ui/Spinner";
import { cardSurface } from "../components/ui/surfaces";

type FormType = {
  name?: string;
  phone?: string;
  password?: string;
  address?: string;
};

export default function Register() {
  const [form, setForm] = useState<FormType>({});
  const [submitting, setSubmitting] = useState(false);
  const navigate = useNavigate();
  const { showToast } = useToast();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async () => {
    setSubmitting(true);
    try {
      await api.post("/auth/register", form);
      showToast("success", "Account created. You can sign in now.");
      navigate("/login", { replace: true });
    } catch {
      showToast("error", "Registration failed. Check your details and try again.");
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
            Create your account to start deliveries.
          </p>
        </div>

        <div className={`${cardSurface} w-full max-w-lg p-8`}>
          <h1 className="text-lg font-semibold text-slate-900">Register</h1>
          <p className="mt-1 text-sm text-slate-500">
            We only use this to schedule your orders.
          </p>

          <div className="mt-8 grid gap-5 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label htmlFor="name" className="text-sm font-medium text-slate-700">
                Name
              </label>
              <input
                id="name"
                name="name"
                className={fieldClass}
                placeholder="Full name"
                onChange={handleChange}
                autoComplete="name"
                disabled={submitting}
              />
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="phone" className="text-sm font-medium text-slate-700">
                Phone
              </label>
              <input
                id="phone"
                name="phone"
                className={fieldClass}
                placeholder="10-digit number"
                onChange={handleChange}
                autoComplete="tel"
                disabled={submitting}
              />
            </div>
            <div className="sm:col-span-2">
              <label
                htmlFor="password"
                className="text-sm font-medium text-slate-700"
              >
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                className={fieldClass}
                placeholder="Choose a strong password"
                onChange={handleChange}
                autoComplete="new-password"
                disabled={submitting}
              />
            </div>
            <div className="sm:col-span-2">
              <label
                htmlFor="address"
                className="text-sm font-medium text-slate-700"
              >
                Address
              </label>
              <input
                id="address"
                name="address"
                className={fieldClass}
                placeholder="Delivery address"
                onChange={handleChange}
                autoComplete="street-address"
                disabled={submitting}
              />
            </div>
          </div>

          <button
            type="button"
            onClick={() => void handleRegister()}
            disabled={submitting}
            className={`mt-8 w-full ${btnPrimary}`}
          >
            {submitting ? (
              <>
                <Spinner className="h-4 w-4 text-white" />
                Creating account…
              </>
            ) : (
              "Create account"
            )}
          </button>

          <p className="mt-8 text-center text-sm text-slate-500">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-semibold text-indigo-600 hover:text-indigo-700"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
