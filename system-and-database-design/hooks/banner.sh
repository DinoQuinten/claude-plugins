#!/usr/bin/env bash
# SessionStart banner for system-and-database-design plugin.
# Emits a short notice to stderr so Claude Code picks it up as session context.
cat <<'EOF' >&2
[sdd — system-and-database-design] loaded.
  /sdd:design-system <requirement>    - produce a system design doc
  /sdd:design-database <domain>       - propose a database schema
  /sdd:review-architecture <input>    - critique against checklists + fitness functions
  /sdd:diagram <desc> --format=X      - generate Mermaid / Excalidraw / DBML
  design-principles                   - auto-triggers on CAP/ACID/sharding/consensus/etc.
Reference library: DDIA, Fundamentals of Software Architecture, Kimball.
EOF
