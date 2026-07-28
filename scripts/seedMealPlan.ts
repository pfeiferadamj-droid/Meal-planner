import { seedMealPlanFromJson } from "@/lib/services/mealPlanService";
import { closePool } from "@/lib/db";
import { trySeedViaRunningApp } from "./seedViaApi";

async function main() {
  const viaApp = await trySeedViaRunningApp();

  if (viaApp) {
    console.log(
      JSON.stringify({ ok: true, via: "running app", ...viaApp }, null, 2)
    );
    return;
  }

  const mealPlan = await seedMealPlanFromJson();

  console.log(
    JSON.stringify(
      {
        ok: true,
        via: "embedded database",
        mealPlanId: mealPlan.id,
        weekRange: mealPlan.weekRange,
        source: mealPlan.source,
        mealCount: mealPlan.meals.length,
      },
      null,
      2
    )
  );
  await closePool();
}

main().catch((error) => {
  console.error("Failed to seed meal plan");
  console.error(error);
  process.exit(1);
});
