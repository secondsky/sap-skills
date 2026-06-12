# Staged Upgrade Strategies

Detailed guide for incremental dependency upgrades with codemod automation.

## Upgrade Planning

### Phase 1: Assessment

```bash
# Identify current versions
npm list --depth=0
bun pm ls  # Bun

# Check for available updates
npm outdated
bun outdated

# Check for breaking changes
# Read CHANGELOG.md, MIGRATION.md, GitHub releases
```

### Phase 2: Ordering

Upgrade in dependency order — foundations first:

```text
1. TypeScript / build tools
2. Core framework (React, Next.js, etc.)
3. Routing
4. State management
5. UI libraries
6. Testing libraries
7. Dev dependencies
```

### Phase 3: Execution

Upgrade one major version at a time with testing between each:

```bash
# Step 1: Create feature branch
git checkout -b upgrade/react-19

# Step 2: Upgrade the package
bun add react@19 react-dom@19

# Step 3: Test immediately
bun test
bunx tsc --noEmit
bun run build

# Step 4: Fix issues, commit
git add -A && git commit -m "chore: upgrade react to 19"

# Step 5: Continue to next package
```

## Codemod Automation

### react-codeshift

```bash
# Install codemod runner
bunx react-codeshift <transform> <path>

# Example: rename unsafe lifecycles
bunx react-codeshift \
  --parser tsx \
  --transform react-codeshift/transforms/rename-unsafe-lifecycles.js \
  src/

# Example: update context API
bunx react-codeshift \
  --transform react-codeshift/transforms/old-context-apis.js \
  src/
```

### jscodeshift (generic)

```bash
# Run any codemod
bunx jscodeshift -t <codemod-url> src/

# Example: upgrade React Router imports
bunx jscodeshift -t https://raw.githubusercontent.com/ReactTraining/react-router/main/packages/react-router/codemods/5.x-6.x.ts src/
```

### Next.js Codemods

```bash
# Built-in Next.js upgrade codemods
bunx @next/codemod@latest upgrade

# Specific transforms
bunx @next/codemod new-link src/
bunx @next/codemod next-image-to-legacy-image src/
```

## Custom Migration Scripts

### AST-Based Transformation

```javascript
// migration-script.mjs
import { readFileSync, writeFileSync } from 'fs';
import { globSync } from 'glob';
import jscodeshift from 'jscodeshift';

const files = globSync('src/**/*.{ts,tsx}');

for (const file of files) {
  const source = readFileSync(file, 'utf8');
  const j = jscodeshift(source);

  // Example: replace old import with new
  j.find(jscodeshift.ImportDeclaration, {
    source: { value: 'old-package' }
  }).forEach(path => {
    path.value.source.value = 'new-package';
  });

  const output = j.toSource();
  if (output !== source) {
    writeFileSync(file, output);
    console.log(`Updated: ${file}`);
  }
}
```

### Regex-Based Quick Fixes

```javascript
// quick-fix.mjs
import { readFileSync, writeFileSync } from 'fs';
import { globSync } from 'glob';

const replacements = [
  [/from 'old-api'/g, "from 'new-api'"],
  [/oldFunction\(/g, 'newFunction('],
  [/import \{ OldComponent \}/g, 'import { NewComponent }'],
];

const files = globSync('src/**/*.{ts,tsx}');
let totalChanges = 0;

for (const file of files) {
  let content = readFileSync(file, 'utf8');
  let changed = false;

  for (const [pattern, replacement] of replacements) {
    const matchCount = (content.match(pattern) || []).length;
    if (matchCount > 0) {
      content = content.replace(pattern, replacement);
      changed = true;
      totalChanges += matchCount;
    }
  }

  if (changed) {
    writeFileSync(file, content);
    console.log(`Updated: ${file}`);
  }
}

console.log(`Total changes: ${totalChanges}`);
```

## Peer Dependency Handling

```bash
# npm 7+: strict peer dependencies by default
npm install --legacy-peer-deps    # Ignore peer dep conflicts
npm install --force               # Override conflicts

# Better approach: resolve the actual conflict
npm ls <package-name>             # Find why peer dep is wrong

# Bun: handles peer deps automatically
bun install                       # Resolves peer deps without flags
```

## Workspace Upgrades

```bash
# Update all workspace packages
npm install --workspaces

# Update specific workspace
bun add package@latest --workspace=packages/app

# Update shared dev dependency across workspaces
bun add -D typescript@latest --workspace=*
```

## Rollback Strategy

```bash
#!/bin/bash
# rollback.sh

# Save current state
git stash
git checkout -b upgrade-branch

# Attempt upgrade
bun add package@latest

# Run tests
if bun test && bun run build; then
  echo "Upgrade successful"
  git add package.json bun.lock
  git commit -m "chore: upgrade package"
else
  echo "Upgrade failed, rolling back"
  git checkout main
  git branch -D upgrade-branch
  bun install  # Restore from lockfile
fi
```
