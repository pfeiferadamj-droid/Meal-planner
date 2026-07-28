# Household Meal Preferences — Adam & Wife

> Referenced by: `data/data_context.md`, `data/MEAL_PLAN_PRODUCTION_WORKFLOW.md`

Preferences for the two people who eat every planned meal. Both diners eat every dinner, so **every rule below applies to every meal** — there are no per-person meals. The junk/snack list is managed separately in `data/companion-preferences.md`.

---

## Week Shape

**Dinners only** — no breakfasts, no lunches, no snacks.
**The number of dinners is chosen each week** when the plan is requested: typically **4** (leftovers-heavy week) up to **7** (a dinner every night). If no number is given, ask — or default to **4**.
No day scheduling. No daily calorie targets. Meals are a flat list.

---

## Hard Dietary Rules (never violate)

1. **Gluten-free — every meal, every ingredient.** One diner is gluten-free, and every meal is shared, so 100% of planned meals must be gluten-free.
   - No wheat, barley, rye, or regular oats: no pasta/orzo/couscous, no regular bread, tortillas (flour), naan, pita, English muffins, crackers, panko, or flour-based gnocchi.
   - Safe bases: rice (all kinds), quinoa, potatoes, sweet potatoes, corn tortillas, polenta, cauliflower gnocchi (cassava), rice noodles, GF-labeled breads.
   - Watch hidden gluten in sauces and engines: **no soy sauce, teriyaki, or Soyaki** (use tamari or coconut aminos), no hoisin, no malt vinegar, no beer-based sauces. Prefer TJ's products with a gluten-free label; when unsure about a sauce or seasoning, verify or swap to a known-GF engine.
2. **No fish or seafood as a planned protein.** No salmon, white fish, tuna, smoked salmon, etc. (Shrimp counts as seafood — leave it out unless explicitly requested.)
3. **No turkey** in any form: no ground turkey, deli turkey, turkey bacon, turkey meatballs.
4. **No tofu** (and skip tempeh/seitan too — seitan is pure gluten anyway). Vegetarian meals get protein from legumes, eggs, and cheese instead.
5. **Red meat at most once every 10 days.** Red meat = beef, pork, and lamb.
   - Never more than **1 red-meat dinner per week**, and only if the last red-meat dinner was **10+ days ago** (check `lastServedAt` / recent weeks — roughly 2 red-meat dinners per 3 weeks).
   - When in doubt, plan zero red-meat dinners for the week.

---

## Calorie Targets

**All meals: 450–550 kcal per serving.**
Apply loosely — flavor and satiety matter more than hitting exact numbers. Every dinner should scale cleanly to 2 servings (plus leftovers when it fits).

---

## Cooking Parameters

- **Time ceiling: 20–30 minutes**, using up to two pans.
- Techniques in scope: sear, sauté, boil, roast (if it fits the time window), grill, assemble.
- No project meals. Consistent weeknight effort across the week.
- Frozen grains and vegetables are freely usable. Fully frozen entrées: **≤1–2 per week maximum**, and only if gluten-free.

---

## Protein Roster

Rotate across these proteins. Aim for **≥3 different protein types per week.**

| Protein | Notes |
|---|---|
| Chicken thighs | Preferred over breast for flavor and forgiveness |
| Chicken breast | Fine, but use thighs when either would work |
| Chicken sausage | Great for skillets and sheet-pan style dinners — confirm GF |
| Ground chicken | Bowls, tacos (corn tortillas), larb-style dishes |
| Beef / pork / lamb | **Red meat — max 1 per week AND 10+ days since last serving** |
| Eggs | First-class dinner protein (hashes, fried rice, shakshuka-style) |
| Legumes | Lentils, chickpeas, black beans — first-class protein, not a side |
| Meat substitutes | Only if gluten-free and not soy-block based; use sparingly |

**Never:** fish, shellfish, turkey, tofu, tempeh, seitan.

---

## Vegetarian Meals

Vegetarian dinners are welcome when they fit the week — they also make the red-meat cadence easier to hit. Make them satisfying and protein-complete with legumes, eggs, and cheese (no tofu/tempeh).

---

## Cuisine Profile

Bold, globally inspired flavors. Rotate across these cuisines — don't repeat the same profile more than once per week.

- Thai / Southeast Asian (tamari or coconut aminos, never soy sauce)
- Indian
- Mediterranean / Middle Eastern
- Mexican / Tex-Mex (corn tortillas make this a natural GF fit)
- Chinese / Taiwanese (GF engines only)
- American comfort with a twist

**Flavor targets:** umami, heat, fresh herbs. Avoid bland proteins and boring builds.

---

## Fiber

Fiber is a **first-class nutrient** — shown on every meal card. Preferred sources: legumes, whole grains (GF: rice, quinoa), vegetables, seeds.

---

## Macros

```
cal: 450–550 per serving
protein: aim high
fiber: shown on every card; higher is better
carbs/fat: no specific targets
```

---

## Meal Structure (Four Pillars)

| Pillar | Description |
|---|---|
| `pro` | Protein + prep note |
| `base` | Gluten-free grain, starch, or GF bread |
| `veg` | Vegetables |
| `engine` | TJ's flavor anchor — always the **full Trader Joe's brand name**, and always gluten-free |

**No duplicate engine or base within one week.**

---

## Trader Joe's Engines

Vary engines every meal. Check [traderjoes.com](https://www.traderjoes.com) and the [Fearless Flyer](https://www.traderjoes.com/home/ff) for new options. **Every engine must be gluten-free** — known-good examples: Chimichurri Sauce, Sweet Chili Sauce, Chile Lime Seasoning, Italian Bomba Hot Pepper Sauce, Zhoug, Salsa Autentica, Coconut Aminos, Green Dragon Hot Sauce, most salsas and vinaigrettes. Known offenders to skip: Soyaki, soy-sauce-based marinades, anything with wheat in the ingredient list.

---

## Week Validation Rules

- [ ] All meals are dinners (no other meal types), and the count matches what was requested this week (default 4, max 7)
- [ ] Every meal 100% gluten-free (bases, engines, and hidden sources checked)
- [ ] No fish, shellfish, turkey, tofu, tempeh, or seitan anywhere
- [ ] ≤1 red-meat dinner, and none if red meat was served in the last 10 days
- [ ] ≥3 different protein types across the week
- [ ] Different TJ's engine on every meal
- [ ] No duplicate base across the week
- [ ] All meals 450–550 kcal per serving
- [ ] Fiber shown on every meal card
- [ ] ≤1–2 fully frozen entrées (GF only)
- [ ] Cuisine profile varies within the week

---

## Avoid

- Boring salads and bland proteins
- Repetitive weeks (same base, cuisine, or engines)
- Product-catalogue meals that feel like a TJ's ad
- "Gluten-free" meals with a glutenous engine hiding in the sauce
