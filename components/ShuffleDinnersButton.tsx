"use client";

import { Dices, Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import {
  MAX_DINNERS_PER_WEEK,
  MIN_DINNERS_PER_WEEK,
} from "@/lib/constants";

const COUNT_OPTIONS = Array.from(
  { length: MAX_DINNERS_PER_WEEK - MIN_DINNERS_PER_WEEK + 1 },
  (_, index) => MIN_DINNERS_PER_WEEK + index
);

/**
 * Replaces the week's dinners with a fresh pick from the meal library
 * (red-meat cadence and base/engine variety enforced server-side).
 */
export default function ShuffleDinnersButton({
  currentCount,
  onShuffled,
}: {
  currentCount: number;
  onShuffled: () => void | Promise<void>;
}) {
  const [count, setCount] = useState(currentCount);
  const [isShuffling, setIsShuffling] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    // Re-sync the picker when the plan's dinner count changes (matches the
    // queueMicrotask pattern used by the other list components).
    queueMicrotask(() => {
      if (currentCount >= MIN_DINNERS_PER_WEEK && currentCount <= MAX_DINNERS_PER_WEEK) {
        setCount(currentCount);
      }
    });
  }, [currentCount]);

  async function handleShuffle() {
    const confirmed = window.confirm(
      `Replace this week's dinners with ${count} picks from your meal library?`
    );
    if (!confirmed) return;

    try {
      setIsShuffling(true);
      setMessage(null);

      const response = await fetch("/api/mealplan/shuffle", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ dinnerCount: count }),
      });
      if (!response.ok) {
        throw new Error("Unable to shuffle dinners.");
      }

      const body = (await response.json().catch(() => null)) as {
        data?: { requested?: number; picked?: number };
      } | null;
      const requested = body?.data?.requested;
      const picked = body?.data?.picked;
      if (
        typeof requested === "number" &&
        typeof picked === "number" &&
        picked < requested
      ) {
        setMessage(
          `Only ${picked} eligible meal${picked === 1 ? "" : "s"} in your library — add more to Explore for bigger weeks.`
        );
      }

      await onShuffled();
    } catch (error) {
      setMessage(
        error instanceof Error ? error.message : "Unable to shuffle dinners."
      );
    } finally {
      setIsShuffling(false);
    }
  }

  return (
    <div className="flex flex-col items-end gap-1">
      <div className="flex items-center gap-2">
        <select
          value={count}
          onChange={(event) => setCount(Number(event.target.value))}
          disabled={isShuffling}
          aria-label="Number of dinners"
          className="rounded-full border border-[var(--border-subtle)] bg-transparent px-2 py-1.5 text-xs font-semibold text-[var(--muted-text)]"
        >
          {COUNT_OPTIONS.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        <button
          type="button"
          onClick={() => void handleShuffle()}
          disabled={isShuffling}
          title="Replace this week's dinners with fresh picks from your meal library"
          className="inline-flex items-center gap-1.5 rounded-full bg-harvest-green px-3 py-1.5 text-xs font-semibold text-white transition active:scale-[0.98] disabled:opacity-60"
        >
          {isShuffling ? (
            <Loader2 size={13} className="animate-spin" />
          ) : (
            <Dices size={13} />
          )}
          Shuffle
        </button>
      </div>
      {message ? (
        <span className="text-right text-xs font-medium text-harvest-terracotta">
          {message}
        </span>
      ) : null}
    </div>
  );
}
