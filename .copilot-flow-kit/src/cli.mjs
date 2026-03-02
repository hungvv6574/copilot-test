#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import { loadJson, validateBugReport } from './validators.mjs';
import { initialState, transition } from './stateMachine.mjs';
import { triageBugReport } from './triage.mjs';

function parseArgs(argv) {
  const args = { mode: 'validate', input: '' };
  for (let i = 2; i < argv.length; i++) {
    if (argv[i] === '--mode') args.mode = argv[++i];
    else if (argv[i] === '--input') args.input = argv[++i];
  }
  return args;
}

function print(result) {
  process.stdout.write(`${JSON.stringify(result, null, 2)}\n`);
}

async function main() {
  const args = parseArgs(process.argv);
  if (!args.input) {
    throw new Error('Missing --input <path to bug report json>');
  }

  const inputPath = path.resolve(process.cwd(), args.input);
  if (!fs.existsSync(inputPath)) {
    throw new Error(`Input file not found: ${inputPath}`);
  }

  const report = loadJson(inputPath);

  if (args.mode === 'validate') {
    print(validateBugReport(report));
    return;
  }

  if (args.mode === 'triage') {
    const triage = triageBugReport(report);
    const state0 = initialState(report.issueNumber ?? 0);
    const state1 = transition(state0, triage.status, triage.reason);
    print({ triage, state: state1 });
    return;
  }

  if (args.mode === 'triage-ai') {
    let result;
    try {
      const { triageBugReportWithCopilot } = await import('./copilotTriage.mjs');
      result = await triageBugReportWithCopilot(report);
    } catch (error) {
      result = {
        triage: triageBugReport(report),
        engine: 'deterministic-fallback',
        fallbackReason: `Failed to initialize copilot SDK mode: ${error?.message ?? String(error)}`
      };
    }

    const state0 = initialState(report.issueNumber ?? 0);
    const state1 = transition(state0, result.triage.status, result.triage.reason);
    print({
      triage: result.triage,
      state: state1,
      meta: {
        engine: result.engine,
        model: result.model ?? null,
        fallbackReason: result.fallbackReason ?? null,
        setupGuide: Array.isArray(result.setupGuide) ? result.setupGuide : []
      }
    });
    return;
  }

  throw new Error(`Unsupported mode: ${args.mode}`);
}

main().catch((error) => {
  process.stderr.write(`${error?.stack ?? String(error)}\n`);
  process.exitCode = 1;
});
