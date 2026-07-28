/**
 * System-wide constants for Harvest Meal Engine
 * Single source of truth for all hardcoded values
 */

import type { MealType } from "@/lib/types";
import { HYVEE_STORE_ORDER, TRADER_JOES_STORE_ORDER } from "@/lib/shoppingListOrder";

// Week shape — single source of truth. This household plans dinners only;
// the number of dinners is chosen per week at planning time (4 on a
// leftovers-heavy week, up to 7 for a dinner every night). Validation
// accepts any count within these bounds.
export const PLANNED_MEAL_TYPE = "Dinner" as const;
export const MIN_DINNERS_PER_WEEK = 1;
export const MAX_DINNERS_PER_WEEK = 7;
export const DEFAULT_DINNERS_PER_WEEK = 4;

// Combined shopping category order: the Trader Joe's walk, then the Hy-Vee
// walk. Sourced from lib/shoppingListOrder.ts (single source of truth).
export const STORE_CATEGORY_ORDER = [
  ...TRADER_JOES_STORE_ORDER,
  ...HYVEE_STORE_ORDER,
] as const;

// Meal Type Ordering — dinner-only household; the MealType union in
// lib/types.ts keeps the other values for schema compatibility.
export const MEAL_TYPES: readonly MealType[] = [
  "Dinner"
];

export const MEAL_TYPE_ORDER = [
  "dinner"
] as const;

export const HOUSEHOLD_GOODS_SECTION = "Household Goods" as const;

export const HOUSEHOLD_GOODS_CATALOG = [
  {
    category: "Dishwasher Pods",
    n: "Trader Joe's Automatic Dishwasher Detergent Packs",
  },
  {
    category: "Dish Soap",
    n: "Trader Joe's Liquid Dish Soap",
  },
  {
    category: "Laundry Detergent",
    n: "Trader Joe's Liquid Laundry Detergent",
  },
  {
    category: "3-in-1 Shampoo",
    n: "Trader Joe's Formula No. 3 \"All For One, One For All\" Shampoo, Conditioner & Body Wash",
  },
  {
    category: "Face Sunscreen",
    n: "Trader Joe's Daily Facial Sunscreen SPF 40",
  },
  {
    category: "Tissues",
    n: "Trader Joe's Unscented White Tissue Paper",
  },
  {
    category: "Toilet Paper",
    n: "Trader Joe's Super Soft Bath Tissue",
  },
  {
    category: "Paper Towels",
    n: "Trader Joe's Slim Size Paper Towels",
  },
] as const;

// Junk category ordering
export const JUNK_CATEGORY_ORDER = [
  "Coffee/Creamer",
  "Beer/Wine",
  "Chips",
  "Sweets",
  "Frozen Food",
  "Frozen Treats",
  "Beverages/Drinks"
] as const;

// Brand Colors (matching Tailwind config)
export const COLORS = {
  HARVEST_GREEN: "#2d5a27",
  HARVEST_GOLD: "#f0c05a",
  HARVEST_TERRACOTTA: "#cd664d",
  HARVEST_PURPLE: "#6b5b95",
  BACKGROUND: "#fdfcf8"
} as const;

// Database Constants
export const DB_CONSTANTS = {
  MAX_CONNECTIONS: 10,
  IDLE_TIMEOUT: 45000,
  CONNECTION_TIMEOUT: 20000
} as const;

// UI Constants
export const UI_CONSTANTS = {
  MOBILE_BREAKPOINT: 768,
  DEFAULT_PAGE_SIZE: 50,
  MAX_HEART_DISPLAY: 99
} as const;