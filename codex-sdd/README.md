# sdd-codex

Codex CLI installer for system and database design guidance from the `system-and-database-design` Claude Code plugin.

## Install

Run this in any project where Codex CLI should use the design-principles guidance:

```bash
npx sdd-codex init
```

This writes:

- `AGENTS.md`
- `.sdd-principles.md`

`init` refuses to overwrite existing files. Use `--force` when you intentionally want to replace them:

```bash
npx sdd-codex init --force
```

## What It Includes

Version 0.1.0 keeps the Codex surface intentionally small:

- CAP and PACELC decision guidance
- consistency models
- consensus and quorum guidance
- idempotency and delivery semantics
- probabilistic sketches such as Bloom filters, HyperLogLog, Count-Min sketches, and Merkle trees
- lightweight Codex behavior mappings for system design, database design, architecture review, and diagrams

The Claude Code plugin has deeper slash-command skills and a larger reference pack. This package installs a compact Codex session guide and a reference file your PRs and design docs can link to.

## Commands

```bash
npx sdd-codex init
npx sdd-codex init --force
```

## Publishing

Before publishing, regenerate templates from the Claude plugin source of truth:

```bash
node codex-sdd/scripts/sync-rules.js
npm publish
```

Do not publish from this repository until the package changes have been reviewed.
