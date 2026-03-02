#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';

function cleanText(text = '') {
  return String(text)
    .replace(/<!--([\s\S]*?)-->/g, '')
    .replace(/\r/g, '')
    .trim();
}

function extractSection(body, sectionName) {
  const normalized = cleanText(body);
  const escaped = sectionName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const re = new RegExp(`\\*\\*${escaped}\\*\\*:\\s*([\\s\\S]*?)(?=\\n\\s*\\*\\*[^*]+\\*\\*:\\s*|\\n---|\\n#|\\n<details>|$)`, 'i');
  const match = normalized.match(re);
  return (match?.[1] ?? '').trim();
}

function extractBusinessType(text, fallback = 'HS') {
  const m = (text || '').toUpperCase().match(/\b(HS|SK|NV|ZL)\b/);
  return m?.[1] ?? fallback;
}

function toSteps(text) {
  const lines = cleanText(text)
    .split('\n')
    .map((l) => l.trim())
    .filter(Boolean)
    .filter((l) => !l.startsWith('<!--'));

  const numbered = lines
    .map((l) => l.replace(/^[-*]\s*/, '').replace(/^\d+[.)]\s*/, '').trim())
    .filter((l) => l.length > 2)
    .filter((l) => !/^(what|describe|upload|e\.g\.|service type|device|screen resolution|os version|app version)/i.test(l));

  return numbered.length > 0 ? numbered : ['Describe reproduction steps in issue body', 'Add concrete user actions'];
}

function toEvidence(text, actualBehavior = '') {
  const source = `${text}\n${actualBehavior}`;
  const lines = cleanText(source)
    .split('\n')
    .map((l) => l.trim())
    .filter(Boolean);

  const candidates = lines.filter((l) => /(http|screenshot|screen shot|video|log|console|error|exception|stack)/i.test(l));
  if (candidates.length > 0) return candidates.slice(0, 10);

  return ['No explicit evidence URL/log detected; please attach screenshot/log/video'];
}

function getEnvironment(body) {
  const normalized = cleanText(body);
  const detailLines = normalized
    .split('\n')
    .map((l) => l.trim())
    .filter((l) => /^-\s*\*\*(Service Type|Device|Screen Resolution|OS Version|App Version)\*\*:/.test(l));

  return detailLines.length ? detailLines.join(' | ') : 'unspecified';
}

function main() {
  const eventPath = process.argv[2];
  const outputPath = process.argv[3];

  if (!eventPath || !outputPath) {
    throw new Error('Usage: node issuePayloadToReport.mjs <event-json-path> <output-json-path>');
  }

  const event = JSON.parse(fs.readFileSync(path.resolve(eventPath), 'utf8'));
  const issue = event.issue ?? {};
  const title = String(issue.title ?? 'Untitled bug report');
  const body = String(issue.body ?? '');

  const businessSection = extractSection(body, 'Business Type');
  const bugStepsSection = extractSection(body, 'Bug Steps Description with Evidence');
  const actualSection = extractSection(body, 'Actual Behavior');
  const expectedSection = extractSection(body, 'Expected Behavior');

  const report = {
    issueNumber: Number(issue.number ?? 0),
    title,
    businessType: extractBusinessType(`${businessSection}\n${title}\n${body}`),
    environment: getEnvironment(body),
    reproSteps: toSteps(bugStepsSection),
    expectedBehavior: expectedSection || 'Expected behavior was not provided clearly in issue',
    actualBehavior: actualSection || 'Actual behavior was not provided clearly in issue',
    evidence: toEvidence(bugStepsSection, actualSection),
    suspectedScope: []
  };

  fs.mkdirSync(path.dirname(path.resolve(outputPath)), { recursive: true });
  fs.writeFileSync(path.resolve(outputPath), JSON.stringify(report, null, 2), 'utf8');
  process.stdout.write(`${JSON.stringify(report, null, 2)}\n`);
}

main();
