"use client";

import { useMemo } from "react";
import ListSection from "@/components/ListSection";
import MealPlanGate from "@/components/MealPlanGate";
import { useMealPlan } from "@/lib/MealPlanProvider";
import { getShoppingItemUsage } from "@/lib/domain/shoppingUsage";
import { sectionLabelColorClass } from "@/lib/uiClasses";

export default function ShopPage() {
  const { plan, isLoading, error, refresh } = useMealPlan();
  const shoppingItemUsage = useMemo(
    () => (plan ? getShoppingItemUsage(plan) : {}),
    [plan]
  );

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
          <p className={`mb-6 ${sectionLabelColorClass.green}`}>
            Shopping Run
          </p>

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
