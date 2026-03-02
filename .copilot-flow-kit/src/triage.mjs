import { STATUS } from './stateMachine.mjs';
import { validateBugReport } from './validators.mjs';

function hasByDesignHint(report) {
  const text = `${report?.expectedBehavior ?? ''} ${report?.actualBehavior ?? ''}`.toLowerCase();
  return text.includes('by design') || text.includes('as expected') || text.includes('config');
}

export function triageBugReport(report) {
  const validation = validateBugReport(report);
  if (!validation.valid) {
    return {
      status: STATUS.NEEDS_HUMAN_TRIAGE,
      reason: 'Insufficient required evidence',
      errors: validation.errors
    };
  }

  if (hasByDesignHint(report)) {
    return {
      status: STATUS.NOT_A_BUG,
      reason: 'Behavior appears to match design/configuration',
      errors: []
    };
  }

  return {
    status: STATUS.BUG_CONFIRMED,
    reason: 'Required evidence exists and behavior differs from expected',
    errors: []
  };
}
