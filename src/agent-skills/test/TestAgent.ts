/**
 * Test Agent
 * Phase 3: Validates fixes and ensures quality
 * 
 * Skills:
 * 1. TypeCheckSkill - Verify TypeScript compilation
 * 2. UnitTestSkill - Run and validate unit tests
 * 3. RegressionTestSkill - Detect regressions
 * 4. ManualTestSkill - Generate manual test scenarios
 * 5. CoverageAnalysisSkill - Analyze test coverage
 */

import { Agent } from '../shared/Agent'
import { TestConfig, TestingResult, TestResult, Fix } from '../shared/types'

import { TypeCheckSkill } from './skills/TypeCheckSkill'
import { UnitTestSkill } from './skills/UnitTestSkill'
import { RegressionTestSkill } from './skills/RegressionTestSkill'
import { ManualTestSkill } from './skills/ManualTestSkill'
import { CoverageAnalysisSkill } from './skills/CoverageAnalysisSkill'

export class TestAgent extends Agent {
  private typeCheckSkill: TypeCheckSkill
  private unitTestSkill: UnitTestSkill
  private regressionSkill: RegressionTestSkill
  private manualTestSkill: ManualTestSkill
  private coverageSkill: CoverageAnalysisSkill

  constructor() {
    super('TestAgent')

    // Initialize all skills
    this.typeCheckSkill = new TypeCheckSkill()
    this.unitTestSkill = new UnitTestSkill()
    this.regressionSkill = new RegressionTestSkill()
    this.manualTestSkill = new ManualTestSkill()
    this.coverageSkill = new CoverageAnalysisSkill()
  }

  /**
   * Execute testing
   */
  public async execute(fixes?: Fix[], config?: TestConfig): Promise<TestingResult> {
    const parsedFixes = fixes || []
    const parsedConfig = config || {} as TestConfig
    this.startTimer()
    this.log(`Starting test validation for ${parsedFixes.length} fixes`)

    const session = this.getSession()
    session.status = 'in-progress'

    // Create test task
    const task = this.createTask('test', 'Validate Fixes', config)
    this.updateTaskStatus(task.id, 'running')

    try {
      const testResults: TestResult[] = []
      const startTime = Date.now()

      // Run all test skills
      const skillResults = await this.runAllSkills(parsedFixes, parsedConfig)

      // Aggregate results
      skillResults.forEach((results) => {
        testResults.push(...results)
      })

      const duration = Date.now() - startTime

      // Determine if tests passed
      const typeCheckPassed = testResults.find((r) => r.testType === 'type-check')?.status ===
        'pass'
      const unitTestsPassed = testResults.find((r) => r.testType === 'unit')?.status ===
        'pass'
      const noRegressions = testResults.find((r) => r.testType === 'regression')?.status ===
        'pass'

      // Get coverage
      const coverageResult = testResults.find((r) => r.testType === 'coverage')
      const coverage = coverageResult
        ? (coverageResult.details.percent as number) || 0
        : 0

      // Create result
      const result: TestingResult = {
        phase: 'test',
        timestamp: new Date(),
        duration,
        fixes: parsedFixes,
        testResults,
        summary: {
          typeCheckPassed,
          unitTestsPassed,
          noRegressions,
          coverage,
          totalTests: testResults.length,
          passed: testResults.filter((r) => r.status === 'pass').length,
          failed: testResults.filter((r) => r.status === 'fail').length,
          skipped: testResults.filter((r) => r.status === 'skipped').length,
        },
        configuration: parsedConfig,
        recommendations:
          !typeCheckPassed || !unitTestsPassed
            ? ['Fix type errors and failing tests before deploying']
            : [],
      }

      // Update session
      session.testResult = result
      session.status = 'completed'
      this.updateTaskStatus(task.id, 'completed')

      this.log(
        `Testing completed. ${result.summary.passed} passed, ${result.summary.failed} failed (Coverage: ${coverage}%)`,
        'info'
      )

      return result
    } catch (error) {
      this.log(
        `Testing failed: ${error instanceof Error ? error.message : String(error)}`,
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
   * Run all test skills
   */
  private async runAllSkills(
    fixes: Fix[],
    config: TestConfig
  ): Promise<TestResult[][]> {
    const skills = [
      { name: 'TypeCheck', skill: this.typeCheckSkill },
      { name: 'UnitTest', skill: this.unitTestSkill },
      { name: 'Regression', skill: this.regressionSkill },
      { name: 'ManualTest', skill: this.manualTestSkill },
      { name: 'Coverage', skill: this.coverageSkill },
    ]

    const results: TestResult[][] = []

    if (config.parallelTests) {
      // Run in parallel
      const promises = skills.map(({ name, skill }) =>
        this.runSkill(name, skill, fixes, config)
      )
      const skillResults = await Promise.allSettled(promises)

      skillResults.forEach((result, index) => {
        if (result.status === 'fulfilled') {
          results.push(result.value)
        } else {
          this.log(`${skills[index].name} skill failed: ${result.reason}`, 'warn')
          results.push([])
        }
      })
    } else {
      // Run sequentially
      for (const { name, skill } of skills) {
        try {
          const skillResults = await this.runSkill(name, skill, fixes, config)
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
    fixes: Fix[],
    config: TestConfig
  ): Promise<TestResult[]> {
    this.log(`Running ${name} skill...`)

    const results = await skill.test(fixes, config)

    this.log(`${name} skill completed. ${results.length} results.`)

    return results
  }

  /**
   * Get testing summary
   */
  public getSummary(): TestingResult | null {
    const session = this.getSession()
    return session.testResult || null
  }
}
