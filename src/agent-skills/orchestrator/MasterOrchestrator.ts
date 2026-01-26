/**
 * Master Orchestrator
 * Coordinates all 3 agents (Investigate, Fix, Test)
 * 
 * Workflow:
 * 1. Initialize session
 * 2. Run Investigate Agent (Phase 1)
 * 3. Run Fix Agent (Phase 2) - if findings exist
 * 4. Run Test Agent (Phase 3) - if fixes exist
 * 5. Generate comprehensive report
 */

import {
  AgentSession,
  AgentConfig,
  AgentReport,
  InvestigateConfig,
  FixConfig,
  TestConfig,
} from '../shared/types'

import { InvestigateAgent } from '../investigate/InvestigateAgent'
import { FixAgent } from '../fix/FixAgent'
import { TestAgent } from '../test/TestAgent'

export class MasterOrchestrator {
  private investigateAgent: InvestigateAgent
  private fixAgent: FixAgent
  private testAgent: TestAgent
  private session: AgentSession | null = null
  private logs: string[] = []

  constructor() {
    this.investigateAgent = new InvestigateAgent()
    this.fixAgent = new FixAgent()
    this.testAgent = new TestAgent()
  }

  /**
   * Execute a complete task (all phases)
   */
  public async executeTask(config: {
    id: string
    name?: string
    scope?: string
    phases: ('investigate' | 'fix' | 'test')[]
    autoFix?: boolean
    autoTest?: boolean
    autoApprove?: boolean
    dryRun?: boolean
  }): Promise<AgentReport> {
    const startTime = Date.now()
    this.log(`Starting task: ${config.name || config.id}`)

    // Create session
    const agentConfig: AgentConfig = {
      phases: config.phases,
      scope: config.scope || 'src/**/*',
      autoApprove: config.autoApprove || false,
      dryRun: config.dryRun || false,
      verbose: false,
    }

    this.session = {
      id: `session-${Date.now()}`,
      createdAt: new Date(),
      tasks: [],
      status: 'in-progress',
      config: agentConfig,
    }

    try {
      // Phase 1: Investigation
      if (config.phases.includes('investigate')) {
        this.log('Phase 1: Starting Investigation...')

        const investigateConfig: InvestigateConfig = {
          scope: config.scope || 'src/**/*',
          scanDepth: 'deep',
          severityThreshold: 'low',
          autoAnalyze: true,
          parallel: true,
        }

        const investResult = await this.investigateAgent.execute(
          investigateConfig
        )
        this.session.investigationResult = investResult

        this.log(
          `Phase 1 Complete: Found ${investResult.findings.length} issues`,
          'info'
        )

        // Phase 2: Fixing
        if (
          config.phases.includes('fix') &&
          investResult.findings.length > 0
        ) {
          this.log('Phase 2: Starting Fixing...')

          const fixConfig: FixConfig = {
            autoFix: config.autoFix !== false,
            requiresApproval: ['critical', 'high'],
            maxFixAttempts: 3,
            rollbackOnError: true,
            validateAfterEach: true,
            backupDir: '.agent-backups',
          }

          const fixResult = await this.fixAgent.execute(
            investResult.findings,
            fixConfig
          )
          this.session.fixResult = fixResult

          this.log(
            `Phase 2 Complete: Applied ${fixResult.summary.successful} fixes`,
            'info'
          )

          // Phase 3: Testing
          if (config.phases.includes('test') && fixResult.fixes.length > 0) {
            this.log('Phase 3: Starting Testing...')

            const testConfig: TestConfig = {
              autoTest: config.autoTest !== false,
              testTimeout: 60000,
              typeCheckRequired: true,
              unitTestRequired: true,
              regressionTestRequired: true,
              minCoverage: 70,
              failOnWarnings: false,
              parallelTests: true,
            }

            const testResult = await this.testAgent.execute(
              fixResult.fixes,
              testConfig
            )
            this.session.testResult = testResult

            this.log(
              `Phase 3 Complete: ${testResult.summary.passed} tests passed`,
              'info'
            )
          }
        }
      }

      // Generate report
      const report = this.generateReport(config.id)
      this.session.status = 'completed'

      const duration = Date.now() - startTime
      this.log(`Task completed in ${(duration / 1000).toFixed(2)}s`, 'info')

      return report
    } catch (error) {
      this.log(
        `Task failed: ${error instanceof Error ? error.message : String(error)}`,
        'error'
      )
      if (this.session) {
        this.session.status = 'failed'
        this.session.errorMessage =
          error instanceof Error ? error.message : String(error)
      }
      throw error
    }
  }

  /**
   * Generate comprehensive report
   */
  private generateReport(_sessionId: string): AgentReport {
    if (!this.session) {
      throw new Error('No session found')
    }

    const report: AgentReport = {
      id: `report-${Date.now()}`,
      sessionId: this.session.id,
      createdAt: new Date(),
      investigationResult: this.session.investigationResult,
      fixResult: this.session.fixResult,
      testResult: this.session.testResult,
      summary: {
        issuesFound:
          this.session.investigationResult?.findings.length || 0,
        issuesFixed: this.session.fixResult?.fixes.length || 0,
        issuesTestValidated:
          (this.session.testResult?.summary.passed || 0) > 0,
        typeErrorsFixed:
          this.session.fixResult?.summary.typesFixed || 0,
        qualityIssuesFixed:
          this.session.fixResult?.summary.refactored || 0,
        otherIssuesFixed:
          this.session.fixResult?.summary.formatted || 0,
        timeInvestigate:
          this.session.investigationResult?.duration || 0,
        timeFix: this.session.fixResult?.duration || 0,
        timeTest: this.session.testResult?.duration || 0,
        totalTime: (
          (this.session.investigationResult?.duration || 0) +
          (this.session.fixResult?.duration || 0) +
          (this.session.testResult?.duration || 0)
        ),
      },
      recommendations: this.generateRecommendations(),
      metrics: {
        typeCheckPass:
          this.session.testResult?.summary.typeCheckPassed ?? true,
        unitTestPass:
          this.session.testResult?.summary.unitTestsPassed ?? true,
        coveragePercent:
          this.session.testResult?.summary.coverage || 0,
        regressionDetected:
          this.session.testResult?.summary.noRegressions ?? true,
      },
      approved: false,
      format: 'json',
    }

    return report
  }

  /**
   * Generate recommendations
   */
  private generateRecommendations(): AgentReport['recommendations'] {
    const recommendations: AgentReport['recommendations'] = []

    if (this.session?.investigationResult) {
      const criticalCount = this.session.investigationResult.findings.filter(
        (f) => f.severity === 'critical'
      ).length

      if (criticalCount > 0) {
        recommendations.push({
          priority: 'high',
          title: 'Critical Issues Found',
          description: `${criticalCount} critical issues were found that require immediate attention`,
          action: 'Review and fix critical issues before deployment',
        })
      }
    }

    if (
      this.session?.testResult &&
      !this.session.testResult.summary.typeCheckPassed
    ) {
      recommendations.push({
        priority: 'high',
        title: 'TypeScript Errors',
        description: 'Type checking failed, indicating potential runtime errors',
        action: 'Fix all TypeScript errors before deployment',
      })
    }

    if (
      this.session?.testResult &&
      this.session.testResult.summary.coverage <
      this.session.testResult.configuration.minCoverage
    ) {
      recommendations.push({
        priority: 'medium',
        title: 'Low Test Coverage',
        description: `Test coverage is ${this.session.testResult.summary.coverage}%, below target of ${this.session.testResult.configuration.minCoverage}%`,
        action: 'Add tests to improve code coverage',
      })
    }

    if (recommendations.length === 0) {
      recommendations.push({
        priority: 'low',
        title: 'All Checks Passed',
        description: 'No issues found. Code is ready for deployment.',
        action: 'Proceed with deployment',
      })
    }

    return recommendations
  }

  /**
   * Log message
   */
  private log(
    message: string,
    level: 'info' | 'warn' | 'error' = 'info'
  ): void {
    const timestamp = new Date().toISOString()
    const logEntry = `[${timestamp}] [Orchestrator] [${level.toUpperCase()}] ${message}`
    this.logs.push(logEntry)
    console.log(logEntry)
  }

  /**
   * Get all logs
   */
  public getLogs(): string[] {
    return [...this.logs]
  }

  /**
   * Get session
   */
  public getSession(): AgentSession | null {
    return this.session
  }
}
