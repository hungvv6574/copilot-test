# 🔧 Fix Agent - Phase 2

## Overview

**Purpose**: Automatically repair issues found by Investigate Agent  
**Phase**: 2 of 3  
**Skills**: 5 specialized fixing skills  
**Duration**: 15-20 minutes (typical)  
**Output**: Fixed code + detailed fix log  

---

## What It Does

The Fix Agent repairs issues from Phase 1 using **5 specialized skills**:

```
INPUT: Findings from Investigate Agent
    ↓
[1] TypeFixSkill          → Fix TypeScript type errors
[2] CodeRefactorSkill     → Fix code quality issues
[3] DependencyFixSkill    → Fix imports & dependencies
[4] FormattingFixSkill    → Fix code style
[5] ConflictResolutionSkill → Handle complex cases
    ↓
Validate each fix with type-check
    ↓
OUTPUT: Fixed code + Fix log
```

---

## 5 Fixing Skills

### 1. **TypeFixSkill**
Auto-fixes TypeScript type errors

**Can Fix**:
- Add missing type annotations
- Fix type incompatibilities
- Correct type signatures
- Fix import types
- Add return type annotations

**Example Fix**:
```typescript
// BEFORE (Finding)
const password = ref<string>(props.password)  // ERROR: might be undefined

// AFTER (Fixed)
const password = ref<string>(props.password ?? '')  // ✅ Default value added
```

---

### 2. **CodeRefactorSkill**
Fixes code quality and pattern violations

**Can Fix**:
- Convert to Vue 3 composition API patterns
- Extract constants from hardcoded values
- Add missing error handling
- Simplify overly complex code
- Break down large functions

**Example Fix**:
```typescript
// BEFORE (Bad pattern)
if (userData.role === 'admin' || userData.role === 'moderator') {
  // ...
}

// AFTER (Better pattern)
const ADMIN_ROLES = ['admin', 'moderator']
if (ADMIN_ROLES.includes(userData.role)) {
  // ...
}
```

---

### 3. **DependencyFixSkill**
Fixes imports and dependency issues

**Can Fix**:
- Correct relative import paths
- Add missing imports
- Remove unused imports
- Resolve circular dependencies
- Fix broken module references

**Example Fix**:
```typescript
// BEFORE (Wrong path)
import { UserService } from '../../../services/user/UserService'

// AFTER (Correct path)
import { UserService } from '@/services/UserService'
```

---

### 4. **FormattingFixSkill**
Fixes code style and naming conventions

**Can Fix**:
- Apply consistent indentation
- Fix naming conventions (camelCase, PascalCase)
- Remove dead code
- Fix whitespace
- Format code consistently

**Example Fix**:
```typescript
// BEFORE (Bad naming)
const usr_name = 'John'
const UserId = 123

// AFTER (Consistent naming)
const userName = 'John'
const userId = 123
```

---

### 5. **ConflictResolutionSkill**
Handles complex fixes and edge cases

**Can Resolve**:
- Fix dependencies between multiple issues
- Handle cascading changes
- Resolve fix conflicts
- Rollback problematic changes
- Deal with special cases

---

## Fix Structure

Every fix includes:

```typescript
interface Fix {
  id: string                        // Unique ID
  findingId: string                 // Which finding this fixes
  severity: 'critical' | 'high' | 'medium' | 'low'
  filePath: string                  // Affected file
  lineNumber: number
  column: number
  
  original: string                  // Before
  updated: string                   // After
  
  changeType: 'add' | 'remove' | 'modify' | 'replace'
  description: string               // What changed and why
  
  status: 'pending' | 'applied' | 'failed' | 'reverted'
  error?: string                    // If failed
  
  validator: string                 // Which skill fixed it
  timestamp: Date
  
  riskLevel: 'low' | 'medium' | 'high'
  requiresApproval: boolean
}
```

---

## Safety Mechanisms

### Pre-Fix Checks ✅
- Create backup of original code
- Analyze fix dependencies
- Check for conflicts
- Validate fix won't break code

### Per-Fix Validation ✅
- Run TypeScript type-check
- Check for syntax errors
- Verify imports are correct
- Compare before/after

### Post-Fix Validation ✅
- Full type-check pass
- No new errors introduced
- No regressions
- Code is valid

### Rollback Strategy 🔄
- Keep backups of all changes
- Track all modifications
- Can revert individual fixes
- Can rollback all changes

---

## Approval Levels

### Auto-Approval (No approval needed)
✅ Formatting fixes  
✅ Import organization  
✅ Variable naming  
✅ Dead code removal  

### Requires Review (Show diff)
⚠️ Type annotation changes  
⚠️ Component refactoring  
⚠️ Logic changes  
⚠️ Critical section changes  

### Requires Explicit Approval
🔴 Changes to core services  
🔴 Changes to data flow  
🔴 Breaking changes  
🔴 Security-related changes  

---

## What Can't Be Fixed

The Fix Agent will **NOT** fix:

❌ Complex logic errors (requires understanding intent)  
❌ API design changes (affects multiple files)  
❌ Architecture issues (requires redesign)  
❌ Security vulnerabilities (context-dependent)  
❌ Business logic changes (requires domain knowledge)  

**For these**: Generate suggestion for human developer

---

## Example Fix Output

```json
{
  "id": "fix-001-001",
  "findingId": "inv-001-001",
  "severity": "high",
  "filePath": "src/pages/LoginForm.vue",
  "lineNumber": 28,
  "column": 5,
  
  "original": "const password = ref<string>(props.password)",
  "updated": "const password = ref<string>(props.password ?? '')",
  
  "changeType": "modify",
  "description": "Added default value to handle undefined password prop",
  
  "status": "applied",
  "validator": "TypeFixSkill",
  "timestamp": "2026-01-26T10:35:00Z",
  
  "riskLevel": "low",
  "requiresApproval": false
}
```

---

## Example Fix Session

```json
{
  "phase": "fix",
  "timestamp": "2026-01-26T10:35:00Z",
  "duration": 8500,
  "findings": 42,
  "fixes": [
    { "id": "fix-001-001", "status": "applied" },
    { "id": "fix-001-002", "status": "applied" },
    { "id": "fix-001-003", "status": "applied" },
    // ... more fixes
  ],
  "summary": {
    "totalAttempted": 42,
    "successful": 39,
    "failed": 3,
    "typesFixed": 15,
    "qualityFixed": 12,
    "refactored": 8,
    "formatted": 4
  }
}
```

---

## Configuration

```typescript
interface FixConfig {
  autoFix: boolean                           // Run auto-fixes
  requiresApproval: string[]                 // ['critical', 'high']
  maxFixAttempts: number                     // 3
  rollbackOnError: boolean                   // auto-rollback on failure
  validateAfterEach: boolean                 // validate between fixes
  backupDir: string                          // where to store backups
}
```

---

## Workflow

```
1. Prioritize Fixes
   └─ Sort by severity & fixability
   └─ Identify dependencies

2. Create Backup
   └─ Save original code
   └─ Record fix plan

3. Apply Fixes Iteratively
   └─ Pick highest priority fixable item
   └─ Apply fix
   └─ Validate TypeScript

4. Validate Each Fix
   └─ Run type-check
   └─ Check for regressions
   └─ Ensure code still runs

5. Report Changes
   └─ Document what changed
   └─ Record fix details
   └─ Create fix summary
```

---

## Success Metrics

✅ Fix 100% of fixable type errors  
✅ Fix 80%+ of code quality issues  
✅ Zero false positives in fixes  
✅ Complete in < 10 seconds (typical)  
✅ Zero regressions  
✅ All fixes are reversible  

---

## Integration

**Input**:
- Findings from Investigate Agent
- Source code files
- Configuration

**Output**:
- Fixed source code
- Fix log with details
- Backup of originals

**Next Phase**:
- Results passed to Test Agent
- Test Agent validates fixes
- Report generated

---

## Related Files

- **[Investigate Agent](./investigate-agent.md)** - Phase 1 (finds issues)
- **[Test Agent](./test-agent.md)** - Phase 3 (validates fixes)
- **[../skills/fix/FIX_SPEC.md](../skills/fix/)** - Detailed skill specs
- **[AGENTS_INDEX.md](./AGENTS_INDEX.md)** - Back to agents overview

---

*Last Updated: January 26, 2026*  
*Phase: 2 of 3*
