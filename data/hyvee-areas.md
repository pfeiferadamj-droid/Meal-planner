# Hy-Vee Home Store Sections & Shopping Flow

## A note on layout

The household makes **one grocery run per week** — Trader Joe's by default, Hy-Vee when chosen for the week (Shop page toggle, or `shoppingStore: "hyvee"` on the plan). On a Hy-Vee week the entire shopping list is grouped into the sections below, in this walk order — the same way `data/shopping-areas.md` works for Trader Joe's weeks.

The zone list and the Trader Joe's → Hy-Vee section mapping live in `lib/shoppingListOrder.ts` (`HYVEE_STORE_ORDER` and `TRADER_JOES_TO_HYVEE_ZONE`). Keep this doc and that file aligned. If the local store gets remodeled or the walk order feels wrong, update both.

---

## Store Sections

| Zone | What's Here |
|---|---|
| **Produce** | Fresh fruit and vegetables, fresh herbs, salad kits, floral |
| **Bakery & Gluten-Free** | Bakery plus the dedicated gluten-free section: GF bread, buns, bagels, tortillas and wraps (Canyon Bakehouse, Schär, Udi's) |
| **Deli** | Deli meats and cheeses, hummus, prepared refrigerated proteins |
| **Meat Counter** | Fresh butcher-counter proteins: chicken thighs/breasts, ground chicken, ground beef, pork tenderloin, steaks, roasts |
| **Grocery Aisles** | Center-store shelf-stable items: sauces, grains, canned goods, snacks, chips, sweets, beverages; the fallback zone |
| **Dairy Case** | Milk, yogurt, cottage cheese, eggs, butter, refrigerated plant-based items |
| **Frozen Aisle** | Frozen vegetables, grains, entrées, treats |
| **Beer & Wine** | Beer, wine, and other alcohol; last stop in the walk |

---

## Home Store Walk Order

```
1. Produce
      ↓
2. Bakery & Gluten-Free
      ↓
3. Deli
      ↓
4. Meat Counter
      ↓
5. Grocery Aisles
      ↓
6. Dairy Case
      ↓
7. Frozen Aisle
      ↓
8. Beer & Wine
```

---

## How items are placed

Items classify through the (rich) Trader Joe's keyword rules first, then map onto the Hy-Vee section that carries the same goods:

| Trader Joe's zone | Hy-Vee zone |
|---|---|
| Flowers, Prepped Salads, Herbs, Vegetables, Fruit, Roots | Produce |
| Bread & Tortillas | Bakery & Gluten-Free |
| Deli Meats & Cheeses | Deli |
| Meats & Seafood | Meat Counter |
| Beverages, Pantry Items, Sweets, Chips | Grocery Aisles |
| Dairy & Eggs, Vegan Items | Dairy Case |
| Frozen Food | Frozen Aisle |
| Beer/Wine | Beer & Wine |

## Planning a Hy-Vee week

- Prefer **generic ingredient names** and nationally available brands — the shopper can't buy "Trader Joe's Zhoug Sauce" at Hy-Vee.
- TJ's-branded engines are fine **only if they're already in the pantry** (mark them `pantry: true` context or lean on the Use Up list); otherwise pick a Hy-Vee-available equivalent and name it plainly ("chimichurri sauce", "sweet chili sauce" — still gluten-free).
- Hy-Vee's gluten-free bakery (Canyon Bakehouse, Schär, Udi's) is much bigger than TJ's — Hy-Vee weeks are the time to plan GF buns, bagels, and wraps.
- The fresh meat counter is a strength: chicken thighs, ground chicken, pork tenderloin, steaks all fit the household rules (red-meat cadence still applies).
