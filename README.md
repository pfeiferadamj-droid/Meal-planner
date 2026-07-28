# Harvest — Our Household Edition

**A Trader Joe's–first meal planner that solves the question "What's for dinner?"**

This is a customized fork of [SGShuman/tjs-meal-planner](https://github.com/SGShuman/tjs-meal-planner), adapted for our household's rules:

- **Dinners only** — the week is a flat list of dinners, and **you pick how many each week** (4 on a leftovers-heavy week, up to 7 for a dinner every night). No breakfast or lunch planning.
- **Everything is gluten-free** — one of us is gluten-free and every dinner is shared, so 100% of planned meals are GF (bases, sauces, and salad-kit toppings all checked).
- **No fish or seafood, no turkey, no tofu/tempeh** — ever.
- **Red meat at most once every 10 days** — beef/pork/lamb shows up at most once a week, and only when the last red-meat dinner was 10+ days back.

The planning rules live in `data/diner-preferences.md` (dietary hard rules and week validation), `data/companion-preferences.md` (the junk/snack list, GF-aware), and `data/data_context.md` (Trader Joe's product guidance with gluten callouts). Point an AI assistant at those files to draft a week, then validate and publish it with the built-in tooling.

![Harvest menu on mobile](docs/menu.png)

<p align="center">
  <a href="#quick-start"><strong>Quick start</strong></a> ·
  <a href="#what-you-get">Features</a> ·
  <a href="#authoring-a-week">Author a week</a> ·
  <a href="#project-layout">Layout</a> ·
  <a href="#license">License</a>
</p>

---

## Why Harvest

Most meal apps optimize for recipes. Harvest optimizes for **one weekly shop at Trader Joe's**:

- A flat menu of **dinners — you choose how many per week** (no day grid to babysit)
- Macros that matter in practice — **calories, protein, carbs, fat, and fiber**
- A shopping list ordered for how you actually walk the store
- A companion “junk” list and household goods list beside the meals
- Hearts, swaps, and an explore library so good meals come back

It also ships with markdown + JSON tooling so you (or an AI assistant) can draft a week, validate it, and publish it into the live app.

> **Note:** Trader Joe's is a trademark of its respective owner. This project is independent and not affiliated with, endorsed by, or sponsored by Trader Joe's.

## What you get

| Surface | What it does |
|---|---|
| **Menu** (`/menu`) | The week’s meals by type, plus Junk and Household tabs |
| **Shop** (`/shop`) | Derived shopping list in store walking order |
| **Explore** (`/explore`) | Searchable meal library with hearts and history |
| **Offline-friendly** | Service worker keeps the current week usable in-store |

Under the hood: Next.js App Router, React, TypeScript, Tailwind, and an embedded Postgres database ([PGlite](https://pglite.dev/)) — **no Docker, no database server to install**.

## Prerequisites

- [Node.js 20+](https://nodejs.org) — that's it. No Docker, no database install.
  (On a Mac, download the macOS installer from nodejs.org, or `brew install node` if you use Homebrew.)
- `git`, for cloning. On a fresh Mac, the first `git` command pops up a dialog offering to install the **Command Line Developer Tools** — click **Install** (not "Get Xcode"), wait for it to finish (~5–10 min), then re-run your `git` command. If you dismissed the dialog, bring it back with `xcode-select --install`.

## Quick start

Works great from the VS Code integrated terminal (Terminal → New Terminal), or any terminal.

### 1. Clone and install

Run these **one line at a time** (pasting the whole block at once can glue lines together in some terminals):

```bash
git clone https://github.com/pfeiferadamj-droid/Meal-planner.git
cd Meal-planner
npm install
```

### 2. Start the app

```bash
npm run dev
```

**In VS Code:** open the project folder and press **⇧⌘B** (Run Build Task) — the "Run Harvest (dev)" task starts the app for you. Seeding and publishing are also available under Terminal → Run Task.

Open **[http://localhost:3000](http://localhost:3000)** — it redirects to `/menu`.

The database is embedded in the app (PGlite) and stores its files in `.harvest-db/` inside the project folder. It's created automatically on first run — nothing to configure. Back up or reset the database by copying or deleting that folder (with the app stopped).

> **Tip for older machines:** `npm run dev` recompiles pages as you browse, which can feel sluggish on older hardware. For day-to-day use, build once and run the optimized app instead:
>
> ```bash
> npm run build
> npm start
> ```

### 3. Load the sample week

With the app running, seed from the baked-in sample plan:

```bash
curl -X POST http://localhost:3000/api/mealplan/seed
```

Or use the **Seed plan** control in the UI when no week is loaded yet, or run `npm run seed:meal-plan` in a second terminal.

You should see a full Menu with meals, macros, and shopping data.

### Stop / reset

Stop the app with `Ctrl+C` in the terminal. To wipe all data and start fresh, delete the `.harvest-db/` folder while the app is stopped.

### Everyday development

```bash
npm run dev                  # app with hot reload
npm run lint
npm run test:meal-plan-tools
```

> **One process at a time:** the embedded database supports a single process. The publish/seed scripts handle this automatically — when the app is running they publish through its API; when it isn't, they open the database directly. Just avoid opening the project in two dev servers at once.

## Using the app

1. **Menu** — browse the week's Dinners; heart, swap, or remove meals. **Add** opens the meal picker, where you can also **Create new meal** from scratch (it's pre-selected after saving — just tap "Add to menu"). Removed something by mistake? **Reset week** (top right) restores the week's published plan.
2. **Junk / Household tabs** — manage the companion snack list and household staples for the week.
3. **Shop** — check items off while you walk the store (works better after a visit so the service worker can cache the week).
4. **Explore** — find past meals by type, protein, or search; open a meal for full ingredient + macro detail.

## Authoring a week

Harvest treats a week as a markdown file with a fenced JSON block (see `data/current-week.md` and `data/mealplans/`).

```bash
# Optional: refresh markdown from the current JSON seed
npm run meal-plan:bootstrap-markdown

# Edit data/current-week.md (keep the JSON fence valid)

npm run meal-plan:sync      # validate + write data/current-week.json
npm run meal-plan:publish   # publish to the app (running or not)
```

### Planning context (great for AI-assisted weeks)

| File | Role |
|---|---|
| [`data/diner-preferences.md`](data/diner-preferences.md) | Household rules (gluten-free, excluded proteins, red-meat cadence, calories, cooking time) |
| [`data/companion-preferences.md`](data/companion-preferences.md) | Junk-list categories and rotation rules |
| [`data/data_context.md`](data/data_context.md) | Trader Joe’s product guidance + quality rules |
| [`data/meal-plan-skill.md`](data/meal-plan-skill.md) | AI/CLI week-authoring skill + JSON scaffold |
| [`data/MEAL_PLAN_PRODUCTION_WORKFLOW.md`](data/MEAL_PLAN_PRODUCTION_WORKFLOW.md) | End-to-end publish checklist |
| [`data/shopping-areas.md`](data/shopping-areas.md) | Store-area hints used when ordering the list |

## Project layout

```text
app/                 Next.js routes + API handlers
components/          UI (menu cards, shop list, modals, nav)
lib/                 Domain logic, DB access, hooks, providers
db/init/             Database schema (applied automatically on startup)
data/                Sample week, preferences, planning docs
scripts/             Seed / sync / publish / validation tools
docs/                Screenshots and public assets for the README
```

## Scripts

| Command | What it does |
|---|---|
| `npm run seed:meal-plan` | Load `data/current-week.json` into the database |
| `npm run meal-plan:sync` | Validate markdown → rewrite JSON |
| `npm run meal-plan:publish` | Publish the synced week to the database |
| `npm run meal-plan:bootstrap-markdown` | Rebuild `current-week.md` from JSON |
| `npm run meal-plan` | CLI wrapper (`new [date] [dinners]` / `validate` / `publish`; scaffolds from `data/meal-plan-skill.md`) |
| `npm run test:shopping` | Shopping-list order unit checks |
| `npm run test:meal-plans` | Meal-plan fixture validation |
| `npm run test:meal-plan-tools` | Run both test suites |
| `npm run lint` | ESLint |

Scripts talk to the same embedded database as the app (or through the app's API when it's running). Set `DATABASE_DIR` only if you want the data stored somewhere other than `.harvest-db/`.

## API overview

| Method | Path | Purpose |
|---|---|---|
| `GET` | `/api/mealplan` | Latest or selected week (+ available weeks) |
| `POST` | `/api/mealplan/seed` | Seed from `data/current-week.json` |
| `PATCH` | `/api/mealplan/meals` | Swap / add / remove menu slots |
| `POST` | `/api/mealplan/ratings` | Heart a meal |
| `*` | `/api/mealplan/shopping` | Shopping list updates |
| `*` | `/api/mealplan/junk` | Junk list updates |
| `*` | `/api/mealplan/household-goods` | Household list updates |
| `GET`/`POST` | `/api/meals` | Meal library |
| `PUT` | `/api/meals/[id]` | Update a meal |

**Security:** mutating routes are **unauthenticated**. That is intentional for local household use. Do not expose this stack to the public internet without auth (or network controls) in front of it.

## Troubleshooting

| Symptom | Likely fix |
|---|---|
| `npm run dev` fails on startup | Make sure you're on Node 20+ (`node --version`) |
| App is up but Menu is empty | `curl -X POST http://localhost:3000/api/mealplan/seed` |
| Seed/publish script errors mid-run | Retry with the app either fully running or fully stopped |
| Stale UI after an update | Hard-refresh; if needed stop the app (`Ctrl+C`) and `npm run dev` again |
| Port 3000 already in use | Stop the other process, or run on another port: `PORT=3001 npm run dev` |
| App feels slow in dev mode | Use production mode instead: `npm run build` once, then `npm start` |

## Contributing

Issues and PRs are welcome. For behavior changes, keep the week shape (dinners only, count chosen per week) and the shopping-list derivation tests green:

```bash
npm run lint
npm run test:meal-plan-tools
```

## License

MIT — see [LICENSE](LICENSE).
