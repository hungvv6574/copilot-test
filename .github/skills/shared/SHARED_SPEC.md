# 🔧 Shared Utilities - Detailed Specification

**Status**: Complete  
**Version**: 1.0  
**Location**: `.github/skills/shared/`  
**Implementation**: `src/agent-skills/shared/`

---

## 📋 Overview

Shared utilities provide **foundational infrastructure** for all agents and skills across the system.

**Components**:
- 📘 TypeScript Type Definitions (`types.ts`)
- 🏗️ Base Agent Class (`Agent.ts`)
- 📝 LLM Prompt Templates (`prompts/`)
- 🔑 Session Management
- 📊 Task Tracking

---

## 📘 Type Definitions (`types.ts`)

**Purpose**: Define all TypeScript interfaces used across the system

### Core Types

#### **Finding** - Discovered Issue
```typescript
interface Finding {
  id: string
  timestamp: Date
  severity: 'critical' | 'major' | 'minor'
  category: string
  title: string
  description: string
  file: string
  line: number
  column: number
  suggestion: string
  autoFixable: boolean
  fixSuggestion?: Fix
  context?: string
}
```

**Usage**: 
- Created by Investigation skills
- Consumed by Fix agent
- Displayed in reports

**Example**:
```typescript
{
  id: 'finding-001',
  severity: 'critical',
  category: 'type-error',
  title: 'Missing type annotation',
  file: 'src/App.vue',
  line: 42,
  suggestion: 'Add explicit type: const count: Ref<number> = ref(0)',
  autoFixable: true
}
```

---

#### **Fix** - Applied Repair
```typescript
interface Fix {
  id: string
  timestamp: Date
  finding: Finding
  beforeCode: string
  afterCode: string
  status: 'applied' | 'failed' | 'pending'
  successRate: number (0-100)
  riskLevel: 'none' | 'low' | 'medium' | 'high'
  sideEffects: string[]
  appliedBy: string
  appliedAt?: Date
  rollbackable: boolean
}
```

**Usage**:
- Created by Fix skills
- Consumed by Test agent
- Tracked in session

**Example**:
```typescript
{
  id: 'fix-001',
  status: 'applied',
  riskLevel: 'low',
  successRate: 95,
  beforeCode: 'const count = ref(0)',
  afterCode: 'const count = ref<number>(0)',
  appliedBy: 'TypeFixSkill'
}
```

---

#### **TestResult** - Validation Result
```typescript
interface TestResult {
  id: string
  timestamp: Date
  testType: string
  testName: string
  status: 'pass' | 'fail' | 'skip'
  duration: number (ms)
  details: Record<string, any>
  validator: string
  riskLevel: 'none' | 'low' | 'medium'
}
```

**Usage**:
- Created by Test skills
- Consumed by Test agent
- Included in reports

**Example**:
```typescript
{
  id: 'test-001',
  testType: 'type-check',
  status: 'pass',
  duration: 1250,
  validator: 'TypeCheckSkill'
}
```

---

#### **Phase Results**
```typescript
interface InvestigationResult {
  phase: 'investigate'
  timestamp: Date
  duration: number
  findings: Finding[]
  summary: { critical: number; major: number; minor: number }
  configuration: any
  recommendations: string[]
}

interface FixResult {
  phase: 'fix'
  timestamp: Date
  duration: number
  findings: Finding[]
  fixes: Fix[]
  summary: { applied: number; failed: number; totalSuccess: number }
  configuration: any
  recommendations: string[]
}

interface TestingResult {
  phase: 'test'
  timestamp: Date
  duration: number
  fixes: Fix[]
  testResults: TestResult[]
  summary: { typeCheckPassed: boolean; unitTestsPassed: boolean; noRegressions: boolean }
  configuration: any
  recommendations: string[]
}
```

---

#### **AgentReport** - Complete Report
```typescript
interface AgentReport {
  timestamp: Date
  totalDuration: number
  phases: {
    investigation: InvestigationResult | null
    fix: FixResult | null
    testing: TestingResult | null
  }
  summary: {
    issuesFound: number
    issuesFixed: number
    issuesRemaining: number
    allTestsPassed: boolean
  }
  recommendations: string[]
  nextSteps: string[]
}
```

---

### Configuration Types

#### **InvestigateConfig**
```typescript
interface InvestigateConfig {
  typeCheckRequired: boolean
  codeQualityRequired: boolean
  performanceAnalysisRequired: boolean
  accessibilityRequired: boolean
  offlineCompatibilityRequired: boolean
  logAnalysisRequired: boolean
  parallelExecution: boolean
  saveBackup: boolean
  severityThreshold: 'critical' | 'major' | 'minor'
  reportFormat: 'json' | 'html' | 'markdown'
}
```

#### **FixConfig**
```typescript
interface FixConfig {
  typeFixEnabled: boolean
  codeRefactorEnabled: boolean
  dependencyFixEnabled: boolean
  formattingFixEnabled: boolean
  conflictResolutionEnabled: boolean
  parallelExecution: boolean
  createBackup: boolean
  rollbackOnFailure: boolean
  approvalRequired: boolean
  dryRun: boolean
  autoApply: boolean
}
```

#### **TestConfig**
```typescript
interface TestConfig {
  typeCheckRequired: boolean
  unitTestRequired: boolean
  regressionTestRequired: boolean
  generateManualTests: boolean
  analyzeCoverage: boolean
  parallelTests: boolean
  failOnWarning: boolean
  minCoverage: number (0-100)
  testTimeout: number (ms)
}
```

---

## 🏗️ Base Agent Class (`Agent.ts`)

**Purpose**: Provide common functionality for all agents

### Key Features

#### **Session Management**
```typescript
abstract class Agent {
  // Initialize session
  protected initSession(sessionId: string, config: any): void
  
  // Get current session
  protected getSession(): Session | null
  
  // Create task in session
  protected createTask(taskId: string, description: string): void
  
  // Update task status
  protected updateTaskStatus(taskId: string, status: string): void
}
```

#### **Logging**
```typescript
protected log(level: 'info' | 'warn' | 'error', message: string): void
protected getLogs(): string[]
protected clearLogs(): void
```

#### **Timing**
```typescript
protected startTimer(label: string): void
protected getElapsedTime(label: string): number
```

#### **Session Status**
```typescript
protected getSessionStatus(): {
  sessionId: string
  startTime: Date
  tasks: Task[]
  logs: string[]
  elapsedTime: number
}
```

### Usage Example

```typescript
class MyAgent extends Agent {
  async run(input: any): Promise<any> {
    const sessionId = 'session-001'
    this.initSession(sessionId, {})
    
    this.startTimer('execution')
    this.createTask('task-1', 'Doing something')
    
    try {
      // Do work
      this.updateTaskStatus('task-1', 'completed')
      this.log('info', 'Task completed')
    } catch (error) {
      this.updateTaskStatus('task-1', 'failed')
      this.log('error', error.message)
    }
    
    return this.getSessionStatus()
  }
}
```

---

## 📝 Shared Patterns

### **Skill Pattern**

All skills follow this pattern:

```typescript
abstract class Skill extends Agent {
  abstract async execute(input: any): Promise<any>
  
  protected validateInput(input: any): boolean
  protected formatOutput(result: any): any
}
```

### **Finding Creation Pattern**

```typescript
protected createFinding(
  severity: string,
  category: string,
  title: string,
  file: string,
  line: number,
  suggestion: string,
  autoFixable: boolean = false
): Finding {
  return {
    id: generateId(),
    timestamp: new Date(),
    severity,
    category,
    title,
    file,
    line,
    column: 0,
    suggestion,
    autoFixable
  }
}
```

### **Error Handling Pattern**

```typescript
try {
  // Execute skill
  const result = await someOperation()
  this.log('info', `Success: ${result}`)
  return result
} catch (error) {
  this.log('error', `Failed: ${error.message}`)
  return {
    status: 'failed',
    error: error.message,
    recovery: 'fallback_value'
  }
}
```

---

## 📊 Session Structure

Every agent has a session that tracks:

```typescript
interface Session {
  sessionId: string
  createdAt: Date
  startTime: Date
  
  tasks: {
    id: string
    description: string
    status: 'pending' | 'in-progress' | 'completed' | 'failed'
    createdAt: Date
    completedAt?: Date
  }[]
  
  logs: string[]
  
  timers: {
    label: string
    startTime: number
    duration?: number
  }[]
}
```

---

## 🎯 Best Practices

### **Type Safety**
✅ Always specify types explicitly  
✅ Use interfaces for complex objects  
✅ Avoid implicit `any`  
✅ Validate input types  

### **Session Management**
✅ Initialize session at agent start  
✅ Create tasks for tracking work  
✅ Update task status regularly  
✅ Log important events  

### **Error Handling**
✅ Catch all errors  
✅ Log errors with context  
✅ Return meaningful error messages  
✅ Provide recovery suggestions  

### **Finding Creation**
✅ Always include severity  
✅ Provide clear suggestions  
✅ Indicate if auto-fixable  
✅ Include code context  

### **Fix Safety**
✅ Create backups before fixes  
✅ Track rollback capability  
✅ Indicate risk level  
✅ Log all changes  

---

## 📁 Shared Directory Structure

```
src/agent-skills/shared/
├── types.ts              (All interfaces)
├── Agent.ts              (Base class)
└── prompts/              (LLM prompts)
    ├── investigate/
    │   ├── typecheck.prompt.ts
    │   ├── codequality.prompt.ts
    │   ├── performance.prompt.ts
    │   ├── accessibility.prompt.ts
    │   ├── offline.prompt.ts
    │   └── loganalysis.prompt.ts
    ├── fix/
    │   ├── typefix.prompt.ts
    │   ├── refactor.prompt.ts
    │   ├── dependency.prompt.ts
    │   ├── formatting.prompt.ts
    │   └── conflict.prompt.ts
    ├── test/
    │   ├── typecheck.prompt.ts
    │   ├── unittest.prompt.ts
    │   ├── regression.prompt.ts
    │   ├── manual.prompt.ts
    │   └── coverage.prompt.ts
    └── system/
        └── orchestrator.prompt.ts
```

---

## 🔗 Integration Points

**Used By**:
- ✅ All 16 skills
- ✅ All 3 agents
- ✅ MasterOrchestrator
- ✅ Prompt templates

**Depends On**:
- ❌ No external dependencies
- ✅ Vanilla TypeScript only
- ✅ Offline-first design

---

## 📈 Performance Characteristics

| Operation | Duration | Notes |
|-----------|----------|-------|
| Session Init | <1ms | Very fast |
| Task Create | <1ms | Negligible |
| Task Update | <1ms | Negligible |
| Log Write | <1ms | Very fast |
| Timer Start | <1ms | Negligible |
| Type Check | ~1ms | With strict mode |

**Total Overhead**: <5ms per agent run (negligible)

---

## 🔐 Safety Features

✅ **Type Safety**: Full TypeScript strict mode  
✅ **Session Tracking**: Complete audit trail  
✅ **Error Logging**: All failures captured  
✅ **Rollback Support**: Track rollbackable changes  
✅ **Risk Assessment**: Track risk levels  

---

## 💡 Examples

### **Creating a Custom Skill**

```typescript
import { Skill } from '../shared/Agent'
import type { Finding } from '../shared/types'

export class MyCustomSkill extends Skill {
  async execute(input: any): Promise<Finding[]> {
    this.createTask('custom-1', 'Running custom analysis')
    this.startTimer('custom')
    
    try {
      const findings: Finding[] = []
      
      // Analyze code
      for (const file of input.files) {
        if (/* condition */) {
          findings.push(
            this.createFinding(
              'major',
              'custom-category',
              'Issue found',
              file,
              10,
              'Fix it this way',
              true
            )
          )
        }
      }
      
      this.updateTaskStatus('custom-1', 'completed')
      this.log('info', `Found ${findings.length} issues`)
      
      return findings
    } catch (error) {
      this.updateTaskStatus('custom-1', 'failed')
      this.log('error', error.message)
      return []
    }
  }
}
```

### **Using Session Info**

```typescript
const agent = new MyAgent()
const result = await agent.run(input)

// Get session details
const status = agent.getSessionStatus()
console.log(`Session: ${status.sessionId}`)
console.log(`Tasks: ${status.tasks.length}`)
console.log(`Elapsed: ${status.elapsedTime}ms`)
console.log(`Logs: ${status.logs.length}`)
```

---

## 🔗 Related Documents

- **[Investigation Skills](../investigate/INVESTIGATE_SPEC.md)** - Skill implementation examples
- **[Fixing Skills](../fix/FIX_SPEC.md)** - Fix pattern examples
- **[Testing Skills](../test/TEST_SPEC.md)** - Test pattern examples
- **[Agent System Overview](../../agents/task-analysis.agent.md)** - High-level architecture

