# Current Week Plan: August 17 — August 23

Active week of food: seven dinners — one for every night, shopped in one trip. There are no days or timeslots; `meals` is a flat list shown in the app's "The Menu" view. Fiber is a first-class macro on every ingredient and meal.

Familiar weeknight dinners only — tacos, spaghetti, stir-fry, BBQ chicken, fajitas, curry, loaded sweet potatoes. Nothing that needs explaining. Every meal is gluten-free and leans low-sodium. One dinner uses red meat (Beef Tacos) — none eaten in the prior 10 days per the household check. No lentils, artichokes, yogurt-based sauces, or featured-egg dishes. **Junk list intentionally empty — "skip junk" requested.** Fearless Flyer was unreachable at planning time, so every product is from the verified catalog in `data/data_context.md`.

## Canonical JSON
```json
{
  "weekRange": "August 17 — August 23",
  "meals": [
    {
      "type": "Dinner",
      "name": "Beef Tacos",
      "build": {
        "pro": ["grass-fed ground beef, browned", "shredded cheddar"],
        "base": ["corn tortillas"],
        "veg": ["shredded romaine", "cherry tomatoes"],
        "engine": ["Trader Joe's Taco Seasoning Mix"]
      },
      "ingredients": [
        { "name": "Grass-fed ground beef", "quantity": "4 1/2 oz", "category": "pro", "macros": { "cal": 225, "p": 25, "c": 0, "f": 14, "fiber": 0 } },
        { "name": "Shredded cheddar", "quantity": "3 tbsp", "category": "pro", "macros": { "cal": 90, "p": 5, "c": 1, "f": 7, "fiber": 0 } },
        { "name": "Corn tortillas", "quantity": "3 tortillas", "category": "base", "macros": { "cal": 150, "p": 3, "c": 30, "f": 2, "fiber": 4 } },
        { "name": "Shredded romaine", "quantity": "1 1/2 cups", "category": "veg", "macros": { "cal": 12, "p": 1, "c": 2, "f": 0, "fiber": 1 } },
        { "name": "Cherry tomatoes", "quantity": "1/2 cup diced", "category": "veg", "macros": { "cal": 15, "p": 1, "c": 3, "f": 0, "fiber": 1 } },
        { "name": "Trader Joe's Taco Seasoning Mix", "quantity": "1 tbsp", "category": "engine", "macros": { "cal": 15, "p": 0, "c": 3, "f": 0, "fiber": 1 } }
      ],
      "macros": { "cal": 507, "p": 35, "c": 39, "f": 23, "fiber": 7 }
    },
    {
      "type": "Dinner",
      "name": "BBQ Chicken with Potato Wedges & Green Beans",
      "build": {
        "pro": ["boneless skinless chicken thighs"],
        "base": ["russet potatoes"],
        "veg": ["green beans"],
        "engine": ["Trader Joe's Kansas City Style BBQ Sauce"]
      },
      "ingredients": [
        { "name": "Boneless skinless chicken thighs", "quantity": "5 oz cooked", "category": "pro", "macros": { "cal": 230, "p": 28, "c": 0, "f": 12, "fiber": 0 } },
        { "name": "Russet potatoes", "quantity": "8 oz, cut into wedges", "category": "base", "macros": { "cal": 180, "p": 4, "c": 41, "f": 0, "fiber": 4 } },
        { "name": "Green beans", "quantity": "1 1/2 cups", "category": "veg", "macros": { "cal": 45, "p": 2, "c": 10, "f": 0, "fiber": 4 } },
        { "name": "Trader Joe's Kansas City Style BBQ Sauce", "quantity": "2 tbsp", "category": "engine", "macros": { "cal": 70, "p": 0, "c": 17, "f": 0, "fiber": 0 } }
      ],
      "macros": { "cal": 525, "p": 34, "c": 68, "f": 12, "fiber": 8 }
    },
    {
      "type": "Dinner",
      "name": "Chicken & Broccoli Stir-Fry with Rice",
      "build": {
        "pro": ["chicken breast, sliced"],
        "base": ["Trader Joe's Frozen Jasmine Rice"],
        "veg": ["broccoli florets", "carrots"],
        "engine": ["Trader Joe's Gluten Free Tamari"]
      },
      "ingredients": [
        { "name": "Chicken breast", "quantity": "6 oz, sliced", "category": "pro", "macros": { "cal": 200, "p": 37, "c": 0, "f": 5, "fiber": 0 } },
        { "name": "Trader Joe's Frozen Jasmine Rice", "quantity": "1 cup cooked", "category": "base", "macros": { "cal": 215, "p": 4, "c": 47, "f": 1, "fiber": 1 } },
        { "name": "Broccoli florets", "quantity": "1 1/2 cups", "category": "veg", "macros": { "cal": 45, "p": 4, "c": 9, "f": 0, "fiber": 4 } },
        { "name": "Carrots", "quantity": "1/2 cup sliced", "category": "veg", "macros": { "cal": 25, "p": 1, "c": 6, "f": 0, "fiber": 2 } },
        { "name": "Trader Joe's Gluten Free Tamari", "quantity": "1 1/2 tbsp", "category": "engine", "macros": { "cal": 15, "p": 2, "c": 1, "f": 0, "fiber": 0 } }
      ],
      "macros": { "cal": 500, "p": 48, "c": 63, "f": 6, "fiber": 7 }
    },
    {
      "type": "Dinner",
      "name": "Spaghetti with Chicken Sausage & Marinara",
      "build": {
        "pro": ["Trader Joe's Roasted Garlic Chicken Sausage, sliced", "shaved parmesan"],
        "base": ["Trader Joe's Brown Rice Pasta"],
        "veg": ["zucchini"],
        "engine": ["Trader Joe's Roasted Garlic Marinara"]
      },
      "ingredients": [
        { "name": "Trader Joe's Roasted Garlic Chicken Sausage", "quantity": "2 links, sliced", "category": "pro", "macros": { "cal": 220, "p": 22, "c": 8, "f": 11, "fiber": 0 } },
        { "name": "Trader Joe's Brown Rice Pasta", "quantity": "2 oz dry", "category": "base", "macros": { "cal": 200, "p": 4, "c": 44, "f": 1, "fiber": 3 } },
        { "name": "Trader Joe's Roasted Garlic Marinara", "quantity": "1/2 cup", "category": "engine", "macros": { "cal": 60, "p": 2, "c": 10, "f": 2, "fiber": 2 } },
        { "name": "Zucchini", "quantity": "1 cup half-moons", "category": "veg", "macros": { "cal": 20, "p": 1, "c": 4, "f": 0, "fiber": 1 } },
        { "name": "Shaved parmesan", "quantity": "2 tbsp", "category": "pro", "macros": { "cal": 40, "p": 4, "c": 0, "f": 3, "fiber": 0 } }
      ],
      "macros": { "cal": 540, "p": 33, "c": 66, "f": 17, "fiber": 6 }
    },
    {
      "type": "Dinner",
      "name": "Chicken Fajitas",
      "build": {
        "pro": ["chicken breast, sliced"],
        "base": ["Trader Joe's Cilantro Lime Rice"],
        "veg": ["bell peppers", "yellow onions"],
        "engine": ["Trader Joe's Salsa Autentica"]
      },
      "ingredients": [
        { "name": "Chicken breast", "quantity": "5 oz, sliced", "category": "pro", "macros": { "cal": 165, "p": 31, "c": 0, "f": 4, "fiber": 0 } },
        { "name": "Trader Joe's Cilantro Lime Rice", "quantity": "3/4 cup", "category": "base", "macros": { "cal": 170, "p": 3, "c": 33, "f": 2, "fiber": 1 } },
        { "name": "Bell peppers", "quantity": "1 1/2 cups sliced", "category": "veg", "macros": { "cal": 45, "p": 2, "c": 10, "f": 0, "fiber": 3 } },
        { "name": "Yellow onions", "quantity": "1 cup sliced", "category": "veg", "macros": { "cal": 60, "p": 2, "c": 14, "f": 0, "fiber": 2 } },
        { "name": "Avocado", "quantity": "1/4 avocado", "category": "veg", "macros": { "cal": 60, "p": 1, "c": 3, "f": 6, "fiber": 3 } },
        { "name": "Trader Joe's Salsa Autentica", "quantity": "3 tbsp", "category": "engine", "macros": { "cal": 15, "p": 1, "c": 3, "f": 0, "fiber": 1 } }
      ],
      "macros": { "cal": 515, "p": 40, "c": 63, "f": 12, "fiber": 10 }
    },
    {
      "type": "Dinner",
      "name": "Coconut Curry Chicken over Rice",
      "build": {
        "pro": ["boneless skinless chicken thighs"],
        "base": ["basmati rice"],
        "veg": ["bell peppers", "baby spinach"],
        "engine": ["Trader Joe's Organic Coconut Milk"]
      },
      "ingredients": [
        { "name": "Boneless skinless chicken thighs", "quantity": "5 oz cooked", "category": "pro", "macros": { "cal": 230, "p": 28, "c": 0, "f": 12, "fiber": 0 } },
        { "name": "Basmati rice", "quantity": "3/4 cup cooked", "category": "base", "macros": { "cal": 150, "p": 3, "c": 33, "f": 0, "fiber": 1 } },
        { "name": "Bell peppers", "quantity": "1 cup sliced", "category": "veg", "macros": { "cal": 30, "p": 1, "c": 7, "f": 0, "fiber": 2 } },
        { "name": "Baby spinach", "quantity": "2 cups", "category": "veg", "macros": { "cal": 14, "p": 2, "c": 2, "f": 0, "fiber": 1 } },
        { "name": "Trader Joe's Organic Coconut Milk", "quantity": "1/3 cup", "category": "engine", "macros": { "cal": 120, "p": 1, "c": 2, "f": 12, "fiber": 0 } }
      ],
      "macros": { "cal": 544, "p": 35, "c": 44, "f": 24, "fiber": 4 }
    },
    {
      "type": "Dinner",
      "name": "Loaded Sweet Potatoes with Black Beans & Cheddar",
      "build": {
        "pro": ["Trader Joe's Organic Black Beans", "shredded cheddar"],
        "base": ["sweet potatoes"],
        "veg": ["frozen sweet corn"],
        "engine": ["Trader Joe's Organic Taco Sauce"]
      },
      "ingredients": [
        { "name": "Trader Joe's Organic Black Beans", "quantity": "3/4 cup", "category": "pro", "macros": { "cal": 165, "p": 10, "c": 30, "f": 1, "fiber": 11 } },
        { "name": "Shredded cheddar", "quantity": "1/4 cup", "category": "pro", "macros": { "cal": 110, "p": 7, "c": 1, "f": 9, "fiber": 0 } },
        { "name": "Sweet potatoes", "quantity": "1 large, baked", "category": "base", "macros": { "cal": 160, "p": 4, "c": 37, "f": 0, "fiber": 6 } },
        { "name": "Frozen sweet corn", "quantity": "1/2 cup", "category": "veg", "macros": { "cal": 60, "p": 2, "c": 14, "f": 1, "fiber": 2 } },
        { "name": "Trader Joe's Organic Taco Sauce", "quantity": "3 tbsp", "category": "engine", "macros": { "cal": 15, "p": 0, "c": 3, "f": 0, "fiber": 0 } }
      ],
      "macros": { "cal": 510, "p": 23, "c": 85, "f": 11, "fiber": 19 }
    }
  ],
  "junkList": [
    { "category": "Coffee/Creamer", "items": [] },
    { "category": "Beer/Wine", "items": [] },
    { "category": "Chips", "items": [] },
    { "category": "Sweets", "items": [] },
    { "category": "Frozen Food", "items": [] },
    { "category": "Frozen Treats", "items": [] },
    { "category": "Beverages/Drinks", "items": [] }
  ]
}
```
