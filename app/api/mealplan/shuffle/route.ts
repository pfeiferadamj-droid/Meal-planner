import { NextRequest } from "next/server";
import { shuffleMealPlanDinners } from "@/lib/services/mealPlanService";
import { createRouteHandler } from "@/lib/apiUtils";

export const POST = createRouteHandler(async (request: NextRequest) => {
  const body = (await request.json().catch(() => ({}))) as {
    dinnerCount?: unknown;
  };

  const dinnerCount =
    typeof body.dinnerCount === "number" && Number.isFinite(body.dinnerCount)
      ? Math.trunc(body.dinnerCount)
      : undefined;

  return shuffleMealPlanDinners(dinnerCount);
});
