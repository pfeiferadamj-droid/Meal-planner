/**
 * The embedded PGlite database supports only one process at a time. When the
 * app is running it owns the data directory, so host scripts must publish
 * through the app's HTTP API instead of opening the database themselves.
 * Returns null when no app is listening (caller falls back to direct access).
 */

export interface AppSeedResult {
  mealPlanId: number;
  weekRange: string;
  mealCount: number;
}

export async function trySeedViaRunningApp(): Promise<AppSeedResult | null> {
  const port = process.env.PORT ?? "3000";
  const url = `http://localhost:${port}/api/mealplan/seed`;

  let response: Response;
  try {
    response = await fetch(url, {
      method: "POST",
      signal: AbortSignal.timeout(30000),
    });
  } catch {
    // Nothing listening — the caller may safely open the database directly.
    return null;
  }

  if (!response.ok) {
    const body = await response.text().catch(() => "");
    throw new Error(
      `The running app rejected the seed request (${response.status}): ${body.slice(0, 300)}`
    );
  }

  const payload = (await response.json()) as {
    data?: { mealPlan?: { id: number; weekRange: string; meals: unknown[] } };
  };
  const plan = payload.data?.mealPlan;

  if (!plan) {
    throw new Error("Unexpected response shape from /api/mealplan/seed");
  }

  return {
    mealPlanId: plan.id,
    weekRange: plan.weekRange,
    mealCount: plan.meals.length,
  };
}
