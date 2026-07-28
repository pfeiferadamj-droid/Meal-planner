import assert from "node:assert/strict";
import { HOUSEHOLD_GOODS_SECTION } from "@/lib/constants";
import { deriveShoppingListFromMeals } from "@/lib/domain/shoppingListDerivation";
import { HYVEE_STORE_ORDER, STORE_WALK_ORDER } from "@/lib/shoppingListOrder";
import type { HouseholdGoodsItem, MealInput } from "@/lib/types";

function meal(
  name: string,
  ingredients: string[]
): MealInput {
  return {
    type: "Dinner",
    name,
    build: { pro: [], base: [], veg: [], engine: [] },
    ingredients: ingredients.map((ingredient) => ({
      name: ingredient,
      quantity: "1",
      category: "pro",
      macros: { cal: 0, p: 0, c: 0, f: 0, fiber: 0 },
    })),
    macros: { cal: 0, p: 0, c: 0, f: 0, fiber: 0 },
  };
}

const mealA = meal("Meal A", ["Trader Joe's Eggs", "Trader Joe's Spinach"]);
const mealB = meal("Meal B", ["Trader Joe's Eggs", "Trader Joe's Rice"]);

const previousList = deriveShoppingListFromMeals([mealA, mealB], [], []);
const withOrphans = deriveShoppingListFromMeals([mealB], previousList, []);
const pruned = deriveShoppingListFromMeals([mealB], previousList, [], [], {
  pruneOrphans: true,
});

function itemNames(list: ReturnType<typeof deriveShoppingListFromMeals>) {
  return list.flatMap((category) => category.items.map((item) => item.n)).sort();
}

assert.deepEqual(itemNames(withOrphans), [
  "Trader Joe's Eggs",
  "Trader Joe's Rice",
  "Trader Joe's Spinach",
]);

assert.deepEqual(itemNames(pruned), ["Trader Joe's Eggs", "Trader Joe's Rice"]);

const householdGoods: HouseholdGoodsItem[] = [
  {
    category: "Dish Soap",
    n: "Trader Joe's Liquid Dish Soap",
  },
];

const withHousehold = deriveShoppingListFromMeals([mealB], [], [], householdGoods);
const householdSection = withHousehold.at(-1);

assert.equal(householdSection?.category, HOUSEHOLD_GOODS_SECTION);
assert.deepEqual(
  householdSection?.items.map((item) => item.n),
  ["Trader Joe's Liquid Dish Soap"]
);
assert.equal(householdSection?.items[0]?.shoppingSource, "household");

const storeZoneNames = withHousehold
  .slice(0, -1)
  .flatMap((category) => category.items.map((item) => item.n));

assert.ok(!storeZoneNames.includes("Trader Joe's Liquid Dish Soap"));
assert.ok(
  withHousehold
    .slice(0, -1)
    .every((category) =>
      STORE_WALK_ORDER.includes(category.category as (typeof STORE_WALK_ORDER)[number])
    )
);

const checkedPrevious = deriveShoppingListFromMeals([mealB], withHousehold, [], householdGoods);
const checkedHouseholdSection = checkedPrevious.at(-1);

assert.equal(checkedHouseholdSection?.items[0]?.checked, undefined);

const checkedList = deriveShoppingListFromMeals(
  [mealB],
  [
    {
      category: HOUSEHOLD_GOODS_SECTION,
      items: [
        {
          n: "Trader Joe's Liquid Dish Soap",
          checked: true,
          shoppingSource: "household",
        },
      ],
    },
  ],
  [],
  householdGoods
);

assert.equal(checkedList.at(-1)?.items[0]?.checked, true);

// A Hy-Vee week regroups the whole list into Hy-Vee zones.
const hyveeMeal = meal("Meal C", ["Chicken thighs", "Baby spinach", "Trader Joe's Rice"]);
const hyveeList = deriveShoppingListFromMeals([hyveeMeal], [], [], [], { store: "hyvee" });
const hyveeCategories = hyveeList.map((category) => category.category);

assert.ok(
  hyveeCategories.every((category) =>
    HYVEE_STORE_ORDER.includes(category as (typeof HYVEE_STORE_ORDER)[number])
  ),
  "Hy-Vee week list should only use Hy-Vee zones"
);
assert.deepEqual(
  hyveeList.find((category) => category.category === "Meat Counter")?.items.map((item) => item.n),
  ["Chicken thighs"]
);
assert.deepEqual(
  hyveeList.find((category) => category.category === "Produce")?.items.map((item) => item.n),
  ["Baby spinach"]
);

// On-hand ("Use Up") ingredients auto-mark matching derived items as pantry.
const onHandList = deriveShoppingListFromMeals([mealA, mealB], [], [], [], {
  onHandItems: [{ n: "rice" }],
});
const onHandItemsByName = new Map(
  onHandList.flatMap((category) => category.items.map((item) => [item.n, item]))
);

assert.equal(onHandItemsByName.get("Trader Joe's Rice")?.pantry, true);
assert.equal(onHandItemsByName.get("Trader Joe's Eggs")?.pantry, undefined);

// A user's explicit pantry choice wins over the on-hand auto-flag.
const explicitPantryOff = deriveShoppingListFromMeals(
  [mealB],
  [{ category: "Pantry Items", items: [{ n: "Trader Joe's Rice", pantry: false }] }],
  [],
  [],
  { onHandItems: [{ n: "rice" }] }
);
const explicitRice = explicitPantryOff
  .flatMap((category) => category.items)
  .find((item) => item.n === "Trader Joe's Rice");

assert.equal(explicitRice?.pantry, false);

console.log("shopping list derivation tests passed");
