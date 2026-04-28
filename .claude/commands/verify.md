---
description: Run pnpm verify (lint + typecheck + format:check + test) and report
---

Run `pnpm verify`.

If everything passes, summarize the result in one line.

If any step fails:

1. Identify the first failing step (lint, typecheck, format:check, or test).
2. Quote the first error with its file:line.
3. Propose a fix in plain English. **Do not apply the fix yet** — let the user decide.
