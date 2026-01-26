# 🤖 Agent System - Agents Overview

## Quick Navigation

👉 **[START HERE](../START_HERE.md)** - For complete navigation

---

## 🏆 Three Agent System

An intelligent automation system with 3 specialized agents working together:

### 1️⃣ **[Investigate Agent](./investigate-agent.md)** 🔍

**Purpose**: Find errors and code quality issues  
**Trigger**: Phase 1 of agent workflow  
**Skills**: 6 specialized investigation skills  
**Output**: Findings with severity levels

**6 Investigation Skills**:
- TypeCheckSkill - Find TypeScript errors
- CodeQualitySkill - Detect bad patterns
- PerformanceAnalysisSkill - Find bottlenecks
- AccessibilitySkill - Check A11y compliance
- OfflineCompatibilitySkill - Verify offline support
- LogAnalysisSkill - Parse and analyze error logs

[→ Full Investigate Agent Spec](./investigate-agent.md)

---

### 2️⃣ **[Fix Agent](./fix-agent.md)** 🔧

**Purpose**: Automatically repair identified issues  
**Trigger**: Phase 2 of agent workflow  
**Skills**: 5 specialized fixing skills  
**Output**: Fixed code + detailed fix log

**5 Fix Skills**:
- TypeFixSkill - Auto-fix TypeScript errors
- CodeRefactorSkill - Fix code quality issues
- DependencyFixSkill - Fix imports and dependencies
- FormattingFixSkill - Fix code style and formatting
- ConflictResolutionSkill - Handle complex edge cases

[→ Full Fix Agent Spec](./fix-agent.md)

---

### 3️⃣ **[Test Agent](./test-agent.md)** ✅

**Purpose**: Validate fixes and ensure quality  
**Trigger**: Phase 3 of agent workflow  
**Skills**: 5 specialized testing skills  
**Output**: Test results + validation report

**5 Test Skills**:
- UnitTestSkill - Run and validate unit tests
- TypeCheckSkill - Verify TypeScript compilation
- RegressionTestSkill - Detect regressions
- ManualTestSkill - Generate test scenarios
- CoverageAnalysisSkill - Analyze test coverage

[→ Full Test Agent Spec](./test-agent.md)

---

## 🔄 Agent Workflow

```
CODE WITH ISSUES
       ↓
[1] 🔍 INVESTIGATE AGENT
    └─ 6 investigation skills
    └─ OUTPUT: Findings
       ↓
[2] 🔧 FIX AGENT
    └─ 5 fix skills
    └─ OUTPUT: Fixed Code
       ↓
[3] ✅ TEST AGENT
    └─ 5 test skills
    └─ OUTPUT: Test Results
       ↓
REPORT GENERATOR
    └─ OUTPUT: Comprehensive Report
       ↓
FIXED & TESTED CODE
```

---

## 📊 Agent Capabilities

### Investigate Agent
✅ Scans from 6 different angles  
✅ Categorizes by severity (critical → low)  
✅ Provides actionable suggestions  
✅ Execution: < 5 seconds typical  

### Fix Agent
✅ Auto-repairs 80%+ of fixable issues  
✅ Safety first: backup before changes  
✅ Validates with type-check after each fix  
✅ Can rollback if needed  
✅ Approval gates for critical changes  

### Test Agent
✅ Runs type-check, unit tests, regression tests  
✅ Detects regressions automatically  
✅ Analyzes test coverage  
✅ Generates manual test plans  

---

## 🎯 Understanding Agents vs Skills

### **Agents** (This Section)
- High-level orchestration
- One agent = one phase
- Coordinates multiple skills
- What you see from outside

### **Skills** (See `../skills/`)
- Low-level implementation
- One skill = one task type
- Specialized expertise
- How agents work internally

---

## 📚 Documentation Structure

```
.github/
├── agents/                        ← YOU ARE HERE
│   ├── AGENTS_INDEX.md           (Overview)
│   ├── investigate-agent.md      (Phase 1)
│   ├── fix-agent.md              (Phase 2)
│   └── test-agent.md             (Phase 3)
│
├── skills/                        (Detailed skill specs)
│   ├── SKILLS_INDEX.md
│   ├── shared/
│   ├── investigate/
│   ├── fix/
│   └── test/
│
├── START_HERE.md                  (Main entry point)
├── AGENTS_INDEX.md               (This file)
└── ... (other documentation)
```

---

## 🚀 Quick Links

### For Managers/Architects
- **[Investigate Agent](./investigate-agent.md)** - What does Phase 1 do?
- **[Fix Agent](./fix-agent.md)** - What does Phase 2 do?
- **[Test Agent](./test-agent.md)** - What does Phase 3 do?

### For Developers
- **[../skills/SKILLS_INDEX.md](../skills/SKILLS_INDEX.md)** - Detailed skill specs
- **[../skills/investigate/](../skills/investigate/)** - Investigation skills
- **[../skills/fix/](../skills/fix/)** - Fixing skills
- **[../skills/test/](../skills/test/)** - Testing skills

### For Full Understanding
- **[../START_HERE.md](../START_HERE.md)** - Complete guide
- **[../AGENT_SYSTEM.md](../AGENT_SYSTEM.md)** - System overview
- **[../AGENT_MASTER_PLAN.md](../AGENT_MASTER_PLAN.md)** - Full architecture

---

## 🔗 Navigation

**← Back**: [START_HERE.md](../START_HERE.md)  
**→ Skills**: [../skills/SKILLS_INDEX.md](../skills/SKILLS_INDEX.md)  
**All Docs**: [..](../)

---

*Last Updated: January 26, 2026*  
*Status: Architecture Complete*
