# AGENTS.md Template

This template is written to `AGENTS.md` in the project root by `/cleancode:setup codex`.

```markdown
# Agent Instructions — Clean Code Standards

Source of truth: .cleancode-rules.md
Enforced by: cleancode plugin

## Purpose

These instructions apply to all AI agents working in this codebase. They ensure all generated, edited, or reviewed code meets the project's clean code standards.

## Code Quality Standards

### File Size
- **Maximum: 300 lines per file**
- When approaching the limit, propose splitting the file and suggest how
- Each file represents one single concept or responsibility
- Monolith files (utils.ts, helpers.py, common.java) are a red flag — split by responsibility

### Function Size
- **Maximum: 40 lines per function/method**
- Ideal target: 10-20 lines
- Extract sub-operations into named helper functions
- The function body should read like a high-level summary of steps

### Parameter Count
- **Maximum: 4 parameters**
- When more are needed, group into a typed object or dataclass
- TypeScript: define an explicit named interface for the parameter object

### Nesting Depth
- **Maximum: 4 levels of nesting**
- Use guard clauses and early returns to reduce nesting
- Never bury the main logic inside multiple conditionals

### Naming
- All names must be intention-revealing — no comments needed to explain them
- Variables: noun or noun phrase
- Functions/methods: verb + noun
- Classes: noun
- No single-letter variables except loop indices (i, j, k)
- No abbreviations unless universally understood (url, id, api are ok)
- No generic names: data, info, temp, obj, val, result (without qualification)

### Object-Oriented Design (Primary Paradigm)
- Apply SOLID principles
- Each class has one reason to change (Single Responsibility)
- Open for extension, closed for modification
- Depend on abstractions (interfaces), not concretions
- Prefer composition over deep inheritance chains

### TypeScript Interface Rules
- Every public class, service, repository, controller, or handler needs an explicit interface
- Constructor injection: accept interfaces, not concrete classes
- All 4+ parameter objects use named interfaces
- Avoid `any` type

### DRY (Don't Repeat Yourself)
- No duplicated logic
- If the same code appears twice, extract to a shared utility
- Copy-pasting 3+ lines is a sign to extract a function

### Comments
- **Why, not what** — code explains what; comments explain why
- No commented-out code blocks
- No TODO/FIXME/HACK in committed code (open tickets instead)
- Self-documenting names reduce the need for comments

### Don't Reach Through Objects (Law of Demeter)
- A function should only talk to objects it holds directly
- Avoid long chains like `order.getCustomer().getAddress().getZip()` — that reaches through two other classes just to get a value
- Instead, add a helper on the object you already have: `order.getZip()` hides the digging behind one call
- **Maximum method chain depth: 2** — fluent builders and array/iterator chains are exempt
- Why it matters: long chains tie your code to the internals of classes it shouldn't know about; one rename deep in the chain breaks callers that had no reason to care

### Check Inputs Early, Never Hide Errors (Fail Fast / Defensive Programming)
- At the top of any public function, validate inputs with guard clauses before doing work
- Never swallow errors silently — empty `catch {}` blocks and `except: pass` statements are forbidden
- If a `catch`/`except` runs, it must log, rethrow, translate to a typed error, or otherwise surface the failure
- Use assertions for invariants that should always hold (not for user input)
- Why it matters: silent failures are the hardest bugs to find — they corrupt data and waste hours of debugging. Errors that fail loudly at the boundary are easy to fix.

### Only Build What You Need, Leave Code Cleaner Than You Found It (YAGNI + Boy Scout Rule)
- Do not add options, flags, or abstractions "just in case we need them later" — most of the time, you never will
- Delete unused exports, single-implementation interfaces, and dead code when you notice them
- When you edit a file for any reason, tidy up small issues along the way (bad names, stale imports, missing guards)
- Why it matters: speculative features cost real complexity today for imaginary value tomorrow. Small continuous cleanup keeps a codebase healthy without ever needing a big refactor project.

### Tests Should Be As Clean As The Code (Arrange / Act / Assert)
- Every test follows three clearly separated blocks: **Arrange** (set up data), **Act** (call the thing), **Assert** (check the result)
- Name tests after the behavior they verify: `should_reject_expired_token`, not `test1` or `testLogin`
- One idea per test — no `if`, `for`, or `while` statements inside a test body
- Do not share mutable state between tests (global fixtures modified across tests, shared in-memory DB rows, etc.)
- Why it matters: tests are code too. Messy tests pass when they shouldn't, break for the wrong reasons, and nobody understands what they were meant to prove.

## When Writing Code

1. Before adding code to an existing file, check its current line count
2. If a file is approaching 300 lines, propose splitting before adding
3. Name things so no comment is needed
4. Write the public interface first (especially TypeScript)
5. Keep functions short enough that they can be named by a single verb phrase
6. Put guard clauses at the top of public functions — validate before doing work
7. Never write empty `catch {}` or `except: pass` — make the error visible
8. When writing tests, follow Arrange / Act / Assert and name each test after the behavior

## When Reviewing Code

Flag violations as **non-blocking suggestions** appended after your response:

```
---
Clean code review:
🔴 Critical: [file] line [N] — [violation] (limit: [threshold])
🟡 Warning: [file] line [N] — [issue]
🔵 Style: [file] line [N] — [suggestion]
---
```

Do not block or refuse tasks due to violations. Always complete the requested task, then suggest improvements.

## Human Readability Rule

The ultimate test: a new contributor with basic language knowledge should understand any file in this project within 5 minutes, without asking anyone.
```
