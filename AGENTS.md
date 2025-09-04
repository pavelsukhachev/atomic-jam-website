# Repository Guidelines

## Project Structure & Module Organization
- Use a clear top-level layout:
  - `src/` — application code by domain/module.
  - `tests/` — mirrors `src/` (e.g., `tests/foo/test_bar.py` or `__tests__/bar.test.ts`).
  - `scripts/` — developer tooling and CI helpers.
  - `assets/` — static files (images, fixtures, sample data).
  - `docs/` — docs and design notes.
- Prefer small, focused modules; keep public APIs in `src/<pkg>/__init__.py` (Python) or `src/index.(js|ts)` (Node).

## Build, Test, and Development Commands
- Use one entry point for common tasks. Prefer `make` or package scripts.
  - `make install` — install dependencies (e.g., `pip install -r requirements.txt` or `npm ci`).
  - `make test` — run the full test suite with coverage.
  - `make lint` — run linters/formatters.
  - `make dev` — run the app locally with reload.
Example `npm` alternatives: `npm run test`, `npm run lint`, `npm run dev`.

## Coding Style & Naming Conventions
- Indentation: 4 spaces (Python), 2 spaces (JS/TS/JSON/YAML).
- Names: `snake_case` for files/functions (Python), `camelCase` for variables, `PascalCase` for classes/types.
- Formatting/Linting:
  - Python: `black`, `ruff` (imports, lint), `mypy` (typing).
  - JS/TS: `prettier`, `eslint` with TypeScript rules.
- Keep functions <50 lines; prefer pure, testable units.

## Testing Guidelines
- Frameworks: `pytest` (Python) or `vitest/jest` (TS/JS).
- Location: mirror `src/` structure; name tests like `test_*.py` or `*.test.ts`.
- Coverage: target ≥ 80% statements; measure via `coverage run -m pytest` or `vitest --coverage`.
- Include one integration test per feature in `tests/integration/`.

## Commit & Pull Request Guidelines
- Commits: follow Conventional Commits, e.g., `feat(auth): add JWT refresh`.
- PRs: concise title, problem/solution summary, linked issue, screenshots/logs when UI/behavior changes, and checklist (tests updated, docs touched).
- Keep PRs small and focused; aim < 300 lines diff.

## Security & Configuration Tips
- Never commit secrets. Use `.env` (ignored) and `ENV_VAR` configuration with safe defaults.
- Validate inputs at boundaries; log minimally; redact sensitive fields.

## Getting Started
- Clone, then run: `make install && make test`.
- If `make` is unavailable, use the equivalent package scripts in `package.json` or the language’s toolchain.
