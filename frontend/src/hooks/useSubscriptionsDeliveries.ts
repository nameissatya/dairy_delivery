import { useCallback, useEffect, useState } from "react";
import api from "../services/api";
import type { Delivery, Subscription } from "../types/models";

export function useSubscriptionsDeliveries() {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([]);
  const [deliveries, setDeliveries] = useState<Delivery[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);

  const fetchLists = useCallback(async () => {
    const token = localStorage.getItem("token");
    const authHeader = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const [subsRes, delRes] = await Promise.all([
      api.get<Subscription[]>("/subscriptions", authHeader),
      api.get<Delivery[]>("/deliveries/my", authHeader),
    ]);
    setSubscriptions(subsRes.data);
    setDeliveries(delRes.data);
  }, []);

  const refresh = useCallback(async () => {
    setLoadError(null);
    setLoading(true);
    try {
      await fetchLists();
    } catch {
      setLoadError("Could not load data. Try signing in again.");
    } finally {
      setLoading(false);
    }
  }, [fetchLists]);

  /** Reload lists without full-page loading (e.g. after create). */
  const refreshSilent = useCallback(async () => {
    try {
      await fetchLists();
    } catch {
      throw new Error("Could not refresh your data. Please reload the page.");
    }
  }, [fetchLists]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- intentional mount fetch
    void refresh();
  }, [refresh]);

  const toggleSubscription = async (id: string) => {
    const token = localStorage.getItem("token");
    try {
      const res = await api.put<{ status: string }>(
        `/subscriptions/${id}/toggle`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setSubscriptions((prev) =>
        prev.map((s) =>
          s._id === id ? { ...s, status: res.data.status } : s
        )
      );
    } catch {
      throw new Error("Could not update subscription. Please try again.");
    }
  };

  const updateDeliveryInState = (updated: Delivery) => {
    setDeliveries((prev) =>
      prev.map((d) => (d._id === updated._id ? { ...d, ...updated } : d))
    );
  };

  const skipDelivery = async (id: string) => {
    const token = localStorage.getItem("token");
    try {
      const res = await api.put<Delivery>(`/deliveries/${id}/skip`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      updateDeliveryInState(res.data);
    } catch {
      throw new Error("Could not skip delivery. Please try again.");
    }
  };

  const unskipDelivery = async (id: string) => {
    const token = localStorage.getItem("token");
    try {
      const res = await api.put<Delivery>(`/deliveries/${id}/unskip`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      updateDeliveryInState(res.data);
    } catch {
      throw new Error("Could not restore delivery. Please try again.");
    }
  };

  return {
    subscriptions,
    deliveries,
    loading,
    loadError,
    refresh,
    refreshSilent,
    toggleSubscription,
    skipDelivery,
    unskipDelivery,
  };
}
