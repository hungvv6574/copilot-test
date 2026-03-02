import fs from 'node:fs';

function isNonEmptyString(value, min = 1) {
  return typeof value === 'string' && value.trim().length >= min;
}

export function validateBugReport(report) {
  const errors = [];
  const businessTypes = new Set(['HS', 'SK', 'NV', 'ZL']);

  if (!isNonEmptyString(report?.title, 8)) {
    errors.push('title must be at least 8 characters');
  }

  if (!businessTypes.has(report?.businessType)) {
    errors.push('businessType must be one of HS/SK/NV/ZL');
  }

  if (!isNonEmptyString(report?.environment, 3)) {
    errors.push('environment is required');
  }

  if (!Array.isArray(report?.reproSteps) || report.reproSteps.length < 2) {
    errors.push('reproSteps must have at least 2 steps');
  }

  if (!isNonEmptyString(report?.expectedBehavior, 8)) {
    errors.push('expectedBehavior is required');
  }

  if (!isNonEmptyString(report?.actualBehavior, 8)) {
    errors.push('actualBehavior is required');
  }

  if (!Array.isArray(report?.evidence) || report.evidence.length < 1) {
    errors.push('evidence must contain at least one item');
  }

  return {
    valid: errors.length === 0,
    errors
  };
}

export function loadJson(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  return JSON.parse(content);
}
