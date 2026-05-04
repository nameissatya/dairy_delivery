import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastProvider } from "./context/ToastProvider";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Subscriptions from "./pages/Subscriptions";
import Deliveries from "./pages/Deliveries";
import ProtectedLayout from "./routes/ProtectedLayout";

export default function App() {
  return (
    <BrowserRouter>
      <ToastProvider>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route element={<ProtectedLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/subscriptions" element={<Subscriptions />} />
            <Route path="/deliveries" element={<Deliveries />} />
          </Route>
        </Routes>
      </ToastProvider>
    </BrowserRouter>
  );
}
