# Harvest Meal Engine: Weekly Plan Workflow

Step-by-step procedure for generating and publishing a new weekly meal plan locally.

**Related docs:** `data/diner-preferences.md` · `data/companion-preferences.md` · `data/data_context.md`

---

## Week shape

A standard week is **4 meals total**, stored as a flat `meals` array (no days / timeslots):

- 4 Dinners (dinners only — no breakfasts, lunches, or snacks)

Read `data/diner-preferences.md` before editing. All meals target **450–550 kcal** loosely and must be **gluten-free**. Fiber is first-class. Full validation checklist (hard dietary rules, red-meat cadence, cuisine rotation, etc.) lives in that file.

---

## Pre-flight: backup

Before overwriting the active week:

```bash
cp data/current-week.md data/backup-week-$(date +%Y-%m-%d-%H%M%S).md
```

(`data/backup-week-*.md` is gitignored.)

---

## Step 1: Review recent meals

```bash
curl -s http://localhost:3000/api/meals | jq .
```

Avoid repeating meals served in the last week when practical.

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
- [ ] 4 dinners, nothing else
- [ ] Every meal gluten-free; no fish/seafood, turkey, or tofu/tempeh
- [ ] ≤1 red-meat dinner, and none if red meat was served in the last 10 days
- [ ] Macros / fiber present; ~450–550 kcal per meal
- [ ] Junk list has all seven categories filled
- [ ] Sync + publish succeeded
- [ ] UI shows the new week
