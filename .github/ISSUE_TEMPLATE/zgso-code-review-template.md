---
name: Code Review
about: Request code review with comprehensive context and checklist
title: '[REVIEW] '
labels: review, code-quality
assignees: ''

---

<!-- ========================================================================= -->
<!-- ✏️ USER INPUT SECTION - Please fill in the information below             -->
<!-- ========================================================================= -->

## 📋 Pull Request Review

<!--
Examples:
Please review pull request #123
or
Please review pull request https://github.com/zensho-holdings-002/sopict/pull/123
-->


---

<!-- ========================================================================= -->
<!-- 🤖 COPILOT INSTRUCTIONS BELOW - DO NOT MODIFY                             -->
<!-- The sections below are for GitHub Copilot to guide code review           -->
<!-- ========================================================================= -->

---

# 📚 Required Context for Reviewers

**IMPORTANT**: Reviewers should read these instruction files to evaluate the code correctly:

<details open>
<summary><strong>🏗️ Core Standards (REQUIRED FOR ALL REVIEWS)</strong></summary>

1. `htmlV3/SO/.github/copilot-instructions.md` - Project structure & business types
2. `htmlV3/SO/.github/language-policy.md` - Multilingual prompt/response policy (VN/JP/EN)
3. `htmlV3/SO/.github/instructions/coding-convention.instructions.md` - Coding standards

</details>

<details>
<summary><strong>🔄 Order Flow Context (Read based on Business Type)</strong></summary>

### HS Business Type (WebSocket-based)
4. `htmlV3/SO/.github/instructions/zgso-order-flow-hs.instructions.md` - Core order flow
5. `htmlV3/SO/.github/instructions/zgso-startup-hs.instructions.md` - Startup & WebSocket

### SK/NV/ZL Business Type (C# Bridge-based)
6. `htmlV3/SO/.github/instructions/zso-order-flow.instructions.md` - ZSO order flow

</details>

<details open>
<summary><strong>🤖 Code Review Agents (Comprehensive Review Rules)</strong></summary>

**Use these agents for detailed code review** - They contain consolidated rules from all instruction files:

### 🇻🇳 Vietnamese Code Reviewer
- **Agent**: `htmlV3/SO/.github/agents/zgso-vi-code-reviewer.agent.md`
- **Usage**: Mention `@review-code-vi` in comments for Vietnamese responses
- **Contains**: Vue 3 patterns, TypeScript rules, logic quality checks, memory management, anti-patterns

### 🇯🇵 Japanese Code Reviewer
- **Agent**: `htmlV3/SO/.github/agents/zgso-ja-code-reviewer.agent.md`
- **Usage**: Mention `@review-code-ja` in comments for Japanese responses (日本語で返答します)
- **Contains**: Same comprehensive rules in Japanese

**These agents cover:**
- ✅ All critical rules (Vue 3 Composition API, reactive state, events, multilingual text, CSS variables)
- ✅ Important patterns (logging, lifecycle, singletons, language arrays, menu utilities)
- ✅ Component structure (file naming, business type folders, dialog/page structure)
- ✅ Logic code quality (loops, conditionals, memory management, timer management, type consistency, function length & naming)
- ✅ Common anti-patterns (20+ items to avoid)

</details>

---

# ✅ COMPREHENSIVE REVIEW CHECKLIST

<details open>
<summary><strong>1️⃣ Architecture & Design</strong></summary>

- [ ] Vue component + Logic class in correct folders (`src/page/[BT]/`, `src/logic/page/[BT]/`)
- [ ] Business type separation (no mixing HS/SK/NV/ZL)
- [ ] Vue 3 Composition API (`defineComponent()` + `setup()`)
- [ ] Logic separation (no business logic in Vue template)
- [ ] File naming correct (PascalCase/camelCase/kebab-case)
- [ ] Imports organized, no dead code

</details>

<details>
<summary><strong>2️⃣ TypeScript & Type Safety</strong></summary>

- [ ] All parameters typed (no implicit `any`)
- [ ] Return types specified
- [ ] Interfaces/types defined for complex objects
- [ ] Null checks (`?.`, `??`), type guards where needed
- [ ] No TypeScript errors, strict mode compliant

</details>

<details>
<summary><strong>3️⃣ Vue 3 Specific</strong></summary>

- [ ] `setup()` structure correct (refs, computed, methods, lifecycle)
- [ ] `ref()` for primitives, `reactive()` for objects
- [ ] Computed optimized (no side effects)
- [ ] `v-for` with `:key`, event handlers correct (`@touchend`)
- [ ] Props/emits properly typed and declared

</details>

<details>
<summary><strong>4️⃣ Order Flow & Business Logic</strong></summary>

### HS (WebSocket-based)
- [ ] `ZgsoOrder.Instance`, `ZSOIF.ZGIF` used correctly
- [ ] WebSocket events registered/cleaned up properly
- [ ] Table status = 2 checked before order submission

### SK/NV/ZL (C# Bridge-based)
- [ ] `Order.Instance`, `ZSOIF.ZIF` used correctly
- [ ] C# bridge error callbacks handled

### Common
- [ ] Order data safety, state consistency
- [ ] User-friendly error messages, loading states

</details>

<details>
<summary><strong>5️⃣ CSS & Styling</strong></summary>

- [ ] CSS variables used (no hardcoded colors/sizes)
- [ ] Scoped styles, responsive design for target resolution
- [ ] Touch targets ≥44px, theme consistency

</details>

<details>
<summary><strong>6️⃣ Performance</strong></summary>

- [ ] No unnecessary re-renders (computed/watch optimized)
- [ ] Memory leaks prevented (event listeners/timers cleaned)
- [ ] Async operations: proper async/await, no blocking, debouncing/throttling

</details>

<details>
<summary><strong>7️⃣ Error Handling & Logging</strong></summary>

- [ ] Try-catch around async operations
- [ ] User feedback for errors, graceful degradation
- [ ] `LogUtil.write()` used, no debug console.log
- [ ] Sensitive data protected

</details>

<details>
<summary><strong>8️⃣ Testing</strong></summary>

- [ ] Test coverage: Unit + Integration + E2E (CSV + Playwright)
- [ ] Edge cases & error cases tested
- [ ] CSV updated, Page Objects created
- [ ] Tests readable, isolated, mocks appropriate

</details>

<details>
<summary><strong>9️⃣ Security</strong></summary>

- [ ] Input sanitized (XSS prevention)
- [ ] Numbers validated, file paths checked
- [ ] Sensitive data protected (no exposure in logs/UI)

</details>

<details>
<summary><strong>🔟 Documentation & Maintainability</strong></summary>

- [ ] JSDoc for public methods/classes
- [ ] Code self-documenting (clear names)
- [ ] Functions small, nesting limited, no duplication
- [ ] Instruction files updated if new patterns

</details>

---

# 🎯 Review Summary

## Strengths
<!-- What's done well -->


## Issues Found

### Critical (Must Fix)
<!-- Blocking issues that must be fixed -->


### High Priority (Should Fix)
<!-- Important issues that should be addressed -->


### Medium Priority (Nice to Fix)
<!-- Improvements that would be beneficial -->


### Low Priority / Suggestions
<!-- Minor suggestions or future improvements -->


## Overall Assessment
- [ ] **Approved**: Code meets all standards, ready to merge
- [ ] **Approved with Minor Changes**: Minor fixes needed but can merge
- [ ] **Request Changes**: Significant issues must be addressed
- [ ] **Needs Discussion**: Major design decisions need team input

## Recommendation
<!-- Final verdict and next steps -->


---

**@github/copilot**: When reviewing this code, please:
1. Read the core instruction files listed above (copilot-instructions.md, language-policy.md, coding-convention.instructions.md)
2. Read the relevant order flow instruction based on business type (HS vs SK/NV/ZL)
3. **Use the code review agents** (`zgso-vi-code-reviewer.agent.md` or `zgso-ja-code-reviewer.agent.md`) as comprehensive checklists - they contain all critical rules, patterns, and anti-patterns
4. Check compliance with Vue 3 Composition API and TypeScript standards
5. Verify proper logic separation (no business logic in Vue components)
6. Ensure HS vs SK/NV/ZL separation is maintained
7. Check WebSocket event handling (HS) or C# bridge calls (SK/NV/ZL)
8. Verify test coverage (CSV + Playwright)
9. Look for potential bugs, memory leaks, or performance issues

**For multilingual responses:**
- Vietnamese developers: Use `@review-code-vi`
- Japanese developers: Use `@review-code-ja`
- English (default): Use `@github/copilot`

Focus on:
- Architecture compliance with instruction files
- Type safety and error handling
- Order data safety and state consistency
- Performance and memory management (loops, conditionals, timers, cache)
- Function quality (length < 50 lines, clear naming, no deep nesting)
- Test coverage and quality
