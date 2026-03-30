# Agent Guide - Ecommerce Frontend Platform

## Development Workflow: Visual-First with Feedback Loops

### Core Workflow Principles

1. **Visual-First Approach** - Always start with visual input (screenshots, designs, or existing UI)
2. **Change-First, Test-Second** - For targeted changes (API integration, component modifications), fully implement the change before writing or running any tests
3. **Test-Driven Development** - Write tests immediately after code generation is complete
4. **Visual Validation** - Use Playwright MCP for visual testing and verification
5. **Iterative Refinement** - Implement feedback loops for continuous improvement

### Targeted Change Workflow (API Integration / Component Modifications)

When asked to make a **specific, scoped change** — integrate an API endpoint, modify a component, update a hook, fix a bug — use this lighter workflow instead of the full feature workflow.

> **Rule: Complete the code change entirely first. Do not start testing until all requested changes are done.**

```
┌─────────────────────────────────────────────────────────────┐
│                  TARGETED CHANGE WORKFLOW                   │
└─────────────────────────────────────────────────────────────┘

1. READ & UNDERSTAND
   ├─ Read all relevant files before touching anything
   ├─ Understand existing patterns, types, and data flow
   └─ Identify exactly what needs to change (and what must not)

2. IMPLEMENT THE CHANGE (fully, before any testing)
   ├─ Make all requested code changes
   ├─ If integrating an API: hook → container → component
   ├─ If modifying a component: update types → component → tests
   ├─ Handle loading/error states as part of the change
   └─ Do NOT stop halfway to test — finish the implementation first

3. WRITE / UPDATE TESTS
   ├─ Add or update the Page Object if selectors changed
   ├─ Add or update spec cases that cover the changed behaviour
   └─ Remove stale tests that no longer apply

4. VISUAL TEST WITH PLAYWRIGHT MCP
   ├─ Navigate to the affected page/route
   ├─ Verify the change looks and behaves correctly
   └─ Check console for errors

5. FEEDBACK LOOP (if issues found)
   ├─ Fix issues → re-test visually → repeat
   └─ Exit when behaviour matches the request and no errors remain

6. FINALIZE
   └─ pnpm fix  (format + lint)
```

**Examples of targeted changes and what to read first:**

| Request                              | Files to read first                                              |
| ------------------------------------ | ---------------------------------------------------------------- |
| Integrate a new API endpoint         | The relevant hook file, the container, the component, `api-sdk/` |
| Change a component's props or layout | The component file, its types, any parent container              |
| Add a new field to a form            | Types file, the component, the hook/mutation                     |
| Fix a bug in a specific feature      | The feature's components, hooks, and types                       |

---

### Standard Feature Development Workflow

```
┌─────────────────────────────────────────────────────────────┐
│                    FEATURE DEVELOPMENT WORKFLOW             │
└─────────────────────────────────────────────────────────────┘

1. VISUAL INPUT & ANALYSIS
   ├─ Capture screenshot of current state (if modifying)
   ├─ Analyze design requirements (screenshot/design/mockup)
   ├─ Document visual requirements and user stories
   └─ Identify components, interactions, and data needs

2. CODE GENERATION
   ├─ Generate/update feature structure
   ├─ Implement components (atoms → molecules → organisms)
   ├─ Create containers with business logic
   ├─ Implement hooks for data fetching
   ├─ Add types and interfaces
   └─ Integrate with routing and pages

3. TEST CASE WRITING (IMMEDIATE)
   ├─ Write Playwright E2E tests for the feature
   ├─ Test user interactions and flows
   ├─ Test visual appearance and layout
   ├─ Test error states and edge cases
   └─ Test responsive behavior (if applicable)

4. VISUAL TESTING & VALIDATION
   ├─ Start dev server (if not running)
   ├─ Navigate to feature using Playwright MCP
   ├─ Take screenshots of implemented feature
   ├─ Compare with design/requirements
   ├─ Test interactions visually
   └─ Verify accessibility and responsiveness

5. FEEDBACK LOOP
   ├─ Analyze visual test results
   ├─ Identify discrepancies (UI, functionality, UX)
   ├─ Generate improvement plan
   ├─ Iterate on code (go to step 2)
   ├─ Update tests (go to step 3)
   └─ Re-test visually (go to step 4)

   ┌─→ If issues found → Return to step 2
   └─→ If approved → Proceed to step 6

6. CODE QUALITY & FINALIZATION
   ├─ Run linter and fix issues
   ├─ Format code with Prettier
   ├─ Verify all tests pass
   ├─ Check TypeScript compilation
   └─ Final visual verification
```

### Detailed Workflow Steps

#### Step 1: Visual Input & Analysis

**When starting a new feature or modification:**

1. **Capture Current State** (if modifying existing feature):

   ```bash
   # Use Playwright MCP to navigate and capture screenshot
   - Navigate to the relevant page/route
   - Take a screenshot of current implementation
   - Document current behavior and state
   ```

2. **Analyze Requirements**:
   - Review design mockups, screenshots, or user stories
   - Identify UI components needed (atoms, molecules, organisms)
   - Map out data flow and API requirements
   - Document user interactions and edge cases
   - Note responsive breakpoints and accessibility needs

3. **Plan Implementation**:
   - Break down feature into components
   - Identify reusable design system components
   - Plan feature structure (components, containers, hooks, types)
   - Define test scenarios upfront

#### Step 2: Code Generation

**Follow feature-based architecture:**

1. **Create Feature Structure**: see [Project Structure](#project-structure) for the directory layout.

2. **Implementation Order**:
   - Start with types and interfaces
   - Create hooks for data fetching/mutations
   - Build presentational components (atoms first)
   - Compose molecules and organisms
   - Create container components
   - Integrate with pages and routes

3. **Code Patterns**:
   - Use TypeScript for all files
   - Follow naming conventions (see Coding Conventions)
   - Use path aliases (`@/` for `src/`)
   - Implement proper error handling
   - Add loading and error states

#### Step 3: Test Case Writing (IMMEDIATE - Do Not Skip)

**Write tests immediately after code generation, before visual testing.**

Tests follow the **Page Object Model (POM)** pattern. Every new feature requires two things:

- A **Page Object** in `tests/pages/[FeatureName]Page.ts`
- A **spec file** in `tests/[feature-name].spec.ts`

---

##### 3a. Create the Page Object

Page Objects encapsulate all selectors and interactions for a page. They extend `BasePage` and are split into an **Actions** section and an **Assertions** section.

```typescript
// tests/pages/MyFeaturePage.ts
import { expect, Locator } from '@playwright/test';
import { BasePage } from './BasePage';

/**
 * My Feature Page Object
 *
 * Maps selectors and interactions for the MyFeature page.
 */
export class MyFeaturePage extends BasePage {
  // ── Locators ─────────────────────────────────────────────
  private readonly heading: Locator = this.page.getByRole('heading', { name: 'My Feature' });
  private readonly submitButton: Locator = this.page.getByRole('button', { name: 'Submit' });
  private readonly loadingText: Locator = this.page.getByText('Loading...');
  private readonly errorText: Locator = this.page.getByText('Error:');

  // ── Actions ──────────────────────────────────────────────

  async goto() {
    await super.goto('/my-feature-route');
  }

  async submit() {
    await this.submitButton.click();
  }

  // ── Assertions ───────────────────────────────────────────

  async shouldBeVisible() {
    await expect(this.heading).toBeVisible();
  }

  async shouldShowLoading() {
    await expect(this.loadingText).toBeVisible();
  }

  async shouldShowError() {
    await expect(this.errorText).toBeVisible();
  }
}
```

Then export it from `tests/pages/index.ts`:

```typescript
export { MyFeaturePage } from './MyFeaturePage';
```

---

##### 3b. Create the Spec File

Import the page objects and instantiate them in `beforeEach`. Each test focuses on **one behaviour** (Arrange → Act → Assert).

```typescript
// tests/my-feature.spec.ts
import { test, expect } from '@playwright/test';
import { MyFeaturePage } from './pages';

/**
 * My Feature Test Suite
 *
 * Tests cover: visibility, interactions, loading/error states.
 * Each test focuses on a single behaviour (Arrange → Act → Assert).
 */
test.describe('My Feature', () => {
  let myFeature: MyFeaturePage;

  test.beforeEach(async ({ page }) => {
    myFeature = new MyFeaturePage(page);
    await myFeature.goto();
  });

  test('page displays correctly on load', async () => {
    await myFeature.shouldBeVisible();
  });

  test('clicking submit triggers expected behaviour', async ({ page }) => {
    await myFeature.submit();

    await expect(page).toHaveURL(/\/expected-route/);
  });

  test('back button returns to previous page', async ({ page }) => {
    await myFeature.submit();
    await page.goBack();

    await myFeature.shouldBeVisible();
  });
});
```

---

3. **Test Coverage Should Include**:
   - ✅ Visual appearance and layout (page loads, headings visible)
   - ✅ User interactions (clicks, inputs, navigation)
   - ✅ Data loading states (loading, success, error)
   - ✅ Edge cases and error handling
   - ✅ Browser history (back / forward navigation)
   - ✅ Accessibility basics (use `getByRole` / `getByText` locators)

4. **Test Best Practices**:
   - Use descriptive test names that read like sentences
   - Test one thing per test case
   - Use `test.describe` to group related tests
   - Use `test.beforeEach` to instantiate page objects and navigate
   - Put all selectors in the Page Object — **never** use raw selectors in spec files
   - Split Page Object methods into Actions and Assertions sections
   - Use `getByRole` / `getByText` / `getByLabel` locators (avoid CSS selectors)

#### Step 4: Visual Testing & Validation

**Use Playwright MCP for visual testing:**

1. **Start Development Server** (if not running):

   ```bash
   pnpm dev
   # Server runs on http://localhost:5173
   ```

2. **Navigate to Feature**:
   - Use `browser_navigate` to go to the feature route
   - Use `browser_snapshot` to get accessibility snapshot
   - Use `browser_take_screenshot` to capture visual state

3. **Visual Validation Checklist**:
   - ✅ Layout matches design/mockup
   - ✅ Colors and typography are correct
   - ✅ Spacing and alignment are proper
   - ✅ Components render correctly
   - ✅ Interactive elements are visible and accessible
   - ✅ Responsive layout works (test different viewports)
   - ✅ Loading states display correctly
   - ✅ Error states display correctly

4. **Interaction Testing**:
   - Use `browser_click` to test button clicks
   - Use `browser_type` to test form inputs
   - Use `browser_hover` to test hover states
   - Use `browser_select_option` for dropdowns
   - Verify state changes after interactions

5. **Accessibility Testing**:
   - Use `browser_snapshot` to check accessibility tree
   - Verify keyboard navigation works
   - Check ARIA labels and roles
   - Ensure focus indicators are visible

#### Step 5: Feedback Loop

**Iterative refinement based on visual testing:**

1. **Analyze Results**:
   - Compare screenshots with design requirements
   - Identify visual discrepancies
   - Note functional issues
   - Document UX improvements needed

2. **Categorize Issues**:
   - **Critical**: Feature doesn't work, crashes, or blocks user flow
   - **High**: Visual mismatch, missing functionality, accessibility issues
   - **Medium**: Minor styling issues, edge cases not handled
   - **Low**: Polish, animations, micro-interactions

3. **Generate Improvement Plan**:
   - List all issues with priority
   - Plan code changes needed
   - Update test cases if needed
   - Document expected outcomes

4. **Iterate**:
   - Return to Step 2 (Code Generation) for fixes
   - Update tests in Step 3 if behavior changes
   - Re-test visually in Step 4
   - Repeat until all issues resolved

5. **Feedback Loop Criteria**:
   - Continue loop if: Visual mismatches, functional bugs, test failures
   - Exit loop when: All tests pass, visual matches design, no critical issues

#### Step 6: Code Quality & Finalization

**Final checks before completion:**

1. **Linting & Formatting**:

   ```bash
   pnpm fix  # Runs format + lint:fix
   ```

2. **Type Checking**:

   ```bash
   # TypeScript compilation should pass
   pnpm build
   ```

3. **Test Execution**:

   ```bash
   pnpm test:e2e  # Run all E2E tests
   ```

4. **Final Visual Verification**:
   - One final visual check with Playwright MCP
   - Verify all user flows work end-to-end
   - Check console for errors

## Project Structure

The project follows a **feature-based architecture** with clear separation of concerns:

```
client/
├── src/
│   ├── assets/
│   │   └── icons/            # SVG icon files (NEVER inline SVG markup in components)
│   ├── api-sdk/              # Auto-generated API SDK (DO NOT EDIT)
│   │   ├── *.gen.ts          # Generated files - ignored by ESLint
│   │   └── client/           # API client implementation
│   ├── design-system/        # Reusable UI components (Atomic Design)
│   │   ├── tokens/           # Design tokens (colors, spacing, etc.)
│   │   └── ui/               # UI components
│   │       ├── atoms/        # Basic components (Button, Input, etc.)
│   │       ├── molecules/   # Composite components
│   │       └── organisms/   # Complex components
│   ├── features/             # Feature modules (feature-based architecture)
│   │   └── [feature-name]/  # Feature structure
│   │       ├── components/  # Feature-specific presentational components
│   │       ├── containers/  # Feature-specific container components
│   │       ├── hooks/       # Feature-specific custom hooks
│   │       ├── types.ts     # Feature-specific types
│   │       ├── [name]Store.ts  # (optional) Feature-scoped Zustand store
│   │       └── index.ts     # Feature public API
│   ├── stores/               # Global Zustand stores (shared across features)
│   ├── layouts/             # Page layout components
│   │   └── PageLayout.tsx   # Reusable page shell
│   ├── pages/               # Page components (route-level)
│   │   ├── Home.tsx
│   │   ├── Demo.tsx
│   │   └── Showcase.tsx
│   ├── providers/           # React context providers
│   │   ├── ThemeProvider.tsx
│   │   └── ReactQueryProvider.tsx
│   ├── routes/             # Route configuration
│   │   └── index.tsx
│   ├── App.tsx              # Root component
│   └── main.tsx             # Application entry point
├── tests/                   # E2E tests (Playwright)
│   ├── pages/               # Page Object Model (POM) classes
│   │   ├── BasePage.ts      # Abstract base — shared goto(path) helper
│   │   ├── [FeatureName]Page.ts  # Feature page objects (locators + actions + assertions)
│   │   └── index.ts         # Barrel exports for all page objects
│   └── [feature-name].spec.ts  # Feature spec files (import from ./pages)
└── public/                  # Static assets
```

## Architecture Patterns

### Feature-Based Architecture

Each feature is self-contained with its own:

- **Components** - Presentational UI components
- **Containers** - Components that manage state and business logic
- **Hooks** - Custom hooks for data fetching and state management
- **Types** - TypeScript interfaces and types
- **index.ts** - Public API exports
- **Tests** - Corresponding test file in `tests/` directory

### Zustand Stores

**When to use Zustand** (client-side global state that outlives a single component):

- Shopping cart / selections
- Multi-step wizard / stepper state
- UI state shared across multiple unrelated features (sidebar open, active filters)

**When NOT to use Zustand**:

- Data that comes from the API — use TanStack Query
- State that only one component needs — use `useState`
- Simple theme/locale — use React Context

**File locations:**

- Global stores: `src/stores/[name]Store.ts`
- Feature-scoped stores: `src/features/[feature-name]/[name]Store.ts`

**Naming convention**: file and exported hook both use `use[Name]Store`.

**Store pattern (Zustand v5):**

```typescript
// src/stores/cartStore.ts
import { create } from 'zustand';

interface CartItem {
  id: string;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartState>(set => ({
  items: [],
  addItem: item => set(state => ({ items: [...state.items, item] })),
  removeItem: id => set(state => ({ items: state.items.filter(i => i.id !== id) })),
  clearCart: () => set({ items: [] }),
}));
```

**Consuming a store in a component:**

```typescript
// Select only what the component needs to avoid unnecessary re-renders
const items = useCartStore(state => state.items);
const addItem = useCartStore(state => state.addItem);
```

### Atomic Design System

The design system follows Atomic Design principles:

- **Atoms** - Basic, indivisible components (Button, Input, etc.)
- **Molecules** - Combinations of atoms (Form groups, Card headers)
- **Organisms** - Complex components (Headers, Forms, Product cards)

## Coding Conventions

### TypeScript

- Use TypeScript for all files (`.ts`, `.tsx`)
- Define interfaces for props and data structures
- Use type inference where appropriate
- Export types alongside components when needed
- Avoid `any` types - use `unknown` or proper types

### Component Patterns

**Presentational Components:**

- Located in `components/` folders
- Receive data via props
- No business logic or state management
- Focus on UI rendering
- Should be pure functions (same props = same output)

**Container Components:**

- Located in `containers/` folders
- Manage state and business logic
- Connect hooks to presentational components
- Handle data fetching and mutations
- Orchestrate component interactions

### Custom Hooks

- Use TanStack Query for data fetching
- Hook naming: `use[Feature][Action]Query` or `use[Feature][Action]Mutation`
- Return consistent interface: `{ data, isLoading, error, refetch }`
- Transform API responses to match component expectations
- Handle error states gracefully

### File Naming

- Components: `PascalCase.tsx` (e.g., `ProductsList.tsx`)
- Hooks: `camelCase.ts` with `use` prefix (e.g., `useDemoProductsQuery.ts`)
- Types: `camelCase.ts` (e.g., `types.ts`)
- Utilities: `camelCase.ts`
- Tests: `[feature-name].spec.ts` (e.g., `products.spec.ts`)
- Always use `.tsx` for React components

### Imports

- Use path aliases: `@/` for `src/`
- Group imports: external → internal → relative
- Use named exports for components
- Use default exports sparingly (mainly for pages)

## Styling Guidelines

### Tailwind CSS

- Use Tailwind utility classes for styling
- Follow design system tokens (defined in `design-system/tokens/`)
- Use semantic color tokens: `bg-background`, `text-text-primary`, etc.
- Prefer composition over custom CSS
- Use responsive utilities: `sm:`, `md:`, `lg:`, `xl:`
- Maintain consistent spacing using design tokens

### SVG / Icon Guidelines

> **CRITICAL RULE — Never write raw SVG markup inside component files (`.tsx` / `.ts`).**
> All SVGs must live as `.svg` files in `src/assets/icons/` and be imported from there.

#### File location and naming

```
src/assets/icons/
├── arrow-right.svg
├── close.svg
├── chevron-down.svg
└── user-avatar.svg
```

- File names: `kebab-case.svg`
- One icon per file
- Optimise SVGs before committing (remove unnecessary attributes, metadata, inline styles)

#### How to use SVGs in components

Vite handles `.svg` files as URL assets out of the box. Import the file as a URL and render it with `<img>`:

```tsx
// ✅ Correct — import from assets/icons, render with <img>
import arrowRightUrl from '@/assets/icons/arrow-right.svg';

export const ArrowRightIcon = ({
  className = '',
  alt = '',
}: {
  className?: string;
  alt?: string;
}) => <img src={arrowRightUrl} alt={alt} className={className} />;
```

If the icon needs to be styled with CSS `currentColor` (e.g. it must inherit text colour), create a thin wrapper component in the design system that inlines the SVG via a React import — but **the SVG source still lives in `src/assets/icons/`**, not in the component file:

```tsx
// src/design-system/ui/atoms/CloseIcon.tsx
// The SVG markup is in the .svg file; the component just imports and renders it
import { ReactComponent as CloseSvg } from '@/assets/icons/close.svg';

export const CloseIcon = ({ className = '' }: { className?: string }) => (
  <CloseSvg className={className} aria-hidden="true" />
);
```

> Note: React component imports (`?react` / `ReactComponent`) require `vite-plugin-svgr`. If that plugin is not installed, use the `<img>` pattern above.

#### Wrong ❌ — SVG markup written directly in a component file

```tsx
// SomeComponent.tsx
const Icon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
    <path d="M5 12h14M12 5l7 7-7 7" /> {/* ← WRONG: SVG belongs in assets/icons/ */}
  </svg>
);
```

#### Correct ✅ — SVG file in assets, imported into component

```
src/assets/icons/arrow-right.svg   ← SVG markup lives here
src/design-system/ui/atoms/ArrowRightIcon.tsx  ← imports the file, exports a component
src/design-system/ui/atoms/index.ts            ← export { ArrowRightIcon }
```

## API Integration

### Auto-Generated SDK

- API SDK is auto-generated from OpenAPI schema
- Files in `api-sdk/` ending with `.gen.ts` are auto-generated
- **DO NOT EDIT** auto-generated files
- Regenerate with: `pnpm run openapi-ts`
- Auto-generated files are ignored by ESLint

### Using the SDK

- Import functions from `@/api-sdk`
- Use query functions for GET requests
- Use mutation functions for POST/PUT/DELETE requests
- Handle responses and errors appropriately
- Transform API responses in hooks to match component needs

## Testing Guidelines

### Test Structure

Tests follow the **Page Object Model (POM)**:

| File                               | Purpose                                               |
| ---------------------------------- | ----------------------------------------------------- |
| `tests/pages/BasePage.ts`          | Abstract base — `goto(path)` helper                   |
| `tests/pages/[FeatureName]Page.ts` | Locators, actions, and assertion helpers for a page   |
| `tests/pages/index.ts`             | Barrel exports                                        |
| `tests/[feature-name].spec.ts`     | Test spec — imports page objects, never raw selectors |

See [Step 3](#step-3-test-case-writing-immediate---do-not-skip) for the full templates and coverage checklist.

### Test Categories

1. **Visual Tests**:
   - Layout and appearance
   - Component rendering
   - Responsive design
   - Visual states (loading, error, success)

2. **Functional Tests**:
   - User interactions (clicks, inputs, navigation)
   - Form submissions
   - Data fetching and display
   - State changes

3. **Edge Case Tests**:
   - Error handling
   - Empty states
   - Invalid inputs
   - Network failures

4. **Accessibility Tests**:
   - Keyboard navigation
   - Screen reader compatibility
   - Focus management
   - ARIA attributes

### Test Best Practices

See best practices listed in [Step 3](#step-3-test-case-writing-immediate---do-not-skip).

### Running Tests

```bash
# Run all E2E tests
pnpm test:e2e

# Run tests in UI mode (interactive)
pnpm test:e2e:ui

# Run specific test file
npx playwright test tests/[feature-name].spec.ts

# Run tests in headed mode
npx playwright test --headed
```

## Playwright MCP Integration

### Available MCP Tools

See [Quick Reference → Playwright MCP Commands](#playwright-mcp-commands) for the full list.

### Visual Testing Workflow with MCP

1. **Navigate to Feature**:

   ```
   browser_navigate → http://localhost:5173/feature-route
   ```

2. **Capture Initial State**:

   ```
   browser_snapshot → Get accessibility tree
   browser_take_screenshot → Capture visual state
   ```

3. **Test Interactions**:

   ```
   browser_click → Test button clicks
   browser_type → Test form inputs
   browser_hover → Test hover states
   ```

4. **Verify Results**:

   ```
   browser_snapshot → Check updated state
   browser_take_screenshot → Verify visual changes
   browser_console_messages → Check for errors
   ```

5. **Iterate Based on Results**:
   - Compare screenshots with requirements
   - Identify issues
   - Return to code generation
   - Re-test

## Code Quality

### ESLint

- Configuration: `eslint.config.js`
- Auto-generated files (`.gen.ts`) are ignored
- Run: `pnpm lint`
- Fix: `pnpm lint:fix`

### Prettier

- Configuration: `.prettierrc.json`
- Format: `pnpm format`
- Check: `pnpm format:check`
- Combined: `pnpm fix` (format + lint:fix)

### Pre-commit Hooks

- Husky + lint-staged configured
- Automatically formats and lints staged files
- Hook location: `.husky/pre-commit` (in parent directory)

## Common Tasks

### Making Targeted Changes (API Integration, Component Modifications)

Use the [Targeted Change Workflow](#targeted-change-workflow-api-integration--component-modifications) for scoped requests. Quick checklist:

1. **Read first** — read every file that will be touched before writing a single line
2. **Implement completely** — finish all code changes before moving to testing
3. **Write / update tests** — update the Page Object and spec if behaviour changed
4. **Visual test** — use Playwright MCP to verify the change in the browser
5. **Iterate** — fix issues and re-test until correct
6. **`pnpm fix`** — format and lint

**Integrating an API endpoint specifically:**

1. Read the relevant `.gen.ts` file in `api-sdk/` to understand the function signature and response type
2. Create or update the hook (`use[Feature][Action]Query` / `Mutation`) in `features/[feature]/hooks/`
3. Update the container to call the hook and pass data to the component
4. Update the component to render the new data (add loading + error states)
5. Update types if the shape of data changed
6. Only after all of the above: write/update tests and visual-test

---

### Adding a New Feature (Complete Workflow)

Follow [Detailed Workflow Steps](#detailed-workflow-steps) (Steps 1–6). Quick checklist:

1. Analyze design / capture current screenshot
2. Create feature structure (see [Project Structure](#project-structure))
3. Implement: types → hooks → components → containers → routes
4. Write `tests/[feature-name].spec.ts` immediately
5. Visual-test with Playwright MCP; iterate until approved
6. `pnpm fix` → `pnpm build` → `pnpm test:e2e`

### Adding a New Page

1. Create page component in `src/pages/`
2. Use `PageLayout` for consistent structure
3. Add route in `src/routes/index.tsx`
4. Export from `src/pages/index.ts`
5. **Write tests** in `tests/[page-name].spec.ts`
6. **Visual test** with Playwright MCP
7. Iterate based on feedback

### Adding a New UI Component

> **CRITICAL RULE — Showcase page is display-only.**
> `Showcase.tsx` must NEVER contain component definitions (other than small showcase-specific wrappers like `SectionHeading` or `ExampleCard`).
> All real components MUST live in `src/design-system/ui/` and be imported into Showcase.

**Step-by-step:**

1. Determine level (atom/molecule/organism)
2. Create the component file in the appropriate directory:
   - Atom → `src/design-system/ui/atoms/MyComponent.tsx`
   - Molecule → `src/design-system/ui/molecules/MyComponent.tsx`
   - Organism → `src/design-system/ui/organisms/MyComponent.tsx`
3. Use Tailwind utilities for styling
4. Export from the level's `index.ts` (e.g. `src/design-system/ui/atoms/index.ts`)
5. Re-export from `src/design-system/ui/index.ts`
6. Re-export from `src/design-system/index.ts`
7. Import into `Showcase.tsx` via `@/design-system` and add a demo section — **no inline component definitions**
8. **Write tests** if component has complex behaviour
9. **Visual test** component in Showcase page

**Wrong ❌** — component defined inside `Showcase.tsx`:

```tsx
// Showcase.tsx
const MyBar: React.FC = () => <div>...</div>; // ← WRONG
```

**Correct ✅** — component in design-system, imported into Showcase:

```
src/design-system/ui/atoms/MyBar.tsx   ← component lives here
src/design-system/ui/atoms/index.ts    ← export { MyBar } from './MyBar'
src/design-system/ui/index.ts          ← export * from './atoms'
src/design-system/index.ts             ← export * from './ui'
src/pages/Showcase.tsx                 ← import { MyBar } from '@/design-system'
```

### Creating a Custom Hook

1. Use TanStack Query for data fetching
2. Follow naming convention: `use[Feature][Action]Query` or `use[Feature][Action]Mutation`
3. Return consistent interface
4. Handle error states
5. Transform API responses if needed
6. **Test hook behavior** in feature tests

## Important Notes

### Auto-Generated Files

- **NEVER edit** files ending with `.gen.ts`
- These are auto-generated from OpenAPI schema
- Regenerate with `pnpm run openapi-ts` if schema changes
- ESLint ignores these files automatically

### State Management

Pick the right tool for the kind of state:

| State type                       | Tool                      |
| -------------------------------- | ------------------------- |
| Server / async data              | TanStack Query            |
| Complex client-side global state | Zustand                   |
| Simple global UI state (theme)   | React Context             |
| Component-local state            | `useState` / `useReducer` |

- Avoid prop drilling — use Zustand stores or composition instead
- Do **not** put server data in a Zustand store; let TanStack Query own it

### Routing

- Routes defined in `src/routes/index.tsx`
- Use React Router 7
- Test routes in E2E tests

### Git Hooks

- Pre-commit hook runs in parent directory (`.husky/pre-commit`)
- Changes directory to `client/` before running lint-staged
- Automatically formats and lints staged files

### Path Aliases

- `@/` maps to `src/`
- Configured in `tsconfig.json` and `vite.config.ts`
- Use for all internal imports

### Testing Requirements

- **MANDATORY**: For targeted changes — finish all code changes first, then write/update tests
- **MANDATORY**: Write tests immediately after code generation is complete
- **MANDATORY**: Visual test with Playwright MCP before completion
- **MANDATORY**: Run feedback loop until all issues resolved
- Tests should cover: visual, functional, edge cases, accessibility

### SVG / Icon Requirements

- **MANDATORY**: Never write raw SVG markup inside `.tsx` component files
- **MANDATORY**: All SVG files must be saved in `src/assets/icons/[name].svg`
- **MANDATORY**: Import SVGs from `@/assets/icons/` and use via `<img src={...} />` or a wrapper component
- SVG file names must be `kebab-case.svg`

## Quick Reference

### Development Commands

- **Start dev server**: `pnpm dev` (runs on http://localhost:5173)
- **Build**: `pnpm build`
- **Lint**: `pnpm lint`
- **Format**: `pnpm format`
- **Fix all**: `pnpm fix` (format + lint:fix)
- **Test**: `pnpm test:e2e`
- **Test UI mode**: `pnpm test:e2e:ui`
- **Generate API types**: `pnpm openapi-ts`

### Playwright MCP Commands

- Navigate: `browser_navigate(url)`
- Snapshot: `browser_snapshot()` (accessibility tree)
- Screenshot: `browser_take_screenshot()`
- Click: `browser_click(element, ref)`
- Type: `browser_type(element, ref, text)`
- Hover: `browser_hover(element, ref)`
- Select: `browser_select_option(element, ref, values)`
- Press key: `browser_press_key(key)`
- Wait: `browser_wait_for({ text, time })`
- Console: `browser_console_messages()`
- Network: `browser_network_requests()`

## Key Files to Know

- `src/routes/index.tsx` - Route configuration
- `src/App.tsx` - Root component
- `src/main.tsx` - Entry point
- `src/providers/` - Global providers (Theme, React Query)
- `src/layouts/PageLayout.tsx` - Reusable page shell
- `tests/` - E2E test files
- `playwright.config.ts` - Playwright configuration
- `eslint.config.js` - ESLint configuration
- `.prettierrc.json` - Prettier configuration
- `vite.config.ts` - Vite configuration
- `tsconfig.json` - TypeScript configuration

## Workflow Checklists

### New Feature Checklist

- [ ] **Step 1**: Visual input captured and analyzed
- [ ] **Step 2**: Code generated following architecture patterns
- [ ] **Step 3**: Tests written immediately after code
- [ ] **Step 4**: Visual testing completed with Playwright MCP
- [ ] **Step 5**: Feedback loop executed (iterate if needed)
- [ ] **Step 6**: Code quality checks passed (`pnpm fix` + `pnpm build`)
- [ ] **Step 7**: All tests passing (`pnpm test:e2e`)
- [ ] **Step 8**: Final visual verification completed

### Targeted Change Checklist (API Integration / Component Modification)

- [ ] Read all relevant files before making any changes
- [ ] All requested code changes implemented completely (hook, container, component, types)
- [ ] Loading and error states handled
- [ ] Tests written / updated (Page Object + spec)
- [ ] Visual test with Playwright MCP — change looks and behaves correctly
- [ ] Feedback loop completed — no visual mismatches or console errors
- [ ] `pnpm fix` passed (format + lint)

### SVG / Icon Checklist

- [ ] SVG saved as a file in `src/assets/icons/[name].svg` (kebab-case filename)
- [ ] No raw SVG markup written inside any `.tsx` file
- [ ] Imported via `@/assets/icons/` and rendered through `<img>` or a wrapper component

---

**Last Updated**: 2026
**Maintainer**: Development Team
