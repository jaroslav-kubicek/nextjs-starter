<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.

<!-- END:nextjs-agent-rules -->

<!-- code-review-graph MCP tools -->

## MCP Tools: code-review-graph

**IMPORTANT: This project has a knowledge graph. ALWAYS use the
code-review-graph MCP tools BEFORE using Grep/Glob/Read to explore
the codebase.** The graph is faster, cheaper (fewer tokens), and gives
you structural context (callers, dependents, test coverage) that file
scanning cannot.

### When to use graph tools FIRST

- **Exploring code**: `semantic_search_nodes` or `query_graph` instead of Grep
- **Understanding impact**: `get_impact_radius` instead of manually tracing imports
- **Code review**: `detect_changes` + `get_review_context` instead of reading entire files
- **Finding relationships**: `query_graph` with callers_of/callees_of/imports_of/tests_for
- **Architecture questions**: `get_architecture_overview` + `list_communities`

Fall back to Grep/Glob/Read **only** when the graph doesn't cover what you need.

### Key Tools

| Tool                        | Use when                                               |
| --------------------------- | ------------------------------------------------------ |
| `detect_changes`            | Reviewing code changes — gives risk-scored analysis    |
| `get_review_context`        | Need source snippets for review — token-efficient      |
| `get_impact_radius`         | Understanding blast radius of a change                 |
| `get_affected_flows`        | Finding which execution paths are impacted             |
| `query_graph`               | Tracing callers, callees, imports, tests, dependencies |
| `semantic_search_nodes`     | Finding functions/classes by name or keyword           |
| `get_architecture_overview` | Understanding high-level codebase structure            |
| `refactor_tool`             | Planning renames, finding dead code                    |

### Workflow

1. The graph auto-updates on file changes (via hooks).
2. Use `detect_changes` for code review.
3. Use `get_affected_flows` to understand impact.
4. Use `query_graph` pattern="tests_for" to check coverage.

<!-- BEGIN:tailwind-v4 -->

## Tailwind v4 (CSS-first config)

- There is **no** `tailwind.config.ts` — creating one does nothing. Theme tokens live in `app/globals.css` inside `@theme inline { ... }`.
- Custom colors / radii / spacing go in CSS, not JS. Follow the existing OKLch convention.
- Dark mode is class-based (`.dark` on an ancestor); already wired in `globals.css`.
- PostCSS plugin is `@tailwindcss/postcss`. Do not paste v3 setup snippets.

<!-- END:tailwind-v4 -->

<!-- BEGIN:shadcn -->

## shadcn (preset: base-nova, base color: neutral, CSS vars)

- Install primitives with `pnpm dlx shadcn@latest add <name>`. **Never** hand-roll files in `components/ui/` — the registry generates the correct variants, slots, and tokens.
- Import the `cn` helper from `@/lib/utils`.
- Aliases (from `components.json`): `@/components`, `@/components/ui`, `@/lib`, `@/lib/utils`, `@/hooks`.

<!-- END:shadcn -->

<!-- BEGIN:testing -->

## Testing (Vitest + RTL + jsdom)

- **Vitest cannot run async server components.** If you want to unit-test one, refactor the testable bit into a client component, or skip the unit test for that page.
- Smoke tests live in `app/__tests__/`. Render via `@testing-library/react`, assert with `@testing-library/jest-dom` matchers.
- Globals are on (`expect`, `describe`, `it` — no imports). `jest-dom/vitest` matchers are auto-loaded via `vitest.setup.ts`.

<!-- END:testing -->

<!-- BEGIN:typescript -->

## TypeScript (strict + noUncheckedIndexedAccess)

- `arr[i]` and `obj[key]` return `T | undefined`. Handle the undefined branch — do not silence with `!`.
- Do not use `as any`. Narrow with type guards or accept `unknown` and validate.

<!-- END:typescript -->

<!-- BEGIN:workflow -->

## Workflow

- Package manager is **pnpm** (Node 24, see `.nvmrc`). Never run `npm` or `yarn`.
- Before claiming any task done: run `pnpm verify` (lint + typecheck + format:check + test) — or invoke the `/verify` slash command.
- Commit in small logical steps with conventional prefixes (`feat:` / `fix:` / `chore:` / `test:` / `docs:`).

<!-- END:workflow -->

<!-- BEGIN:agents -->

## Agent assets shipped in this repo

- `/verify` — slash command that runs `pnpm verify` and reports the first failure with file:line.
- `next-docs` subagent — read-only Next.js 16 docs lookup against `node_modules/next/dist/docs/`. Prefer it over `Read`-ing docs directly when the topic is non-trivial; it keeps the main context clean.
- `.claude/settings.json` configures `code-review-graph` hooks (PostToolUse on Edit/Write/Bash, SessionStart status). The hooks call the binary directly, so a fresh clone needs `code-review-graph` on PATH — install with `uv tool install code-review-graph` (or `pipx install code-review-graph`).

<!-- END:agents -->
