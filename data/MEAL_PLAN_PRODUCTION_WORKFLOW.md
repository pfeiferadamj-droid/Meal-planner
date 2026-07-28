# Harvest Meal Engine: Weekly Plan Workflow

Step-by-step procedure for generating and publishing a new weekly meal plan locally.

> **Shortcut:** `data/PLAN_MY_WEEK.md` is a ready-to-paste prompt that walks Claude through this whole workflow.

**Related docs:** `data/diner-preferences.md` · `data/companion-preferences.md` · `data/data_context.md`

---

## Week shape

A week is a flat `meals` array of **dinners only** (no days / timeslots, no breakfasts/lunches/snacks).

**Pick the dinner count when you start the week** — typically 4, sometimes 6 or 7. Default to 4 if nobody says otherwise; the validator accepts 1–7.

Read `data/diner-preferences.md` before editing. All meals target **450–550 kcal** loosely and must be **gluten-free**. Fiber is first-class. Full validation checklist (hard dietary rules, red-meat cadence, cuisine rotation, etc.) lives in that file.

---

## Pre-flight: backup

Before overwriting the active week:

```bash
cp data/current-week.md data/backup-week-$(date +%Y-%m-%d-%H%M%S).md
```

(`data/backup-week-*.md` is gitignored.)

---

## Step 1: Review recent meals and on-hand ingredients

```bash
curl -s http://localhost:3000/api/meals | jq .
curl -s http://localhost:3000/api/mealplan | jq '.mealPlan.onHandItems'
```

Avoid repeating meals served in the last week when practical. Work the household's on-hand ("Use Up") ingredients into the new week where they fit.

---

## Step 2: Author the plan

1. Read `data/diner-preferences.md` and `data/companion-preferences.md`
2. Use `data/data_context.md` for TJ product guidance
3. Create or edit a plan under `data/mealplans/` or edit `data/current-week.md` directly
4. Keep the fenced JSON block valid
5. Build the companion junk list with all seven required categories

---

## Step 3: Validate, sync, publish

```bash
npm run meal-plan:sync
npm run meal-plan:publish
```

Or via the CLI helper:

```bash
npm run meal-plan -- validate data/current-week.md
npm run meal-plan -- publish data/mealplans/mealplan-week-YYYY-MM-DD.md
```

Confirm in the app at http://localhost:3000/menu.

---

## Checklist

- [ ] Read diner + companion preference docs
- [ ] Checked the on-hand ("Use Up") list and worked items into the week where they fit
- [ ] Confirmed this week's store (Trader Joe's default; Hy-Vee weeks use generic/nationally available items)
- [ ] Confirmed this week's dinner count (default 4, max 7)
- [ ] All meals are dinners, nothing else
- [ ] Every meal gluten-free; no fish/seafood, turkey, or tofu/tempeh
- [ ] ≤1 red-meat dinner, and none if red meat was served in the last 10 days
- [ ] Macros / fiber present; ~450–550 kcal per meal
- [ ] Junk list has all seven categories filled
- [ ] Sync + publish succeeded
- [ ] UI shows the new week
