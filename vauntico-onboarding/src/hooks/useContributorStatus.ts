import { useEffect, useState } from "react";

export function useContributorStatus(idOrEmail?: string) {
  const [status, setStatus] = useState<null | {
    onboardingStatus: string;
    productTheme: string;
    affirmation: string;
    timestamp: string;
    avatarInitials: string;
    legacyScore: number | null;
    submissionMethod: string | null;
    subscriptionType?: string;
    renewalDate?: string;
  }>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!idOrEmail) return;
    setLoading(true);
    setError("");
    fetch("/api/contributor-status", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: idOrEmail }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) setError(data.error);
        else {
          fetch(`/api/billing?email=${encodeURIComponent(idOrEmail)}`)
            .then((res) => res.json())
            .then((billing) => {
              setStatus({ ...data, subscriptionType: billing.SubscriptionType, renewalDate: billing.RenewalDate });
            })
            .catch(() => setStatus(data));
        }
      })
      .catch(() => setError("Failed to fetch contributor status."))
      .finally(() => setLoading(false));
  }, [idOrEmail]);

  return { status, loading, error };
}
