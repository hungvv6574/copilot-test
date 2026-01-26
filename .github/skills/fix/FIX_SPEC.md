# 🔧 Fixing Skills - Phase 2 Detailed Specification

**Status**: Complete  
**Version**: 1.0  
**Location**: `.github/skills/fix/`  
**Implementation**: `src/agent-skills/fix/`

---

## 📋 Overview

The Fix Agent uses **5 specialized skills** to automatically repair identified issues from Phase 1.

**Total Skills**: 5  
**Parallel Execution**: ⚠️ Limited (with conflict resolution)  
**Sequential Execution**: ✅ Recommended  
**Success Rate**: ~80%+ of fixable issues  

---

## 🎯 Phase 2 Output

```typescript
FixResult {
  phase: 'fix'
  timestamp: Date
  duration: number (ms)
  
  findings: Finding[]
  fixes: Fix[]
  
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
  backupLocation?: string
}
```

---

## 🔧 The 5 Fixing Skills

### 1️⃣ **TypeFixSkill**

**Purpose**: Auto-fix TypeScript and type-related errors

**Can Fix**:
- ✅ Add type annotations
- ✅ Fix type assertions
- ✅ Resolve union type conflicts
- ✅ Add missing return types
- ✅ Fix generic type issues

**Cannot Fix**:
- ❌ Complex architectural type issues
- ❌ Custom type requirements

**Example Before/After**:

**Before**:
```typescript
function processData(param) {
  return param.value;
}
```

**After**:
```typescript
function processData(param: { value: string }): string {
  return param.value;
}
```

**Configuration**:
```typescript
{
  strictTypeChecking: true,
  addMissingAnnotations: true,
  fixAssertions: true
}
```

**Metrics**:
- ⏱️ Typical Duration: 2-3 seconds
- 🎯 Success Rate: 95%
- 📊 Issues Fixed: 10-50 per project
- 🔄 Requires Approval: Critical issues

---

### 2️⃣ **CodeRefactorSkill**

**Purpose**: Fix code quality issues and refactor problematic patterns

**Can Fix**:
- ✅ Remove unused variables
- ✅ Remove dead code
- ✅ Break down complex functions
- ✅ Fix naming conventions
- ✅ Add error handling

**Cannot Fix**:
- ❌ Business logic refactoring
- ❌ Architecture redesigns

**Example Before/After**:

**Before**:
```typescript
const tempData = getData();
const result = processData();
return result;
```

**After**:
```typescript
const result = processData();
return result;
```

**Configuration**:
```typescript
{
  removeUnused: true,
  maxComplexity: 5,
  fixNaming: true,
  addErrorHandling: true
}
```

**Metrics**:
- ⏱️ Typical Duration: 3-4 seconds
- 🎯 Success Rate: 80%
- 📊 Issues Fixed: 20-100 per project
- 🔄 Requires Approval: Some cases

---

### 3️⃣ **DependencyFixSkill**

**Purpose**: Fix import statements and dependency issues

**Can Fix**:
- ✅ Fix incorrect imports
- ✅ Add missing imports
- ✅ Remove unused imports
- ✅ Fix circular dependencies
- ✅ Update import paths

**Cannot Fix**:
- ❌ Add new packages
- ❌ Resolve version conflicts

**Example Before/After**:

**Before**:
```typescript
import { Component } from 'missing-package';
import { unused } from 'vue';
import Button from './button';  // Wrong path
```

**After**:
```typescript
import { Component } from 'vue';
import Button from '@/components/Button.vue';
```

**Configuration**:
```typescript
{
  fixIncorrectImports: true,
  removeUnusedImports: true,
  addMissingImports: true,
  fixCircular: true
}
```

**Metrics**:
- ⏱️ Typical Duration: 1-2 seconds
- 🎯 Success Rate: 100%
- 📊 Issues Fixed: 5-20 per project
- 🔄 Requires Approval: Never

---

### 4️⃣ **FormattingFixSkill**

**Purpose**: Fix code style, formatting, and performance issues

**Can Fix**:
- ✅ Optimize DOM operations (batch updates)
- ✅ Fix code indentation
- ✅ Fix spacing/whitespace
- ✅ Optimize CSS selectors
- ✅ Add performance optimizations

**Cannot Fix**:
- ❌ Large refactoring

**Example Before/After**:

**Before**:
```typescript
for(let i=0;i<arr.length;i++) {
  container.appendChild(createElement(arr[i]));
}
```

**After**:
```typescript
const fragment = document.createDocumentFragment();
arr.forEach(item => {
  fragment.appendChild(createElement(item));
});
container.appendChild(fragment);
```

**Configuration**:
```typescript
{
  optimizeDOMOps: true,
  formatCode: true,
  fixSpacing: true,
  optimizeSelectors: true
}
```

**Metrics**:
- ⏱️ Typical Duration: 2-3 seconds
- 🎯 Success Rate: 85%
- 📊 Issues Fixed: 5-20 per project
- 🔄 Requires Approval: Performance-critical fixes

---

### 5️⃣ **ConflictResolutionSkill**

**Purpose**: Resolve conflicts between fixes and handle edge cases

**Handles**:
- ✅ Conflicting fixes at same location
- ✅ Fix order dependencies
- ✅ Circular fix prevention
- ✅ Merge compatible fixes
- ✅ Rollback on conflicts

**Example**:
```
Fix 1: Remove variable "x"
Fix 2: Add type annotation to variable "x"
→ Conflict: ConflictResolutionSkill decides which takes priority
→ Result: Keep type annotation, remove variable
```

**Configuration**:
```typescript
{
  detectConflicts: true,
  resolveAutomatically: true,
  requireApprovalIfConflict: true
}
```

**Metrics**:
- ⏱️ Typical Duration: 1-2 seconds
- 🎯 Success Rate: 90%
- 📊 Conflicts Resolved: 0-5 per project
- 🔄 Requires Approval: Always (if conflict found)

---

## 📊 Skills Execution Matrix

| Skill | Duration | Issues Fixed | Success % | Approval |
|-------|----------|--------------|-----------|----------|
| TypeFix | 2-3s | 10-50 | 95% | Critical |
| CodeRefactor | 3-4s | 20-100 | 80% | Some |
| DependencyFix | 1-2s | 5-20 | 100% | Never |
| FormattingFix | 2-3s | 5-20 | 85% | High Risk |
| ConflictResolution | 1-2s | 0-5 | 90% | Always |
| **TOTAL** | **~10-14s** | **~40-195** | **~90%** | **Varies** |

---

## 🔄 Execution Flow

```
Phase 1: Investigate
  ↓
Get Findings
  ↓
Phase 2: Fix
  ├─ TypeFixSkill
  ├─ CodeRefactorSkill
  ├─ DependencyFixSkill
  ├─ FormattingFixSkill
  └─ ConflictResolutionSkill
  ↓
Backup Original Files ✅
  ↓
Apply Fixes
  ↓
Validate Each Fix ✅
  ↓
Generate Fix Report
  ↓
Phase 3: Test (optional)
```

---

## ⚠️ Risk Levels

| Risk | Fixes | Approval Required |
|------|-------|-------------------|
| **Low** | TypeFix (simple), DependencyFix | ❌ No |
| **Medium** | CodeRefactor, FormattingFix (simple) | ⚠️ Maybe |
| **High** | FormattingFix (complex), ConflictResolution | ✅ Yes |
| **Critical** | TypeFix (critical), Conflict with multiple fixes | ✅ Always |

---

## 🔌 Implementation Files

Located in `src/agent-skills/fix/`:

```
fix/
├── FixAgent.ts                      (Main orchestrator)
├── validators/                      (Fix validation)
│   └── FixValidator.ts
└── skills/
    ├── TypeFixSkill.ts              (Skill 1)
    ├── CodeRefactorSkill.ts         (Skill 2)
    ├── DependencyFixSkill.ts        (Skill 3)
    ├── FormattingFixSkill.ts        (Skill 4)
    └── ConflictResolutionSkill.ts   (Skill 5)
```

---

## 🛡️ Safety Mechanisms

### **Backups**
```typescript
{
  backupDir: '.agent-backups',
  backupBefore: true,
  autoRestore: true
}
```

### **Validation**
```typescript
{
  validateAfterEach: true,
  typeCheckRequired: true,
  testRequired: false
}
```

### **Approval Gates**
```typescript
{
  requiresApproval: ['critical', 'high'],
  autoApprove: ['low', 'medium'],
  dryRun: false
}
```

### **Rollback**
```typescript
{
  rollbackOnError: true,
  rollbackOnFailedValidation: true,
  maxAttempts: 3
}
```

---

## 📈 Performance Characteristics

- **Fastest**: DependencyFixSkill (1-2s)
- **Slowest**: CodeRefactorSkill (3-4s)
- **Most Fixes**: CodeRefactorSkill (20-100)
- **Highest Success**: DependencyFixSkill (100%)
- **Total Time (Sequential)**: 10-14 seconds
- **Backup Overhead**: +1-2 seconds
- **Validation Overhead**: +2-3 seconds

---

## ✅ Best Practices

1. **Always Backup** before applying fixes
2. **Run Phase 3 (Test)** after fixes to validate
3. **Use Sequential Execution** to avoid conflicts
4. **Require Approval** for critical/high severity fixes
5. **Check Diffs** before committing
6. **Review Conflicts** carefully
7. **Keep Rollback Option** available
8. **Test on Branch** before merging

---

## 🔗 Related Documents

- **[Phase 1: Investigation Skills](./INVESTIGATE_SPEC.md)** - How to find issues
- **[Phase 3: Testing Skills](../test/TEST_SPEC.md)** - How to validate fixes
- **[Agents Overview](../agents/task-analysis.agent.md)** - Agent system overview

