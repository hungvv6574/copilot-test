export const STAGES = Object.freeze({
  ANALYZE: 'ANALYZE',
  IMPLEMENT: 'IMPLEMENT',
  TEST: 'TEST',
  PR: 'PR',
  REVIEW: 'REVIEW',
  CLOSED: 'CLOSED'
});

export const STATUS = Object.freeze({
  NOT_A_BUG: 'NOT_A_BUG',
  BUG_CONFIRMED: 'BUG_CONFIRMED',
  NEEDS_HUMAN_TRIAGE: 'NEEDS_HUMAN_TRIAGE',
  RCA_DONE: 'RCA_DONE',
  IMPLEMENT_DONE: 'IMPLEMENT_DONE',
  TEST_PASS: 'TEST_PASS',
  PR_OPENED: 'PR_OPENED',
  REVIEW_PASS: 'REVIEW_PASS'
});

const transitions = {
  [STATUS.NOT_A_BUG]: { stage: STAGES.CLOSED },
  [STATUS.NEEDS_HUMAN_TRIAGE]: { stage: STAGES.ANALYZE },
  [STATUS.BUG_CONFIRMED]: { stage: STAGES.IMPLEMENT },
  [STATUS.RCA_DONE]: { stage: STAGES.IMPLEMENT },
  [STATUS.IMPLEMENT_DONE]: { stage: STAGES.TEST },
  [STATUS.TEST_PASS]: { stage: STAGES.PR },
  [STATUS.PR_OPENED]: { stage: STAGES.REVIEW },
  [STATUS.REVIEW_PASS]: { stage: STAGES.CLOSED }
};

export function initialState(issueNumber = 0) {
  return {
    issueNumber,
    stage: STAGES.ANALYZE,
    status: STATUS.NEEDS_HUMAN_TRIAGE,
    history: []
  };
}

export function transition(currentState, nextStatus, note = '') {
  const target = transitions[nextStatus];
  if (!target) {
    throw new Error(`Unsupported status transition: ${nextStatus}`);
  }

  const nextState = {
    ...currentState,
    stage: target.stage,
    status: nextStatus,
    history: [
      ...(currentState.history ?? []),
      {
        timestamp: new Date().toISOString(),
        status: nextStatus,
        note
      }
    ]
  };

  return nextState;
}
