# ✅ Testing Skills - Phase 3 Detailed Specification

**Status**: Complete  
**Version**: 1.0  
**Location**: `.github/skills/test/`  
**Implementation**: `src/agent-skills/test/`

---

## 📋 Overview

The Test Agent uses **5 specialized skills** to validate fixes from Phase 2 and ensure code quality.

**Total Skills**: 5  
**Parallel Execution**: ✅ Supported  
**Sequential Execution**: ✅ Supported  
**Validation Focus**: TypeScript + Unit Tests + Regressions  

---

## 🎯 Phase 3 Output

```typescript
TestingResult {
  phase: 'test'
  timestamp: Date
  duration: number (ms)
  
  fixes: Fix[]
  testResults: TestResult[]
  
  summary: {
    typeCheckPassed: boolean
    unitTestsPassed: boolean
    noRegressions: boolean
    coverage: number (%)
    
    totalTests: number
    passed: number
    failed: number
    skipped: number
  }
  
  configuration: TestConfig
  recommendations: string[]
}
```

---

## ✅ The 5 Testing Skills

### 1️⃣ **TypeCheckSkill** (for Testing)

**Purpose**: Validate that TypeScript compilation passes without errors

**Validates**:
- ✅ No type errors exist
- ✅ All types are correct
- ✅ No implicit `any`
- ✅ All warnings resolved
- ✅ Strict mode compliance

**Example Output**:
```typescript
{
  id: 'test-typecheck-001',
  timestamp: new Date(),
  testType: 'type-check',
  testName: 'TypeScript Compilation',
  status: 'pass',
  duration: 1250,
  details: {
    errorsCount: 0,
    warningsCount: 0
  },
  validator: 'TypeCheckSkill',
  riskLevel: 'none'
}
```

**Exit Criteria - PASS**:
```
✅ No compilation errors
✅ Warnings < threshold
✅ Strict mode: ON
```

**Exit Criteria - FAIL**:
```
❌ Any compilation errors
❌ Any implicit `any`
❌ Missing types
```

**Configuration**:
```typescript
{
  typeCheckRequired: true,
  strictMode: true,
  maxWarnings: 5,
  failOnWarnings: false
}
```

**Metrics**:
- ⏱️ Typical Duration: 1-2 seconds
- 🎯 Pass Rate: 98%+ (after fixes)
- 📊 Coverage: 100% of project
- 🔄 Critical: ✅ Yes

---

### 2️⃣ **UnitTestSkill**

**Purpose**: Run unit tests and validate they all pass

**Validates**:
- ✅ All unit tests pass
- ✅ No failing tests
- ✅ Tests complete within timeout
- ✅ No skipped tests (ideally)
- ✅ Test coverage meets threshold

**Example Output**:
```typescript
{
  id: 'test-unit-001',
  timestamp: new Date(),
  testType: 'unit',
  testName: 'Unit Tests',
  status: 'pass',
  duration: 3420,
  details: {
    totalTests: 45,
    passed: 45,
    failed: 0,
    skipped: 0,
    framework: 'Vitest'
  },
  validator: 'UnitTestSkill',
  riskLevel: 'none'
}
```

**Exit Criteria - PASS**:
```
✅ All tests pass
✅ No timeouts
✅ Duration < threshold
```

**Exit Criteria - FAIL**:
```
❌ Any test fails
❌ Test timeout
❌ Framework error
```

**Configuration**:
```typescript
{
  unitTestRequired: true,
  testTimeout: 60000,
  framework: 'vitest',
  coverage: true
}
```

**Metrics**:
- ⏱️ Typical Duration: 2-5 seconds
- 🎯 Pass Rate: 95%+ (after fixes)
- 📊 Test Count: 20-100+ per project
- 🔄 Critical: ✅ Yes

---

### 3️⃣ **RegressionTestSkill**

**Purpose**: Detect regressions in fixed code

**Validates**:
- ✅ No new regressions introduced
- ✅ Expected behavior maintained
- ✅ Backwards compatibility
- ✅ Previous fixes still work
- ✅ Existing features unaffected

**Example Output**:
```typescript
{
  id: 'test-regression-001',
  timestamp: new Date(),
  testType: 'regression',
  testName: 'Regression Tests',
  status: 'pass',
  duration: 2150,
  details: {
    scenariosChecked: 12,
    regressionFound: 0,
    expectedBehaviorMaintained: true,
    affectedModules: ['auth', 'form', 'storage']
  },
  validator: 'RegressionTestSkill',
  riskLevel: 'low'
}
```

**Exit Criteria - PASS**:
```
✅ No regressions detected
✅ All expected behavior works
✅ No side effects
```

**Exit Criteria - FAIL**:
```
❌ Regression detected
❌ Breaking change
❌ Side effects found
```

**Configuration**:
```typescript
{
  regressionTestRequired: true,
  checkBackwardsCompat: true,
  testDeprecated: false,
  scenariosCount: 20
}
```

**Metrics**:
- ⏱️ Typical Duration: 1-3 seconds
- 🎯 Pass Rate: 99%+ (with good fixes)
- 📊 Scenarios Tested: 10-20+ per project
- 🔄 Critical: ✅ Yes

---

### 4️⃣ **ManualTestSkill**

**Purpose**: Generate manual test scenarios for QA team

**Generates**:
- 📋 Manual test cases
- 📋 Test scenarios
- 📋 Edge cases to test
- 📋 Device/browser combinations
- 📋 User flow walkthroughs

**Example Output**:
```typescript
{
  id: 'test-manual-001',
  timestamp: new Date(),
  testType: 'manual',
  testName: 'Manual Test Scenarios',
  status: 'pass',
  duration: 0,
  details: {
    scenarios: [
      'Test form submission with various input types',
      'Test offline mode switching',
      'Test responsive design on 1920x1200 resolution',
      'Test keyboard navigation',
      'Test screen reader compatibility'
    ],
    devices: ['Android WebView 1920x1200'],
    browsers: ['Chrome', 'Safari'],
    recommendation: 'Run these scenarios on actual device'
  },
  validator: 'ManualTestSkill',
  riskLevel: 'none'
}
```

**Includes**:
- ✅ Functional test cases
- ✅ UI/UX test scenarios
- ✅ Accessibility checks
- ✅ Performance checks
- ✅ Device-specific tests

**Configuration**:
```typescript
{
  generateScenarios: true,
  includeEdgeCases: true,
  targetDevices: ['Android WebView'],
  targetResolutions: ['1920x1200'],
  includeAccessibility: true
}
```

**Metrics**:
- ⏱️ Typical Duration: 0-1 second
- 📋 Scenarios Generated: 10-20+ per project
- 🎯 Coverage: Functional + UX + A11y
- 🔄 Critical: ⚠️ Informational

---

### 5️⃣ **CoverageAnalysisSkill**

**Purpose**: Analyze test coverage and ensure it meets threshold

**Measures**:
- 📊 Line coverage
- 📊 Branch coverage
- 📊 Function coverage
- 📊 Statement coverage
- 📊 Uncovered files

**Example Output**:
```typescript
{
  id: 'test-coverage-001',
  timestamp: new Date(),
  testType: 'coverage',
  testName: 'Test Coverage Analysis',
  status: 'pass',
  duration: 1800,
  details: {
    percent: 78,
    lines: '1245/1598',
    branches: '342/456',
    functions: '89/102',
    threshold: 70,
    met: true,
    uncovered: [
      'src/services/ErrorHandler.ts',
      'src/utils/Logger.ts'
    ]
  },
  validator: 'CoverageAnalysisSkill',
  riskLevel: 'low'
}
```

**Exit Criteria - PASS**:
```
✅ Coverage >= threshold (70%)
✅ Critical paths covered
✅ No major gaps
```

**Exit Criteria - FAIL**:
```
❌ Coverage < threshold
❌ Critical paths not covered
❌ High-risk areas uncovered
```

**Configuration**:
```typescript
{
  minCoverage: 70,
  checkLines: true,
  checkBranches: true,
  checkFunctions: true,
  failOnThreshold: false
}
```

**Metrics**:
- ⏱️ Typical Duration: 1-2 seconds
- 📊 Average Coverage: 75-85%
- 🎯 Threshold: 70%
- 🔄 Critical: ⚠️ Recommended

---

## 📊 Skills Execution Matrix

| Skill | Duration | Status | Pass Rate | Critical |
|-------|----------|--------|-----------|----------|
| TypeCheck | 1-2s | Pass/Fail | 98% | ✅ |
| UnitTest | 2-5s | Pass/Fail | 95% | ✅ |
| Regression | 1-3s | Pass/Fail | 99% | ✅ |
| ManualTest | 0-1s | Info | - | ⚠️ |
| Coverage | 1-2s | Pass/Warn | - | ⚠️ |
| **TOTAL** | **~6-13s** | **Mixed** | **~97%** | **Varies** |

---

## 🔄 Execution Modes

### **Parallel Mode** (Faster)
```typescript
const config: TestConfig = {
  typeCheckRequired: true,
  unitTestRequired: true,
  regressionTestRequired: true,
  parallelTests: true
}
// All skills run simultaneously
// Total Duration: 3-5 seconds
```

### **Sequential Mode** (More Reliable)
```typescript
const config: TestConfig = {
  typeCheckRequired: true,
  unitTestRequired: true,
  regressionTestRequired: true,
  parallelTests: false
}
// Skills run one by one
// Total Duration: 6-13 seconds
```

---

## 🎯 Pass/Fail Criteria

| Skill | Must Pass | Can Warn | Can Skip |
|-------|-----------|----------|----------|
| TypeCheck | ✅ Yes | ❌ No | ❌ No |
| UnitTest | ✅ Yes | ❌ No | ⚠️ Configurable |
| Regression | ✅ Yes | ❌ No | ⚠️ Configurable |
| ManualTest | ⚠️ Informational | ⚠️ Yes | ✅ Yes |
| Coverage | ⚠️ Recommended | ✅ Yes | ✅ Yes |

---

## 🛡️ Safety Mechanisms

### **Type Validation**
```typescript
{
  typeCheckRequired: true,
  failOnErrors: true,
  failOnWarnings: false
}
```

### **Test Validation**
```typescript
{
  unitTestRequired: true,
  testTimeout: 60000,
  failOnTimeout: true
}
```

### **Regression Detection**
```typescript
{
  regressionTestRequired: true,
  detectBreakingChanges: true,
  failOnRegression: true
}
```

### **Coverage Threshold**
```typescript
{
  minCoverage: 70,
  failOnLowCoverage: false,
  warnThreshold: 60
}
```

---

## 📈 Performance Characteristics

- **Fastest**: ManualTestSkill (0-1s)
- **Slowest**: UnitTestSkill (2-5s)
- **Most Critical**: TypeCheck + UnitTest + Regression
- **Most Informational**: ManualTest + Coverage
- **Total Time (Parallel)**: 3-5 seconds
- **Total Time (Sequential)**: 6-13 seconds
- **Test Count**: 20-100+ per project

---

## ✅ Best Practices

1. **Always Run TypeCheck** - Non-negotiable
2. **Always Run UnitTests** - Core validation
3. **Always Check Regressions** - Prevent side effects
4. **Always Generate ManualTests** - For QA
5. **Recommend Coverage Target** - 70%+ minimum
6. **Use Parallel for Speed** - In development
7. **Use Sequential for Safety** - In CI/CD
8. **Review Recommendations** - Before deployment

---

## 🔗 Related Documents

- **[Phase 1: Investigation Skills](../investigate/INVESTIGATE_SPEC.md)** - How to find issues
- **[Phase 2: Fixing Skills](../fix/FIX_SPEC.md)** - How to fix issues
- **[Agents Overview](../agents/task-analysis.agent.md)** - Agent system overview

