import assert from "node:assert/strict";
import {
  classifyShoppingItem,
  getItemStoreZone,
  StoreId,
  StoreZone,
} from "@/lib/shoppingListOrder";

const cases: Array<{
  itemName: string;
  expectedZone: StoreZone;
  store?: StoreId;
  expectedConfidence?: "exact" | "keyword" | "fallback";
}> = [
  {
    itemName: "Trader Joe's Whole Wheat English Muffins",
    expectedZone: "Bread & Tortillas",
    expectedConfidence: "exact",
  },
  {
    itemName: "Trader Joe's Steamed Lentils",
    expectedZone: "Pantry Items",
    expectedConfidence: "exact",
  },
  {
    itemName: "Trader Joe's Garlic Shrimp Chips",
    expectedZone: "Chips",
    expectedConfidence: "exact",
  },
  {
    itemName: "Trader Joe's Lemon Tiramisu",
    expectedZone: "Frozen Food",
    expectedConfidence: "exact",
  },
  {
    itemName: "Trader Joe's Gözlemes",
    expectedZone: "Frozen Food",
    expectedConfidence: "exact",
  },
  {
    itemName: "Trader Joe's Vanilla Mascarpone",
    expectedZone: "Deli Meats & Cheeses",
    expectedConfidence: "exact",
  },
  { itemName: "Trader Joe's Mini Bouquet", expectedZone: "Flowers" },
  { itemName: "Trader Joe's Southwestern Chopped Salad Kit", expectedZone: "Prepped Salads" },
  { itemName: "Trader Joe's Fresh Basil", expectedZone: "Herbs" },
  { itemName: "Trader Joe's Baby Spinach", expectedZone: "Vegetables" },
  { itemName: "Trader Joe's Honeycrisp Apples", expectedZone: "Fruit" },
  { itemName: "Trader Joe's Sweet Potatoes", expectedZone: "Roots" },
  { itemName: "Trader Joe's Sparkling Water", expectedZone: "Beverages" },
  { itemName: "Trader Joe's Unexpected Cheddar", expectedZone: "Deli Meats & Cheeses" },
  { itemName: "Trader Joe's Greek Yogurt", expectedZone: "Dairy & Eggs" },
  { itemName: "Trader Joe's Soy Chorizo", expectedZone: "Vegan Items" },
  { itemName: "Trader Joe's Everything But the Bagel Seasoning", expectedZone: "Pantry Items" },
  { itemName: "Trader Joe's Chicken Tikka Masala", expectedZone: "Frozen Food" },
  { itemName: "Trader Joe's Dark Chocolate Peanut Butter Cups", expectedZone: "Sweets" },
  { itemName: "Trader Joe's Ground Turkey", expectedZone: "Meats & Seafood" },
  { itemName: "Trader Joe's Flour Tortillas", expectedZone: "Bread & Tortillas" },
  { itemName: "Trader Joe's Restaurant Style Tortilla Chips", expectedZone: "Chips" },
  { itemName: "Trader Joe's Pinot Noir", expectedZone: "Beer/Wine" },

  // Hy-Vee weeks: the same items regroup into Hy-Vee sections
  { itemName: "Chicken thighs", expectedZone: "Meat Counter", store: "hyvee" },
  { itemName: "Ground beef", expectedZone: "Meat Counter", store: "hyvee" },
  { itemName: "Baby spinach", expectedZone: "Produce", store: "hyvee" },
  { itemName: "Sweet potatoes", expectedZone: "Produce", store: "hyvee" },
  { itemName: "Greek yogurt", expectedZone: "Dairy Case", store: "hyvee" },
  { itemName: "Crumbled feta cheese", expectedZone: "Deli", store: "hyvee" },
  { itemName: "Frozen riced cauliflower", expectedZone: "Frozen Aisle", store: "hyvee" },
  { itemName: "Corn tortillas", expectedZone: "Bakery & Gluten-Free", store: "hyvee" },
  {
    itemName: "Gluten-free hamburger buns",
    expectedZone: "Bakery & Gluten-Free",
    store: "hyvee",
  },
  { itemName: "Sparkling water", expectedZone: "Grocery Aisles", store: "hyvee" },
  { itemName: "Tortilla chips", expectedZone: "Grocery Aisles", store: "hyvee" },
  { itemName: "Pinot Noir", expectedZone: "Beer & Wine", store: "hyvee" },
  {
    itemName: "Mystery item",
    expectedZone: "Grocery Aisles",
    store: "hyvee",
    expectedConfidence: "fallback",
  },
  // The same TJ-default items keep their TJ zones without a store argument
  { itemName: "Chicken thighs", expectedZone: "Meats & Seafood" },
  { itemName: "frozen chicken thighs", expectedZone: "Frozen Food" },
];

for (const testCase of cases) {
  const store = testCase.store ?? "traderJoes";
  const classification = classifyShoppingItem(testCase.itemName, store);

  assert.equal(
    classification.zone,
    testCase.expectedZone,
    `${testCase.itemName} should classify to ${testCase.expectedZone} at ${store}`
  );
  assert.equal(
    classification.store,
    store,
    `${testCase.itemName} classification should carry store ${store}`
  );
  assert.equal(
    getItemStoreZone(testCase.itemName, store),
    testCase.expectedZone,
    `${testCase.itemName} getItemStoreZone wrapper should match classification`
  );

  if (testCase.expectedConfidence) {
    assert.equal(
      classification.confidence,
      testCase.expectedConfidence,
      `${testCase.itemName} should classify with ${testCase.expectedConfidence} confidence`
    );
  }
}

console.log(`Shopping list order tests passed (${cases.length} cases).`);
