# system-and-database-design (`sdd`)

> **Plugin namespace:** `sdd`. Install as `sdd@dinoquinten-plugins`; all commands use the `/sdd:` prefix. The folder and long title `system-and-database-design` stay for discoverability.

A Claude Code plugin that helps you design real-world software architecture and databases. It ships with 39 curated reference chunks distilled from three canonical texts:

- **Designing Data-Intensive Applications** (Kleppmann) — data systems, consistency, replication, partitioning
- **Fundamentals of Software Architecture** (Richards & Ford) — architecture styles, characteristics, fitness functions
- **The Data Warehouse Toolkit** (Kimball) — dimensional modeling, star schemas, SCDs

…plus authored chunks covering topics the books don't (API design, observability, security, ML/AI serving, real-time systems, compliance, and more). You do not need the source books.

## What it gives you

- `/sdd:design-system <requirement>` — full design doc with components, trade-offs, capacity math
- `/sdd:design-database <domain>` — schema recommendation (SQL or NoSQL) with ER-style breakdown
- `/sdd:review-architecture <path or text>` — critique via fitness functions and checklists (scale, security, reliability, compliance, anti-patterns)
- `/sdd:diagram <desc> --format=mermaid|excalidraw|dbml` — generates diagrams in your tool of choice
- Auto-triggering `design-principles` skill — kicks in when you mention CAP, consistency, sharding, consensus, etc.

A lightweight `SessionStart` hook announces the plugin at the start of every session so you know it's available.

## Install

From Claude Code:

```
/plugin marketplace add DinoQuinten/claude-plugins
/plugin install sdd@dinoquinten-plugins
```

**That's it.** Zero setup — no dependencies, no downloads, no build step.

## Topics covered

40 topics across architecture styles, data systems, diagramming, and distributed-systems principles:

| Skill | Topics |
|---|---|
| `design-system` | arch styles, capacity, latency numbers, caching, load balancing, rate limiting, messaging, API design, resilience, observability, security, deployment, microservices patterns, real-time systems, data engineering, ML/AI serving |
| `design-database` | normalization, Kimball dimensional modeling, indexing, replication, sharding, transactions, distributed transactions, SQL vs NoSQL, schema evolution |
| `review-architecture` | fitness functions, scalability, security, reliability, compliance, anti-patterns |
| `diagram` | Mermaid, Excalidraw JSON, DBML |
| `design-principles` | CAP/PACELC, consistency models, consensus, probabilistic data structures, trade-off catalog |

## Layout

```
system-and-database-design/
├── .claude-plugin/plugin.json
├── hooks/hooks.json              # SessionStart banner
├── skills/
│   ├── design-system/            # /sdd:design-system
│   ├── design-database/          # /sdd:design-database
│   ├── review-architecture/      # /sdd:review-architecture
│   ├── diagram/                  # /sdd:diagram
│   └── design-principles/        # auto-triggered on CAP/ACID/sharding/etc.
└── README.md
```

## Author

Prasanna Anthony (handle `DinoQuinten`) — `sid8xy@gmail.com`

## License

MIT
