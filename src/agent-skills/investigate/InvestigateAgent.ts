/**
 * Investigate Agent
 * Phase 1: Scans code from 6 different angles to find issues
 * 
 * Skills:
 * 1. TypeCheckSkill - Find TypeScript errors
 * 2. CodeQualitySkill - Detect bad patterns & anti-patterns
 * 3. PerformanceAnalysisSkill - Find bottlenecks
 * 4. AccessibilitySkill - Check A11y compliance
 * 5. OfflineCompatibilitySkill - Verify offline support
 * 6. LogAnalysisSkill - Parse and analyze error logs
 */

import { Agent } from '../shared/Agent'
import {
  InvestigateConfig,
  InvestigationResult,
  Finding,
} from '../shared/types'

import { TypeCheckSkill } from './skills/TypeCheckSkill'
import { CodeQualitySkill } from './skills/CodeQualitySkill'
import { PerformanceAnalysisSkill } from './skills/PerformanceAnalysisSkill'
import { AccessibilitySkill } from './skills/AccessibilitySkill'
import { OfflineCompatibilitySkill } from './skills/OfflineCompatibilitySkill'
import { LogAnalysisSkill } from './skills/LogAnalysisSkill'

export class InvestigateAgent extends Agent {
  private typeCheckSkill: TypeCheckSkill
  private codeQualitySkill: CodeQualitySkill
  private performanceSkill: PerformanceAnalysisSkill
  private a11ySkill: AccessibilitySkill
  private offlineSkill: OfflineCompatibilitySkill
  private logSkill: LogAnalysisSkill

  constructor() {
    super('InvestigateAgent')

    // Initialize all skills
    this.typeCheckSkill = new TypeCheckSkill()
    this.codeQualitySkill = new CodeQualitySkill()
    this.performanceSkill = new PerformanceAnalysisSkill()
    this.a11ySkill = new AccessibilitySkill()
    this.offlineSkill = new OfflineCompatibilitySkill()
    this.logSkill = new LogAnalysisSkill()
  }

  /**
   * Execute investigation
   */
  public async execute(config: InvestigateConfig): Promise<InvestigationResult> {
    this.startTimer()
    this.log(`Starting investigation with scope: ${config.scope}`)

    const session = this.getSession()
    session.status = 'in-progress'

    // Create investigation task
    const task = this.createTask('investigate', 'Full Code Investigation', config)
    this.updateTaskStatus(task.id, 'running')

    try {
      const findings: Finding[] = []
      const startTime = Date.now()

      // Run all skills
      const skillResults = await this.runAllSkills(config)

      // Aggregate findings
      skillResults.forEach((skillFindings) => {
        findings.push(...skillFindings)
      })

      // Sort by severity and priority
      findings.sort((a, b) => {
        const severityOrder = { critical: 4, high: 3, medium: 2, low: 1 }
        const severityDiff =
          severityOrder[b.severity as keyof typeof severityOrder] -
          severityOrder[a.severity as keyof typeof severityOrder]
        if (severityDiff !== 0) return severityDiff
        return b.priority - a.priority
      })

      const duration = Date.now() - startTime

      // Create result
      const result: InvestigationResult = {
        phase: 'investigate',
        timestamp: new Date(),
        duration,
        scope: config.scope,
        findings,
        summary: {
          total: findings.length,
          critical: findings.filter((f) => f.severity === 'critical').length,
          high: findings.filter((f) => f.severity === 'high').length,
          medium: findings.filter((f) => f.severity === 'medium').length,
          low: findings.filter((f) => f.severity === 'low').length,
          fixable: findings.filter((f) => f.fixable).length,
          notFixable: findings.filter((f) => !f.fixable).length,
        },
        configuration: config,
      }

      // Update session
      session.investigationResult = result
      session.status = 'completed'
      this.updateTaskStatus(task.id, 'completed')

      this.log(
        `Investigation completed. Found ${findings.length} issues (Critical: ${result.summary.critical}, High: ${result.summary.high})`,
        'info'
      )

      return result
    } catch (error) {
      this.log(`Investigation failed: ${error instanceof Error ? error.message : String(error)}`, 'error')
      session.status = 'failed'
      session.errorMessage = error instanceof Error ? error.message : String(error)
      this.updateTaskStatus(task.id, 'failed')
      throw error
    }
  }

  /**
   * Run all investigation skills
   */
  private async runAllSkills(config: InvestigateConfig): Promise<Finding[][]> {
    const skills = [
      { name: 'TypeCheck', skill: this.typeCheckSkill },
      { name: 'CodeQuality', skill: this.codeQualitySkill },
      { name: 'Performance', skill: this.performanceSkill },
      { name: 'Accessibility', skill: this.a11ySkill },
      { name: 'Offline', skill: this.offlineSkill },
      { name: 'LogAnalysis', skill: this.logSkill },
    ]

    const results: Finding[][] = []

    if (config.parallel) {
      // Run in parallel
      const promises = skills.map(({ name, skill }) =>
        this.runSkill(name, skill, config)
      )
      const skillResults = await Promise.allSettled(promises)

      skillResults.forEach((result, index) => {
        if (result.status === 'fulfilled') {
          results.push(result.value)
        } else {
          this.log(
            `${skills[index].name} skill failed: ${result.reason}`,
            'warn'
          )
          results.push([])
        }
      })
    } else {
      // Run sequentially
      for (const { name, skill } of skills) {
        try {
          const skillResults = await this.runSkill(name, skill, config)
          results.push(skillResults)
        } catch (error) {
          this.log(
            `${name} skill failed: ${error instanceof Error ? error.message : String(error)}`,
            'warn'
          )
          results.push([])
        }
      }
    }

    return results
  }

  /**
   * Run a single skill
   */
  private async runSkill(
    name: string,
    skill: any,
    config: InvestigateConfig
  ): Promise<Finding[]> {
    this.log(`Running ${name} skill...`)

    const findings = await skill.investigate(config)

    this.log(`${name} skill completed. Found ${findings.length} issues.`)

    return findings
  }

  /**
   * Get investigation summary
   */
  public getSummary(): InvestigationResult | null {
    const session = this.getSession()
    return session.investigationResult || null
  }
}
