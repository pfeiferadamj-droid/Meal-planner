import { ListCategory, ShoppingStore } from './types';

/**
 * The household makes ONE grocery run per week — Trader Joe's by default,
 * Hy-Vee when chosen for the week (Shop page toggle / plan `shoppingStore`).
 * The whole shopping list is ordered for the chosen store's walk.
 */
export const STORE_IDS = ['traderJoes', 'hyvee'] as const satisfies readonly ShoppingStore[];

export type StoreId = ShoppingStore;

export const DEFAULT_SHOPPING_STORE: StoreId = 'traderJoes';

export const STORE_LABELS: Record<StoreId, string> = {
  traderJoes: "Trader Joe's",
  hyvee: 'Hy-Vee',
};

export function isShoppingStore(value: unknown): value is StoreId {
  return value === 'traderJoes' || value === 'hyvee';
}

/**
 * Home Trader Joe's store walking order.
 * This follows the physical layout documented in data/shopping-areas.md.
 */
export const TRADER_JOES_STORE_ORDER = [
  'Flowers',
  'Vegetables',
  'Roots',
  'Herbs',
  'Fruit',
  'Prepped Salads',
  'Meats & Seafood',
  'Deli Meats & Cheeses',
  'Vegan Items',
  'Bread & Tortillas',
  'Chips',
  'Dairy & Eggs',
  'Pantry Items',
  'Frozen Food',
  'Sweets',
  'Beverages',
  'Beer/Wine'
] as const;

export type TraderJoesStoreZone = typeof TRADER_JOES_STORE_ORDER[number];

/**
 * Home Hy-Vee walking order.
 * This follows the physical layout documented in data/hyvee-areas.md.
 * Zone names are intentionally distinct from the Trader Joe's zones so a flat
 * persisted shopping list stays unambiguous about which store it was built for.
 */
export const HYVEE_STORE_ORDER = [
  'Produce',
  'Bakery & Gluten-Free',
  'Deli',
  'Meat Counter',
  'Grocery Aisles',
  'Dairy Case',
  'Frozen Aisle',
  'Beer & Wine'
] as const;

export type HyveeStoreZone = typeof HYVEE_STORE_ORDER[number];

export type StoreZone = TraderJoesStoreZone | HyveeStoreZone;

/** Every known zone across both stores (walk order within each store). */
export const STORE_WALK_ORDER: readonly StoreZone[] = [
  ...TRADER_JOES_STORE_ORDER,
  ...HYVEE_STORE_ORDER,
];

export const STORE_ZONE_ORDERS: Record<StoreId, readonly StoreZone[]> = {
  traderJoes: TRADER_JOES_STORE_ORDER,
  hyvee: HYVEE_STORE_ORDER,
};

const DEFAULT_STORE_ZONE: TraderJoesStoreZone = 'Pantry Items';
const DEFAULT_HYVEE_ZONE: HyveeStoreZone = 'Grocery Aisles';

/**
 * Items classify through the (rich) Trader Joe's rules; on Hy-Vee weeks the
 * resulting TJ zone maps onto the Hy-Vee section that carries the same goods.
 */
const TRADER_JOES_TO_HYVEE_ZONE: Record<TraderJoesStoreZone, HyveeStoreZone> = {
  'Flowers': 'Produce',
  'Prepped Salads': 'Produce',
  'Herbs': 'Produce',
  'Vegetables': 'Produce',
  'Fruit': 'Produce',
  'Roots': 'Produce',
  'Beverages': 'Grocery Aisles',
  'Deli Meats & Cheeses': 'Deli',
  'Dairy & Eggs': 'Dairy Case',
  'Vegan Items': 'Dairy Case',
  'Pantry Items': 'Grocery Aisles',
  'Frozen Food': 'Frozen Aisle',
  'Sweets': 'Grocery Aisles',
  'Meats & Seafood': 'Meat Counter',
  'Bread & Tortillas': 'Bakery & Gluten-Free',
  'Chips': 'Grocery Aisles',
  'Beer/Wine': 'Beer & Wine',
};

export type ShoppingItemClassificationConfidence = 'exact' | 'keyword' | 'fallback';

export interface ShoppingItemClassification {
  store: StoreId;
  zone: StoreZone;
  confidence: ShoppingItemClassificationConfidence;
  matchedTerm?: string;
}

interface KeywordRule {
  zone: TraderJoesStoreZone;
  terms: readonly string[];
  excludeTerms?: readonly string[];
}

function normalizeShoppingItemForClassification(itemName: string) {
  return itemName
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/&/g, ' and ')
    .replace(/[^a-z0-9]+/g, ' ')
    .trim()
    .replace(/\s+/g, ' ');
}

function exactEntries(zone: TraderJoesStoreZone, itemNames: readonly string[]) {
  return itemNames.map((itemName) => [
    normalizeShoppingItemForClassification(itemName),
    zone,
  ] as const);
}

const EXACT_STORE_ZONE_OVERRIDES = new Map<string, TraderJoesStoreZone>([
  ...exactEntries('Bread & Tortillas', [
    "Trader Joe's Whole Wheat English Muffins",
    "Whole Wheat English Muffins",
    "Trader Joe's Organic English Muffins",
    "Organic English Muffins",
  ]),
  ...exactEntries('Pantry Items', [
    "Trader Joe's Steamed Lentils",
    "Steamed Lentils",
    "Trader Joe's Dill Pickle Mustard",
    "Dill Pickle Mustard",
    "Trader Joe's Salsa Autentica",
    "Salsa Autentica",
    "Trader Joe's Dry Roasted & Salted Cashews",
    "Dry Roasted & Salted Cashews",
    "Trader Joe's Organic Tahini",
    "Organic Tahini",
  ]),
  ...exactEntries('Chips', [
    "Trader Joe's Garlic Shrimp Chips",
    "Garlic Shrimp Chips",
    "Trader Joe's Sweet Chili Black-Eyed Pea Tempeh Chips",
    "Sweet Chili Black-Eyed Pea Tempeh Chips",
  ]),
  ...exactEntries('Meats & Seafood', [
    "Fresh shrimp",
    "Shrimp",
    "Shrimp, sautéed",
  ]),
  ...exactEntries('Frozen Food', [
    "Trader Joe's Lemon Tiramisu",
    "Lemon Tiramisu",
    "Trader Joe's Gözlemes",
    "Trader Joe's Gozlemes",
    "Gözlemes",
    "Gozlemes",
    "Trader Joe's Mandu Korean Kimchi Potstickers",
    "Mandu Korean Kimchi Potstickers",
  ]),
  ...exactEntries('Deli Meats & Cheeses', [
    "Trader Joe's Vanilla Mascarpone",
    "Vanilla Mascarpone",
  ]),
  ...exactEntries('Fruit', [
    "Trader Joe's Honeycrisp Apples",
    "Honeycrisp Apples",
  ]),
  ...exactEntries('Frozen Food', [
    "Trader Joe's Cilantro Lime Rice",
    "Cilantro Lime Rice",
    "Trader Joe's Mini Chicken Tacos",
    "Mini Chicken Tacos",
  ]),
  ...exactEntries('Roots', [
    "Trader Joe's Garlic Parsley Potato Kit",
    "Garlic Parsley Potato Kit",
  ]),
  ...exactEntries('Dairy & Eggs', [
    "Trader Joe's Spicy Queso Dip",
    "Spicy Queso Dip",
  ]),
  ...exactEntries('Sweets', [
    "Trader Joe's Passion Fruit Guava Bars",
    "Passion Fruit Guava Bars",
  ]),
  ...exactEntries('Beer/Wine', [
    "Narragansett Lager",
  ]),
]);

const KEYWORD_RULES: readonly KeywordRule[] = [
  {
    zone: 'Flowers',
    terms: ['flowers', 'bouquet', 'floral', 'floral arrangement', 'plant'],
  },
  {
    zone: 'Frozen Food',
    terms: [
      'frozen', 'cauliflower gnocchi', 'edamame', 'cauliflower rice', 'stir fry veg',
      'frozen broccoli', 'frozen berries', 'frozen mango', 'frozen spinach',
      'orange chicken', 'beef bulgogi', 'butter chicken', 'palak paneer',
      'frozen grains', 'ancient grains medley', 'frozen chicken strips',
      'wild salmon', 'gingery green beans', 'jasmine rice', 'brown rice pack',
      'cod fillet', 'beef birria', 'chicken tikka masala', 'mandarin orange chicken',
      'paneer tikka masala', 'burrito', 'burritos', 'taquitos', 'gozlemes',
      'mini ice cream', 'ice cream', 'gelato', 'sorbet', 'hold the cone', 'mochi',
      'taiyaki', 'frozen pulled pork', 'tiramisu',
      'spinach artichoke dip', 'frozen sweet potato gnocchi', 'stir fry vegetable',
      'sweet potato fries', 'shrimp', 'turkey meatballs',
      'toaster waffle', 'waffle', 'dark sweet cherries', 'sweet cherries',
      'hashbrown', 'hashbrowns', 'fire roasted bell peppers', 'roasted corn',
    ],
  },
  {
    zone: 'Prepped Salads',
    terms: ['salad kit', 'chopped salad', 'prepped salad', 'ready veggies', 'cruciferous crunch salad'],
  },
  {
    zone: 'Vegan Items',
    terms: [
      'tofu', 'tempeh', 'plant based', 'plant based', 'vegan dip',
      'vegan dressing', 'vegan caesar', 'vegan pesto', 'vegan tzatziki',
      'vegan kale', 'zhoug', 'soy chorizo',
    ],
  },
  {
    zone: 'Herbs',
    terms: [
      'fresh herbs', 'herbs', 'cilantro', 'parsley', 'basil', 'mint', 'dill',
      'chives', 'thyme', 'rosemary', 'oregano leaves', 'tarragon',
      'green goddess dressing',
    ],
  },
  {
    zone: 'Vegetables',
    terms: ['green beans', 'riced cauliflower', 'snow pea', 'snow peas'],
  },
  {
    zone: 'Beer/Wine',
    terms: [
      'beer', 'wine', ' ipa', 'pilsner', 'stout', 'porter', ' ale', 'cider',
      'cabernet', 'pinot', 'sauvignon', 'chardonnay', 'merlot', 'syrah',
      'malbec', 'prosecco',
    ],
    excludeTerms: ['vinegar', 'root beer', 'ginger beer', 'kale'],
  },
  {
    zone: 'Dairy & Eggs',
    terms: ['creamer', 'creamers'],
  },
  {
    zone: 'Chips',
    terms: [
      'pita chips', 'potato chips', 'tortilla chips', 'corn chips', 'plantain chips',
      'rolled corn', 'takis', 'chips', 'popcorn', 'crunchies',
    ],
  },
  {
    zone: 'Sweets',
    terms: [
      'chocolate', 'candy', 'cookie', 'cookies', 'brookie', 'brownie', 'cake',
      'cupcake', 'muffin', 'sweets', 'dessert', 'caramel', 'toffee',
      'licorice', 'gummy', 'gummies', 'joe joe', 'biscotti',
      'root beer float pieces', 'float pieces', 'graham', 'grahams',
    ],
  },
  {
    zone: 'Beverages',
    terms: [
      'sparkling water', 'seltzer', 'juice', 'lemonade', 'kombucha', 'soda',
      'beverage', 'beverages', 'drink', 'drinks', 'iced tea', 'black tea',
      'green tea', 'herbal tea', 'tea bags', 'tea sachets', 'chai', 'yerba mate',
    ],
  },
  {
    zone: 'Pantry Items',
    terms: [
      'marinara', 'simmer sauce', 'curry sauce', 'chili sauce', 'sweet chili',
      'soyaki', 'tamari', 'soy sauce', 'hot sauce', 'sauce', 'curry', 'mustard',
      'vinegar', 'chili onion crunch', 'chili onion crisp', 'bomba', 'green goddess',
      'green dragon', 'pesto', 'fig butter', 'coconut milk', 'broth',
      'seasoning', 'everything bagel', 'ebtb', 'lemon pepper', 'cinnamon',
      'sea salt', 'black pepper', 'spice', 'rub', 'olive oil', 'coconut oil',
      'sesame oil', 'farro', 'rice', 'quinoa', 'oats', 'oatmeal', 'granola',
      'harvest grains', 'beans', 'canned', 'chickpeas', 'lentils', 'pasta', 'orzo', 'crackers', 'noodles',
      'couscous', 'crispbread', 'canned tomatoes', 'tomato paste', 'soup',
      'tuna', 'coconut flakes', 'honey', 'maple syrup', 'roasted red pepper',
      'jarred', 'chia', 'hemp', 'seeds', 'nuts', 'nut butter', 'peanut butter',
      'almond butter', 'cashew butter', 'sunflower seed butter', 'coffee',
      'snack', 'bars', 'pretzel', 'protein bar', 'trail mix', 'snack mix',
      'olives', 'chutney', 'harissa', 'garlic spread', 'dip', 'dressing',
      'flaxseed meal', 'pepitas',
    ],
  },
  {
    zone: 'Dairy & Eggs',
    terms: [
      'cottage cheese', 'yogurt', 'egg', 'hard boiled', 'butter',
      'sour cream', 'milk', 'kefir', 'half and half', 'tzatziki', 'tzatiki',
    ],
    excludeTerms: ['butternut', 'nut butter', 'peanut butter', 'almond butter', 'cashew butter', 'cookie butter'],
  },
  {
    zone: 'Deli Meats & Cheeses',
    terms: [
      'cheese', 'feta', 'ricotta', 'mozzarella', 'cheddar', 'toscano', 'parmesan',
      'cream cheese', 'string cheese', 'deli meat', 'deli turkey', 'sliced turkey',
      'turkey breast', 'oven roasted turkey', 'sliced ham', 'prosciutto', 'salami',
      'turkey bacon', 'smoked salmon', 'lox',
      'just chicken', 'pulled chicken', 'grilled chicken strips', 'hummus', 'guacamole',
    ],
  },
  {
    zone: 'Meats & Seafood',
    terms: [
      'ground turkey', 'ground beef', 'ground chicken', 'salmon fillet',
      'fresh salmon', 'fresh chicken', 'chicken breast', 'chicken breasts',
      'chicken thighs', 'fresh seafood', 'fresh shrimp', 'fresh cod', 'fresh fish',
      'chicken sausage',
    ],
  },
  {
    zone: 'Bread & Tortillas',
    terms: [
      'bread', 'tortilla', 'sourdough', 'pita', 'lavash', 'bagel', 'english muffin',
      'crumpet', 'baguette', 'ciabatta', 'roll', 'naan', 'buns', 'hamburger bun',
      'hot dog bun',
    ],
  },
  {
    zone: 'Roots',
    terms: [
      'sweet potato', 'potato', 'carrot', 'beet', 'onion', 'red onion',
      'shallot', 'garlic', 'ginger root', 'fresh ginger', 'ginger',
    ],
  },
  {
    zone: 'Fruit',
    terms: [
      'banana', 'apple', 'berries', 'blueberries', 'strawberries', 'raspberries',
      'mango', 'lemon', 'lime', 'avocado', 'orange', 'grape', 'pear',
      'kiwi', 'peach', 'peaches',
      'dried mango', 'dried fruit',
    ],
  },
  {
    zone: 'Vegetables',
    terms: [
      'spinach', 'cucumber', 'tomato', 'zucchini', 'pepper', 'romaine',
      'arugula', 'mixed greens', 'bagged greens', 'broccoli', 'green beans',
      'asparagus', 'kale', 'cruciferous crunch', 'brussels', 'cabbage',
      'slaw', 'mushroom', 'cauliflower', 'lettuce', 'corn', 'snap peas',
      'sugar snap', 'butternut squash', 'squash', 'eggplant', 'radish',
      'jicama wrap', 'jicama wraps',
    ],
  },
];

export function shouldIncludeShoppingItem(itemName: string) {
  return !itemName.trim().toLowerCase().startsWith('leftover');
}

/**
 * Places every item in the correct zone of the week's chosen store, in that
 * store's walking order.
 *
 * PRECEDENCE RULE: More specific patterns are checked BEFORE general patterns
 * This prevents incorrect matching (eg: "frozen chicken" matches Frozen not Fresh)
 */
export function organizeShoppingListForStoreLayout(
  shoppingList: ListCategory[],
  store: StoreId = DEFAULT_SHOPPING_STORE
): ListCategory[] {
  const zoneOrder = STORE_ZONE_ORDERS[store];
  const fallbackZone = store === 'hyvee' ? DEFAULT_HYVEE_ZONE : DEFAULT_STORE_ZONE;

  // Initialize empty categories in correct walking order
  const orderedList: ListCategory[] = zoneOrder.map(category => ({
    category,
    items: []
  }));

  // Place every item in the correct store zone
  shoppingList.forEach(categoryGroup => {
    categoryGroup.items.forEach(item => {
      if (!shouldIncludeShoppingItem(item.n)) {
        return;
      }

      const targetZone = getItemStoreZone(item.n, store);
      const zoneIndex = zoneOrder.indexOf(targetZone);

      if (zoneIndex !== -1) {
        orderedList[zoneIndex].items.push(item);
      } else {
        const fallbackIndex = zoneOrder.indexOf(fallbackZone);
        orderedList[fallbackIndex].items.push(item);
        if (process.env.NODE_ENV === 'development') {
          console.warn(`[ShoppingList] Unknown store zone for item: "${item.n}" - placed in ${fallbackZone}`);
        }
      }
    });
  });

  // Filter out any empty categories
  return orderedList.filter(group => group.items.length > 0);
}

/**
 * Returns which zone of the given store an item is physically located in.
 * Trader Joe's mapping rules sourced from data/shopping-areas.md; on Hy-Vee
 * weeks the TJ zone maps onto the Hy-Vee section per data/hyvee-areas.md.
 *
 * ✅ ORDER MATTERS: More specific terms checked FIRST
 * ✅ All edge cases explicitly handled per store layout documentation
 */
export function getItemStoreZone(
  itemName: string,
  store: StoreId = DEFAULT_SHOPPING_STORE
): StoreZone {
  return classifyShoppingItem(itemName, store).zone;
}

export function classifyShoppingItem(
  itemName: string,
  store: StoreId = DEFAULT_SHOPPING_STORE
): ShoppingItemClassification {
  const traderJoes = classifyTraderJoesItem(itemName);
  if (store === 'traderJoes') {
    return traderJoes;
  }

  return {
    ...traderJoes,
    store,
    zone: TRADER_JOES_TO_HYVEE_ZONE[traderJoes.zone as TraderJoesStoreZone] ?? DEFAULT_HYVEE_ZONE,
  };
}

function classifyTraderJoesItem(itemName: string): ShoppingItemClassification {
  const name = normalizeShoppingItemForClassification(itemName);
  const exactZone = EXACT_STORE_ZONE_OVERRIDES.get(name);

  if (exactZone) {
    return { store: 'traderJoes', zone: exactZone, confidence: 'exact', matchedTerm: itemName };
  }

  for (const rule of KEYWORD_RULES) {
    if (rule.excludeTerms?.some((term) => name.includes(normalizeShoppingItemForClassification(term)))) {
      continue;
    }

    const matchedTerm = rule.terms.find((term) => name.includes(normalizeShoppingItemForClassification(term)));
    if (matchedTerm) {
      return { store: 'traderJoes', zone: rule.zone, confidence: 'keyword', matchedTerm };
    }
  }

  return { store: 'traderJoes', zone: DEFAULT_STORE_ZONE, confidence: 'fallback' };
}
