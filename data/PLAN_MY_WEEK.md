# Plan My Week — paste this into Claude

Copy everything below the line into a Claude chat to generate and publish this week's dinners.

**Best experience:** open the `Meal-planner` folder in Claude Code (or a Claude chat that can read this repo) — Claude can then read the rule files, validate, and publish for you. In a plain claude.ai chat, also attach or paste `data/diner-preferences.md`, `data/companion-preferences.md`, and `data/data_context.md`, and Claude will hand back a finished file for you to paste in.

---

## This week

- **Number of dinners:** 4  ← change me (1–7; 4 = leftovers-heavy, 7 = dinner every night)
- **Store this week:** Trader Joe's  ← change me (Trader Joe's or Hy-Vee — one run per week; the app's Shop page toggle should match)
- **Anything special this week?** (optional — guests, a cuisine craving, use-up-the-fridge items, skip a store section, etc.)
  - _
- **Red meat check:** have we had beef/pork/lamb in the last 10 days? yes / no / not sure

## Your job

You are planning one week of dinners for our household using this repo's Harvest meal engine. Work through these steps in order:

1. **Read the rules first** — `data/diner-preferences.md` (hard dietary rules + validation checklist), `data/companion-preferences.md` (junk list), and `data/data_context.md` (Trader Joe's product guidance). The hard rules are non-negotiable: everything gluten-free; no fish/seafood, turkey, or tofu/tempeh; no lentils; no yogurt-based sauces; eggs never as a featured dinner protein; red meat at most once every 10 days.

2. **Check history and what's already at home.**
   - Look at the recent files in `data/mealplans/` (and, if the app is running, `curl -s http://localhost:3000/api/meals` for the library with `lastServedAt` and heart counts).
   - Read the Use Up list (`curl -s http://localhost:3000/api/mealplan | jq '.mealPlan.onHandItems'`, managed in the app's Menu → Use Up tab) and work those at-home ingredients into meals where they genuinely fit — the app auto-marks matching shopping items Pantry.
   - Don't repeat a meal served in the last ~2 weeks. Anchor with 1–2 high-heart favorites when they're off cooldown; try at least one brand-new meal.
   - Apply the red-meat answer above: if red meat appeared in the last 10 days (or the answer is "not sure"), plan zero red-meat dinners.

3. **Check what's current at the week's store.** On Trader Joe's weeks, skim the [Fearless Flyer](https://www.traderjoes.com/home/ff) for new/seasonal gluten-free items worth working into a meal or the junk list, and verify any product you're not sure still exists. On Hy-Vee weeks, plan generic / nationally available items instead — no TJ's-exclusive products unless they're already in the pantry (see `data/hyvee-areas.md`).

4. **Author the week** as `data/mealplans/mealplan-week-YYYY-MM-DD.md` (Monday date; scaffold with `npm run meal-plan -- new YYYY-MM-DD <dinners>` if helpful). Follow the JSON shape and rules from `data/meal-plan-skill.md`: the requested number of dinners, per-ingredient macros (with fiber) summing to meal macros, no duplicate base or engine across the week, varied cuisines, 450–550 kcal per serving, and a junk list covering all seven categories.

5. **Validate and publish** (repo access required — otherwise hand the finished markdown to the human with these commands):
   ```bash
   npm run meal-plan -- validate data/mealplans/mealplan-week-YYYY-MM-DD.md
   cp data/mealplans/mealplan-week-YYYY-MM-DD.md data/current-week.md
   npm run meal-plan:sync
   npm run meal-plan:publish
   ```
   Fix any validation errors before publishing. Publishing works whether or not the app is running.

6. **Confirm** — tell me the week at a glance: each dinner's name, protein, and calories; which one (if any) is red meat; anything you swapped because of stock or gluten doubts; and remind me the app is at http://localhost:3000/menu.

Keep the meal names appetizing (café-menu style), keep every engine a real, gluten-free Trader Joe's product, and when a label is uncertain, choose the safer swap.
