import { NextRequest } from "next/server";
import {
  getLatestMealPlan,
  getMealPlanByWeekRange,
  updateMealPlanLists,
} from "@/lib/services/mealPlanService";
import { ApiError, createRouteHandler } from "@/lib/apiUtils";
import { deriveShoppingListFromMeals } from "@/lib/domain/shoppingListDerivation";
import { isShoppingStore } from "@/lib/shoppingListOrder";

// PUT: choose which store this week's single shopping run happens at.
export const PUT = createRouteHandler(async (request: NextRequest) => {
  const body = (await request.json()) as unknown;
  const obj = body && typeof body === "object" ? (body as Record<string, unknown>) : {};
  const weekRange = typeof obj.weekRange === "string" ? obj.weekRange : null;
  const store = obj.store;

  if (!isShoppingStore(store)) {
    throw new ApiError('store must be "traderJoes" or "hyvee"', 400);
  }

  const mealPlan = weekRange ? await getMealPlanByWeekRange(weekRange) : await getLatestMealPlan();
  if (!mealPlan) {
    throw new ApiError("Meal plan not found", 404);
  }

  // Re-derive so the whole list regroups into the chosen store's walk order.
  const shoppingList = deriveShoppingListFromMeals(
    mealPlan.meals,
    mealPlan.shoppingList,
    mealPlan.junkList,
    mealPlan.householdGoods ?? [],
    { onHandItems: mealPlan.onHandItems ?? [], store }
  );

  const updated = await updateMealPlanLists(mealPlan.id, {
    shoppingList,
    junkList: mealPlan.junkList,
    householdGoods: mealPlan.householdGoods ?? [],
    onHandItems: mealPlan.onHandItems ?? [],
    shoppingStore: store,
    source: "user_edit",
    generationContext: {
      updatedFrom: "shopping_store_switch",
      updatedAt: new Date().toISOString(),
    },
  });

  return { shoppingStore: updated.shoppingStore, shoppingList: updated.shoppingList };
});
