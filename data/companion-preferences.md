# Household Junk List — AI Planning Instructions

> Referenced by: `data/data_context.md`, `data/MEAL_PLAN_PRODUCTION_WORKFLOW.md`

Preferences for the household's fun list, published alongside each week's meal plan: beer/wine, chips, a weekly sweet, quick frozen meals, a weekend frozen treat, biweekly coffee, weekly seasonal creamer, and flavored unsweetened sparkling water — with variety and a flyer-first mindset.

**Gluten-free awareness:** one member of the household is gluten-free. Anything meant to be shared (chips, sweets, frozen food, frozen treats) should default to gluten-free options — corn tortilla chips, chocolate, GF-labeled frozen meals. Beer is the exception: it's for the non-GF half of the house, so regular (non-wheat) beer is fine; wine and cider work for both.

---

## General Approach

- **[Fearless Flyer](https://www.traderjoes.com/home/ff)** — always check first.
- Prioritize what's new and interesting over repeating the same standbys.
- Fill gaps with staples from the pools below when the flyer doesn't cover a category.
- Vary week to week. Avoid repeating the exact same product two weeks in a row when practical.

---

## Dislikes (avoid across all categories)

- ❌ Licorice/anise/fennel flavor profile
- ❌ Artificial-tasting diet/sugar-free sweets and snacks
- ❌ Mandarin Orange Chicken
- ❌ Cowboy Caviar

---

## Categories & Rules

Use these exact category strings, in this order:

1. Coffee/Creamer
2. Beer/Wine
3. Chips
4. Sweets
5. Frozen Food
6. Frozen Treats
7. Beverages/Drinks

---

### Coffee/Creamer

- **Coffee:** Trader Joe's whole bean, **light roast**. Pantry item — **every other week** only.
- **Creamer:** Always seasonal, always weekly. Favor sweet/dessert-y seasonal flavors. Never repeat the same creamer two weeks running if you can avoid it.

---

### Beer/Wine

**Beer:** No wheat beers or hefeweizens. Lean toward Hazy IPAs and IPAs. Prefer seasonal picks; otherwise Boatswain IPA / Double IPA / Amber Ale, Stockyard Oatmeal Stout, or a solid lager 6-pack.

**Wine:** No rosé or dessert wines. Weight toward reds, with white and sparkling for variety. Always 1 bottle.

---

### Chips

Rotate freely (1 bag). Default to gluten-free picks so the bag can be shared. Example pool:

- Quinoa & Black Bean Infused Tortilla Chips
- Restaurant-Style Tortilla Chips
- Organic Elote Corn Chip Dippers
- Sea Salted Saddle Potato Crisps
- Ridge Cut Kettle Cooked Potato Chips
- Ode to the Classic Potato Chip
- Plantain Chips

Flyer wildcards welcome (skip pretzels and wheat-based crackers).

---

### Sweets

Pick **1 item per week**. Mix chocolate and non-chocolate. Avoid licorice/anise/fennel and artificial diet sweets. Default gluten-free so it can be shared (PB cups, Pound Plus chocolate, dried mango, most mochi); Joe-Joe's / Cookie Butter / Speculoos contain wheat — only as an occasional non-shared pick.

---

### Frozen Food

Pick **1–2** quick heat-and-eat Mexican or Indian frozen meals — **gluten-free labeled** (many TJ's Indian entrées like Butter Chicken and Chicken Tikka Masala qualify; corn-tortilla Mexican items often do). No Mandarin Orange Chicken (wheat) or Cauliflower Crust Pizza. No turkey- or fish-based entrées.

---

### Frozen Treats

Pick 1 weekend item, gluten-free by default (sweet potato fries, GF dips, ice cream/gelato without cookie pieces); savory or dessert both fine. Skip bulgogi (soy-sauce marinade), mac & cheese, and anything breaded.

---

### Beverages/Drinks

Default: flavored, unsweetened sparkling water in cans. Avoid diet/artificially sweetened sodas. Rotate flavors week to week.

---

## Output Format

```json
{
  "junkList": [
    { "category": "Coffee/Creamer", "items": [...] },
    { "category": "Beer/Wine", "items": [...] },
    { "category": "Chips", "items": [...] },
    { "category": "Sweets", "items": [...] },
    { "category": "Frozen Food", "items": [...] },
    { "category": "Frozen Treats", "items": [...] },
    { "category": "Beverages/Drinks", "items": [...] }
  ]
}
```

Each item: `{ "n": "full TJ's product name", "q": "quantity" }`
