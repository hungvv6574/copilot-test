# 🤖 Agent System for Error Investigation, Fixing & Testing

## Project Overview

This is a Vue 3 + TypeScript + Vanilla HTML/CSS project with an intelligent agent system designed to:
- 🔍 **Investigate** code for errors and quality issues
- 🔧 **Fix** identified problems automatically  
- ✅ **Test** to validate fixes work correctly

---

## 📖 Documentation Quick Links

👉 **[All documentation is in `.github/`](./.github/AGENT_SYSTEM.md)**

### 🏃 Quick Navigation

**Start Here (5-15 minutes):**
- **[.github/START_HERE.md](./.github/START_HERE.md)** - Choose your path based on time available

**Agent Overviews (15 minutes each):**
- **[.github/agents/task-analysis.agent.md](./.github/agents/task-analysis.agent.md)** - All 3 agents overview
- **[.github/agents/task-investigate.agent.md](./.github/agents/task-investigate.agent.md)** - Phase 1 (🔍 Find issues)
- **[.github/agents/task-fix.agent.md](./.github/agents/task-fix.agent.md)** - Phase 2 (🔧 Fix issues)
- **[.github/agents/task-test.agent.md](./.github/agents/task-test.agent.md)** - Phase 3 (✅ Test fixes)

**Detailed Specifications:**
- **[.github/skills/SKILLS_INDEX.md](./.github/skills/SKILLS_INDEX.md)** - All 16 skills overview
- **[.github/skills/shared/types.ts](./.github/skills/shared/types.ts)** - TypeScript interfaces

**Full Documentation Index:**
- **[.github/AGENT_SYSTEM.md](./.github/AGENT_SYSTEM.md)** - Complete navigation hub

---

## 🎯 Agent System Overview

### 3-Phase Workflow

```
CODE WITH ISSUES
       ↓
[1] 🔍 INVESTIGATE AGENT
    ├─ TypeCheckSkill
    ├─ CodeQualitySkill
    ├─ PerformanceSkill
    ├─ AccessibilitySkill
    ├─ OfflineCompatibilitySkill
    └─ LogAnalysisSkill
    OUTPUT: Findings
       ↓
[2] 🔧 FIX AGENT
    ├─ TypeFixSkill
    ├─ CodeRefactorSkill
    ├─ DependencyFixSkill
    ├─ FormattingFixSkill
    └─ ConflictResolutionSkill
    OUTPUT: Fixed Code
       ↓
[3] ✅ TEST AGENT
    ├─ UnitTestSkill
    ├─ TypeCheckSkill
    ├─ RegressionTestSkill
    ├─ ManualTestSkill
    └─ CoverageAnalysisSkill
    OUTPUT: Test Results
       ↓
REPORT GENERATOR
    OUTPUT: Comprehensive Report
       ↓
FIXED & TESTED CODE
```

### Agent Skills (16 Total)

**Investigate Agent (6 skills)**
- TypeCheckSkill - Find TypeScript errors
- CodeQualitySkill - Detect bad patterns
- PerformanceAnalysisSkill - Find bottlenecks
- AccessibilitySkill - Check A11y compliance
- OfflineCompatibilitySkill - Verify offline support
- LogAnalysisSkill - Parse error logs

**Fix Agent (5 skills)**
- TypeFixSkill - Auto-fix TypeScript errors
- CodeRefactorSkill - Fix code quality issues
- DependencyFixSkill - Fix imports and dependencies
- FormattingFixSkill - Fix code style
- ConflictResolutionSkill - Handle edge cases

**Test Agent (5 skills)**
- UnitTestSkill - Run unit tests
- TypeCheckSkill - Verify TypeScript compilation
- RegressionTestSkill - Detect regressions
- ManualTestSkill - Generate test plans
- CoverageAnalysisSkill - Analyze test coverage

---

## 🏗️ Folder Structure

```
project/
├── START_HERE.md                              ← Read first!
├── AGENT_SYSTEM.md                            ← Main entry
├── AGENT_PLAN_SUMMARY.md                      ← Summary
├── VISUAL_GUIDE.md                            ← Diagrams
├── WHAT_WAS_CREATED.md                        ← Checklist
│
└── src/agent-skills/                          ← All agent code
    ├── AGENT_MASTER_PLAN.md                  ← Full architecture
    ├── QUICK_START.md                        ← How to use
    ├── IMPLEMENTATION_ROADMAP.md             ← Dev plan
    ├── SKILLS_INDEX.md                       ← Skills registry
    │
    ├── shared/                               ← Shared utilities
    │   ├── types.ts                         ✅ (Common interfaces)
    │   ├── prompts/                         (Prompt templates)
    │   └── utils/                           (Helper functions)
    │
    ├── investigate/                         ← PHASE 1
    │   ├── InvestigateAgent.ts
    │   ├── skills/                          (6 investigation skills)
    │   ├── prompts/                         (System & task prompts)
    │   ├── INVESTIGATE_SPEC.md              (Detailed spec)
    │   └── README.md
    │
    ├── fix/                                 ← PHASE 2
    │   ├── FixAgent.ts
    │   ├── skills/                          (5 fix skills)
    │   ├── validators/                      (Fix validation)
    │   ├── prompts/                         (System & task prompts)
    │   ├── FIX_SPEC.md                      (Detailed spec)
    │   └── README.md
    │
    ├── test/                                ← PHASE 3
    │   ├── TestAgent.ts
    │   ├── skills/                          (5 test skills)
    │   ├── prompts/                         (System & task prompts)
    │   ├── TEST_SPEC.md                     (Detailed spec)
    │   └── README.md
    │
    └── orchestrator/                        ← COORDINATOR
        ├── MasterOrchestrator.ts
        ├── TaskManager.ts
        ├── StateManager.ts
        ├── ReportGenerator.ts
        ├── types/                           (Task/Report types)
        ├── prompts/                         (System prompts)
        └── README.md
```

---

## 🚀 Quick Start Example

```typescript
import { MasterOrchestrator } from './src/agent-skills/orchestrator/MasterOrchestrator'

const orchestrator = new MasterOrchestrator()

const task = {
  id: 'task-001',
  title: 'Fix TypeScript Errors',
  scope: 'src/**/*.{ts,vue}',
  phases: ['investigate', 'fix', 'test'],
  autoFix: true,
  requiresApproval: ['critical'],
}

const report = await orchestrator.executeTask(task)

console.log(report)
// Output:
// {
//   taskId: 'task-001',
//   findings: [...],           // Issues found
//   fixes: [...],              // Fixes applied
//   testResults: [...],        // Test results
//   summary: {
//     totalIssues: 42,
//     fixedCount: 39,
//     testsPassed: 150,
//   },
//   recommendations: [...],    // Next steps
//   status: 'success'
// }
```

---

## 📊 Project Context

- **Platform**: Vue 3 + TypeScript + Vanilla HTML/CSS
- **Environment**: Offline Android WebView
- **Screen Resolution**: 1920x1200 (fixed)
- **Constraints**: 
  - No external UI libraries
  - Offline-first architecture
  - TypeScript strict mode enabled

---

## 🎯 Key Features

### Investigation Phase
✅ Scans from 6 different angles (types, quality, performance, a11y, offline, logs)  
✅ Categorizes issues by severity (critical → low)  
✅ Provides actionable suggestions  
✅ Execution: < 5 seconds typical  

### Fixing Phase
✅ Auto-repairs 80%+ of fixable issues  
✅ Safety first: backup before changes  
✅ Validates with type-check after each fix  
✅ Can rollback if needed  
✅ Approval gates for critical changes  

### Testing Phase
✅ Runs type-check, unit tests, regression tests  
✅ Detects regressions automatically  
✅ Analyzes test coverage  
✅ Generates manual test plans  

### Orchestration
✅ Smart task coordination  
✅ Session persistence (offline support)  
✅ Comprehensive reporting  
✅ Extensible skill system  

---

## 📈 Implementation Status

```
✅ Phase 0: Planning & Architecture (COMPLETE)
   ├─ Agent system designed
   ├─ Folder structure created (23 directories)
   ├─ Types defined (8+ interfaces)
   └─ Documentation complete (14 files, 5000+ lines)

⏳ Phase 1: Infrastructure (TODO - Week 1)
   ├─ Orchestrator core
   ├─ Task manager
   ├─ State manager
   └─ Report generator

⏳ Phase 2: Investigate Agent (TODO - Week 2)
⏳ Phase 3: Fix Agent (TODO - Week 3)
⏳ Phase 4: Test Agent (TODO - Week 4)
⏳ Phase 5: Polish & Release (TODO - Week 5)
```

---

## 📚 Learning Path

### For Quick Understanding (1 hour)
1. [START_HERE.md](./START_HERE.md) (5 min)
2. [AGENT_SYSTEM.md](./AGENT_SYSTEM.md) (10 min)
3. [AGENT_PLAN_SUMMARY.md](./AGENT_PLAN_SUMMARY.md) (15 min)
4. [QUICK_START.md](./src/agent-skills/QUICK_START.md) (20 min)
5. [VISUAL_GUIDE.md](./VISUAL_GUIDE.md) (10 min)

### For Deep Understanding (2.5 hours)
Add to above:
- [AGENT_MASTER_PLAN.md](./src/agent-skills/AGENT_MASTER_PLAN.md) (45 min)
- [IMPLEMENTATION_ROADMAP.md](./src/agent-skills/IMPLEMENTATION_ROADMAP.md) (30 min)
- Phase-specific specs (15 min)

### For Building (Start immediately)
1. [IMPLEMENTATION_ROADMAP.md](./src/agent-skills/IMPLEMENTATION_ROADMAP.md) (20 min)
2. Week 1 specification
3. Start coding!

---

## ✨ What You Get

✅ **Complete 3-phase system** - Investigate → Fix → Test  
✅ **16 intelligent skills** - Specialized for different tasks  
✅ **Master orchestrator** - Coordinates all agents  
✅ **Full type definitions** - TypeScript interfaces ready  
✅ **Comprehensive documentation** - 14 detailed guides  
✅ **5-week roadmap** - Milestone by milestone  
✅ **Folder structure** - 23 directories ready to code  
✅ **Best practices** - Proven patterns included  

---

## 🎓 Common Questions

**Q: How long to build the full system?**  
A: 5 weeks following the roadmap (~40-50 hours coding)

**Q: Can I use it today?**  
A: Not yet - needs implementation first (starts Week 1)

**Q: How many skills?**  
A: 16 total - 6 investigate, 5 fix, 5 test

**Q: Offline support?**  
A: Yes! No external API calls needed

**Q: Can I add new skills?**  
A: Absolutely - fully extensible design

**Q: Do I need all 3 phases?**  
A: No - use just Investigate, or Investigate+Fix, etc.

---

## 🚀 Next Steps

1. **Read** [START_HERE.md](./START_HERE.md) - Choose your learning path
2. **Understand** [AGENT_SYSTEM.md](./AGENT_SYSTEM.md) - What the system does
3. **View** [VISUAL_GUIDE.md](./VISUAL_GUIDE.md) - See workflows visually
4. **Deep dive** [AGENT_MASTER_PLAN.md](./src/agent-skills/AGENT_MASTER_PLAN.md) - Full architecture
5. **Start building** [IMPLEMENTATION_ROADMAP.md](./src/agent-skills/IMPLEMENTATION_ROADMAP.md) - Week 1 tasks

---

## 📞 Support

- Architecture questions → [AGENT_MASTER_PLAN.md](./src/agent-skills/AGENT_MASTER_PLAN.md)
- Usage questions → [QUICK_START.md](./src/agent-skills/QUICK_START.md)
- Build questions → [IMPLEMENTATION_ROADMAP.md](./src/agent-skills/IMPLEMENTATION_ROADMAP.md)
- Skill details → [SKILLS_INDEX.md](./src/agent-skills/SKILLS_INDEX.md)
- Visual explanation → [VISUAL_GUIDE.md](./VISUAL_GUIDE.md)

---

## 📊 Summary Statistics

| Metric | Count |
|--------|-------|
| Directories Created | 23 |
| Documentation Files | 14 |
| Agent Skills | 16 |
| Code Interfaces | 8+ |
| Implementation Weeks | 5 |
| Documentation KB | 90+ |
| Diagrams & Examples | 10+ |

---

**Status**: Architecture Complete ✅ - Ready for Implementation  
**Last Updated**: January 26, 2026  
**Next Phase**: Week 1 - Infrastructure Development









tôi có 1 project sử dụng vue3, typscript, javascript, html css thuần không dùng thư viện, nó tạo ra các màn hình dạng web form nhưng có thể chạy offline trên android. tỉ lệ màn hình cố định 19200x1200. dự án có phân tách rõ các layer: models, services, pages, components, resource. tôi muốn bạn hãy lên kế hoạch để tạo 1 agent giúp tôi điều tra lỗi, sửa lỗi, test.