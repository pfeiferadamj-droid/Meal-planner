# Current Week Plan: July 27 — August 2

Active week of food: seven dinners — one for every night, shopped in one trip. There are no days or timeslots; `meals` is a flat list shown in the app's "The Menu" view. Fiber is a first-class macro on every ingredient and meal.

Every meal is gluten-free (whole-household rule) and leans low-sodium (whole ingredients, light-handed sauces). One dinner uses red meat (Salsa Autentica Beef Tacos) — none was served in the prior 10 days, keeping the once-per-10-days cadence. No standalone fried or scrambled eggs anywhere this week. Fearless Flyer was unreachable at planning time, so every product is from the verified catalog in `data/data_context.md`.

## Canonical JSON
```json
{
  "weekRange": "July 27 — August 2",
  "meals": [
    {
      "type": "Dinner",
      "name": "Zhoug Chicken with Jasmine Rice & Charred Zucchini",
      "build": {
        "pro": ["boneless skinless chicken thighs, seared"],
        "base": ["Trader Joe's Frozen Jasmine Rice"],
        "veg": ["zucchini", "Persian cucumbers"],
        "engine": ["Trader Joe's Zhoug Sauce"]
      },
      "ingredients": [
        { "name": "Boneless skinless chicken thighs", "quantity": "5 oz cooked", "category": "pro", "macros": { "cal": 230, "p": 28, "c": 0, "f": 12, "fiber": 0 } },
        { "name": "Trader Joe's Frozen Jasmine Rice", "quantity": "3/4 cup cooked", "category": "base", "macros": { "cal": 160, "p": 3, "c": 35, "f": 1, "fiber": 1 } },
        { "name": "Zucchini", "quantity": "1 1/2 cups, charred", "category": "veg", "macros": { "cal": 30, "p": 2, "c": 6, "f": 0, "fiber": 2 } },
        { "name": "Persian cucumbers", "quantity": "1 cup sliced", "category": "veg", "macros": { "cal": 15, "p": 1, "c": 3, "f": 0, "fiber": 1 } },
        { "name": "Trader Joe's Zhoug Sauce", "quantity": "1 1/2 tbsp", "category": "engine", "macros": { "cal": 70, "p": 1, "c": 2, "f": 7, "fiber": 1 } }
      ],
      "macros": { "cal": 505, "p": 35, "c": 46, "f": 20, "fiber": 5 }
    },
    {
      "type": "Dinner",
      "name": "Salsa Autentica Beef Tacos with Cabbage & Avocado",
      "build": {
        "pro": ["grass-fed ground beef, browned"],
        "base": ["corn tortillas"],
        "veg": ["shredded green cabbage", "avocado"],
        "engine": ["Trader Joe's Salsa Autentica"]
      },
      "ingredients": [
        { "name": "Grass-fed ground beef", "quantity": "4 1/2 oz", "category": "pro", "macros": { "cal": 225, "p": 25, "c": 0, "f": 14, "fiber": 0 } },
        { "name": "Corn tortillas", "quantity": "3 tortillas", "category": "base", "macros": { "cal": 150, "p": 3, "c": 30, "f": 2, "fiber": 4 } },
        { "name": "Shredded green cabbage", "quantity": "1 cup", "category": "veg", "macros": { "cal": 20, "p": 1, "c": 5, "f": 0, "fiber": 2 } },
        { "name": "Avocado", "quantity": "1/2 avocado", "category": "veg", "macros": { "cal": 120, "p": 1, "c": 6, "f": 11, "fiber": 5 } },
        { "name": "Trader Joe's Salsa Autentica", "quantity": "4 tbsp", "category": "engine", "macros": { "cal": 20, "p": 1, "c": 4, "f": 0, "fiber": 1 } }
      ],
      "macros": { "cal": 535, "p": 31, "c": 45, "f": 27, "fiber": 12 }
    },
    {
      "type": "Dinner",
      "name": "Thai Red Curry Ground Chicken & Rice Noodle Bowl",
      "build": {
        "pro": ["ground chicken, browned"],
        "base": ["rice noodles"],
        "veg": ["broccoli florets"],
        "engine": ["Trader Joe's Red Curry Sauce"]
      },
      "ingredients": [
        { "name": "Ground chicken", "quantity": "5 oz", "category": "pro", "macros": { "cal": 200, "p": 26, "c": 0, "f": 10, "fiber": 0 } },
        { "name": "Rice noodles", "quantity": "1 1/2 oz dry", "category": "base", "macros": { "cal": 160, "p": 3, "c": 36, "f": 0, "fiber": 1 } },
        { "name": "Broccoli florets", "quantity": "1 1/2 cups", "category": "veg", "macros": { "cal": 45, "p": 4, "c": 9, "f": 0, "fiber": 4 } },
        { "name": "Trader Joe's Red Curry Sauce", "quantity": "1/3 cup", "category": "engine", "macros": { "cal": 80, "p": 1, "c": 7, "f": 5, "fiber": 0 } }
      ],
      "macros": { "cal": 485, "p": 34, "c": 52, "f": 15, "fiber": 5 }
    },
    {
      "type": "Dinner",
      "name": "Apple Chicken Sausage & Crispy Potatoes with Green Dragon Drizzle",
      "build": {
        "pro": ["Trader Joe's Sweet Apple Chicken Sausage, sliced & seared"],
        "base": ["baby potatoes"],
        "veg": ["Trader Joe's Shaved Brussels Sprouts", "cherry tomatoes"],
        "engine": ["Trader Joe's Green Dragon Hot Sauce"]
      },
      "ingredients": [
        { "name": "Trader Joe's Sweet Apple Chicken Sausage", "quantity": "2 links, sliced", "category": "pro", "macros": { "cal": 220, "p": 22, "c": 10, "f": 10, "fiber": 0 } },
        { "name": "Baby potatoes", "quantity": "8 oz, smashed & roasted", "category": "base", "macros": { "cal": 170, "p": 4, "c": 39, "f": 0, "fiber": 4 } },
        { "name": "Trader Joe's Shaved Brussels Sprouts", "quantity": "1 1/2 cups, pan-crisped", "category": "veg", "macros": { "cal": 40, "p": 3, "c": 8, "f": 0, "fiber": 3 } },
        { "name": "Cherry tomatoes", "quantity": "1/2 cup halved", "category": "veg", "macros": { "cal": 15, "p": 1, "c": 3, "f": 0, "fiber": 1 } },
        { "name": "Trader Joe's Green Dragon Hot Sauce", "quantity": "2 tbsp", "category": "engine", "macros": { "cal": 10, "p": 0, "c": 2, "f": 0, "fiber": 0 } }
      ],
      "macros": { "cal": 455, "p": 30, "c": 62, "f": 10, "fiber": 8 }
    },
    {
      "type": "Dinner",
      "name": "Lentil Bolognese over Brown Rice Pasta",
      "build": {
        "pro": ["Trader Joe's Steamed Lentils", "shaved parmesan"],
        "base": ["Trader Joe's Brown Rice Pasta"],
        "veg": ["cremini mushrooms"],
        "engine": ["Trader Joe's Roasted Garlic Marinara"]
      },
      "ingredients": [
        { "name": "Trader Joe's Steamed Lentils", "quantity": "1 cup", "category": "pro", "macros": { "cal": 200, "p": 14, "c": 30, "f": 1, "fiber": 10 } },
        { "name": "Shaved parmesan", "quantity": "2 tbsp", "category": "pro", "macros": { "cal": 40, "p": 4, "c": 0, "f": 3, "fiber": 0 } },
        { "name": "Trader Joe's Brown Rice Pasta", "quantity": "1 1/2 oz dry", "category": "base", "macros": { "cal": 150, "p": 3, "c": 33, "f": 1, "fiber": 2 } },
        { "name": "Cremini mushrooms", "quantity": "1 cup sliced", "category": "veg", "macros": { "cal": 20, "p": 2, "c": 3, "f": 0, "fiber": 1 } },
        { "name": "Trader Joe's Roasted Garlic Marinara", "quantity": "1/2 cup", "category": "engine", "macros": { "cal": 60, "p": 2, "c": 10, "f": 2, "fiber": 2 } }
      ],
      "macros": { "cal": 470, "p": 25, "c": 76, "f": 7, "fiber": 15 }
    },
    {
      "type": "Dinner",
      "name": "Chili Crunch Chicken & Quinoa Stir-Fry",
      "build": {
        "pro": ["chicken breast, sliced"],
        "base": ["quinoa"],
        "veg": ["Trader Joe's Frozen Fire Roasted Bell Peppers & Onions", "baby spinach"],
        "engine": ["Trader Joe's Chili Onion Crunch"]
      },
      "ingredients": [
        { "name": "Chicken breast", "quantity": "5 oz, sliced", "category": "pro", "macros": { "cal": 165, "p": 31, "c": 0, "f": 4, "fiber": 0 } },
        { "name": "Quinoa", "quantity": "3/4 cup cooked", "category": "base", "macros": { "cal": 165, "p": 6, "c": 29, "f": 3, "fiber": 4 } },
        { "name": "Trader Joe's Frozen Fire Roasted Bell Peppers & Onions", "quantity": "1 cup", "category": "veg", "macros": { "cal": 35, "p": 1, "c": 7, "f": 0, "fiber": 2 } },
        { "name": "Baby spinach", "quantity": "2 cups, wilted", "category": "veg", "macros": { "cal": 14, "p": 2, "c": 2, "f": 0, "fiber": 1 } },
        { "name": "Trader Joe's Chili Onion Crunch", "quantity": "1 tbsp", "category": "engine", "macros": { "cal": 80, "p": 1, "c": 2, "f": 8, "fiber": 0 } }
      ],
      "macros": { "cal": 459, "p": 41, "c": 40, "f": 15, "fiber": 7 }
    },
    {
      "type": "Dinner",
      "name": "Coconut Chickpea Curry with Sweet Potatoes & Kale",
      "build": {
        "pro": ["Trader Joe's Organic Chickpeas"],
        "base": ["sweet potatoes"],
        "veg": ["Tuscan kale", "frozen petite peas"],
        "engine": ["Trader Joe's Organic Coconut Milk"]
      },
      "ingredients": [
        { "name": "Trader Joe's Organic Chickpeas", "quantity": "1 1/4 cups drained", "category": "pro", "macros": { "cal": 260, "p": 15, "c": 44, "f": 4, "fiber": 12 } },
        { "name": "Sweet potatoes", "quantity": "1 medium, cubed", "category": "base", "macros": { "cal": 115, "p": 2, "c": 27, "f": 0, "fiber": 4 } },
        { "name": "Tuscan kale", "quantity": "2 cups chopped", "category": "veg", "macros": { "cal": 20, "p": 2, "c": 4, "f": 0, "fiber": 2 } },
        { "name": "Frozen petite peas", "quantity": "1/2 cup", "category": "veg", "macros": { "cal": 60, "p": 4, "c": 10, "f": 0, "fiber": 4 } },
        { "name": "Trader Joe's Organic Coconut Milk", "quantity": "1/4 cup", "category": "engine", "macros": { "cal": 90, "p": 1, "c": 1, "f": 9, "fiber": 0 } }
      ],
      "macros": { "cal": 545, "p": 24, "c": 86, "f": 13, "fiber": 22 }
    }
  ],
  "junkList": [
    {
      "category": "Coffee/Creamer",
      "items": [
        { "n": "Trader Joe's Vanilla Bean Coffee Creamer", "q": "1 carton" }
      ]
    },
    {
      "category": "Beer/Wine",
      "items": [
        { "n": "Trader Joe's Boatswain Double IPA", "q": "1 six-pack" },
        { "n": "Trader Joe's Reserve Pinot Noir", "q": "1 bottle" }
      ]
    },
    {
      "category": "Chips",
      "items": [
        { "n": "Trader Joe's Plantain Chips", "q": "1 bag" }
      ]
    },
    {
      "category": "Sweets",
      "items": [
        { "n": "Trader Joe's Pound Plus 72% Dark Chocolate", "q": "1 bar" }
      ]
    },
    {
      "category": "Frozen Food",
      "items": [
        { "n": "Trader Joe's Frozen Palak Paneer", "q": "1 box" }
      ]
    },
    {
      "category": "Frozen Treats",
      "items": [
        { "n": "Trader Joe's Mango Sorbet", "q": "1 tub" }
      ]
    },
    {
      "category": "Beverages/Drinks",
      "items": [
        { "n": "Trader Joe's Sparkling Spring Water with Lemon", "q": "1 eight-pack" }
      ]
    }
  ]
}
```
