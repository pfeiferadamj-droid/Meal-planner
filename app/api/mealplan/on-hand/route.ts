import { NextRequest } from "next/server";
import {
  getLatestMealPlan,
  getMealPlanByWeekRange,
  updateMealPlanLists,
} from "@/lib/services/mealPlanService";
import { ApiError, createRouteHandler } from "@/lib/apiUtils";
import { requireString } from "@/lib/routeValidation";
import { deriveShoppingListFromMeals } from "@/lib/domain/shoppingListDerivation";
import { normalizeShoppingName } from "@/lib/domain/shoppingUsage";
import type { OnHandItem, StoredMealPlan } from "@/lib/types";

async function saveOnHandItems(
  mealPlan: StoredMealPlan,
  onHandItems: OnHandItem[],
  updatedFrom: string
) {
  // Re-derive so pantry flags follow the on-hand list immediately.
  const shoppingList = deriveShoppingListFromMeals(
    mealPlan.meals,
    mealPlan.shoppingList,
    mealPlan.junkList,
    mealPlan.householdGoods ?? [],
    { onHandItems, store: mealPlan.shoppingStore }
  );

  return updateMealPlanLists(mealPlan.id, {
    shoppingList,
    junkList: mealPlan.junkList,
    householdGoods: mealPlan.householdGoods ?? [],
    onHandItems,
    shoppingStore: mealPlan.shoppingStore,
    source: "user_edit",
    generationContext: {
      updatedFrom,
      updatedAt: new Date().toISOString(),
    },
  });
}

export const POST = createRouteHandler(async (request: NextRequest) => {
  const body = (await request.json()) as unknown;
  const obj = body && typeof body === "object" ? (body as Record<string, unknown>) : {};
  const weekRange = typeof obj.weekRange === "string" ? obj.weekRange : null;
  const name = requireString(obj.n, "n").trim();

  const mealPlan = weekRange ? await getMealPlanByWeekRange(weekRange) : await getLatestMealPlan();
  if (!mealPlan) {
    throw new ApiError("Meal plan not found", 404);
  }

  const onHandItems = [...(mealPlan.onHandItems ?? [])];
  const normalizedName = normalizeShoppingName(name);
  if (onHandItems.some((item) => normalizeShoppingName(item.n) === normalizedName)) {
    throw new ApiError("Ingredient is already on the at-home list", 409);
  }

  onHandItems.push({ n: name });

  const updated = await saveOnHandItems(mealPlan, onHandItems, "on_hand_add");

  return { onHandItems: updated.onHandItems };
});

export const DELETE = createRouteHandler(async (request: NextRequest) => {
  const body = (await request.json()) as unknown;
  const obj = body && typeof body === "object" ? (body as Record<string, unknown>) : {};
  const weekRange = typeof obj.weekRange === "string" ? obj.weekRange : null;
  const name = requireString(obj.n, "n").trim();

  const mealPlan = weekRange ? await getMealPlanByWeekRange(weekRange) : await getLatestMealPlan();
  if (!mealPlan) {
    throw new ApiError("Meal plan not found", 404);
  }

  const normalizedName = normalizeShoppingName(name);
  const onHandItems = (mealPlan.onHandItems ?? []).filter(
    (item) => normalizeShoppingName(item.n) !== normalizedName
  );

  const updated = await saveOnHandItems(mealPlan, onHandItems, "on_hand_delete");

  return { onHandItems: updated.onHandItems };
});
