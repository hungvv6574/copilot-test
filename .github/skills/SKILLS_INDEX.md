# 💡 Skills Index - All Agent Skills

## Quick Navigation

👉 **[START HERE](../START_HERE.md)** - For complete navigation  
👉 **[Agents](../agents/AGENTS_INDEX.md)** - For agent overviews  

---

## 🎯 Skills Overview

The agent system uses **16 specialized skills** across 3 phases:

### 📊 Skills Distribution

- **Phase 1 (Investigate)**: 6 investigation skills
- **Phase 2 (Fix)**: 5 fixing skills
- **Phase 3 (Test)**: 5 testing skills
- **Shared**: Utility skills used across all phases

---

## 📂 Skills Organization

```
Skills by Phase:

🔍 INVESTIGATE PHASE (6 skills)
├── TypeCheckSkill
├── CodeQualitySkill
├── PerformanceAnalysisSkill
├── AccessibilitySkill
├── OfflineCompatibilitySkill
└── LogAnalysisSkill

🔧 FIX PHASE (5 skills)
├── TypeFixSkill
├── CodeRefactorSkill
├── DependencyFixSkill
├── FormattingFixSkill
└── ConflictResolutionSkill

✅ TEST PHASE (5 skills)
├── TypeCheckSkill (validation)
├── UnitTestSkill
├── RegressionTestSkill
├── ManualTestSkill
└── CoverageAnalysisSkill

🛠️ SHARED UTILITIES
├── FileSystemSkill
├── TypeScriptSkill
├── PromptEngineering
└── ReportGenerator
```

---

## 🔍 Phase 1: Investigation Skills

### Skill 1.1: TypeCheckSkill
**Purpose**: Find TypeScript compilation errors  
**Input**: TypeScript source files  
**Output**: Type errors with locations  
**Complexity**: Medium  
**Time**: 30-60 seconds  
**Fixable**: 90%+ of findings  

[→ Full Spec](./investigate/INVESTIGATE_SPEC.md#1-typecheckskill)

### Skill 1.2: CodeQualitySkill
**Purpose**: Detect code anti-patterns  
**Input**: Source code files  
**Output**: Quality issues with suggestions  
**Complexity**: High  
**Time**: 1-2 minutes  
**Fixable**: 70%+ of findings  

[→ Full Spec](./investigate/INVESTIGATE_SPEC.md#2-codequalityskill)

### Skill 1.3: PerformanceAnalysisSkill
**Purpose**: Identify performance bottlenecks  
**Input**: Component & service code  
**Output**: Performance issues with impact  
**Complexity**: High  
**Time**: 1-2 minutes  
**Fixable**: 60%+ of findings  

[→ Full Spec](./investigate/INVESTIGATE_SPEC.md#3-performanceanalysis)

### Skill 1.4: AccessibilitySkill
**Purpose**: Check A11y compliance  
**Input**: Vue components & HTML  
**Output**: Accessibility violations  
**Complexity**: Medium  
**Time**: 30-60 seconds  
**Fixable**: 85%+ of findings  

[→ Full Spec](./investigate/INVESTIGATE_SPEC.md#4-accessibilityskill)

### Skill 1.5: OfflineCompatibilitySkill
**Purpose**: Verify offline support  
**Input**: Service & component code  
**Output**: Offline compatibility issues  
**Complexity**: Medium  
**Time**: 30-60 seconds  
**Fixable**: 80%+ of findings  

[→ Full Spec](./investigate/INVESTIGATE_SPEC.md#5-offline)

### Skill 1.6: LogAnalysisSkill
**Purpose**: Parse and analyze logs  
**Input**: Error logs, console output  
**Output**: Error patterns and issues  
**Complexity**: Medium  
**Time**: 30-60 seconds  
**Fixable**: 75%+ of findings  

[→ Full Spec](./investigate/INVESTIGATE_SPEC.md#6-log)

---

## 🔧 Phase 2: Fix Skills

### Skill 2.1: TypeFixSkill
**Purpose**: Fix TypeScript errors  
**Input**: Type errors from Phase 1  
**Output**: Fixed code with type annotations  
**Complexity**: Medium  
**Time**: 1-2 minutes  
**Success Rate**: 95%+  

[→ Full Spec](./fix/FIX_SPEC.md#1-typefixskill)

### Skill 2.2: CodeRefactorSkill
**Purpose**: Fix code quality issues  
**Input**: Quality issues from Phase 1  
**Output**: Refactored, cleaner code  
**Complexity**: High  
**Time**: 2-5 minutes  
**Success Rate**: 80%+  

[→ Full Spec](./fix/FIX_SPEC.md#2-coderefactor)

### Skill 2.3: DependencyFixSkill
**Purpose**: Fix imports and dependencies  
**Input**: Import/dependency issues  
**Output**: Corrected imports  
**Complexity**: Medium  
**Time**: 1-2 minutes  
**Success Rate**: 100%+  

[→ Full Spec](./fix/FIX_SPEC.md#3-dependency)

### Skill 2.4: FormattingFixSkill
**Purpose**: Fix code style  
**Input**: Formatting issues  
**Output**: Properly formatted code  
**Complexity**: Low  
**Time**: 30-60 seconds  
**Success Rate**: 100%+  

[→ Full Spec](./fix/FIX_SPEC.md#4-formatting)

### Skill 2.5: ConflictResolutionSkill
**Purpose**: Handle complex fixes  
**Input**: Conflicting or complex issues  
**Output**: Resolved code  
**Complexity**: Very High  
**Time**: 3-10 minutes  
**Success Rate**: 70%+  

[→ Full Spec](./fix/FIX_SPEC.md#5-conflict)

---

## ✅ Phase 3: Test Skills

### Skill 3.1: TypeCheckSkill (Validation)
**Purpose**: Validate TypeScript compilation  
**Input**: Fixed code  
**Output**: Type-check pass/fail  
**Complexity**: Low  
**Time**: 2-5 seconds  
**Accuracy**: 100%  

[→ Full Spec](./test/TEST_SPEC.md#1-typecheck)

### Skill 3.2: UnitTestSkill
**Purpose**: Run unit tests  
**Input**: Test suite definitions  
**Output**: Test pass/fail results  
**Complexity**: Medium  
**Time**: 5-10 seconds  
**Accuracy**: 100%  

[→ Full Spec](./test/TEST_SPEC.md#2-unittest)

### Skill 3.3: RegressionTestSkill
**Purpose**: Detect regressions  
**Input**: Before/after code  
**Output**: Regression detection  
**Complexity**: High  
**Time**: 5-10 seconds  
**Accuracy**: 95%+  

[→ Full Spec](./test/TEST_SPEC.md#3-regression)

### Skill 3.4: ManualTestSkill
**Purpose**: Generate test scenarios  
**Input**: Fixed code  
**Output**: Test case documentation  
**Complexity**: High  
**Time**: 2-5 minutes  
**Accuracy**: 90%+  

[→ Full Spec](./test/TEST_SPEC.md#4-manual)

### Skill 3.5: CoverageAnalysisSkill
**Purpose**: Analyze test coverage  
**Input**: Test coverage data  
**Output**: Coverage metrics  
**Complexity**: Medium  
**Time**: 1-2 seconds  
**Accuracy**: 100%  

[→ Full Spec](./test/TEST_SPEC.md#5-coverage)

---

## 🛠️ Shared Utilities

### FileSystemSkill
- Read/write files
- Directory operations
- File backup & restoration
- Path resolution

### TypeScriptSkill
- Type-check operations
- Compilation validation
- Import resolution
- Type analysis

### PromptEngineering
- LLM prompt optimization
- Context window management
- Few-shot examples
- Error recovery

### ReportGenerator
- Finding aggregation
- Fix documentation
- Test result compilation
- Report formatting

---

## 📈 Skills Complexity Matrix

| Skill | Complexity | Time | Success |
|-------|-----------|------|---------|
| TypeCheckSkill | Medium | 30s | 95% |
| CodeQualitySkill | High | 1m | 70% |
| PerformanceSkill | High | 2m | 60% |
| AccessibilitySkill | Medium | 1m | 85% |
| OfflineSkill | Medium | 1m | 80% |
| LogAnalysisSkill | Medium | 1m | 75% |
| TypeFixSkill | Medium | 2m | 95% |
| CodeRefactorSkill | High | 5m | 80% |
| DependencyFixSkill | Medium | 2m | 100% |
| FormattingFixSkill | Low | 1m | 100% |
| ConflictResolutionSkill | Very High | 10m | 70% |
| TypeCheck (Test) | Low | 5s | 100% |
| UnitTestSkill | Medium | 10s | 100% |
| RegressionSkill | High | 10s | 95% |
| ManualTestSkill | High | 5m | 90% |
| CoverageSkill | Medium | 2s | 100% |

---

## 🔄 Skill Dependencies

```
PHASE 1 (Investigation):
  TypeCheckSkill ──┐
  CodeQualitySkill ├─ Feeds findings to Fix Agent
  PerformanceSkill ├┐
  AccessibilitySkill├┤
  OfflineSkill ─────┤
  LogAnalysisSkill──┘

PHASE 2 (Fixing):
  TypeFixSkill ──────┐
  CodeRefactorSkill──┼─ Produces fixed code
  DependencyFixSkill┼┐
  FormattingFixSkill├┤
  ConflictSkill ─────┤
         │           │
         └─ All validated by TypeCheck first

PHASE 3 (Testing):
  TypeCheckSkill ──┐
  UnitTestSkill ───┼─ Validates fixed code
  RegressionSkill──┼┐
  ManualTestSkill──┤├─ Comprehensive validation
  CoverageSkill ───┘│
         │          │
         └─ Results to Report Generator
```

---

## 📚 Skills by Category

### Type-Related Skills
- TypeCheckSkill (Investigate)
- TypeFixSkill (Fix)
- TypeCheckSkill (Test)

### Code Quality Skills
- CodeQualitySkill (Investigate)
- CodeRefactorSkill (Fix)

### Code Organization Skills
- DependencyFixSkill (Fix)
- FormattingFixSkill (Fix)

### Analysis Skills
- PerformanceAnalysisSkill (Investigate)
- AccessibilitySkill (Investigate)
- OfflineCompatibilitySkill (Investigate)
- LogAnalysisSkill (Investigate)

### Testing Skills
- UnitTestSkill (Test)
- RegressionTestSkill (Test)
- ManualTestSkill (Test)
- CoverageAnalysisSkill (Test)

### Resolution Skills
- ConflictResolutionSkill (Fix)

---

## 🎓 Learning Paths

### For Quick Understanding
1. Read SKILLS_INDEX.md (this file)
2. Read each skill's overview section
3. Understand inputs/outputs

**Time**: 10-15 minutes

### For Deep Understanding
1. Read SKILLS_INDEX.md
2. Read full skill specs in respective phase files
3. Review algorithm details
4. Study examples

**Time**: 1-2 hours

### For Implementation
1. Read full skill specs
2. Study shared types
3. Review prompt engineering guidelines
4. Start with TypeCheckSkill (simplest)

**Time**: 3-5 hours per skill

---

## 🔗 Related Documentation

**Agent Overviews**:
- [Investigate Agent](../agents/investigate-agent.md)
- [Fix Agent](../agents/fix-agent.md)
- [Test Agent](../agents/test-agent.md)

**Detailed Specifications**:
- [Investigate Phase Spec](./investigate/INVESTIGATE_SPEC.md)
- [Fix Phase Spec](./fix/FIX_SPEC.md)
- [Test Phase Spec](./test/TEST_SPEC.md)

**Main Documentation**:
- [START HERE](../START_HERE.md)
- [AGENTS_INDEX](../agents/AGENTS_INDEX.md)

---

*Last Updated: January 26, 2026*  
*Total Skills: 16*  
*Coverage: All phases*
