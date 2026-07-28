"use client";

import { Loader2, RotateCcw } from "lucide-react";
import { useState } from "react";

/**
 * Restores the current week from the published plan file
 * (data/current-week.json) — undoes removed/swapped meals.
 */
export default function ResetWeekButton({
  onReset,
}: {
  onReset: () => void | Promise<void>;
}) {
  const [isResetting, setIsResetting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleReset() {
    const confirmed = window.confirm(
      "Reload this week from the published plan? Meals you removed or swapped will be restored."
    );
    if (!confirmed) return;

    try {
      setIsResetting(true);
      setError(null);

      const response = await fetch("/api/mealplan/seed", { method: "POST" });
      if (!response.ok) {
        throw new Error("Unable to reload the week.");
      }

      await onReset();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to reload the week.");
    } finally {
      setIsResetting(false);
    }
  }

  return (
    <div className="flex items-center gap-2">
      {error ? (
        <span className="text-xs font-medium text-harvest-terracotta">{error}</span>
      ) : null}
      <button
        type="button"
        onClick={() => void handleReset()}
        disabled={isResetting}
        title="Restore this week's published plan"
        className="inline-flex items-center gap-1.5 rounded-full border border-[var(--border-subtle)] px-3 py-1.5 text-xs font-semibold text-[var(--muted-text)] transition active:scale-[0.98] disabled:opacity-60"
      >
        {isResetting ? (
          <Loader2 size={13} className="animate-spin" />
        ) : (
          <RotateCcw size={13} />
        )}
        Reset week
      </button>
    </div>
  );
}
