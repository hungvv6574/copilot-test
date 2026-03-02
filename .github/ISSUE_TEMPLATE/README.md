# GitHub Issue Templates

This folder contains issue templates for creating structured tasks on GitHub web.

## 📋 Primary Templates (Recommended Workflow)

### 1. 🔍 **ZGSO Investigate & Fix Bug** (`zgso-investigate-and-fixbug-template.md`)
**Two-phase comprehensive bug resolution**

**When to use:** Any bug report that needs thorough investigation before fixing

**What it does:**
- **Phase 1 - Investigation**: Systematic root cause analysis with full context
  - Reproduces the bug with environment details
  - References ALL 18+ instruction files for complete understanding
  - Traces code flow from user action → event → logic → data → UI
  - Documents root cause with sequence diagrams
  - Assesses impact (Critical/High/Medium/Low)

- **Phase 2 - Fix Implementation**: Structured fix with regression prevention
  - Fix strategy planning
  - Code changes following coding standards
  - Regression test creation (CSV + Playwright)
  - Cross-device testing (SO/LO for HS)
  - Code review checklist

**References instruction files and agents:**
- Core: `copilot-instructions.md`, `language-policy.md`, `coding-convention.instructions.md`
- Order Flow: `zgso-order-flow-hs.instructions.md` (HS) or `zso-order-flow.instructions.md` (SK/NV/ZL)
- **Code Review Agents**: `zgso-vi-code-reviewer.agent.md` (VN) / `zgso-ja-code-reviewer.agent.md` (JA) - Comprehensive rules and anti-patterns
- Models: `WebSocketTypes.ts`, data models in `src/model/`

**Output:**
- Root cause analysis document
- Fixed code following all standards
- Regression tests (CSV + Playwright)
- No breaking changes

---

### 2. ✅ **Code Review** (`zgso-code-review-template.md`)
**Comprehensive code review with multi-level checklist**

**When to use:** Reviewing PRs, commits, or code changes

**What it does:**
- Provides structured review framework with 10 major categories:
  1. **Architecture & Design** - Component structure, patterns, file organization
  2. **TypeScript & Type Safety** - Type coverage, null checks, strict mode
  3. **Vue 3 Specific** - Composition API, template, component communication
  4. **Order Flow & Business Logic** - HS vs SK/NV/ZL compliance
  5. **CSS & Styling** - Theme system, UI consistency
  6. **Performance** - Optimization, async operations, memory leaks
  7. **Error Handling & Logging** - Try-catch, user feedback, logging
  8. **Testing** - Unit, integration, E2E test coverage
  9. **Security** - Input validation, XSS prevention, sensitive data
  10. **Documentation & Maintainability** - Comments, readability, DRY

**References instruction files and agents:**
- Core: `copilot-instructions.md`, `language-policy.md`, `coding-convention.instructions.md`
- Order Flow: Based on business type (HS vs SK/NV/ZL)
- **Code Review Agents**: `zgso-vi-code-reviewer.agent.md` / `zgso-ja-code-reviewer.agent.md` - Comprehensive code quality rules
- Code-specific: `WebSocketTypes.ts`, relevant models

**Output:**
- Categorized issues (Critical/High/Medium/Low)
- Approval status with recommendations
- Actionable feedback

---

### 3. 🎨 **Create New Screen** (`zgso-create-screen-template.md`)
**Complete screen creation from planning to testing**

**When to use:** Creating new Vue pages/components from scratch

**What it does:**
- **10-step implementation checklist**:
  1. Planning & Design - Requirements, mockups, data structure
  2. File Structure Setup - Correct folders (HS/SK/NV/ZL)
  3. Vue Component Implementation - Template, script, style
  4. Logic Class Implementation - Business logic separation
  5. Event Handling - Touch events, navigation
  6. State Management - Reactive refs, computed, singletons
  7. Styling & Theme - CSS variables, responsive design
  8. Internationalization - Dictionary keys, multilingual
  9. Testing - CSV testcases + Playwright + Page Objects
  10. Documentation - JSDoc, instruction file updates

**References instruction files and prompts:**
- **PRIMARY**: `ui-generation.instructions.md` - Vue 3 patterns, logic separation
- Core: `coding-convention.instructions.md`, `language-policy.md`, `copilot-instructions.md`
- Order Flow: HS or SK/NV/ZL based on business type
- **UI Workflow Prompts**: `zgso-vi/ja-plan-ui.prompt.md` → `zgso-vi/ja-ui-analyze.prompt.md` → `zgso-vi/ja-ui-generation.prompt.md` - Step-by-step UI creation

**Output:**
- Vue component file (`src/page/[BT]/[Screen]Page.vue`)
- Logic class file (`src/logic/page/[BT]/[Screen]PageLogic.ts`)
- CSS with theme variables
- CSV test cases + Playwright tests + Page Objects
- Full TypeScript typing
- Documentation

---

## 📊 Template Comparison

| Template | Phase | Target User | Primary Focus | References Files |
|----------|-------|-------------|---------------|------------------|
| **ZGSO Investigate & Fix Bug** | 2-phase | Any Dev | Root cause → Fix | ALL (~18 files) |
| **Code Review** | Review | Reviewer | Quality assurance | Scope-based |
| **Create Screen** | Creation | Frontend Dev | New UI implementation | ui-generation.instructions.md + relevant |

## 🎯 How to Use on GitHub Web

1. Navigate to **Issues** → **New Issue**
2. Select appropriate template from the list
3. Fill in the template fields
4. The template will automatically reference relevant instruction files from `htmlV3/SO/.github/instructions/`

## 📚 Files Auto-Referenced by Templates

All templates automatically reference relevant files based on context:

### Core Instructions (Always Included)
- `htmlV3/SO/.github/copilot-instructions.md` - Project overview & architecture
- `htmlV3/SO/.github/language-policy.md` - Multilingual policy (VN/JP/EN)
- `htmlV3/SO/.github/instructions/coding-convention.instructions.md` - Coding standards

### Order Flow (Business Type Specific)
- **HS**: `htmlV3/SO/.github/instructions/zgso-order-flow-hs.instructions.md` + `zgso-startup-hs.instructions.md`
- **SK/NV/ZL**: `htmlV3/SO/.github/instructions/zso-order-flow.instructions.md`

### Specialized Resources

**Code Review Agents** (for comprehensive quality checks):
- 🇻🇳 `htmlV3/SO/.github/agents/zgso-vi-code-reviewer.agent.md` - Vietnamese responses
- 🇯🇵 `htmlV3/SO/.github/agents/zgso-ja-code-reviewer.agent.md` - Japanese responses (日本語)
- Contains: 20+ anti-patterns, Vue 3 rules, TypeScript patterns, logic quality checks

**UI Creation Prompts** (for systematic screen development):
- 🇻🇳 Vietnamese: `zgso-vi-plan-ui` → `zgso-vi-ui-analyze` → `zgso-vi-ui-generation`
- 🇯🇵 Japanese: `zgso-ja-plan-ui` → `zgso-ja-ui-analyze` → `zgso-ja-ui-generation`
- Workflow: Plan structure → Analyze design → Generate code + tests

## 💡 Important Notes

### GitHub Copilot on Web
- **Auto-load**: `.github/copilot-instructions.md` may be used as context
- **Language policy**: Reference `htmlV3/SO/.github/language-policy.md` when prompting in Vietnamese/Japanese
- **Manual reference**: Instruction files in templates need to be explicitly mentioned
- **@workspace**: Not available on GitHub web (VS Code only)
- **Custom agents**: Not available on GitHub web (VS Code only)

### Best Practices
1. Always select the most specific template for your task
2. Read the referenced instruction files before starting work
3. Fill in all required fields in the template
4. Use checkboxes to track progress
5. Tag `@github/copilot` at the end for AI assistance

## 🔄 Template Maintenance

When updating templates:
1. Keep YAML front matter consistent
2. Update instruction file references if files are renamed/moved
3. Test templates on GitHub web to ensure rendering
4. Update this README if adding new templates

## 🆚 HS vs SK/NV/ZL

Templates are designed to handle both flows:
- **HS (ZGSO)**: WebSocket-based, `Zgso*` models, real-time sync
- **SK/NV/ZL (ZSO)**: C# bridge-based, standard models, batched operations

Templates automatically guide users to the correct instruction files based on business type selection.
---

## 🚀 Quick Start Guide

### For Bug Fixing
```
1. Create Issue → Select "ZGSO Investigate & Fix Bug"
2. Fill in bug description, steps to reproduce, environment
3. PHASE 1: Read ALL instruction files referenced
4. Investigate: Reproduce → Trace → Analyze → Document
5. PHASE 2: Plan fix → Implement → Test → Review
6. Submit PR with regression tests
```

### For Code Review
```
1. Create Issue → Select "Code Review"
2. Link PR/commit to review
3. List changed files
4. Read relevant instruction files based on scope
5. Go through 10-category checklist
6. Document findings (Critical/High/Medium/Low)
7. Approve or Request Changes
```

### For New Screen
```
1. Create Issue → Select "Create New Screen"
2. Fill in screen details, business type, mockup
3. Read ui-generation.instructions.md (PRIMARY)
4. Follow 10-step implementation:
   - Plan → Files → Logic → UI → Events → State → Style → i18n → Tests → Docs
5. Self-review with checklist
6. Submit PR with tests
```

---

## 📖 Instruction Files Overview

All templates reference instruction files from `htmlV3/SO/.github/instructions/`. Here's what each covers:

### Core Standards
- **coding-convention.instructions.md** - File structure, naming, TypeScript standards
- **ui-generation.instructions.md** - Vue 3 Composition API, logic separation, CSS theming

### Order Flow
- **zgso-order-flow-hs.instructions.md** - HS WebSocket order flow
- **zso-order-flow.instructions.md** - SK/NV/ZL C# bridge order flow

### HS Features (15 files)
Each covers specific HS functionality with architecture, flow, implementation, and testing details.

---

## 🎯 When to Use Which Template

| Scenario | Template | Why |
|----------|----------|-----|
| Bug found | ZGSO Investigate & Fix Bug | Ensures thorough investigation before fixing |
| PR submitted | Code Review | Comprehensive review with all standards |
| New page/component | Create New Screen | Step-by-step screen creation guide |
| New feature | Create New Screen | Use for UI features; adapt for backend |
| Refactoring | Code Review | Review refactored code against standards |
| Performance issue | ZGSO Investigate & Fix Bug | Treat as bug, investigate root cause |
| Security issue | ZGSO Investigate & Fix Bug | Critical bugs need full investigation |

---

## ✅ Template Quality Checklist

Before using a template, ensure:
- [ ] Business type identified (HS/SK/NV/ZL/Common)
- [ ] Service type identified (TO/DT/EI/All)
- [ ] Device target known (SO/LO/Both/WPF)
- [ ] Relevant instruction files noted
- [ ] Acceptance criteria defined
- [ ] Test strategy planned

After completing the task:
- [ ] All checklist items completed
- [ ] Code follows referenced instruction files
- [ ] Tests created and passing
- [ ] Documentation updated
- [ ] Code reviewed
- [ ] No TypeScript/console errors
