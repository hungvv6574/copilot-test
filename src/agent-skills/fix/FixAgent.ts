/**
 * Fix Agent
 * Phase 2: Auto-fixes identified issues
 * 
 * Skills:
 * 1. TypeFixSkill - Auto-fix TypeScript errors
 * 2. CodeRefactorSkill - Fix code quality issues
 * 3. DependencyFixSkill - Fix imports and dependencies
 * 4. FormattingFixSkill - Fix code style and formatting
 * 5. ConflictResolutionSkill - Handle complex edge cases
 */

import { Agent } from '../shared/Agent'
import { FixConfig, FixResult, Fix, Finding } from '../shared/types'

import { TypeFixSkill } from './skills/TypeFixSkill'
import { CodeRefactorSkill } from './skills/CodeRefactorSkill'
import { DependencyFixSkill } from './skills/DependencyFixSkill'
import { FormattingFixSkill } from './skills/FormattingFixSkill'
import { ConflictResolutionSkill } from './skills/ConflictResolutionSkill'

export class FixAgent extends Agent {
  private typeFixSkill: TypeFixSkill
  private codeRefactorSkill: CodeRefactorSkill
  private dependencyFixSkill: DependencyFixSkill
  private formattingFixSkill: FormattingFixSkill
  private conflictSkill: ConflictResolutionSkill

  constructor() {
    super('FixAgent')

    // Initialize all skills
    this.typeFixSkill = new TypeFixSkill()
    this.codeRefactorSkill = new CodeRefactorSkill()
    this.dependencyFixSkill = new DependencyFixSkill()
    this.formattingFixSkill = new FormattingFixSkill()
    this.conflictSkill = new ConflictResolutionSkill()
  }

  /**
   * Execute fixing
   */
  public async execute(findings?: Finding[], config?: FixConfig): Promise<FixResult> {
    const parsedFindings = findings || []
    const parsedConfig = config || {} as FixConfig
    this.startTimer()
    this.log(`Starting fix for ${parsedFindings.length} findings`)

    const session = this.getSession()
    session.status = 'in-progress'

    // Create fix task
    const task = this.createTask('fix', 'Auto-fix Issues', config)
    this.updateTaskStatus(task.id, 'running')

    try {
      const fixes: Fix[] = []
      const startTime = Date.now()

      // Filter findings to fix
      const fixableFindings = (parsedConfig.autoFix ?? false)
        ? parsedFindings.filter((f) => f.fixable ?? false)
        : []

      // Apply fixes by category
      const typeErrors = fixableFindings.filter((f) => f.category === 'type-error')
      const qualityIssues = fixableFindings.filter(
        (f) => f.category === 'code-quality'
      )
      const dependencyIssues = fixableFindings.filter(
        (f) => f.category === 'dependency'
      )
      const performanceIssues = fixableFindings.filter(
        (f) => f.category === 'performance'
      )

      // Run fix skills
      if (typeErrors.length > 0) {
        const typeFixes = await this.typeFixSkill.fix(typeErrors)
        fixes.push(...typeFixes)
      }

      if (qualityIssues.length > 0) {
        const qualityFixes = await this.codeRefactorSkill.fix(qualityIssues)
        fixes.push(...qualityFixes)
      }

      if (dependencyIssues.length > 0) {
        const depFixes = await this.dependencyFixSkill.fix(dependencyIssues)
        fixes.push(...depFixes)
      }

      if (performanceIssues.length > 0) {
        const perfFixes = await this.formattingFixSkill.fix(performanceIssues)
        fixes.push(...perfFixes)
      }

      // Handle conflicts
      const conflictFixes = await this.conflictSkill.resolveConflicts(fixes)
      fixes.push(...conflictFixes)

      const duration = Date.now() - startTime

      // Create result
      const result: FixResult = {
        phase: 'fix',
        timestamp: new Date(),
        duration,
        findings: parsedFindings,
        fixes,
        summary: {
          totalAttempted: fixableFindings.length,
          successful: fixes.filter((f) => f.status === 'applied').length,
          failed: fixes.filter((f) => f.status === 'failed').length,
          typesFixed: fixes.filter((f) => f.type === 'type-fix').length,
          refactored: fixes.filter((f) => f.type === 'refactor').length,
          formatted: fixes.filter((f) => f.type === 'format').length,
          requiresApproval: fixes.filter((f) => f.requiresApproval).length,
        },
        configuration: parsedConfig,
      }

      // Update session
      session.fixResult = result
      this.updateTaskStatus(task.id, 'completed')

      this.log(
        `Fix completed. Applied ${result.summary.successful} fixes (${result.summary.failed} failed)`,
        'info'
      )

      return result
    } catch (error) {
      this.log(
        `Fix failed: ${error instanceof Error ? error.message : String(error)}`,
        'error'
      )
      session.status = 'failed'
      session.errorMessage =
        error instanceof Error ? error.message : String(error)
      this.updateTaskStatus(task.id, 'failed')
      throw error
    }
  }

  /**
   * Get fix summary
   */
  public getSummary(): FixResult | null {
    const session = this.getSession()
    return session.fixResult || null
  }
}
