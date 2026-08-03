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

- **Only list these if required in a meal recipe.**

---

### Beer/Wine

- **Only list these if required in a meal recipe.**

---

### Chips


---

### Sweets


---

### Frozen Food


---

### Frozen Treats


---

### Beverages/Drinks


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
