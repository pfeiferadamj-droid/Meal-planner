"use client";

import { useMemo, useState } from "react";
import { Loader2 } from "lucide-react";
import ListSection from "@/components/ListSection";
import MealPlanGate from "@/components/MealPlanGate";
import { useMealPlan } from "@/lib/MealPlanProvider";
import { getShoppingItemUsage } from "@/lib/domain/shoppingUsage";
import { STORE_IDS, STORE_LABELS } from "@/lib/shoppingListOrder";
import { ShoppingStore } from "@/lib/types";
import { sectionLabelColorClass } from "@/lib/uiClasses";

export default function ShopPage() {
  const { plan, isLoading, error, refresh } = useMealPlan();
  const [switchingStore, setSwitchingStore] = useState<ShoppingStore | null>(null);
  const [storeError, setStoreError] = useState<string | null>(null);
  const shoppingItemUsage = useMemo(
    () => (plan ? getShoppingItemUsage(plan) : {}),
    [plan]
  );

  async function switchStore(weekRange: string, store: ShoppingStore) {
    if (switchingStore) return;
    setSwitchingStore(store);
    setStoreError(null);

    try {
      const response = await fetch("/api/mealplan/store", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ weekRange, store }),
      });
      if (!response.ok) {
        throw new Error("Unable to switch store.");
      }
      await refresh();
    } catch (err) {
      setStoreError(err instanceof Error ? err.message : "Unable to switch store.");
    } finally {
      setSwitchingStore(null);
    }
  }

  return (
    <MealPlanGate
      plan={plan}
      isLoading={isLoading}
      error={error}
      loadingMessage="Loading this week's provisions..."
      onSeeded={refresh}
    >
      {(readyPlan) => (
        <main className="px-4 pb-12">
          <p className={`mb-4 ${sectionLabelColorClass.green}`}>
            {STORE_LABELS[readyPlan.shoppingStore]} Run
          </p>

          <div className="mb-6 flex gap-2" role="group" aria-label="This week's store">
            {STORE_IDS.map((store) => {
              const active = readyPlan.shoppingStore === store;
              return (
                <button
                  key={store}
                  type="button"
                  onClick={() => {
                    if (!active) void switchStore(readyPlan.weekRange, store);
                  }}
                  disabled={Boolean(switchingStore)}
                  aria-pressed={active}
                  className={`inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.14em] transition-all disabled:opacity-60 ${
                    active
                      ? "bg-harvest-green text-white shadow dark:bg-[var(--surface-3)] dark:text-harvest-green dark:shadow-none"
                      : "bg-[var(--card-border)] text-[var(--muted-text)]"
                  }`}
                >
                  {switchingStore === store ? (
                    <Loader2 size={12} className="animate-spin" />
                  ) : null}
                  {STORE_LABELS[store]}
                </button>
              );
            })}
          </div>

          {storeError ? (
            <div className="mb-4 rounded-2xl border border-harvest-terracotta/25 bg-harvest-terracotta/10 px-4 py-3 text-sm font-medium text-harvest-terracotta">
              {storeError}
            </div>
          ) : null}

          <ListSection
            data={readyPlan.shoppingList}
            colorClass="bg-harvest-green"
            editable={true}
            weekRange={readyPlan.weekRange}
            type="shopping"
            itemUsageByKey={shoppingItemUsage}
            onUpdate={refresh}
          />
        </main>
      )}
    </MealPlanGate>
  );
}
