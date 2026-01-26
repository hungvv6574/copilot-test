/**
 * Base Agent Class
 * Abstract class for all agents (Investigate, Fix, Test)
 * 
 * Provides common functionality:
 * - Lifecycle management
 * - Logging
 * - State management
 * - Error handling
 */

import {
  AgentTask,
  AgentSession,
  AgentConfig,
} from './types'

export abstract class Agent {
  protected name: string
  protected session: AgentSession | null = null
  protected logs: string[] = []
  protected startTime: number = 0

  constructor(name: string) {
    this.name = name
  }

  /**
   * Initialize agent session
   */
  public initSession(sessionId: string, config: AgentConfig): AgentSession {
    this.session = {
      id: sessionId,
      createdAt: new Date(),
      tasks: [],
      status: 'pending',
      config,
    }
    return this.session
  }

  /**
   * Get or create session
   */
  protected getSession(): AgentSession {
    if (!this.session) {
      this.session = {
        id: `session-${Date.now()}`,
        createdAt: new Date(),
        tasks: [],
        status: 'pending',
        config: {
          phases: [],
          scope: 'src/**/*',
          autoApprove: false,
          dryRun: false,
          verbose: false,
        },
      }
    }
    return this.session
  }

  /**
   * Create a task
   */
  protected createTask(
    type: 'investigate' | 'fix' | 'test',
    name: string,
    config: any
  ): AgentTask {
    const task: AgentTask = {
      id: `${type}-${Date.now()}`,
      type,
      name,
      description: `${this.name}: ${name}`,
      status: 'pending',
      config,
      priority: 1,
      dependencies: [],
    }

    const session = this.getSession()
    session.tasks.push(task)
    return task
  }

  /**
   * Update task status
   */
  protected updateTaskStatus(
    taskId: string,
    status: 'pending' | 'running' | 'completed' | 'failed'
  ): void {
    const session = this.getSession()
    const task = session.tasks.find((t) => t.id === taskId)
    if (task) {
      task.status = status
      if (status === 'running') {
        task.startedAt = new Date()
      } else if (status === 'completed' || status === 'failed') {
        task.completedAt = new Date()
      }
    }
  }

  /**
   * Log message
   */
  protected log(message: string, level: 'info' | 'warn' | 'error' = 'info'): void {
    const timestamp = new Date().toISOString()
    const logEntry = `[${timestamp}] [${this.name}] [${level.toUpperCase()}] ${message}`
    this.logs.push(logEntry)

    if (this.session?.config.verbose) {
      console.log(logEntry)
    }
  }

  /**
   * Get all logs
   */
  public getLogs(): string[] {
    return [...this.logs]
  }

  /**
   * Clear logs
   */
  public clearLogs(): void {
    this.logs = []
  }

  /**
   * Start timer
   */
  protected startTimer(): void {
    this.startTime = Date.now()
  }

  /**
   * Get elapsed time
   */
  protected getElapsedTime(): number {
    return Date.now() - this.startTime
  }

  /**
   * Get session status
   */
  public getSessionStatus(): {
    sessionId: string
    status: string
    duration: number
    tasksCompleted: number
    logs: number
  } {
    const session = this.getSession()
    return {
      sessionId: session.id,
      status: session.status,
      duration: this.getElapsedTime(),
      tasksCompleted: session.tasks.filter((t) => t.status === 'completed').length,
      logs: this.logs.length,
    }
  }

  /**
   * Abstract execute method - must be implemented by subclasses
   */
  abstract execute(config: any): Promise<any>
}
