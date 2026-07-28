# Trader Joe's Home Store Sections & Shopping Flow

## A note on layout

This file documents the home Trader Joe's walk order used by the app. Shopping lists are derived from meal ingredients, then grouped into these sections so the shopper can move through the store once.

The household makes **one grocery run per week**. Trader Joe's is the default store and this file documents its walk order; when a week is shopped at Hy-Vee instead (Shop page toggle), the whole list regroups into the Hy-Vee walk order documented in `data/hyvee-areas.md`.

---

## Store Sections

| Zone | What's Here |
|---|---|
| **Flowers** | Bouquets, flowers, floral items, small plants |
| **Vegetables** | Leafy greens, cucumbers, tomatoes, peppers, zucchini, broccoli, asparagus, kale, cabbage, mushrooms, butternut squash, riced cauliflower, fresh vegetable shortcuts |
| **Roots** | Sweet potatoes, potatoes, carrots, beets, onions, shallots, fresh garlic, fresh ginger root |
| **Herbs** | Cilantro, parsley, basil, mint, dill, chives, thyme, rosemary, sage, other fresh herb packs |
| **Fruit** | Bananas, apples, berries, mango, lemons, limes, avocados, oranges, grapes, pears |
| **Prepped Salads** | Chopped salad kits and refrigerated prepared salad mixes |
| **Meats & Seafood** | Fresh chicken, ground beef, butcher-counter proteins |
| **Deli Meats & Cheeses** | Deli meats, Just Chicken, pulled chicken, grilled chicken strips, chicken sausage, hummus, guacamole, tzatziki, feta, ricotta, string cheese, cream cheese, sliced/shredded cheeses |
| **Vegan Items** | Refrigerated vegan/plant-based section: tofu, tempeh, plant-based meat-style items, refrigerated vegan dips and dressings |
| **Bread & Tortillas** | Lavash, tortillas, English muffins, sprouted bread, pita, baguette, bagels, crumpets, naan, rolls |
| **Chips** | Potato chips, tortilla chips, pita chips, rolled corn snacks, plantain chips |
| **Dairy & Eggs** | Eggs, hard-boiled eggs, Greek yogurt, cottage cheese, milk, kefir, sour cream, butter |
| **Pantry Items** | Sauces, condiments, dry grains, oats, pasta, canned beans, canned tomatoes, jarred vegetables, nuts, seeds, nut butters, crackers, crispbread, oils, vinegars, spices, broth, coconut milk, snacks |
| **Frozen Food** | Frozen proteins, frozen grains, frozen vegetables, frozen complete entrees, cauliflower gnocchi, frozen treats |
| **Sweets** | Candy, chocolate, caramels, cookies, boxed sweets, shelf-stable desserts |
| **Beverages** | Sparkling water, seltzer, lemonade, juice, kombucha, sodas, shelf-stable drinks |
| **Beer/Wine** | Beer, cider, wine, and other alcohol; last stop in the walk |

---

## Home Store Walk Order

```
1. Flowers
      ↓
2. Vegetables
      ↓
3. Roots
      ↓
4. Herbs
      ↓
5. Fruit
      ↓
6. Prepped Salads
      ↓
7. Meats & Seafood
      ↓
8. Deli Meats & Cheeses
      ↓
9. Vegan Items
      ↓
10. Bread & Tortillas
      ↓
11. Chips
      ↓
12. Dairy & Eggs
      ↓
13. Pantry Items
      ↓
14. Frozen Food
      ↓
15. Sweets
      ↓
16. Beverages
      ↓
17. Beer/Wine
```

---

## Practical Notes

- **Shopping lists are derived**, not hand-authored. The app groups each meal ingredient into the physical section above.
- **Frozen wins over fresh naming.** Frozen broccoli, frozen salmon, frozen edamame, and frozen grains go to Frozen Food even if their base ingredient sounds like produce, meat, vegan, or pantry.
- **Vegan Items means the refrigerated vegan area.** Tofu, tempeh, plant-based meat-style items, and refrigerated vegan dips/dressings go there. Beans, lentils, canned chickpeas, frozen edamame, and frozen vegan entrees stay in their normal physical sections.
- **Dairy & Eggs is separate from Deli Meats & Cheeses.** Yogurt, cottage cheese, eggs, milk, kefir, sour cream, and butter go to Dairy & Eggs; cheeses and deli-style cold-case items go to Deli Meats & Cheeses.
- **Tomatoes are treated as Vegetables** for shopping behavior. Lemons, limes, and avocados are treated as Fruit.
- **Pantry Items is the fallback** for unknown shelf-stable or ambiguous items.