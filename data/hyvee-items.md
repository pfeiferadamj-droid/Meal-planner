# What We Buy at Hy-Vee

Trader Joe's is still the primary store — every item defaults to the TJ's run. This file documents the categories the household prefers to buy at Hy-Vee instead. The app's classifier (`HYVEE_ITEM_RULES` in `lib/shoppingListOrder.ts`) implements these rules; keep the two in sync when preferences change.

## Rules

1. **Fresh butcher-counter proteins → Hy-Vee.** Chicken thighs, chicken breasts, ground chicken, ground beef, pork tenderloin, pork chops, steaks, roasts, stew meat. The Hy-Vee meat counter has better cuts and prices than TJ's packaged fresh meat.
   - **Stays at TJ's:** anything frozen, TJ's refrigerated ready proteins (Just Chicken, Hardwood Smoked Pulled Chicken, Grilled Chicken Strips), and all chicken sausages — those are TJ's-specific products.
2. **Gluten-free bakery → Hy-Vee.** GF bread, buns, bagels, English muffins, tortillas/wraps — Hy-Vee's dedicated gluten-free section (Canyon Bakehouse, Schär, Udi's) beats TJ's single GF loaf. Corn tortillas remain a TJ's staple unless named as gluten-free.
3. **Anything with "Trader Joe's" in the name always stays on the TJ's run** — brand-named items can only be bought there.
4. **Anything with "Hy-Vee" in the name goes to the Hy-Vee run.** Prefixing an item with "Hy-Vee" is the manual override for one-off items (e.g. "Hy-Vee birthday cake").

## Guidance for meal planning

- When a meal uses a fresh butcher protein, name the ingredient plainly ("chicken thighs", "ground beef", "pork tenderloin") — the app routes it to the Hy-Vee Meat Counter automatically.
- When a meal needs GF bread products beyond TJ's loaf (buns, bagels, wraps), plan them freely — they route to Hy-Vee's Bakery & Gluten-Free section. Name a real brand when it matters (e.g. "Canyon Bakehouse hamburger buns").
- Engines, salad kits, frozen items, and specialty products remain TJ's-first per `data/data_context.md`.
- To move more categories to Hy-Vee (e.g. produce staples), add the rule here **and** in `HYVEE_ITEM_RULES` in `lib/shoppingListOrder.ts`.

## Walk order

The Hy-Vee section layout and walk order live in `data/hyvee-areas.md`.
