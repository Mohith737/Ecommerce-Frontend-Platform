# Ecommerce Frontend Platform

A modern ecommerce frontend built with React, TypeScript, and Vite. Provides product browsing, cart management, checkout, and user authentication features.

## Tech Stack

- **React 19** - UI library
- **TypeScript 5.9** - Type safety
- **Vite 7** - Build tool and dev server
- **TanStack Query 5** - Server state management
- **React Router 7** - Client-side routing
- **Tailwind CSS 4** - Utility-first CSS framework
- **Playwright** - E2E testing
- **ESLint + Prettier** - Linting and formatting

## Prerequisites

### 1. Node.js (v20 or higher)

```bash
# Verify
node --version  # Should be 20.x or higher
```

Download from https://nodejs.org/

### 2. pnpm (v9 or higher)

```bash
# Install
npm install -g pnpm

# Verify
pnpm --version  # Should be 9.x or higher
```

### 3. Git

```bash
# Verify
git --version
```

### 4. Playwright Browsers

Installed automatically with `pnpm install`. To install manually:

```bash
npx playwright install
```

### 5. Playwright MCP Server (for visual testing)

Configure the Playwright MCP server in your IDE (Cursor/VS Code) to enable browser automation tools:

- `browser_navigate`, `browser_snapshot`, `browser_take_screenshot`
- `browser_click`, `browser_type`, `browser_hover`, etc.

## Setup

```bash
# 1. Clone the repository
git clone <repository-url>
cd Boot-41-Frontend

# 2. Install dependencies (also installs Playwright browsers)
pnpm install

# 3. Start the dev server
pnpm dev
# App runs at http://localhost:5173
```

### Verify Your Setup

```bash
# Check Node.js version
node --version

# Check pnpm version
pnpm --version

# Check TypeScript compiles
pnpm build

# Run E2E tests
pnpm test:e2e
```

## Project Structure

```
client/
├── src/
│   ├── api-sdk/          # Auto-generated API SDK (DO NOT EDIT)
│   ├── design-system/    # Reusable UI components (Atomic Design)
│   │   └── ui/
│   │       ├── atoms/
│   │       ├── molecules/
│   │       └── organisms/
│   ├── features/         # Feature modules
│   │   └── [feature]/
│   │       ├── components/
│   │       ├── containers/
│   │       ├── hooks/
│   │       ├── types.ts
│   │       └── index.ts
│   ├── layouts/          # Page layout components
│   ├── pages/            # Route-level page components
│   ├── providers/        # React context providers
│   ├── routes/           # Route configuration
│   ├── App.tsx
│   └── main.tsx
└── tests/                # Playwright E2E tests
```

## Commands

| Command            | Description                                 |
| ------------------ | ------------------------------------------- |
| `pnpm dev`         | Start dev server at `http://localhost:5173` |
| `pnpm build`       | Type-check and build for production         |
| `pnpm preview`     | Preview production build                    |
| `pnpm lint`        | Run ESLint                                  |
| `pnpm format`      | Format with Prettier                        |
| `pnpm fix`         | Format + lint fix                           |
| `pnpm test:e2e`    | Run Playwright E2E tests                    |
| `pnpm test:e2e:ui` | Run tests in interactive UI mode            |
| `pnpm openapi-ts`  | Regenerate API SDK from OpenAPI schema      |

## Troubleshooting

**`pnpm: command not found`**
— Install pnpm: `npm install -g pnpm`

**Playwright browsers not found**
— Run `npx playwright install`

**TypeScript errors after install**
— Run `pnpm install` to ensure all type definitions are installed

**Port 5173 already in use**
— Kill the existing process or change the port in `vite.config.ts`

**MCP tools not available in IDE**
— Check your IDE's MCP server configuration and restart the IDE
