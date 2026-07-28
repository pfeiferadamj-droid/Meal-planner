# Hy-Vee Home Store Sections & Shopping Flow

## A note on layout

This file documents the home Hy-Vee walk order used by the app, the same way `data/shopping-areas.md` documents the Trader Joe's walk. Only items assigned to Hy-Vee (see `data/hyvee-items.md`) land in these sections — everything else stays on the Trader Joe's run.

The zone list and keyword rules live in `lib/shoppingListOrder.ts` (`HYVEE_STORE_ORDER` and `HYVEE_KEYWORD_RULES`). Keep this doc and that file aligned. If the local store gets remodeled or the walk order feels wrong, update both.

---

## Store Sections

| Zone | What's Here |
|---|---|
| **Produce** | Fresh fruit and vegetables: bananas, apples, citrus, avocados, potatoes, onions, greens, fresh herbs |
| **Bakery & Gluten-Free** | Bakery plus the dedicated gluten-free section: GF bread, buns, bagels, English muffins, tortillas and wraps (Canyon Bakehouse, Schär, Udi's) |
| **Meat Counter** | Fresh butcher-counter proteins: chicken thighs/breasts, ground chicken, ground beef, pork tenderloin, pork chops, steaks, roasts |
| **Grocery Aisles** | Center-store shelf-stable items; the fallback for anything not matched elsewhere |
| **Dairy Case** | Milk, yogurt, cheese, eggs, butter, cream |
| **Frozen Aisle** | Anything frozen bought at Hy-Vee |

---

## Home Store Walk Order

```
1. Produce
      ↓
2. Bakery & Gluten-Free
      ↓
3. Meat Counter
      ↓
4. Grocery Aisles
      ↓
5. Dairy Case
      ↓
6. Frozen Aisle
```

---

## Practical Notes

- **Hy-Vee is the second stop.** The shopping list shows the full Trader Joe's run first, then the Hy-Vee run.
- **Zone names are unique across stores on purpose.** "Meat Counter" is Hy-Vee; "Meats & Seafood" is Trader Joe's. Never reuse a Trader Joe's zone name here.
- **Grocery Aisles is the fallback** for Hy-Vee items that don't match a more specific section.
