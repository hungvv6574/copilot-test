# 🔍 Investigate Agent - Phase 1

## Overview

**Purpose**: Find errors, code quality issues, and areas for improvement  
**Phase**: 1 of 3  
**Skills**: 6 specialized investigation skills  
**Duration**: 10-15 minutes (typical codebase)  
**Output**: Findings array with severity levels and suggestions  

---

## What It Does

The Investigate Agent scans your code from **6 different angles**:

```
INPUT: Source code files
    ↓
[1] TypeCheckSkill       → Find TypeScript errors & type mismatches
[2] CodeQualitySkill     → Detect anti-patterns & bad practices
[3] PerformanceSkill     → Find rendering bottlenecks
[4] AccessibilitySkill   → Check accessibility compliance
[5] OfflineCompatitySkill → Verify offline support
[6] LogAnalysisSkill     → Parse error logs
    ↓
OUTPUT: Findings[]{id, type, severity, location, title, description, suggestion}
```

---

## 6 Investigation Skills

### 1. **TypeCheckSkill**
Finds TypeScript compilation errors and type mismatches

**Detects**:
- Missing type annotations
- Type incompatibilities
- Unused variables/parameters
- Import resolution issues
- Missing exports

**Example Finding**:
```json
{
  "severity": "high",
  "type": "error",
  "category": "type-error",
  "location": "src/pages/Form.vue:42:10",
  "title": "Type 'string | undefined' is not assignable to type 'string'",
  "suggestion": "Add default value or use optional chaining"
}
```

---

### 2. **CodeQualitySkill**
Detects anti-patterns, bad conventions, and code smells

**Detects**:
- Vue 3 composition API misuse
- Missing error handling
- Hardcoded values (should be constants)
- Inconsistent naming conventions
- Cyclic dependencies
- Code complexity issues

**Example Finding**:
```json
{
  "severity": "medium",
  "type": "warning",
  "category": "code-quality",
  "location": "src/services/UserService.ts:15",
  "title": "Hardcoded API URL should be in config",
  "suggestion": "Move to environment variables or config file"
}
```

---

### 3. **PerformanceAnalysisSkill**
Finds performance bottlenecks and optimization opportunities

**Detects**:
- Unbounded reactive data
- Missing computed properties
- Inefficient watchers
- Unnecessary re-renders
- Memory leaks
- Bundle size issues

**Example Finding**:
```json
{
  "severity": "medium",
  "type": "warning",
  "category": "performance",
  "location": "src/components/DataTable.vue:50",
  "title": "Missing computed property - will recalculate on every render",
  "suggestion": "Use computed() for derived data"
}
```

---

### 4. **AccessibilitySkill**
Checks accessibility compliance (A11y)

**Detects**:
- Missing alt text on images
- Invalid ARIA attributes
- Poor keyboard navigation
- Insufficient color contrast
- Missing form labels

**Example Finding**:
```json
{
  "severity": "high",
  "type": "error",
  "category": "accessibility",
  "location": "src/components/Button.vue:8",
  "title": "Button missing aria-label",
  "suggestion": "Add aria-label or ensure text content is visible"
}
```

---

### 5. **OfflineCompatibilitySkill**
Verifies offline functionality and support

**Detects**:
- External API calls without fallback
- Missing offline storage handling
- Uncached data
- Network availability checks
- Service worker issues
- Local storage size limits

**Example Finding**:
```json
{
  "severity": "high",
  "type": "error",
  "category": "offline",
  "location": "src/services/DataService.ts:22",
  "title": "API call without offline fallback",
  "suggestion": "Add localStorage cache or error handling for offline mode"
}
```

---

### 6. **LogAnalysisSkill**
Parses and analyzes error logs

**Detects**:
- Runtime errors from logs
- Unhandled promise rejections
- Console errors/warnings
- Error patterns
- Performance warnings
- Recurring issues

**Example Finding**:
```json
{
  "severity": "critical",
  "type": "error",
  "category": "runtime",
  "location": "src/App.vue",
  "title": "Unhandled promise rejection in component mount",
  "suggestion": "Add .catch() handler or try/catch in async initialization"
}
```

---

## Finding Structure

Every finding returned includes:

```typescript
interface Finding {
  id: string                    // Unique ID
  type: 'error' | 'warning' | 'info'
  severity: 'critical' | 'high' | 'medium' | 'low'
  category: string              // Type of issue
  location: string              // File:line:column
  title: string                 // Brief title
  description: string           // Detailed explanation
  suggestion: string            // How to fix it
  evidence?: string             // Code snippet
  fixable: boolean              // Can Fix Agent auto-fix this?
  priority: number              // 1-10 (10 = highest)
}
```

---

## Severity Levels

| Level | Meaning | Action |
|-------|---------|--------|
| **🔴 Critical** | App crashes, data loss | MUST fix immediately |
| **🟠 High** | Major functionality broken | SHOULD fix before release |
| **🟡 Medium** | Feature degradation | SHOULD fix soon |
| **🟢 Low** | Code quality issue | Nice to fix |

---

## Investigation Categories

- `type-error` - TypeScript compilation error
- `null-safety` - Potential null/undefined access
- `performance` - Performance bottleneck
- `accessibility` - A11y violation
- `offline` - Offline compatibility issue
- `vue-pattern` - Vue 3 pattern violation
- `code-quality` - Code quality issue
- `security` - Security concern
- `naming` - Naming convention violation
- `complexity` - Excessive complexity

---

## Example Investigation Report

```json
{
  "phase": "investigate",
  "timestamp": "2026-01-26T10:30:00Z",
  "duration": 4200,
  "scope": "src/**/*.vue",
  "findings": [
    {
      "id": "inv-001-001",
      "severity": "critical",
      "category": "type-error",
      "location": "src/pages/Form.vue:42",
      "title": "Missing type on password prop",
      "fixable": true,
      "priority": 10
    },
    {
      "id": "inv-001-002",
      "severity": "high",
      "category": "offline",
      "location": "src/services/API.ts:15",
      "title": "No offline fallback for API call",
      "fixable": true,
      "priority": 9
    },
    // ... more findings
  ],
  "summary": {
    "total": 42,
    "critical": 3,
    "high": 8,
    "medium": 15,
    "low": 16,
    "fixable": 35
  }
}
```

---

## Configuration

The Investigate Agent can be configured with:

```typescript
interface InvestigateConfig {
  scope: string                    // Glob pattern: 'src/**/*.vue'
  scanDepth: 'shallow' | 'deep'   // Analysis depth
  severityThreshold: 'critical' | 'high' | 'medium' | 'low'
  skipCategories?: string[]        // Skip certain checks
  autoAnalyze: boolean             // Run all skills
}
```

---

## Use Cases

### Use Case 1: Quick Type Check
```typescript
const config = {
  scope: 'src/**/*.ts',
  scanDepth: 'shallow',
  severityThreshold: 'high',  // Only critical/high
}
```

### Use Case 2: Deep Quality Analysis
```typescript
const config = {
  scope: 'src/**/*.{ts,vue}',
  scanDepth: 'deep',
  severityThreshold: 'low',   // Everything
}
```

### Use Case 3: Offline Focus
```typescript
const config = {
  scope: 'src/**/*',
  skipCategories: ['accessibility'],  // Skip A11y
}
```

---

## Performance Characteristics

| Metric | Value |
|--------|-------|
| Typical Duration | 10-15 minutes |
| Small Codebase | < 5 minutes |
| Large Codebase | 20-30 minutes |
| Accuracy | 95%+ findings valid |
| False Positives | < 5% |

---

## Success Metrics

✅ Finds 100% of TypeScript errors  
✅ Identifies 80%+ of performance issues  
✅ Catches major accessibility violations  
✅ Detects offline compatibility issues  
✅ Prioritizes by actual impact  
✅ Provides actionable suggestions  
✅ Complete in < 5 seconds (typical)  

---

## Integration

**Input**:
- TypeScript source files
- Vue components
- Error logs

**Output**:
- Findings array
- Severity levels
- Actionable suggestions

**Next Phase**:
- Results passed to Fix Agent
- Fix Agent attempts auto-fixes
- Results passed to Test Agent

---

## Related Files

- **[Fix Agent](./fix-agent.md)** - Phase 2 (repairs findings)
- **[Test Agent](./test-agent.md)** - Phase 3 (validates fixes)
- **[../skills/investigate/INVESTIGATE_SPEC.md](../skills/investigate/)** - Detailed skill specs
- **[AGENTS_INDEX.md](./AGENTS_INDEX.md)** - Back to agents overview

---

*Last Updated: January 26, 2026*  
*Phase: 1 of 3*
