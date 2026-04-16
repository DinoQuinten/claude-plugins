import assert from "node:assert/strict";
import { execFile } from "node:child_process";
import { mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import test from "node:test";
import path from "node:path";
import { promisify } from "node:util";

const execFileAsync = promisify(execFile);
const repoRoot = path.resolve(import.meta.dirname, "../..");
const cliPath = path.join(repoRoot, "codex-sdd/bin/cli.js");

async function runCli(args, cwd) {
  return execFileAsync(process.execPath, [cliPath, ...args], { cwd });
}

async function withTempProject(testBody) {
  const projectPath = await mkdtemp(path.join(tmpdir(), "sdd-codex-"));
  try {
    await testBody(projectPath);
  } finally {
    await rm(projectPath, { recursive: true, force: true });
  }
}

test("init writes SDD Codex templates", async () => {
  await withTempProject(async (projectPath) => {
    const { stdout } = await runCli(["init"], projectPath);

    const agents = await readFile(path.join(projectPath, "AGENTS.md"), "utf8");
    const principles = await readFile(path.join(projectPath, ".sdd-principles.md"), "utf8");

    assert.match(agents, /System and Database Design/);
    assert.match(principles, /CAP and PACELC/);
    assert.match(stdout, /sdd-codex init complete/);
    assert.match(stdout, /Wrote AGENTS.md and .sdd-principles.md/);
  });
});

test("init refuses to overwrite existing files without force", async () => {
  await withTempProject(async (projectPath) => {
    await writeFile(path.join(projectPath, "AGENTS.md"), "custom\n");

    await assert.rejects(
      runCli(["init"], projectPath),
      (error) =>
        error.code === 1 &&
        /Refusing to overwrite AGENTS\.md/.test(error.stderr),
    );

    assert.equal(await readFile(path.join(projectPath, "AGENTS.md"), "utf8"), "custom\n");
  });
});

test("init --force overwrites existing templates", async () => {
  await withTempProject(async (projectPath) => {
    await writeFile(path.join(projectPath, "AGENTS.md"), "custom\n");

    await runCli(["init", "--force"], projectPath);

    const agents = await readFile(path.join(projectPath, "AGENTS.md"), "utf8");
    assert.match(agents, /System and Database Design/);
  });
});
