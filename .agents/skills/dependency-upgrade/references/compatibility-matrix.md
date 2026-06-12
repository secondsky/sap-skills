# Dependency Compatibility Matrix

Common version compatibility requirements for major frameworks and libraries.

## React Ecosystem

| React | react-dom | react-router | @testing-library/react | Next.js |
|-------|-----------|--------------|----------------------|---------|
| 18.x  | ^18.0.0   | ^6.0.0       | ^14.0.0              | 13.x-14.x |
| 19.x  | ^19.0.0   | ^7.0.0       | ^16.0.0              | 15.x |

### React 18 → 19 Migration

```bash
bun add react@19 react-dom@19
bun add -D @testing-library/react@16 @types/react@19 @types/react-dom@19
```

Key breaking changes:
- Ref as prop (no more `forwardRef` needed)
- `useDeferredValue` initial value support
- Improved hydration mismatch reporting
- `ref` cleanup functions return value is ignored

### React Router 6 → 7

```bash
bun add react-router@7 react-router-dom@7
```

React Router v7 is the successor to Remix and React Router v6. Key changes:
- Framework mode (Remix-like) vs library mode
- New `createRootRoute`, `createRouter` API
- Data loading via `loader` and `action`

## Next.js

| Next.js | React | Node.js | TypeScript |
|---------|-------|---------|------------|
| 13.x    | 18.x  | >=16.8  | >=4.5      |
| 14.x    | 18.x  | >=18.17 | >=4.5      |
| 15.x    | 18.x-19.x | >=20.9  | >=4.5  |

### Next.js 14 → 15 Migration

```bash
bun add next@15
```

Key breaking changes:
- Turbopack as default dev bundler
- Improved caching defaults (fetch requests no longer cached by default)
- `next/image` changes
- Node.js >=20.9 required

## TypeScript

| TypeScript | Node.js target | Key feature |
|-----------|---------------|-------------|
| 5.3       | ES2022+       | `using` keyword, `Symbol.dispose` |
| 5.4       | ES2022+       | NoInfer utility type |
| 5.5       | ES2022+       | Inferred type predicates |
| 5.6       | ES2022+       | Iterator helpers |
| 5.7       | ES2024+       | `--target es2024`, path renaming |

### TypeScript Upgrade

```bash
bun add -D typescript@latest
```

TypeScript upgrades are typically backward compatible. Run type-check after upgrade:

```bash
bunx tsc --noEmit
```

## Tailwind CSS

| Tailwind | PostCSS | Framework support |
|----------|---------|-------------------|
| 3.x      | >=8.4   | All frameworks |
| 4.x      | Built-in | All frameworks (new engine) |

### Tailwind 3 → 4 Migration

```bash
bun add -D tailwindcss@4 @tailwindcss/vite
```

Key changes:
- CSS-first configuration (`@theme` instead of `tailwind.config.js`)
- Required primary entrypoint: `@import "tailwindcss"`
- PostCSS plugin via `@tailwindcss/postcss` package (must install and configure)
- Lightning CSS can replace PostCSS in some setups per official Tailwind recommendations
- New `@source inline("class-name")` pattern for safelisting utilities

## Node.js Version Compatibility

| Node.js | npm version | npm ci support |
|---------|------------|----------------|
| 18 LTS | 9.x        | Yes            |
| 20 LTS | 10.x       | Yes            |
| 22 LTS | 10.x       | Yes            |

See [Node.js Release Schedule](https://nodejs.org/en/about/releases) for LTS dates.

## Checking Compatibility

```bash
# Check peer dependency warnings
npm ls 2>&1 | grep -i "peer dep"

# Check for outdated with compatibility info
npm outdated

# Use npm-check-updates for safe upgrade analysis
bunx npm-check-updates --interactive

# Check for known vulnerabilities
npm audit
bun audit
```
