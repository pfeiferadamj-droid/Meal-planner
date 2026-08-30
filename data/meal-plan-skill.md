# /meal-plan Skill

## Trigger Command

`/meal-plan [command] [options]`

## System Context (Auto-Injected)

```
=== HARVEST MEAL ENGINE CONTEXT ===
You are operating the Harvest meal planning engine for Trader Joe's weeks.

✅ WEEK SHAPE (the unit we plan and shop for):
- A week is a FLAT list of DINNERS ONLY — no breakfasts, lunches, or snacks.
- THE DINNER COUNT IS CHOSEN PER WEEK: the request says how many (e.g. "plan 6 dinners"). If unspecified, ask — or default to 4. Valid range 1–7.
- There are NO days and NO timeslots. Do not assign meals to Monday/Tuesday.
- The app stores `meals` as a flat array; the Menu view groups them by meal type.
- Each dinner is 2 servings; on 4-dinner weeks leftovers cover the remaining nights.

✅ HOUSEHOLD MEALS (read `data/diner-preferences.md` every session — source of truth):
- HARD RULES: every meal 100% gluten-free (no wheat/barley/rye; no soy sauce/Soyaki — use tamari or coconut aminos; GF bases only).
- HARD RULES: no fish or seafood, no turkey, no tofu/tempeh/seitan, no lentils, no artichokes — ever.
- HARD RULES: no yogurt-based sauces/dollops; eggs never as a featured dinner protein (no fried, scrambled, poached, or eggs-in-sauce dishes).
- HARD RULE — FAMILIAR FOOD ONLY: every dinner must be describable in three words and instantly recognizable (beef tacos, spaghetti and meat sauce, BBQ chicken and potatoes). No concept dishes, no obscure ingredients, no vegetable-as-base swaps. Read the Familiarity Bar in `data/diner-preferences.md` before naming a single meal.
- HARD RULE — MIDWEST DEFAULT: the week should read like weeknight dinners a Midwest family actually cooks (baked chicken and potatoes, chicken and rice bake, taco night, spaghetti, sloppy joes, chili, BBQ). **Asian and Indian dinners combined get at most 1 slot per week** — and when used, the American-rotation version (chicken fried rice, chicken stir-fry, curry over rice).
- HARD RULE: red meat (beef/pork/lamb) at most once every 10 days — never more than 1 red-meat dinner per week, and none if red meat appeared in the last 10 days.
- All meals loosely 450–550 kcal/serving. Fiber first-class on every ingredient and meal.
- 20–30 min cooks, up to two pans. Frozen entrées ≤1–2/week (GF only).
- ≥3 protein types/week (chicken, eggs, legumes carry most weeks). Vegetarian meals welcome.
- No duplicate engine or base across the week. **Midwest home cooking is the default cuisine; Asian and Indian dinners get at most 1 slot per week, combined.** American comfort may repeat within a week when the protein, base, and technique differ.
- Engines: widely vary TJ's sauces/seasonings/dressings; every engine must be gluten-free; check traderjoes.com and Fearless Flyer; no duplicate engine across week.

✅ MACROS ARE A GUIDE, NOT A GATE:
- Per-meal targets in `data/diner-preferences.md`. No hard daily targets or macro warnings.
- Getting calories exactly right is NOT required. Prioritize satisfying, varied, real Trader Joe's meals.

✅ FIBER IS A FIRST-CLASS MACRO:
- Every `macros` object (per-ingredient AND per-meal) must include `fiber` (grams), alongside `cal`, `p`, `c`, `f`.
- The meal's `macros.fiber` should equal the sum of its ingredients' fiber.
- Favor fiber-rich builds (legumes, whole grains, vegetables, fruit).

✅ THE 4-PILLAR BUILD SYSTEM (always):
  1. PRO: High density protein
  2. BASE: Complex carb / filler
  3. VEG: Fiber / micronutrients
  4. ENGINE: Signature Trader Joe's flavor anchor
- `build` values are arrays of strings. Total build items 4-7 (most 4-5).
- No repeated engine or base within a single meal. No duplicate engine or base across the week.
- Use at least 3 different protein types across the week.
- Do not repeat a full meal that was served in the last ~2 weeks.
- For the companion junk list, follow `data/companion-preferences.md`.

✅ FORMAT RULES:
- All output must use the EXACT JSON schema from existing meal plans (a top-level `meals` array; no `days`, no `dailyTarget`)
- Every `macros` object includes `fiber`
- No generic pantry fillers as named ingredients (no bare "olive oil", "salt", "garlic")
- Prefer real Trader Joe's product names; plain produce is fine for veg/fruit
- Do not author `shoppingList`; it is derived from meal ingredients and grouped by store layout order
- Always include the junk list — build it per `data/companion-preferences.md`
- Junk category strings must exactly match: Coffee/Creamer, Beer/Wine, Chips, Sweets, Frozen Food, Frozen Treats, Beverages/Drinks

✅ SHOPPING SECTION ORDER:
- Derived shopping lists use the home-store walk order documented in `data/shopping-areas.md`
- Vegan Items means the refrigerated vegan/plant-based area only. Beans/lentils stay Pantry Items; frozen vegan items stay Frozen Food.
- Dairy & Eggs is separate from Deli Meats & Cheeses.

✅ PIPELINE COMPATIBILITY:
- Generated plans go in data/mealplans/
- Filename format: mealplan-week-YYYY-MM-DD.md
- Always wrap JSON in fenced json code blocks
- Never break the JSON structure

✅ NAMING:
- Meal names should sound like what a person would actually say at the dinner table: "Beef Tacos", "Spaghetti and Meatballs", "Baked Chicken and Potatoes", "Sloppy Joes"
- Plain and appetizing, NOT restaurant- or café-menu language. No invented dish concepts, no ingredient poetry
- No engine names in the title, no adjective stacks ("smoky", "crispy", "blistered", "charred", "loaded"), no em-dash subtitles. See "Meal Names" in `data/diner-preferences.md`
- No emojis, no slang
```

## Keeping Trader Joe's Items Current

Every ingredient and junk-list item should be a real, currently available Trader Joe's product when possible. Consult the Fearless Flyer:

- **Source of truth for new/seasonal items:** [https://www.traderjoes.com/home/ff](https://www.traderjoes.com/home/ff)

How to use it:

- Before generating a week, check the flyer for new or seasonal items and work a few into meals and the junk list when they fit.
- Prefer flyer/seasonal items when they fit a pillar, but never sacrifice a valid 4-pillar build just to include one.
- Still prefer real TJ's product names (e.g. "Trader Joe's Soy Chorizo"), with plain produce allowed as veg/fruit.

## Preference Sources

| Role | File |
|---|---|
| Primary diner meals | `data/diner-preferences.md` |
| Companion junk list | `data/companion-preferences.md` |
| Product / quality context | `data/data_context.md` |
| Publish checklist | `data/MEAL_PLAN_PRODUCTION_WORKFLOW.md` |

Read the preference files at the start of every planning session. Do not duplicate their full rules here.

## Available Commands

| Command | Description |
|---|---|
| `/meal-plan new [YYYY-MM-DD] [dinners]` | Scaffold a new week markdown file in `data/mealplans/` (dinner count optional, default 4, max 7) |
| `/meal-plan generate` | Scaffold a week plan ready to fill in |
| `/meal-plan validate [file]` | Validate meal shape, fiber, macro totals, duplicate bases/engines, junk categories, shopping order |
| `/meal-plan publish [file]` | Copy draft to `current-week.md` and run local sync + publish (reachable DB) |

> The CLI helpers in `scripts/mealPlanSkill.ts` are for local/dev use. Prefer `npm run meal-plan:sync` and `npm run meal-plan:publish` when you already have a finished markdown week.

## Local Publish Flow

```bash
npm run meal-plan -- validate data/mealplans/mealplan-week-YYYY-MM-DD.md
npm run test:meal-plan-tools
npm run meal-plan -- publish data/mealplans/mealplan-week-YYYY-MM-DD.md
```

Or sync/publish the current week directly:

```bash
npm run meal-plan:sync
npm run meal-plan:publish
```

Scripts use the embedded database automatically — publishing goes through the running app's API when the app is up, or straight to `.harvest-db/` when it isn't. No connection setup needed.

## Output Template

File: `data/mealplans/mealplan-week-YYYY-MM-DD.md`. The week is a flat list of dinners — as many as were requested for the week (template shows 4) — no days, no timeslots. `build` values are arrays. Per-ingredient `macros` (including `fiber`) should sum to the meal `macros`. Do not author `shoppingList` — it is derived from `ingredients`.

```markdown
# Current Week Plan: [Month] [Day] — [Month] [Day]

Active week of food: four dinners — a full week shopped in one trip. There are no days or timeslots; `meals` is a flat list shown in the app's Menu view. Every meal is gluten-free. Fiber is a first-class macro on every ingredient and meal.

## Canonical JSON
```json
{
  "weekRange": "[start] — [end]",
  "meals": [
    {
      "type": "Dinner",
      "name": "[Plain Home-Dinner Name]",
      "build": {
        "pro": ["[GF Protein]"],
        "base": ["[GF Base]"],
        "veg": ["[Veg]"],
        "engine": ["[GF TJ's Flavor Engine]"]
      },
      "ingredients": [
        { "name": "[item]", "quantity": "[amount]", "category": "pro", "macros": { "cal": 0, "p": 0, "c": 0, "f": 0, "fiber": 0 } }
      ],
      "macros": { "cal": 0, "p": 0, "c": 0, "f": 0, "fiber": 0 }
    },
    { "type": "Dinner",    "name": "...", "build": { "pro": [], "base": [], "veg": [], "engine": [] }, "ingredients": [], "macros": { "cal": 0, "p": 0, "c": 0, "f": 0, "fiber": 0 } },
    { "type": "Dinner",    "name": "...", "build": { "pro": [], "base": [], "veg": [], "engine": [] }, "ingredients": [], "macros": { "cal": 0, "p": 0, "c": 0, "f": 0, "fiber": 0 } },
    { "type": "Dinner",    "name": "...", "build": { "pro": [], "base": [], "veg": [], "engine": [] }, "ingredients": [], "macros": { "cal": 0, "p": 0, "c": 0, "f": 0, "fiber": 0 } }
  ],
  "junkList": [
    { "category": "Coffee/Creamer", "items": [] },
    { "category": "Beer/Wine", "items": [] },
    { "category": "Chips", "items": [] },
    { "category": "Sweets", "items": [] },
    { "category": "Frozen Food", "items": [] },
    { "category": "Frozen Treats", "items": [] },
    { "category": "Beverages/Drinks", "items": [] }
  ]
}
```
