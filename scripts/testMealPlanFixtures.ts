import assert from "node:assert/strict";
import path from "node:path";
import { validateMealPlanFile } from "./mealPlanValidation";

// Published meal-plan fixtures validated on every test run (dinners only,
// count within MIN/MAX_DINNERS_PER_WEEK in lib/constants.ts).
const fixturePaths: string[] = [
  "data/mealplans/mealplan-week-2026-07-27.md",
  "data/mealplans/mealplan-week-2026-08-03.md",
  "data/mealplans/mealplan-week-2026-08-10.md",
  "data/mealplans/mealplan-week-2026-08-17.md",
];

for (const fixturePath of fixturePaths) {
  const result = validateMealPlanFile(path.join(process.cwd(), fixturePath));

  assert.equal(
    result.valid,
    true,
    [
      `${fixturePath} should pass meal-plan validation.`,
      ...result.errors.map((error) => `ERROR: ${error}`),
      ...result.warnings.map((warning) => `WARN: ${warning}`),
    ].join("\n")
  );
}

console.log(`Meal plan fixture tests passed (${fixturePaths.length} fixtures).`);
