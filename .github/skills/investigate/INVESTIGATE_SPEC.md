# 🔍 Investigation Skills - Phase 1 Detailed Specification

**Status**: Complete  
**Version**: 1.0  
**Location**: `.github/skills/investigate/`  
**Implementation**: `src/agent-skills/investigate/`

---

## 📋 Overview

The Investigate Agent uses **6 specialized skills** to scan code from different angles and identify issues.

**Total Skills**: 6  
**Parallel Execution**: ✅ Supported  
**Sequential Execution**: ✅ Supported  

---

## 🎯 Phase 1 Output

```typescript
InvestigationResult {
  phase: 'investigate'
  timestamp: Date
  duration: number (ms)
  
  scope: string
  findings: Finding[]
  
  summary: {
    total: number
    critical: number
    high: number
    medium: number
    low: number
    fixable: number
    notFixable: number
  }
  
  configuration: InvestigateConfig
}
```

---

## 🔧 The 6 Investigation Skills

### 1️⃣ **TypeCheckSkill**

**Purpose**: Find TypeScript type errors and type-related issues

**Detects**:
- ❌ Implicit `any` types
- ❌ Type assertion mismatches (`as` keyword)
- ❌ Union type incompatibilities
- ❌ Missing type annotations
- ❌ Type narrowing issues

**Example Output**:
```typescript
{
  id: 'type-001',
  severity: 'critical',
  category: 'type-error',
  filePath: 'src/services/IFSource.ts',
  lineNumber: 28,
  title: 'Implicit any type detected',
  description: 'Function parameter lacks explicit type annotation',
  suggestion: 'Add explicit type annotation to function parameters',
  fixable: true,
  priority: 9,
  detectedBy: 'TypeCheckSkill'
}
```

**Configuration**:
```typescript
{
  scope: 'src/**/*.{ts,tsx,vue}',
  scanDepth: 'deep',
  severityThreshold: 'medium'
}
```

**Metrics**:
- ⏱️ Typical Duration: 1-2 seconds
- 📊 Issues Found: ~10-50 per project
- 🔧 Fixable Rate: 95%

---

### 2️⃣ **CodeQualitySkill**

**Purpose**: Detect code quality issues, bad patterns, and anti-patterns

**Detects**:
- ❌ Unused variables/imports
- ❌ Dead code
- ❌ Complex functions (cyclomatic complexity > 5)
- ❌ Inconsistent naming conventions
- ❌ Missing error handling
- ❌ Code duplication

**Example Output**:
```typescript
{
  id: 'quality-001',
  severity: 'medium',
  category: 'code-quality',
  filePath: 'src/App.vue',
  lineNumber: 15,
  title: 'Unused variable',
  description: 'Variable "tempData" is declared but never used',
  suggestion: 'Remove unused variable or use it in the code',
  fixable: true,
  priority: 5,
  detectedBy: 'CodeQualitySkill'
}
```

**Configuration**:
```typescript
{
  scope: 'src/**/*.ts',
  maxComplexity: 5,
  checkForDuplication: true,
  checkNamingConventions: true
}
```

**Metrics**:
- ⏱️ Typical Duration: 2-3 seconds
- 📊 Issues Found: ~20-100 per project
- 🔧 Fixable Rate: 80%

---

### 3️⃣ **PerformanceAnalysisSkill**

**Purpose**: Identify performance bottlenecks and optimization opportunities

**Detects**:
- 🐢 DOM manipulation in loops
- 🐢 Missing memoization/caching
- 🐢 Inefficient algorithms
- 🐢 N+1 query problems
- 🐢 Large bundle sizes
- 🐢 Memory leaks patterns

**Example Output**:
```typescript
{
  id: 'perf-001',
  severity: 'high',
  category: 'performance',
  filePath: 'src/pages/StartPage.vue',
  lineNumber: 32,
  title: 'DOM manipulation in loop',
  description: 'DOM is being manipulated inside a loop, causing layout thrashing',
  suggestion: 'Batch DOM updates or use documentFragment',
  fixable: true,
  priority: 8,
  detectedBy: 'PerformanceAnalysisSkill'
}
```

**Configuration**:
```typescript
{
  scope: 'src/**/*.vue',
  checkDOMOperations: true,
  checkMemoization: true,
  checkBundleSize: true
}
```

**Metrics**:
- ⏱️ Typical Duration: 1-2 seconds
- 📊 Issues Found: ~5-20 per project
- 🔧 Fixable Rate: 85%

---

### 4️⃣ **AccessibilitySkill**

**Purpose**: Check WCAG accessibility compliance and A11y issues

**Detects**:
- ♿ Missing alt text on images
- ♿ Poor color contrast
- ♿ Missing ARIA labels
- ♿ Missing form labels
- ♿ Keyboard navigation issues
- ♿ Screen reader incompatibilities

**Example Output**:
```typescript
{
  id: 'a11y-001',
  severity: 'high',
  category: 'accessibility',
  filePath: 'src/components/Button.vue',
  lineNumber: 12,
  title: 'Missing alt attribute',
  description: 'Image element is missing alt text for screen readers',
  suggestion: 'Add alt attribute with meaningful description',
  fixable: true,
  priority: 8,
  detectedBy: 'AccessibilitySkill'
}
```

**Configuration**:
```typescript
{
  scope: 'src/**/*.vue',
  wcagLevel: 'AA',
  checkColorContrast: true,
  checkKeyboardNav: true
}
```

**Metrics**:
- ⏱️ Typical Duration: 1-2 seconds
- 📊 Issues Found: ~10-30 per project
- 🔧 Fixable Rate: 75%

---

### 5️⃣ **OfflineCompatibilitySkill**

**Purpose**: Verify offline support and offline-first compatibility

**Detects**:
- 🔌 External API calls without offline handling
- 🔌 Missing service worker
- 🔌 Unsupported APIs in offline mode
- 🔌 No fallback data/cache
- 🔌 Network-dependent initialization

**Example Output**:
```typescript
{
  id: 'offline-001',
  severity: 'critical',
  category: 'offline-compatibility',
  filePath: 'src/services/IFSource.ts',
  lineNumber: 42,
  title: 'External API call without offline handling',
  description: 'Network request will fail in offline mode without fallback mechanism',
  suggestion: 'Add offline detection and cache/fallback data',
  fixable: true,
  priority: 9,
  detectedBy: 'OfflineCompatibilitySkill'
}
```

**Configuration**:
```typescript
{
  scope: 'src/**/*.ts',
  checkNetworkCalls: true,
  checkCaching: true,
  checkServiceWorker: true
}
```

**Metrics**:
- ⏱️ Typical Duration: 1-2 seconds
- 📊 Issues Found: ~5-15 per project
- 🔧 Fixable Rate: 70%

---

### 6️⃣ **LogAnalysisSkill**

**Purpose**: Parse and analyze error logs to identify issues

**Analyzes**:
- 📊 Repeated error patterns
- 📊 Deprecated API warnings
- 📊 Console warnings/errors
- 📊 Stack trace patterns
- 📊 Error frequency

**Example Output**:
```typescript
{
  id: 'log-001',
  severity: 'high',
  category: 'log-analysis',
  filePath: 'src/services/IFSource.ts',
  lineNumber: 28,
  title: 'Repeated error: Cannot read property "x" of undefined',
  description: 'This error occurs 47 times in recent logs',
  suggestion: 'Add null/undefined checks before accessing properties',
  fixable: true,
  priority: 8,
  detectedBy: 'LogAnalysisSkill'
}
```

**Configuration**:
```typescript
{
  logFile: 'logs/app.log',
  minOccurrences: 5,
  analyzeStackTraces: true
}
```

**Metrics**:
- ⏱️ Typical Duration: 0.5-1 second
- 📊 Issues Found: ~3-10 per project
- 🔧 Fixable Rate: 80%

---

## 📊 Skills Execution Matrix

| Skill | Duration | Issues Found | Fixable % | Parallel |
|-------|----------|--------------|-----------|----------|
| TypeCheck | 1-2s | 10-50 | 95% | ✅ |
| CodeQuality | 2-3s | 20-100 | 80% | ✅ |
| Performance | 1-2s | 5-20 | 85% | ✅ |
| Accessibility | 1-2s | 10-30 | 75% | ✅ |
| Offline | 1-2s | 5-15 | 70% | ✅ |
| LogAnalysis | 0.5-1s | 3-10 | 80% | ✅ |
| **TOTAL** | **~7-10s** | **~53-225** | **~81%** | **✅** |

---

## 🔄 Execution Modes

### **Parallel Mode** (Recommended for Speed)
```typescript
const config: InvestigateConfig = {
  scope: 'src/**/*',
  parallel: true,
  autoAnalyze: true
}
// All 6 skills run simultaneously
// Total Duration: ~2-3 seconds
```

### **Sequential Mode** (Better for Stability)
```typescript
const config: InvestigateConfig = {
  scope: 'src/**/*',
  parallel: false,
  autoAnalyze: true
}
// Skills run one by one
// Total Duration: ~7-10 seconds
```

---

## 🎯 Severity Levels

| Level | Description | Action |
|-------|-------------|--------|
| **Critical** | Breaks functionality | Must fix before deploy |
| **High** | Significant issues | Should fix before deploy |
| **Medium** | Moderate issues | Consider fixing |
| **Low** | Minor issues | Nice to fix |

---

## 🔌 Implementation Files

Located in `src/agent-skills/investigate/`:

```
investigate/
├── InvestigateAgent.ts         (Main orchestrator)
└── skills/
    ├── TypeCheckSkill.ts       (Skill 1)
    ├── CodeQualitySkill.ts     (Skill 2)
    ├── PerformanceAnalysisSkill.ts  (Skill 3)
    ├── AccessibilitySkill.ts   (Skill 4)
    ├── OfflineCompatibilitySkill.ts (Skill 5)
    └── LogAnalysisSkill.ts     (Skill 6)
```

---

## 📈 Performance Characteristics

- **Fastest**: LogAnalysisSkill (0.5-1s)
- **Slowest**: CodeQualitySkill (2-3s)
- **Most Issues**: CodeQualitySkill (20-100)
- **Highest Fixable**: TypeCheckSkill (95%)
- **Total Time (Parallel)**: 2-3 seconds
- **Total Time (Sequential)**: 7-10 seconds

---

## ✅ Best Practices

1. **Use Parallel Mode** for speed in development
2. **Use Sequential Mode** in CI/CD for reliability
3. **Run All Skills** for comprehensive analysis
4. **Set Severity Threshold** to reduce noise
5. **Review Critical Issues** immediately
6. **Use Offline Skill** for Android WebView projects
7. **Use A11y Skill** for public/accessible applications

---

## 🔗 Related Documents

- **[Agents Overview](../agents/task-analysis.agent.md)** - Agent system overview
- **[Phase 2: Fix Skills](./fix/)** - How to fix issues
- **[Phase 3: Test Skills](./test/)** - How to validate fixes

