/**
 * Shared Types for Agent System
 * 
 * All interfaces used across the 3-phase agent system
 * (Investigate, Fix, Test phases)
 * 
 * Location: .github/skills/shared/types.ts
 * Implementation: src/agent-skills/shared/types.ts
 */

// ============================================================================
// INVESTIGATION PHASE TYPES
// ============================================================================

/**
 * A finding is an identified issue discovered during investigation
 * Each finding includes severity, location, and actionable suggestion
 */
export interface Finding {
  // Identification
  id: string                           // Unique ID (inv-001-001)
  type: 'error' | 'warning' | 'info'  // Issue type
  severity: 'critical' | 'high' | 'medium' | 'low'
  
  // Classification
  category: string                     // Type of issue (type-error, performance, etc)
  subcategory?: string                 // Optional: more specific category
  
  // Location
  filePath: string                     // File path: src/components/Form.vue
  lineNumber: number                   // Line number (1-based)
  column?: number                      // Optional: column number
  
  // Content
  title: string                        // Brief title of the issue
  description: string                  // Detailed explanation
  suggestion: string                   // How to fix it
  evidence?: string                    // Optional: code snippet or evidence
  
  // Metadata
  fixable: boolean                     // Can Fix Agent auto-fix this?
  priority: number                     // 1-10 (10 = highest)
  affectedComponent?: string           // Optional: component name
  
  // Timestamps
  detectedAt: Date
  detectedBy: string                   // Which skill found this
}

/**
 * Investigation results from Phase 1
 */
export interface InvestigationResult {
  phase: 'investigate'
  timestamp: Date
  duration: number                     // milliseconds
  
  scope: string                        // Files scanned: src/**/*.vue
  findings: Finding[]
  
  summary: {
    total: number
    critical: number
    high: number
    medium: number
    low: number
    fixable: number                    // How many can be auto-fixed
    notFixable: number                 // How many need human review
  }
  
  configuration: InvestigateConfig
}

export interface InvestigateConfig {
  scope: string                        // Glob pattern
  scanDepth: 'shallow' | 'deep'       // Analysis depth
  severityThreshold: 'critical' | 'high' | 'medium' | 'low'
  skipCategories?: string[]            // Categories to skip
  autoAnalyze: boolean                 // Run all skills
  parallel: boolean                    // Run skills in parallel
}

// ============================================================================
// FIXING PHASE TYPES
// ============================================================================

/**
 * A fix is an applied repair to code
 * Includes before/after, status, and validation
 */
export interface Fix {
  // Identification
  id: string                           // Unique ID (fix-001-001)
  findingId: string                    // Which finding this fixes
  
  // Severity & Type
  severity: 'critical' | 'high' | 'medium' | 'low'
  type: 'type-fix' | 'refactor' | 'format' | 'dependency' | 'conflict'
  
  // Location
  filePath: string
  lineNumber: number
  column?: number
  
  // Change Details
  changeType: 'add' | 'remove' | 'modify' | 'replace'
  original: string                     // Before code
  updated: string                      // After code
  description: string                  // What changed and why
  
  // Status & Validation
  status: 'pending' | 'applied' | 'failed' | 'reverted'
  error?: string                       // If failed
  
  // Metadata
  validator: string                    // Which skill fixed it
  timestamp: Date
  riskLevel: 'low' | 'medium' | 'high'
  requiresApproval: boolean            // Needs manual approval
  
  // Backup
  backupId?: string                    // Reference to backup
}

/**
 * Fixing results from Phase 2
 */
export interface FixResult {
  phase: 'fix'
  timestamp: Date
  duration: number                     // milliseconds
  
  findings: Finding[]                  // Original findings
  fixes: Fix[]                          // Applied fixes
  
  summary: {
    totalAttempted: number
    successful: number
    failed: number
    typesFixed: number
    refactored: number
    formatted: number
    requiresApproval: number
  }
  
  configuration: FixConfig
  backupLocation?: string              // Where backups are stored
}

export interface FixConfig {
  autoFix: boolean                     // Run auto-fixes
  requiresApproval: string[]           // ['critical', 'high']
  maxFixAttempts: number               // 3
  rollbackOnError: boolean
  validateAfterEach: boolean
  backupDir: string
}

// ============================================================================
// TESTING PHASE TYPES
// ============================================================================

/**
 * A test result is validation that fixes work
 */
export interface TestResult {
  // Identification
  id: string                           // Unique ID (test-001-001)
  timestamp: Date
  
  // Test Details
  testType: 'unit' | 'regression' | 'manual' | 'type-check' | 'coverage'
  testName: string                     // Name of the test
  
  // Status
  status: 'pass' | 'fail' | 'skipped' | 'pending'
  duration: number                     // milliseconds
  
  // Error Info (if failed)
  error?: {
    type: string
    message: string
    stack: string
  }
  
  // Test-Specific Data
  details: Record<string, unknown>     // Test framework specific
  affectedFixes: string[]              // Which fixes tested
  
  // Metadata
  validator: string                    // Which skill ran this
  riskLevel: 'none' | 'low' | 'medium' | 'high'
}

/**
 * Testing results from Phase 3
 */
export interface TestingResult {
  phase: 'test'
  timestamp: Date
  duration: number                     // milliseconds
  
  fixes: Fix[]                          // Fixes being validated
  testResults: TestResult[]
  
  summary: {
    typeCheckPassed: boolean
    unitTestsPassed: boolean
    noRegressions: boolean
    coverage: number                    // Percentage
    
    totalTests: number
    passed: number
    failed: number
    skipped: number
  }
  
  configuration: TestConfig
  recommendations: string[]             // Suggested next steps
}

export interface TestConfig {
  autoTest: boolean
  testTimeout: number                  // 60000ms
  typeCheckRequired: boolean
  unitTestRequired: boolean
  regressionTestRequired: boolean
  minCoverage: number                  // 70
  failOnWarnings: boolean
  parallelTests: boolean
}

// ============================================================================
// AGENT TASK TYPES
// ============================================================================

/**
 * An agent task is a unit of work for an agent
 */
export interface AgentTask {
  id: string                           // Unique ID
  type: 'investigate' | 'fix' | 'test'  // Task type
  
  // Definition
  name: string
  description: string
  scope?: string                       // What to work on
  
  // Status
  status: 'pending' | 'running' | 'completed' | 'failed'
  startedAt?: Date
  completedAt?: Date
  
  // Configuration
  config: InvestigateConfig | FixConfig | TestConfig
  
  // Metadata
  priority: number
  dependencies: string[]                // Other task IDs this depends on
}

/**
 * Agent session tracks a complete run
 */
export interface AgentSession {
  id: string                           // Unique session ID
  createdAt: Date
  
  // Tasks
  tasks: AgentTask[]
  currentTaskId?: string
  
  // Results
  investigationResult?: InvestigationResult
  fixResult?: FixResult
  testResult?: TestingResult
  
  // State
  status: 'pending' | 'in-progress' | 'completed' | 'failed'
  errorMessage?: string
  
  // Configuration
  config: AgentConfig
}

export interface AgentConfig {
  phases: ('investigate' | 'fix' | 'test')[]
  scope: string
  autoApprove: boolean                 // Auto-approve fixes
  dryRun: boolean                      // Preview mode
  verbose: boolean                     // Detailed logging
}

// ============================================================================
// REPORT TYPES
// ============================================================================

/**
 * Agent report is the final comprehensive output
 */
export interface AgentReport {
  // Identification
  id: string
  sessionId: string
  createdAt: Date
  
  // Results
  investigationResult?: InvestigationResult
  fixResult?: FixResult
  testResult?: TestingResult
  
  // Summary
  summary: {
    issuesFound: number
    issuesFixed: number
    issuesTestValidated: boolean
    
    typeErrorsFixed: number
    qualityIssuesFixed: number
    otherIssuesFixed: number
    
    timeInvestigate: number
    timeFix: number
    timeTest: number
    totalTime: number
  }
  
  // Recommendations
  recommendations: {
    priority: 'high' | 'medium' | 'low'
    title: string
    description: string
    action: string
  }[]
  
  // Quality Metrics
  metrics: {
    typeCheckPass: boolean
    unitTestPass: boolean
    coveragePercent: number
    regressionDetected: boolean
  }
  
  // Approval Status
  approved: boolean
  approvedAt?: Date
  approvedBy?: string
  
  // Export
  format: 'json' | 'html' | 'markdown'
}

// ============================================================================
// CONTEXT TYPES
// ============================================================================

/**
 * Agent context holds runtime information
 */
export interface AgentContext {
  // Session
  sessionId: string
  taskId: string
  
  // User Info
  userId?: string
  workspace: string                    // Project path
  
  // Configuration
  config: AgentConfig
  
  // State
  state: Map<string, unknown>           // Dynamic state storage
  
  // Logging
  verbose: boolean
  logs: string[]
  
  // Permissions
  canModifyFiles: boolean
  canRunTests: boolean
  requiresApproval: boolean
}

// ============================================================================
// SKILL EXECUTION TYPES
// ============================================================================

/**
 * Skill input/output interface
 */
export interface SkillInput {
  files: string[]                      // Files to process
  config: Record<string, unknown>      // Skill-specific config
  context: AgentContext
}

export interface SkillOutput {
  findings?: Finding[]                 // For investigation skills
  fixes?: Fix[]                         // For fixing skills
  testResults?: TestResult[]            // For testing skills
  
  success: boolean
  duration: number
  error?: string
}

// ============================================================================
// UTILITY TYPES
// ============================================================================

/**
 * File operation for backup/restore
 */
export interface FileOperation {
  type: 'read' | 'write' | 'delete' | 'backup' | 'restore'
  path: string
  content?: string
  timestamp: Date
}

/**
 * Change record for tracking modifications
 */
export interface ChangeRecord {
  id: string
  type: 'finding' | 'fix' | 'test'
  filePath: string
  before: string
  after: string
  timestamp: Date
  metadata: Record<string, unknown>
}

/**
 * Approval record
 */
export interface ApprovalRecord {
  id: string
  itemId: string                       // Finding/Fix/Test ID
  status: 'pending' | 'approved' | 'rejected'
  requestedAt: Date
  requestedBy?: string
  approvedAt?: Date
  approvedBy?: string
  reason?: string
}
