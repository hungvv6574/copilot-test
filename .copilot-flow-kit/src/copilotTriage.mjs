import { CopilotClient } from '@github/copilot-sdk';
import { STATUS } from './stateMachine.mjs';
import { triageBugReport } from './triage.mjs';

const ALLOWED_TRIAGE_STATUS = new Set([
  STATUS.NOT_A_BUG,
  STATUS.BUG_CONFIRMED,
  STATUS.NEEDS_HUMAN_TRIAGE
]);
const DEFAULT_TRIAGE_MODEL = 'gpt-4.1';

const TOKEN_ENV_KEYS = ['COPILOT_GITHUB_TOKEN', 'GH_TOKEN', 'GITHUB_TOKEN'];

function hasAnyTokenEnv() {
  return TOKEN_ENV_KEYS.some((key) => {
    const value = process.env[key];
    return typeof value === 'string' && value.trim().length > 0;
  });
}

function buildTokenSetupGuide() {
  return [
    'Repository Settings -> Secrets and variables -> Actions',
    'Create secret named COPILOT_GITHUB_TOKEN',
    'Use a valid GitHub token value with Copilot access',
    'Optional: set COPILOT_TRIAGE_MODEL to override default model (gpt-4.1)',
    'Re-run workflow bug-triage-ai-advisory.yml'
  ];
}

function resolveTriageModel() {
  const model = process.env.COPILOT_TRIAGE_MODEL;
  if (typeof model === 'string' && model.trim().length > 0) {
    return model.trim();
  }
  return DEFAULT_TRIAGE_MODEL;
}

function buildPrompt(report) {
  return [
    'You are a software bug triage assistant for a restaurant ordering system.',
    'Classify the bug report into exactly one status:',
    '- NOT_A_BUG',
    '- BUG_CONFIRMED',
    '- NEEDS_HUMAN_TRIAGE',
    '',
    'Return JSON ONLY in this exact format:',
    '{"status":"NOT_A_BUG|BUG_CONFIRMED|NEEDS_HUMAN_TRIAGE","reason":"short reason"}',
    '',
    'Bug report JSON:',
    JSON.stringify(report)
  ].join('\n');
}

function parseAssistantJson(text) {
  const raw = String(text ?? '').trim();
  if (!raw) {
    throw new Error('Empty response from Copilot SDK');
  }

  try {
    return JSON.parse(raw);
  } catch {
    const match = raw.match(/\{[\s\S]*\}/);
    if (!match) {
      throw new Error('Copilot response is not valid JSON');
    }
    return JSON.parse(match[0]);
  }
}

function normalizeTriage(raw) {
  const status = String(raw?.status ?? '').trim().toUpperCase();
  const reason = String(raw?.reason ?? '').trim();

  if (!ALLOWED_TRIAGE_STATUS.has(status)) {
    throw new Error(`Invalid triage status from Copilot: ${status}`);
  }

  return {
    status,
    reason: reason || 'Triage reason was not provided by Copilot',
    errors: []
  };
}

export async function triageBugReportWithCopilot(report) {
  const client = new CopilotClient();
  const inGitHubActions = process.env.GITHUB_ACTIONS === 'true';
  const tokenMissingInCi = inGitHubActions && !hasAnyTokenEnv();
  const model = resolveTriageModel();

  try {
    const session = await client.createSession({
      model,
      systemMessage: {
        content: 'Be strict, return JSON only, do not use markdown fences.'
      }
    });

    const response = await session.sendAndWait({ prompt: buildPrompt(report) });
    const raw = response?.data?.content ?? '';
    const triage = normalizeTriage(parseAssistantJson(raw));

    return {
      triage,
      engine: 'copilot-sdk',
      model
    };
  } catch (error) {
    const fallback = triageBugReport(report);
    const fallbackReason = tokenMissingInCi
      ? 'Missing COPILOT_GITHUB_TOKEN (or GH_TOKEN/GITHUB_TOKEN) in CI environment'
      : (error?.message ?? String(error));

    return {
      triage: fallback,
      engine: 'deterministic-fallback',
      model,
      fallbackReason,
      setupGuide: tokenMissingInCi ? buildTokenSetupGuide() : []
    };
  } finally {
    await client.stop();
  }
}
