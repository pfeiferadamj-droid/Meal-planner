"use client";

import { useEffect, useState } from "react";
import { Loader2, Plus, Undo2, X } from "lucide-react";
import { useListMutations } from "@/lib/hooks/useListMutations";
import { OnHandItem } from "@/lib/types";

export default function OnHandPanel({
  data,
  weekRange,
  onUpdate,
}: {
  data: OnHandItem[];
  weekRange?: string;
  onUpdate?: () => void | Promise<void>;
}) {
  const [newItemName, setNewItemName] = useState("");
  const [recentlyDeleted, setRecentlyDeleted] = useState<OnHandItem | null>(null);
  const {
    isSaving,
    mutationError,
    resetMutationState,
    deleteItem,
    addItem,
  } = useListMutations({ type: "onhand", weekRange, onUpdate });

  useEffect(() => {
    queueMicrotask(() => {
      resetMutationState();
    });
  }, [data, resetMutationState, weekRange]);

  useEffect(() => {
    if (!recentlyDeleted) return;
    const timer = setTimeout(() => setRecentlyDeleted(null), 6000);
    return () => clearTimeout(timer);
  }, [recentlyDeleted]);

  async function handleAdd() {
    const saved = await addItem(newItemName);
    if (saved) {
      setNewItemName("");
    }
  }

  async function removeItem(item: OnHandItem) {
    await deleteItem(item.n);
    setRecentlyDeleted(item);
  }

  async function undoDelete() {
    if (!recentlyDeleted) return;
    const restored = await addItem(recentlyDeleted.n);
    if (restored) {
      setRecentlyDeleted(null);
    }
  }

  return (
    <div className="space-y-4">
      {mutationError ? (
        <div className="rounded-2xl border border-harvest-terracotta/25 bg-harvest-terracotta/10 px-4 py-3 text-sm font-medium text-harvest-terracotta">
          {mutationError}
        </div>
      ) : null}

      <p className="px-1 text-sm text-[var(--text-muted)]">
        Ingredients already at home that should get used. The next meal plan
        works these into meals, and matching shopping items are auto-marked
        Pantry.
      </p>

      <section className="rounded-[22px] border border-[var(--border-subtle)] bg-[var(--surface-1)] p-4 shadow-[var(--shadow-card)]">
        <div className="divide-y divide-[var(--border-subtle)]">
          {data.map((item) => (
            <div key={item.n} className="flex items-center gap-3 py-2.5">
              <p className="min-w-0 flex-1 text-sm font-semibold text-[var(--foreground)]">
                {item.n}
              </p>
              <button
                type="button"
                onClick={() => void removeItem(item)}
                disabled={isSaving}
                className="flex h-8 w-8 items-center justify-center rounded-full text-[var(--text-muted)] transition-colors hover:bg-red-500/10 hover:text-red-500 disabled:opacity-50"
                aria-label={`Remove ${item.n}`}
              >
                <X size={15} />
              </button>
            </div>
          ))}

          {data.length === 0 ? (
            <p className="py-2 text-sm text-[var(--text-muted)]">
              Nothing here yet. Add things like &ldquo;half a bag of spinach&rdquo; or
              &ldquo;leftover jasmine rice&rdquo;.
            </p>
          ) : null}
        </div>

        <form
          className="mt-3 flex gap-2"
          onSubmit={(event) => {
            event.preventDefault();
            void handleAdd();
          }}
        >
          <input
            type="text"
            placeholder="Add an ingredient to use up..."
            value={newItemName}
            onChange={(event) => setNewItemName(event.target.value)}
            className="min-w-0 flex-1 rounded-xl border border-[var(--border-subtle)] bg-[var(--surface-1)] px-3 py-2 text-sm text-[var(--foreground)] outline-none focus:ring-2 focus:ring-[var(--focus-ring)]"
          />
          <button
            type="submit"
            disabled={isSaving || !newItemName.trim()}
            className="inline-flex shrink-0 items-center gap-1.5 rounded-xl bg-harvest-green px-4 py-2 text-sm font-bold text-white disabled:opacity-50"
          >
            {isSaving ? (
              <Loader2 size={15} className="animate-spin" />
            ) : (
              <Plus size={15} />
            )}
            Add
          </button>
        </form>
      </section>

      {recentlyDeleted ? (
        <div className="fixed inset-x-0 bottom-[150px] z-40 mx-auto flex max-w-md items-center justify-between gap-3 px-4">
          <div className="flex w-full items-center justify-between gap-3 rounded-2xl border border-[var(--border-subtle)] bg-[var(--surface-2)] px-4 py-3 shadow-[var(--shadow-elevated)] backdrop-blur">
            <span className="min-w-0 truncate text-sm text-[var(--foreground)]">
              Removed <strong className="font-semibold">{recentlyDeleted.n}</strong>
            </span>
            <button
              type="button"
              onClick={() => void undoDelete()}
              disabled={isSaving}
              className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-harvest-green px-3 py-1.5 text-xs font-bold uppercase tracking-[0.1em] text-white disabled:opacity-60"
            >
              <Undo2 size={13} />
              Undo
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
