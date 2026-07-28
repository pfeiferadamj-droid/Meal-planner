import { ListCategory } from './types';

/**
 * Stores the household shops at. Trader Joe's is the default; a small set of
 * items (fresh butcher meat, gluten-free bakery) is bought at Hy-Vee instead.
 * Item → store rules are documented in data/hyvee-items.md.
 */
export const STORE_IDS = ['traderJoes', 'hyvee'] as const;

export type StoreId = typeof STORE_IDS[number];

export const STORE_LABELS: Record<StoreId, string> = {
  traderJoes: "Trader Joe's",
  hyvee: 'Hy-Vee',
};

/**
 * Home Trader Joe's store walking order.
 * This follows the physical layout documented in data/shopping-areas.md.
 */
export const TRADER_JOES_STORE_ORDER = [
  'Flowers',
  'Prepped Salads',
  'Herbs',
  'Vegetables',
  'Fruit',
  'Roots',
  'Beverages',
  'Deli Meats & Cheeses',
  'Dairy & Eggs',
  'Vegan Items',
  'Pantry Items',
  'Frozen Food',
  'Sweets',
  'Meats & Seafood',
  'Bread & Tortillas',
  'Chips',
  'Beer/Wine'
] as const;

export type TraderJoesStoreZone = typeof TRADER_JOES_STORE_ORDER[number];

/**
 * Home Hy-Vee walking order.
 * This follows the physical layout documented in data/hyvee-areas.md.
 * Zone names are intentionally distinct from the Trader Joe's zones so a flat
 * persisted shopping list stays unambiguous about which store a section is in.
 */
export const HYVEE_STORE_ORDER = [
  'Produce',
  'Bakery & Gluten-Free',
  'Meat Counter',
  'Grocery Aisles',
  'Dairy Case',
  'Frozen Aisle'
] as const;

export type HyveeStoreZone = typeof HYVEE_STORE_ORDER[number];

export type StoreZone = TraderJoesStoreZone | HyveeStoreZone;

/** Combined walk order: the full Trader Joe's run, then the Hy-Vee run. */
export const STORE_WALK_ORDER: readonly StoreZone[] = [
  ...TRADER_JOES_STORE_ORDER,
  ...HYVEE_STORE_ORDER,
];

const DEFAULT_STORE_ZONE: TraderJoesStoreZone = 'Pantry Items';
const DEFAULT_HYVEE_ZONE: HyveeStoreZone = 'Grocery Aisles';

const HYVEE_ZONE_SET: ReadonlySet<string> = new Set(HYVEE_STORE_ORDER);

/** Maps a persisted shopping-list category (store zone) back to its store. */
export function getStoreForShoppingCategory(category: string): StoreId {
  return HYVEE_ZONE_SET.has(category) ? 'hyvee' : 'traderJoes';
}

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

interface HyveeKeywordRule {
  zone: HyveeStoreZone;
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
      'crumpet', 'baguette', 'ciabatta', 'roll', 'naan',
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

/**
 * Items the household prefers to buy at Hy-Vee instead of Trader Joe's.
 * Keep aligned with data/hyvee-items.md. Everything else defaults to TJ's,
 * and anything with "Trader Joe's" in the name always stays at TJ's.
 */
const HYVEE_ITEM_RULES: readonly { terms: readonly string[]; excludeTerms?: readonly string[] }[] = [
  {
    // Fresh butcher-counter proteins — better cuts and prices at Hy-Vee.
    // TJ's-specific refrigerated proteins (chicken sausage, Just Chicken,
    // pulled chicken, chicken strips) and frozen items stay at TJ's.
    terms: [
      'chicken thigh', 'chicken thighs', 'chicken breast', 'chicken breasts',
      'chicken drumstick', 'chicken drumsticks', 'whole chicken',
      'ground chicken', 'ground beef', 'ground pork', 'ground lamb',
      'pork tenderloin', 'pork chop', 'pork chops', 'pork shoulder',
      'steak', 'sirloin', 'flank steak', 'chuck roast', 'beef roast',
      'stew meat', 'lamb chop', 'lamb chops',
    ],
    excludeTerms: [
      'frozen', 'sausage', 'just chicken', 'pulled chicken',
      'chicken strips', 'canned', 'broth', 'seasoning',
    ],
  },
  {
    // Gluten-free bakery — Hy-Vee's dedicated GF section beats TJ's.
    terms: [
      'gluten free bread', 'gf bread', 'gluten free bun', 'gluten free buns',
      'gf bun', 'gf buns', 'gluten free bagel', 'gluten free bagels',
      'gluten free english muffin', 'gluten free tortilla', 'gluten free wrap',
      'gluten free hamburger', 'gluten free hot dog',
      'canyon bakehouse', 'schar', 'udi s',
    ],
  },
];

/** Which store an item should be bought at. Trader Joe's is the default. */
export function getItemStore(itemName: string): StoreId {
  const name = normalizeShoppingItemForClassification(itemName);

  if (name.includes('trader joe')) {
    return 'traderJoes';
  }
  if (name.includes('hy vee') || name.includes('hyvee')) {
    return 'hyvee';
  }

  for (const rule of HYVEE_ITEM_RULES) {
    if (rule.excludeTerms?.some((term) => name.includes(normalizeShoppingItemForClassification(term)))) {
      continue;
    }
    if (rule.terms.some((term) => name.includes(normalizeShoppingItemForClassification(term)))) {
      return 'hyvee';
    }
  }

  return 'traderJoes';
}

/**
 * Hy-Vee zone rules are intentionally light: only items assigned to Hy-Vee by
 * HYVEE_ITEM_RULES (or added there by hand) ever reach this classifier.
 */
const HYVEE_KEYWORD_RULES: readonly HyveeKeywordRule[] = [
  {
    zone: 'Frozen Aisle',
    terms: ['frozen'],
  },
  {
    zone: 'Bakery & Gluten-Free',
    terms: [
      'bread', 'bun', 'buns', 'bagel', 'tortilla', 'wrap', 'english muffin',
      'roll', 'rolls', 'baguette', 'gluten free', 'canyon bakehouse', 'schar',
      'udi s',
    ],
  },
  {
    zone: 'Meat Counter',
    terms: [
      'chicken', 'beef', 'pork', 'steak', 'sirloin', 'flank', 'lamb',
      'roast', 'stew meat', 'ribs', 'ham',
    ],
  },
  {
    zone: 'Dairy Case',
    terms: [
      'milk', 'yogurt', 'cheese', 'egg', 'eggs', 'butter', 'cream',
      'kefir', 'cottage',
    ],
  },
  {
    zone: 'Produce',
    terms: [
      'banana', 'apple', 'berries', 'lemon', 'lime', 'avocado', 'orange',
      'grape', 'pear', 'potato', 'sweet potato', 'onion', 'garlic', 'ginger',
      'carrot', 'spinach', 'cucumber', 'tomato', 'zucchini', 'pepper',
      'broccoli', 'kale', 'cabbage', 'mushroom', 'lettuce', 'romaine',
      'squash', 'corn', 'herbs', 'cilantro', 'parsley', 'basil',
    ],
  },
];

export function shouldIncludeShoppingItem(itemName: string) {
  return !itemName.trim().toLowerCase().startsWith('leftover');
}

/**
 * Places every item in the correct store zone across both stores, following
 * the combined walk order: the full Trader Joe's run, then the Hy-Vee run.
 *
 * PRECEDENCE RULE: More specific patterns are checked BEFORE general patterns
 * This prevents incorrect matching (eg: "frozen chicken" matches Frozen not Fresh)
 */
export function organizeShoppingListForStoreLayout(shoppingList: ListCategory[]): ListCategory[] {
  // Initialize empty categories in correct walking order
  const orderedList: ListCategory[] = STORE_WALK_ORDER.map(category => ({
    category,
    items: []
  }));

  // Place every item in the correct store zone
  shoppingList.forEach(categoryGroup => {
    categoryGroup.items.forEach(item => {
      if (!shouldIncludeShoppingItem(item.n)) {
        return;
      }

      const targetZone = getItemStoreZone(item.n);
      const zoneIndex = STORE_WALK_ORDER.indexOf(targetZone);

      if (zoneIndex !== -1) {
        orderedList[zoneIndex].items.push(item);
      } else {
        const fallbackIndex = STORE_WALK_ORDER.indexOf(DEFAULT_STORE_ZONE);
        orderedList[fallbackIndex].items.push(item);
        if (process.env.NODE_ENV === 'development') {
          console.warn(`[ShoppingList] Unknown store zone for item: "${item.n}" - placed in ${DEFAULT_STORE_ZONE}`);
        }
      }
    });
  });

  // Filter out any empty categories
  return orderedList.filter(group => group.items.length > 0);
}

/**
 * Returns which store zone an item is physically located in.
 * The store is decided first (getItemStore), then the zone within that store.
 * Trader Joe's mapping rules sourced from data/shopping-areas.md;
 * Hy-Vee mapping rules sourced from data/hyvee-areas.md.
 *
 * ✅ ORDER MATTERS: More specific terms checked FIRST
 * ✅ All edge cases explicitly handled per store layout documentation
 */
export function getItemStoreZone(itemName: string): StoreZone {
  return classifyShoppingItem(itemName).zone;
}

export function classifyShoppingItem(itemName: string): ShoppingItemClassification {
  const store = getItemStore(itemName);
  return store === 'hyvee'
    ? classifyHyveeItem(itemName)
    : classifyTraderJoesItem(itemName);
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

function classifyHyveeItem(itemName: string): ShoppingItemClassification {
  const name = normalizeShoppingItemForClassification(itemName);

  for (const rule of HYVEE_KEYWORD_RULES) {
    if (rule.excludeTerms?.some((term) => name.includes(normalizeShoppingItemForClassification(term)))) {
      continue;
    }

    const matchedTerm = rule.terms.find((term) => name.includes(normalizeShoppingItemForClassification(term)));
    if (matchedTerm) {
      return { store: 'hyvee', zone: rule.zone, confidence: 'keyword', matchedTerm };
    }
  }

  return { store: 'hyvee', zone: DEFAULT_HYVEE_ZONE, confidence: 'fallback' };
}