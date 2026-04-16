#!/usr/bin/env node

import { constants } from "node:fs";
import { access, copyFile } from "node:fs/promises";
import path from "node:path";

const packageRoot = path.resolve(import.meta.dirname, "..");
const templatesDir = path.join(packageRoot, "templates");

const templateFiles = [
  { source: "AGENTS.md", target: "AGENTS.md" },
  { source: ".sdd-principles.md", target: ".sdd-principles.md" },
];

function usage() {
  return `Usage: sdd-codex <command> [options]

Commands:
  init [--force]  Copy AGENTS.md and .sdd-principles.md into the current project
`;
}

async function exists(filePath) {
  try {
    await access(filePath, constants.F_OK);
    return true;
  } catch {
    return false;
  }
}

async function initProject({ force }) {
  const cwd = process.cwd();

  for (const file of templateFiles) {
    const targetPath = path.join(cwd, file.target);
    if (!force && await exists(targetPath)) {
      throw new Error(`Refusing to overwrite ${file.target}. Re-run with --force to replace it.`);
    }
  }

  for (const file of templateFiles) {
    await copyFile(path.join(templatesDir, file.source), path.join(cwd, file.target));
  }

  console.log("sdd-codex init complete");
  console.log("Wrote AGENTS.md and .sdd-principles.md");
}

async function main() {
  const [command, ...args] = process.argv.slice(2);

  try {
    if (command === "init") {
      await initProject({ force: args.includes("--force") });
      return;
    }

    console.log(usage());
    process.exitCode = command ? 1 : 0;
  } catch (error) {
    console.error(error.message);
    process.exitCode = 1;
  }
}

await main();
