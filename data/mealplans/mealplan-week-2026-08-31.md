# Current Week Plan: August 31 — September 6

Active week of food: five dinners — a full week shopped in one trip, with leftovers covering the other nights. There are no days or timeslots; `meals` is a flat list shown in the app's "The Menu" view. Fiber is a first-class macro on every ingredient and meal.

Plain Midwest weeknight dinners: baked salmon with potatoes, a cheesy chicken and rice bake, taco night, baked ziti, and fried rice. Every meal is gluten-free and leans low-sodium. **Zero red-meat dinners this week** — beef, pork, and lamb sit out entirely as requested. No lentils, no artichokes, no yogurt-based sauces, no frozen entrées. **One Asian dinner (Chicken Fried Rice) and no Indian**, per the cuisine mix in `data/diner-preferences.md`; the Italian-American slot is baked ziti. The egg in the fried rice is bound into the dish, not the featured protein. No meal repeats from the last two weeks. Fearless Flyer was not consulted at planning time, so every product comes from the verified catalog in `data/data_context.md`.

**Fish night (household exception).** `data/diner-preferences.md` bans fish outright, but this week was requested with one fish dinner: the salmon night is built as a **protein-swap dinner** — one diner has the salmon fillet, the other bakes chicken thighs on the same sheet pan with the same seasoning. The potatoes, green beans, and lemon are shared, so it shops as one meal. Buy **1 salmon fillet and 1 portion of chicken thighs.** The meal macros below are the salmon plate; the chicken-thigh plate lands at roughly **475 cal / 35g protein / 55g carbs / 13g fat / 9g fiber**. The standing no-fish rule in the preferences file was left unchanged — this is a one-week exception, not a rule edit.

**On the protein mix:** with no red meat, no turkey, no tofu, and fish limited to the one swap night, chicken carries four of the five dinners. They're deliberately different cuts and techniques (baked thighs, pulled chicken, ground chicken, diced breast), and black beans do real protein work on taco night; ricotta and mozzarella carry part of the ziti. Say the word if you'd rather one night go vegetarian — chili or baked potatoes would slot in cleanly.

## Canonical JSON
```json
{
  "weekRange": "August 31 — September 6",
  "meals": [
    {
      "type": "Dinner",
      "name": "Baked Salmon with Potatoes and Green Beans",
      "build": {
        "pro": ["salmon fillet, baked (fish diner)", "chicken thighs, baked (swap portion)"],
        "base": ["baby potatoes, roasted"],
        "veg": ["green beans", "lemon"],
        "engine": ["Trader Joe's Everything But the Bagel Seasoning"]
      },
      "ingredients": [
        { "name": "Salmon fillet", "quantity": "5 oz (one diner)", "category": "pro", "macros": { "cal": 290, "p": 34, "c": 0, "f": 17, "fiber": 0 } },
        { "name": "Boneless skinless chicken thighs", "quantity": "5 oz — swap portion for the second diner; macros counted separately (see notes)", "category": "pro", "macros": { "cal": 0, "p": 0, "c": 0, "f": 0, "fiber": 0 } },
        { "name": "Baby potatoes", "quantity": "8 oz, halved", "category": "base", "macros": { "cal": 180, "p": 4, "c": 41, "f": 0, "fiber": 4 } },
        { "name": "Green beans", "quantity": "1 1/2 cups", "category": "veg", "macros": { "cal": 45, "p": 2, "c": 10, "f": 0, "fiber": 4 } },
        { "name": "Lemon", "quantity": "1/2 lemon", "category": "veg", "macros": { "cal": 10, "p": 0, "c": 3, "f": 0, "fiber": 1 } },
        { "name": "Trader Joe's Everything But the Bagel Seasoning", "quantity": "2 tsp", "category": "engine", "macros": { "cal": 10, "p": 1, "c": 1, "f": 1, "fiber": 0 } }
      ],
      "macros": { "cal": 535, "p": 41, "c": 55, "f": 18, "fiber": 9 }
    },
    {
      "type": "Dinner",
      "name": "Cheesy Chicken and Rice Bake",
      "build": {
        "pro": ["Trader Joe's Just Chicken, pulled", "shredded cheddar"],
        "base": ["white rice"],
        "veg": ["broccoli florets"],
        "engine": ["Trader Joe's Garlic Spread & Dip"]
      },
      "ingredients": [
        { "name": "Trader Joe's Just Chicken", "quantity": "4 oz, pulled", "category": "pro", "macros": { "cal": 140, "p": 28, "c": 0, "f": 3, "fiber": 0 } },
        { "name": "Shredded cheddar", "quantity": "1/4 cup", "category": "pro", "macros": { "cal": 110, "p": 7, "c": 1, "f": 9, "fiber": 0 } },
        { "name": "White rice", "quantity": "3/4 cup cooked", "category": "base", "macros": { "cal": 150, "p": 3, "c": 33, "f": 0, "fiber": 1 } },
        { "name": "Broccoli florets", "quantity": "1 1/2 cups", "category": "veg", "macros": { "cal": 45, "p": 4, "c": 9, "f": 0, "fiber": 4 } },
        { "name": "Trader Joe's Garlic Spread & Dip", "quantity": "2 tbsp", "category": "engine", "macros": { "cal": 60, "p": 1, "c": 2, "f": 6, "fiber": 0 } }
      ],
      "macros": { "cal": 505, "p": 43, "c": 45, "f": 18, "fiber": 5 }
    },
    {
      "type": "Dinner",
      "name": "Chicken Tacos",
      "build": {
        "pro": ["Trader Joe's Hardwood Smoked Pulled Chicken", "black beans", "shredded cheddar"],
        "base": ["corn tortillas"],
        "veg": ["shredded romaine"],
        "engine": ["Trader Joe's Taco Seasoning Mix"]
      },
      "ingredients": [
        { "name": "Trader Joe's Hardwood Smoked Pulled Chicken", "quantity": "4 oz", "category": "pro", "macros": { "cal": 160, "p": 26, "c": 2, "f": 5, "fiber": 0 } },
        { "name": "Black beans", "quantity": "1/2 cup, drained", "category": "pro", "macros": { "cal": 110, "p": 7, "c": 20, "f": 0, "fiber": 7 } },
        { "name": "Shredded cheddar", "quantity": "2 tbsp", "category": "pro", "macros": { "cal": 55, "p": 3, "c": 1, "f": 4, "fiber": 0 } },
        { "name": "Corn tortillas", "quantity": "3 tortillas", "category": "base", "macros": { "cal": 150, "p": 3, "c": 30, "f": 2, "fiber": 4 } },
        { "name": "Shredded romaine", "quantity": "1 cup", "category": "veg", "macros": { "cal": 8, "p": 1, "c": 2, "f": 0, "fiber": 1 } },
        { "name": "Trader Joe's Taco Seasoning Mix", "quantity": "1 tbsp", "category": "engine", "macros": { "cal": 15, "p": 0, "c": 3, "f": 0, "fiber": 1 } }
      ],
      "macros": { "cal": 498, "p": 40, "c": 58, "f": 11, "fiber": 13 }
    },
    {
      "type": "Dinner",
      "name": "Baked Ziti with Ground Chicken",
      "build": {
        "pro": ["ground chicken, browned", "shredded mozzarella", "Trader Joe's Part-Skim Ricotta"],
        "base": ["Trader Joe's Brown Rice Pasta"],
        "veg": ["zucchini"],
        "engine": ["Trader Joe's Roasted Garlic Marinara"]
      },
      "ingredients": [
        { "name": "Ground chicken", "quantity": "4 oz", "category": "pro", "macros": { "cal": 175, "p": 24, "c": 0, "f": 9, "fiber": 0 } },
        { "name": "Trader Joe's Brown Rice Pasta", "quantity": "1 1/2 oz dry", "category": "base", "macros": { "cal": 150, "p": 3, "c": 33, "f": 1, "fiber": 2 } },
        { "name": "Trader Joe's Roasted Garlic Marinara", "quantity": "1/2 cup", "category": "engine", "macros": { "cal": 60, "p": 2, "c": 10, "f": 2, "fiber": 2 } },
        { "name": "Trader Joe's Part-Skim Ricotta", "quantity": "2 tbsp", "category": "pro", "macros": { "cal": 45, "p": 4, "c": 2, "f": 3, "fiber": 0 } },
        { "name": "Shredded mozzarella", "quantity": "1/4 cup", "category": "pro", "macros": { "cal": 80, "p": 6, "c": 1, "f": 6, "fiber": 0 } },
        { "name": "Zucchini", "quantity": "1 cup half-moons", "category": "veg", "macros": { "cal": 20, "p": 1, "c": 4, "f": 0, "fiber": 1 } }
      ],
      "macros": { "cal": 530, "p": 40, "c": 50, "f": 21, "fiber": 5 }
    },
    {
      "type": "Dinner",
      "name": "Chicken Fried Rice",
      "build": {
        "pro": ["chicken breast, diced"],
        "base": ["Trader Joe's Frozen Organic Brown Rice"],
        "veg": ["frozen peas and carrots"],
        "engine": ["Trader Joe's Coconut Aminos"]
      },
      "ingredients": [
        { "name": "Chicken breast", "quantity": "5 oz, diced", "category": "pro", "macros": { "cal": 165, "p": 31, "c": 0, "f": 4, "fiber": 0 } },
        { "name": "Trader Joe's Frozen Organic Brown Rice", "quantity": "3/4 cup cooked", "category": "base", "macros": { "cal": 165, "p": 4, "c": 34, "f": 1, "fiber": 2 } },
        { "name": "Frozen peas and carrots", "quantity": "3/4 cup", "category": "veg", "macros": { "cal": 60, "p": 3, "c": 12, "f": 0, "fiber": 4 } },
        { "name": "Egg", "quantity": "1 egg, scrambled into the rice", "category": "pro", "macros": { "cal": 70, "p": 6, "c": 0, "f": 5, "fiber": 0 } },
        { "name": "Trader Joe's Coconut Aminos", "quantity": "2 tbsp", "category": "engine", "macros": { "cal": 30, "p": 0, "c": 7, "f": 0, "fiber": 0 } }
      ],
      "macros": { "cal": 490, "p": 44, "c": 53, "f": 10, "fiber": 6 }
    }
  ],
  "junkList": [
    {
      "category": "Coffee/Creamer",
      "items": []
    },
    {
      "category": "Beer/Wine",
      "items": []
    },
    {
      "category": "Chips",
      "items": []
    },
    {
      "category": "Sweets",
      "items": []
    },
    {
      "category": "Frozen Food",
      "items": []
    },
    {
      "category": "Frozen Treats",
      "items": []
    },
    {
      "category": "Beverages/Drinks",
      "items": []
    }
  ]
}
```
