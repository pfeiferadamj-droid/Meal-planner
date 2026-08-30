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
6. **Target Low Sodium** options when available.
7. **Eggs are never the featured protein at dinner.** No fried, scrambled, poached, or standalone eggs — and no eggs-in-sauce dishes either (no shakshuka, no eggs in purgatory). Egg is acceptable only as a minor bound-in ingredient (e.g., binding a fritter or fried rice); when in doubt, skip eggs entirely.
8. **No lentils** in any form — green, red, steamed, dry, or lentil pasta. Other legumes (chickpeas, black beans, cannellini/white beans) are fine and encouraged.
9. **No yogurt-based sauces, dollops, or dressings.** No tzatziki, raita, yogurt drizzles, or yogurt garnishes on meals.
10. **No artichokes** in any form — fresh, jarred, marinated, or in dips.
11. **Keep dinners familiar.** These are recognizable weeknight meals — tacos, spaghetti, stir-fry, BBQ chicken, burrito bowls, curry — not restaurant experiments. See "Familiarity Bar" below; it is a hard rule, not a style note.
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
| Legumes | Chickpeas, black beans, cannellini — first-class protein, not a side. **Never lentils.** |
| Cheese | Feta, cheddar, parmesan as a supporting protein in vegetarian meals |
| Meat substitutes | Only if gluten-free and not soy-block based; use sparingly |

**Never:** fish, shellfish, turkey, tofu, tempeh, seitan, lentils, artichokes, eggs as the featured protein, yogurt-based sauces.

---

## Vegetarian Meals

Vegetarian dinners are welcome when they fit the week — they also make the red-meat cadence easier to hit. Make them satisfying and protein-complete with legumes (no lentils) and cheese (no tofu/tempeh, no featured eggs).

---

## Familiarity Bar (read before naming a single meal)

**The test:** could you describe this dinner to a friend in three words and have them know exactly what it is? "Beef tacos." "Spaghetti and meat sauce." "BBQ chicken and potatoes." If it needs explaining, don't plan it.

**Plan meals like these:** baked or roasted chicken with a starch and a vegetable, cheesy chicken and rice bake, chicken and noodle or wild rice soup, sloppy joes, chili, taco night, spaghetti and meatballs, baked ziti-style GF pasta, chicken sausage and peppers, BBQ chicken with potatoes, sheet-pan chicken and veg, loaded baked potatoes, grilled chicken with corn and slaw, quesadillas, burrito bowls, fajitas, chicken fried rice, chicken and broccoli stir-fry, curry over rice.

**The Midwest test:** would this dinner look ordinary on a weeknight table in Ohio or Minnesota? Casseroles and bakes, a protein with two sides, sandwich night, taco night, and spaghetti night are the shape of the week. See "Cuisine Profile" for how often each profile shows up — Asian and Indian together get at most one night.

**Do NOT plan:** ingredient-driven "concept" dishes, obscure or single-use pantry items, unusual vegetable-as-base swaps (spaghetti squash standing in for pasta, cauliflower rice as the main base), fancy composed plates, or anything whose appeal is that it's interesting. Prefer the boring-but-good version every time.

**Ingredient bar:** if it isn't something a typical American home cook keeps or recognizes, skip it. Rice, pasta, potatoes, tortillas, beans, chicken, cheese, standard vegetables, and familiar jarred sauces carry almost every week. Novelty comes from rotating *familiar* meals, not from exotic ingredients.

---

## Meal Names (plain, not café-menu)

Name the dinner the way you'd say it out loud when someone asks what's for dinner. **"Baked Chicken and Potatoes." "Sloppy Joes." "Taco Night." "Chicken and Rice Bake."**

- **Do:** plain English, the protein and the main sides, "and" instead of "&" where it reads more naturally, at most one "with."
- **Don't:** restaurant or café-menu language — no "bowls" that aren't bowls, no engine names in the title ("Chimichurri Chicken Thighs with Blistered Green Beans"), no adjective stacks ("smoky," "crispy," "loaded," "blistered," "charred," "herbed"), no em-dash subtitles.
- **Rule of thumb:** if the name sounds like it came off a menu, rewrite it as what a person would text their spouse at 4pm.

---

## Cuisine Profile

**Midwest home cooking is the default.** The week should read like dinners a family actually makes on a weeknight in the Midwest — baked chicken and potatoes, a cheesy chicken and rice bake, taco night, spaghetti, sloppy joes, chili, BBQ off the grill. Global flavors are seasoning on that foundation, not the foundation itself.

**Asian and Indian dinners: at most 1 per week, combined.** Thai, Chinese, Vietnamese, and Indian dinners are welcome, but only one slot a week goes to that group — and when it does, pick the version that's already in the American weeknight rotation (chicken fried rice, chicken stir-fry, curry over rice), not a regional specialty. Some weeks have zero, and that's fine.

Draw the rest of the week from these, in rough order of how often they should show up:

| Profile | How often | Examples |
|---|---|---|
| **American / Midwest comfort** | The backbone — 2–3 dinners a week | Baked or roasted chicken with a starch and a vegetable, chicken and rice bake, sloppy joes, chili, meatloaf-style bakes (within the red-meat rule), soups and hotdishes, loaded baked potatoes |
| **Mexican / Tex-Mex** | ~1 a week | Taco night, burrito bowls, quesadillas, fajitas, enchilada bakes |
| **Italian-American** | ~1 a week | Spaghetti and meatballs, baked ziti-style GF pasta, chicken sausage and peppers, chicken parm-style bakes |
| **BBQ / cookout** | Seasonal, ~1 a week in warm months | BBQ chicken, grilled chicken with corn, burgers (within the red-meat rule), potato salad and slaw sides |
| **Asian or Indian** | **≤1 a week, combined** | Chicken fried rice, chicken and broccoli stir-fry, curry over rice |
| **Mediterranean / Greek** | Occasional | Greek chicken with potatoes, chicken and rice bowls with feta |

**American comfort is allowed to repeat within a week** — two roast-chicken-and-a-starch nights are fine as long as the protein cut, base, technique, and engine are all different. Only Asian/Indian is capped by count. What must not repeat is the *dish*: no two dinners that a person would describe the same way.

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
- [ ] No lentils, artichokes, or yogurt-based sauces; no eggs as a featured protein (incl. eggs-in-sauce)
- [ ] Every meal passes the Familiarity Bar (three-word describable, no concept dishes, no obscure ingredients)
- [ ] ≤1 red-meat dinner, and none if red meat was served in the last 10 days
- [ ] ≥3 different protein types across the week
- [ ] Different TJ's engine on every meal
- [ ] No duplicate base across the week
- [ ] All meals 450–550 kcal per serving
- [ ] Fiber shown on every meal card
- [ ] ≤1–2 fully frozen entrées (GF only)
- [ ] **At most 1 Asian or Indian dinner in the week (combined)** — the rest are Midwest/American, Mexican/Tex-Mex, Italian-American, BBQ, or Mediterranean
- [ ] The week reads like home cooking: no two dinners a person would describe the same way, and every name is plain (see Meal Names)

---

## Avoid

- Bland proteins and watery salads
- Repetitive weeks (same base, dish, or engines)
- **More than one Asian or Indian dinner in a week** — that group gets one slot, and some weeks none
- **Café-menu meal names** — see "Meal Names"
- Product-catalogue meals that feel like a TJ's ad
- "Gluten-free" meals with a glutenous engine hiding in the sauce
- **Strange or fussy food** — obscure ingredients, concept dishes, vegetable-as-base substitutions. If it sounds clever, it's wrong.
- Artichokes
