# Testing Strategy for Dependency Upgrades

Comprehensive testing approaches to validate dependency upgrades at every level.

## Testing Pyramid

```
        E2E Tests
       /          \
    Integration Tests
    /                \
  Unit Tests
  /                    \
Static Analysis (tsc, lint)
```

Run from bottom to top after each upgrade.

## Level 1: Static Analysis

```bash
# TypeScript type-check (fastest feedback)
bunx tsc --noEmit

# Lint
bun run lint

# Check bundle (size impact)
bun run build
```

## Level 2: Unit Tests

```bash
# Run all unit tests
bun test

# Watch mode during upgrade
bun test --watch

# Specific test file
bun test src/components/Button.test.tsx
```

After upgrading, check for:
- Type errors from API changes
- Assertion failures from behavior changes
- Missing exports from package restructuring

## Level 3: Integration Tests

```javascript
describe('Dependency Compatibility', () => {
  it('should have matching React versions', () => {
    const reactVersion = require('react/package.json').version;
    const reactDomVersion = require('react-dom/package.json').version;
    expect(reactVersion).toBe(reactDomVersion);
  });

  it('should render without crashing', () => {
    const { container } = render(<App />);
    expect(container).toBeTruthy();
  });

  it('should handle navigation', () => {
    render(<App />);
    fireEvent.click(screen.getByText('Navigate'));
    expect(screen.getByText('New Page')).toBeInTheDocument();
  });
});
```

## Level 4: Visual Regression Tests

```javascript
describe('Visual Regression', () => {
  it('should match snapshot', () => {
    const { container } = render(<Component />);
    expect(container.firstChild).toMatchSnapshot();
  });

  it('should match visual baseline', () => {
    render(<Dashboard />);
    // Compare screenshot against baseline
    cy.compareSnapshot('dashboard');
  });
});
```

After UI library upgrades, always check:
- Snapshot diffs
- Color/font changes
- Layout shifts
- Responsive breakpoints

## Level 5: E2E Tests

```javascript
// cypress/e2e/app.cy.js
describe('E2E Smoke Tests', () => {
  it('should load the app', () => {
    cy.visit('/');
    cy.get('[data-testid="app"]').should('exist');
  });

  it('should complete auth flow', () => {
    cy.visit('/login');
    cy.get('input[name="email"]').type('user@example.com');
    cy.get('button[type="submit"]').click();
    cy.url().should('include', '/dashboard');
  });

  it('should handle API errors gracefully', () => {
    cy.intercept('GET', '/api/data', { statusCode: 500 });
    cy.visit('/dashboard');
    cy.get('[data-testid="error-message"]').should('be.visible');
  });
});
```

## Bundle Analysis

```bash
# Compare bundle sizes before and after upgrade
bun run build

# Analyze bundle composition
bunx bundle-analyzer dist/index.js

# Check for unexpected bundle size increases
# Before upgrade: note the bundle size
# After upgrade: compare and investigate increases > 5%
```

## Performance Testing

```bash
# Run Lighthouse CI
bunx @lhci/cli autorun

# Check Core Web Vitals
# - LCP: Largest Contentful Paint
# - FID: First Input Delay
# - CLS: Cumulative Layout Shift
```

## Upgrade Test Matrix

| Test Type | When to Run | Failure Indicates |
|-----------|-------------|-------------------|
| Type-check | After every package | Breaking API changes |
| Unit tests | After every package | Behavior changes |
| Integration | After framework upgrades | Compatibility issues |
| Visual regression | After UI library upgrades | Visual breaking changes |
| E2E | After major upgrades | User flow breakage |
| Bundle analysis | After any upgrade | Size regression |
| Performance | After major upgrades | Performance regression |

## CI Integration

```yaml
# .github/workflows/upgrade-validation.yml
name: Upgrade Validation
on: [push, pull_request]
jobs:
  validate:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: oven-sh/setup-bun@v2
      - run: bun install --frozen-lockfile
      - run: bunx tsc --noEmit
      - run: bun run lint
      - run: bun test
      - run: bun run build
      - run: bun run test:e2e
```
