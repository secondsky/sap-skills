# UI5 Linter - Advanced CI/CD Integration

**Source**: https://github.com/UI5/linter/blob/main/.github/workflows/ci.yml
**Last Updated**: 2025-11-21
**UI5 Linter Version**: 1.20.5

---

## Overview

This guide covers advanced CI/CD integration patterns for UI5 Linter, including the UI5 Linter project's own CI workflow, coverage reporting, license checking, dependency analysis, and multi-environment strategies.

---

## UI5 Linter's Own CI Workflow (Real-World Example)

The UI5 Linter project itself uses a comprehensive CI pipeline that demonstrates best practices.

### Complete Workflow

**File**: `.github/workflows/ci.yml`

```yaml
name: CI

on:
  push:
    branches: [ main ]
  pull_request:
    branches: [ main ]

permissions: {}

jobs:
  test:
    name: Test
    runs-on: ubuntu-24.04

    steps:
      - name: Checkout code
        uses: actions/checkout@v5

      - name: Setup Node.js
        uses: actions/setup-node@v6
        with:
          node-version: '20.11.0'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci --engine-strict

      - name: Run linter
        run: npm run lint

      - name: Check licenses
        run: npm run check-licenses

      - name: Check dependencies
        run: npm run depcheck

      - name: Build
        run: npm run build-test

      - name: Run tests with coverage
        run: npm run coverage

      - name: Report coverage
        uses: coverallsapp/github-action@v2.3.6
        with:
          github-token: ${{ secrets.GITHUB_TOKEN }}
        continue-on-error: true
```

### Key Patterns Demonstrated

**1. Engine-Strict Installation**
```yaml
- name: Install dependencies
  run: npm ci --engine-strict
```

**Why**: Fails fast if Node.js version is incompatible, preventing hidden issues.

---

**2. Multi-Step Quality Checks**
```yaml
- run: npm run lint        # Code quality
- run: npm run check-licenses  # Legal compliance
- run: npm run depcheck    # Dependency health
- run: npm run build-test  # Build verification
- run: npm run coverage    # Test coverage
```

**Why**: Layered validation catches different types of issues.

---

**3. Coverage Reporting**
```yaml
- uses: coverallsapp/github-action@v2.3.6
  with:
    github-token: ${{ secrets.GITHUB_TOKEN }}
  continue-on-error: true
```

**Why**: `continue-on-error` prevents workflow failure if Coveralls is down.

---

**4. Minimal Permissions**
```yaml
permissions: {}
```

**Why**: Security best practice - grant only necessary permissions.

---

## Advanced GitHub Actions Patterns

### Multi-Platform Testing

Test across operating systems:

```yaml
name: Cross-Platform Lint

on: [push, pull_request]

jobs:
  lint:
    strategy:
      matrix:
        os: [ubuntu-latest, macos-latest, windows-latest]
        node: ['20.11.0', '22.0.0']

    runs-on: ${{ matrix.os }}

    steps:
      - uses: actions/checkout@v5

      - name: Setup Node.js
        uses: actions/setup-node@v6
        with:
          node-version: ${{ matrix.node }}
          cache: 'npm'

      - run: npm ci

      - name: Run UI5 Linter
        run: npm run lint
```

**Use Cases**:
- Ensure linter works on all platforms
- Catch platform-specific path issues
- Verify compatibility with multiple Node versions

---

### Multi-Job Workflow with Dependencies

Organize checks into separate jobs:

```yaml
name: Complete Validation

on: [push, pull_request]

jobs:
  lint-ui5:
    name: UI5 Linter
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v5
      - uses: actions/setup-node@v6
        with:
          node-version: '20'
          cache: 'npm'
      - run: npm ci
      - run: npm run lint

  lint-js:
    name: ESLint
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v5
      - uses: actions/setup-node@v6
        with:
          node-version: '20'
          cache: 'npm'
      - run: npm ci
      - run: npm run eslint

  test:
    name: Tests
    needs: [lint-ui5, lint-js]  # Only run if linting passes
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v5
      - uses: actions/setup-node@v6
        with:
          node-version: '20'
          cache: 'npm'
      - run: npm ci
      - run: npm test

  deploy:
    name: Deploy
    needs: test  # Only deploy if tests pass
    if: github.ref == 'refs/heads/main'
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v5
      - run: echo "Deploy to production"
```

**Benefits**:
- Parallel execution (faster)
- Clear separation of concerns
- Conditional deployment

---

### Caching for Performance

Optimize workflow performance with caching:

```yaml
jobs:
  lint:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v5

      - name: Setup Node.js
        uses: actions/setup-node@v6
        with:
          node-version: '20'
          cache: 'npm'  # Automatic npm cache

      - name: Cache UI5 Linter results
        uses: actions/cache@v3
        with:
          path: .ui5lint-cache
          key: ui5lint-${{ hashFiles('webapp/**/*.js', 'webapp/**/*.xml', 'ui5lint.config.*') }}
          restore-keys: |
            ui5lint-

      - run: npm ci

      - name: Run UI5 Linter
        run: npm run lint
```

**Performance Gain**: 30-50% faster on cache hit

---

### Diff-Based Linting (Lint Only Changed Files)

Lint only files changed in PR:

```yaml
name: Incremental Lint

on: [pull_request]

jobs:
  lint-changed:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v5
        with:
          fetch-depth: 0  # Fetch all history for diff

      - uses: actions/setup-node@v6
        with:
          node-version: '20'
          cache: 'npm'

      - run: npm ci

      - name: Get changed files
        id: changed-files
        run: |
          echo "files=$(git diff --name-only --diff-filter=ACMRT ${{ github.event.pull_request.base.sha }} ${{ github.sha }} | grep -E '\.(js|xml|json)$' | tr '\n' ' ')" >> $GITHUB_OUTPUT

      - name: Lint changed files
        if: steps.changed-files.outputs.files != ''
        run: |
          npx ui5lint ${{ steps.changed-files.outputs.files }}
```

**Benefits**:
- Faster on large codebases
- Immediate feedback on changes

---

## Coverage Reporting Integration

### Coveralls Integration

**Setup**:
```bash
npm install --save-dev nyc
```

**package.json**:
```json
{
  "scripts": {
    "test": "ava",
    "coverage": "nyc npm test",
    "lint": "ui5lint"
  },
  "nyc": {
    "reporter": ["lcov", "text"],
    "include": ["src/**/*.js"],
    "exclude": ["test/**"]
  }
}
```

**GitHub Actions**:
```yaml
- name: Run tests with coverage
  run: npm run coverage

- name: Upload to Coveralls
  uses: coverallsapp/github-action@v2.3.6
  with:
    github-token: ${{ secrets.GITHUB_TOKEN }}
  continue-on-error: true
```

---

### Codecov Integration

```yaml
- name: Run tests with coverage
  run: npm run coverage

- name: Upload to Codecov
  uses: codecov/codecov-action@v3
  with:
    files: ./coverage/lcov.info
    flags: unittests
    name: codecov-umbrella
    fail_ci_if_error: true
```

---

## License Checking

Ensure all dependencies have acceptable licenses:

**package.json**:
```json
{
  "scripts": {
    "check-licenses": "license-checker --onlyAllow 'MIT;Apache-2.0;BSD-2-Clause;BSD-3-Clause;ISC'"
  },
  "devDependencies": {
    "license-checker": "^25.0.1"
  }
}
```

**GitHub Actions**:
```yaml
- name: Check licenses
  run: npm run check-licenses
```

**Why**: Legal compliance, prevent GPL contamination

---

## Dependency Checking

Identify unused or missing dependencies:

**package.json**:
```json
{
  "scripts": {
    "depcheck": "depcheck --ignores='@types/*,eslint-*'"
  },
  "devDependencies": {
    "depcheck": "^1.4.3"
  }
}
```

**GitHub Actions**:
```yaml
- name: Check dependencies
  run: npm run depcheck
```

**Why**: Keep dependencies clean, reduce bundle size

---

## Security Scanning

### npm audit

```yaml
- name: Security audit
  run: npm audit --audit-level=moderate
  continue-on-error: true  # Don't fail on low/moderate
```

---

### Snyk Integration

```yaml
- name: Run Snyk
  uses: snyk/actions/node@master
  env:
    SNYK_TOKEN: ${{ secrets.SNYK_TOKEN }}
  with:
    args: --severity-threshold=high
```

---

## Artifact Management

Save lint results as artifacts:

```yaml
jobs:
  lint:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v5
      - uses: actions/setup-node@v6
        with:
          node-version: '20'
          cache: 'npm'
      - run: npm ci

      - name: Run UI5 Linter (JSON output)
        run: npm run lint -- --format json > lint-results.json
        continue-on-error: true

      - name: Run UI5 Linter (HTML report)
        run: npm run lint -- --format html > lint-report.html
        continue-on-error: true

      - name: Upload JSON results
        uses: actions/upload-artifact@v5
        if: always()
        with:
          name: lint-results-json
          path: lint-results.json

      - name: Upload HTML report
        uses: actions/upload-artifact@v5
        if: always()
        with:
          name: lint-report-html
          path: lint-report.html

      - name: Check for errors
        run: |
          ERROR_COUNT=$(jq '[.[].errorCount] | add' lint-results.json)
          if [ "$ERROR_COUNT" -gt 0 ]; then
            echo "❌ Found $ERROR_COUNT linting errors"
            exit 1
          fi
```

**Benefits**:
- Download reports for review
- Historical tracking
- Share with non-technical stakeholders (HTML)

---

## Pull Request Comments

Add lint results as PR comments:

```yaml
jobs:
  lint-pr:
    runs-on: ubuntu-latest
    if: github.event_name == 'pull_request'

    steps:
      - uses: actions/checkout@v5
      - uses: actions/setup-node@v6
        with:
          node-version: '20'
          cache: 'npm'
      - run: npm ci

      - name: Run UI5 Linter
        id: lint
        run: |
          npm run lint -- --format markdown > lint-results.md || true
          echo "results<<EOF" >> $GITHUB_OUTPUT
          cat lint-results.md >> $GITHUB_OUTPUT
          echo "EOF" >> $GITHUB_OUTPUT

      - name: Comment PR
        uses: actions/github-script@v6
        with:
          script: |
            github.rest.issues.createComment({
              issue_number: context.issue.number,
              owner: context.repo.owner,
              repo: context.repo.name,
              body: '## UI5 Lint Results\n\n${{ steps.lint.outputs.results }}'
            })
```

---

## GitLab CI Integration

**File**: `.gitlab-ci.yml`

```yaml
stages:
  - lint
  - test
  - deploy

variables:
  npm_config_cache: "$CI_PROJECT_DIR/.npm"

cache:
  paths:
    - .npm
    - node_modules

lint:ui5:
  stage: lint
  image: node:20
  script:
    - npm ci
    - npm run lint -- --format json > lint-results.json
    - npm run lint -- --format html > lint-report.html
  artifacts:
    when: always
    reports:
      junit: lint-results.json
    paths:
      - lint-report.html
  rules:
    - if: '$CI_PIPELINE_SOURCE == "merge_request_event"'
    - if: '$CI_COMMIT_BRANCH == "main"'

lint:ui5:fix:
  stage: lint
  image: node:20
  script:
    - npm ci
    - npm run lint:fix
    - git diff --exit-code || (echo "Autofix available" && exit 1)
  allow_failure: true
  only:
    - merge_requests
```

---

## Jenkins Pipeline

**File**: `Jenkinsfile`

```groovy
pipeline {
    agent {
        docker {
            image 'node:20'
        }
    }

    stages {
        stage('Install') {
            steps {
                sh 'npm ci'
            }
        }

        stage('Lint') {
            steps {
                sh 'npm run lint -- --format json > lint-results.json'
                sh 'npm run lint -- --format html > lint-report.html'
            }
            post {
                always {
                    archiveArtifacts artifacts: 'lint-*.json,lint-*.html', allowEmptyArchive: true
                    publishHTML([
                        reportDir: '.',
                        reportFiles: 'lint-report.html',
                        reportName: 'UI5 Lint Report'
                    ])
                }
            }
        }

        stage('Test') {
            when {
                expression {
                    def results = readJSON file: 'lint-results.json'
                    return results.sum { it.errorCount } == 0
                }
            }
            steps {
                sh 'npm test'
            }
        }
    }
}
```

---

## Pre-Commit Hooks (Advanced)

### Lint-Staged with Auto-Fix

**package.json**:
```json
{
  "husky": {
    "hooks": {
      "pre-commit": "lint-staged"
    }
  },
  "lint-staged": {
    "webapp/**/*.{js,xml}": [
      "ui5lint --fix",
      "ui5lint",
      "git add"
    ],
    "webapp/manifest.json": [
      "ui5lint --fix",
      "ui5lint"
    ]
  }
}
```

**Setup**:
```bash
npm install --save-dev husky lint-staged
npx husky install
npx husky add .husky/pre-commit "npx lint-staged"
```

---

### Commit Message Linting

Enforce conventional commits (like UI5 Linter):

**package.json**:
```json
{
  "devDependencies": {
    "@commitlint/cli": "^17.0.0",
    "@commitlint/config-conventional": "^17.0.0"
  }
}
```

**commitlint.config.mjs**:
```javascript
export default {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [2, 'always', [
      'feat', 'fix', 'docs', 'style', 'refactor', 'test', 'chore'
    ]],
    'scope-enum': [2, 'always', [
      'linter', 'autofix', 'docs', 'ci'
    ]]
  }
};
```

**Husky Hook**:
```bash
npx husky add .husky/commit-msg "npx commitlint --edit $1"
```

---

## Monorepo Integration

For monorepos with multiple UI5 apps:

```yaml
name: Monorepo Lint

on: [push, pull_request]

jobs:
  find-apps:
    runs-on: ubuntu-latest
    outputs:
      matrix: ${{ steps.set-matrix.outputs.matrix }}
    steps:
      - uses: actions/checkout@v5
      - id: set-matrix
        run: |
          APPS=$(find apps -name "ui5.yaml" -exec dirname {} \; | jq -R -s -c 'split("\n")[:-1]')
          echo "matrix=$APPS" >> $GITHUB_OUTPUT

  lint:
    needs: find-apps
    runs-on: ubuntu-latest
    strategy:
      matrix:
        app: ${{ fromJson(needs.find-apps.outputs.matrix) }}
    steps:
      - uses: actions/checkout@v5
      - uses: actions/setup-node@v6
        with:
          node-version: '20'
          cache: 'npm'
          cache-dependency-path: '${{ matrix.app }}/package-lock.json'

      - name: Install dependencies
        run: npm ci
        working-directory: ${{ matrix.app }}

      - name: Lint ${{ matrix.app }}
        run: npm run lint
        working-directory: ${{ matrix.app }}
```

---

## Environment-Specific Configurations

Use different configs for dev vs CI:

**ui5lint.config.js** (dev):
```javascript
export default {
  ignores: ["webapp/thirdparty/**"]
};
```

**.ui5lint.ci.config.js** (CI):
```javascript
export default {
  ignores: [
    "webapp/thirdparty/**",
    "webapp/test/**"  // More aggressive ignores for CI
  ]
};
```

**GitHub Actions**:
```yaml
- name: Lint (CI config)
  run: npm run lint -- --config .ui5lint.ci.config.js
```

---

## Summary Checklist

**Basic CI/CD** (✅ Covered in templates):
- [ ] Run linter on push/PR
- [ ] Fail build on errors
- [ ] Cache dependencies

**Advanced Patterns**:
- [ ] Multi-platform testing
- [ ] Coverage reporting
- [ ] License checking
- [ ] Dependency analysis
- [ ] Security scanning
- [ ] Artifact management
- [ ] PR comments
- [ ] Pre-commit hooks

**Production-Ready**:
- [ ] Environment-specific configs
- [ ] Monorepo support
- [ ] Performance optimization (caching)
- [ ] Historical tracking (artifacts)

---

## Resources

**UI5 Linter CI Workflow**: https://github.com/UI5/linter/blob/main/.github/workflows/ci.yml

**GitHub Actions Docs**: https://docs.github.com/en/actions

**GitLab CI Docs**: https://docs.gitlab.com/ee/ci/

**Jenkins Docs**: https://www.jenkins.io/doc/

---

**Document Version**: 1.0
**Last Verified**: 2025-11-21
**Next Review**: 2026-02-21
