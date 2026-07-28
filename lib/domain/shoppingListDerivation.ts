import { HOUSEHOLD_GOODS_SECTION } from "@/lib/constants";
import { ListCategory, ListItem, MealInput, StoredMeal, HouseholdGoodsItem, OnHandItem, ShoppingStore } from "@/lib/types";
import {
  DEFAULT_SHOPPING_STORE,
  getItemStoreZone,
  organizeShoppingListForStoreLayout,
} from "@/lib/shoppingListOrder";
import { normalizeShoppingName, shoppingItemMatchesMealIngredient } from "@/lib/domain/shoppingUsage";

type DerivableMeal = MealInput | StoredMeal;

interface PreservedShoppingItem {
  item: ListItem;
}

export function deriveShoppingListFromMeals(
  meals: DerivableMeal[],
  previousShoppingList: ListCategory[] = [],
  junkList: ListCategory[] = [],
  householdGoods: HouseholdGoodsItem[] = [],
  options?: { pruneOrphans?: boolean; onHandItems?: OnHandItem[]; store?: ShoppingStore }
): ListCategory[] {
  const previousByName = getPreviousItemsByName(previousShoppingList);
  const derivedByName = new Map<string, ListItem>();
  const store = options?.store ?? DEFAULT_SHOPPING_STORE;
  const onHandItems = options?.onHandItems ?? [];
  const isOnHand = (itemName: string) =>
    onHandItems.some((onHand) => shoppingItemMatchesMealIngredient(itemName, onHand.n));

  for (const meal of meals) {
    for (const ingredientName of getMealIngredientNames(meal)) {
      const normalizedName = normalizeShoppingName(ingredientName);
      if (!normalizedName || derivedByName.has(normalizedName)) {
        continue;
      }

      const previous = previousByName.get(normalizedName)?.item;
      derivedByName.set(
        normalizedName,
        buildShoppingItem(ingredientName, previous, { onHand: isOnHand(ingredientName) })
      );
    }
  }

  for (const junkCategory of junkList) {
    for (const junkItem of junkCategory.items) {
      const itemName = junkItem.n.trim();
      const normalizedName = normalizeShoppingName(itemName);
      if (!normalizedName || derivedByName.has(normalizedName)) {
        continue;
      }

      const previous = previousByName.get(normalizedName)?.item;
      derivedByName.set(
        normalizedName,
        buildShoppingItem(itemName, previous, {
          q: junkItem.q,
          shoppingSource: "junk",
        })
      );
    }
  }

  if (!options?.pruneOrphans) {
    for (const [normalizedName, preserved] of previousByName) {
      if (
        !derivedByName.has(normalizedName) &&
        preserved.item.shoppingSource !== "junk" &&
        preserved.item.shoppingSource !== "household"
      ) {
        derivedByName.set(normalizedName, preserved.item);
      }
    }
  }

  const storeLayoutList = organizeShoppingListForStoreLayout(
    Array.from(derivedByName.values()).map((item) => ({
      category: getItemStoreZone(item.n, store),
      items: [item],
    })),
    store
  );

  const householdSection = buildHouseholdGoodsSection(householdGoods, previousShoppingList);
  if (!householdSection) {
    return storeLayoutList;
  }

  return [...storeLayoutList, householdSection];
}

function buildHouseholdGoodsSection(
  householdGoods: HouseholdGoodsItem[],
  previousShoppingList: ListCategory[]
): ListCategory | null {
  if (householdGoods.length === 0) {
    return null;
  }

  const previousHousehold = previousShoppingList.find(
    (category) => category.category === HOUSEHOLD_GOODS_SECTION
  );
  const previousByName = new Map(
    (previousHousehold?.items ?? []).map((item) => [
      normalizeShoppingName(item.n),
      item,
    ])
  );

  return {
    category: HOUSEHOLD_GOODS_SECTION,
    items: householdGoods.map((item) => {
      const previous = previousByName.get(normalizeShoppingName(item.n));
      return buildShoppingItem(item.n, previous, { shoppingSource: "household" });
    }),
  };
}

function buildShoppingItem(
  itemName: string,
  previous?: ListItem,
  options: { q?: string; shoppingSource?: "junk" | "household"; onHand?: boolean } = {}
): ListItem {
  return {
    n: itemName,
    q: previous?.q ?? options.q,
    // An on-hand match auto-marks pantry, but a user's explicit toggle wins.
    pantry: previous?.pantry ?? (options.onHand ? true : undefined),
    checked: previous?.checked,
    ...(options.shoppingSource ? { shoppingSource: options.shoppingSource } : {}),
  };
}

function getMealIngredientNames(meal: DerivableMeal): string[] {
  const ingredientNames = meal.ingredients
    ?.map((ingredient) => ingredient.name.trim())
    .filter(Boolean);

  if (ingredientNames?.length) {
    return ingredientNames;
  }

  return [
    ...meal.build.pro,
    ...meal.build.base,
    ...meal.build.veg,
    ...meal.build.engine,
  ].filter(Boolean);
}

function getPreviousItemsByName(shoppingList: ListCategory[]) {
  const itemsByName = new Map<string, PreservedShoppingItem>();

  for (const category of shoppingList) {
    if (category.category === HOUSEHOLD_GOODS_SECTION) {
      continue;
    }

    for (const item of category.items) {
      const normalizedName = normalizeShoppingName(item.n);
      if (!normalizedName || itemsByName.has(normalizedName)) {
        continue;
      }

      itemsByName.set(normalizedName, { item });
    }
  }

  return itemsByName;
}
