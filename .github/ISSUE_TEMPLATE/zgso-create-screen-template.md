---
name: Create New Screen
about: Create a complete new screen with Vue component, logic, styles, and tests
title: '[SCREEN] '
labels: enhancement, ui, new-feature
assignees: ''

---

<!-- ========================================================================= -->
<!-- ✏️ USER INPUT SECTION - Please fill in the information below             -->
<!-- ========================================================================= -->

## 📋 Screen Description

**Business Type:** HS | SK | NV | ZL | Common

**Screen Type:** Page | Dialog | Component

**Screen Name:**
<!--
Use PascalCase with .vue extension
Examples:
- Page: PaymentInfo.vue, TableSelection.vue
- Dialog: OrderConfirm.vue, MenuDetail.vue
- Component: GridView.vue, MenuCard.vue
-->

**File Location**:
<!--
Examples:
- Page: src/page/[HS]/[PaymentInfo.vue]
- Dialog: src/component/[HS]/[OrderConfirm.vue]
- Component: src/component/Common/[GridView.vue]
-->

### Design Image File Reference
<!--
Attach screenshots, Figma link, or wireframes
📎 Paste image files directly into the issue
-->


---

<!-- ========================================================================= -->
<!-- 🤖 COPILOT INSTRUCTIONS BELOW - DO NOT MODIFY                             -->
<!-- The sections below are for GitHub Copilot to guide implementation        -->
<!-- ========================================================================= -->

---

# 📚 Required Instructions (MUST READ BEFORE IMPLEMENTATION)

<details open>
<summary><strong>🏗️ Core Standards (REQUIRED FOR ALL SCREENS)</strong></summary>

1. `htmlV3/SO/.github/copilot-instructions.md` - Project structure & business types
2. `htmlV3/SO/.github/language-policy.md` - Multilingual prompt/response policy (VN/JP/EN)
3. `htmlV3/SO/.github/instructions/coding-convention.instructions.md` - Coding standards
4. `htmlV3/SO/.github/instructions/ui-generation.instructions.md` - **PRIMARY REFERENCE** for Vue 3 patterns

</details>

<details>
<summary><strong>🔄 Order Flow (Read based on Business Type)</strong></summary>

### HS Business Type (WebSocket-based)
5. `htmlV3/SO/.github/instructions/zgso-order-flow-hs.instructions.md` - Core order flow
6. `htmlV3/SO/.github/instructions/zgso-startup-hs.instructions.md` - Startup & WebSocket

### SK/NV/ZL Business Type (C# Bridge-based)
7. `htmlV3/SO/.github/instructions/zso-order-flow.instructions.md` - ZSO order flow

</details>

<details open>
<summary><strong>🎨 UI Design & Implementation Workflow</strong></summary>

**Use these prompts for systematic UI creation** - They guide you through design analysis and code generation:

### 🇻🇳 Vietnamese UI Workflow Prompts

**Step 1: Plan UI Structure**
- **Prompt**: `htmlV3/SO/.github/prompts/zgso-vi-plan-ui.prompt.md`
- **Purpose**: Analyze design image and plan component structure
- **Usage**: `/zgso-vi-plan-ui` + attach design image

**Step 2: Analyze Design Specifications**
- **Prompt**: `htmlV3/SO/.github/prompts/zgso-vi-ui-analyze.prompt.md`
- **Purpose**: Extract precise CSS measurements, colors, fonts from design
- **Usage**: `/zgso-vi-ui-analyze` + attach design image

**Step 3: Generate Code**
- **Prompt**: `htmlV3/SO/.github/prompts/zgso-vi-ui-generation.prompt.md`
- **Purpose**: Generate Vue component, Logic class, CSS, and tests
- **Usage**: `/zgso-vi-ui-generation` with analysis results

### 🇯🇵 Japanese UI Workflow Prompts

**ステップ1: UI構造を計画**
- **Prompt**: `htmlV3/SO/.github/prompts/zgso-ja-plan-ui.prompt.md`
- **用途**: デザイン画像を分析し、コンポーネント構造を計画
- **使用方法**: `/zgso-ja-plan-ui` + デザイン画像を添付

**ステップ2: デザイン仕様を分析**
- **Prompt**: `htmlV3/SO/.github/prompts/zgso-ja-ui-analyze.prompt.md`
- **用途**: デザインから正確なCSS寸法、色、フォントを抽出
- **使用方法**: `/zgso-ja-ui-analyze` + デザイン画像を添付

**ステップ3: コードを生成**
- **Prompt**: `htmlV3/SO/.github/prompts/zgso-ja-ui-generation.prompt.md`
- **用途**: Vueコンポーネント、Logicクラス、CSS、テストを生成
- **使用方法**: `/zgso-ja-ui-generation` 分析結果と共に

**Recommended Workflow:**
1. 📐 Plan → 2. 🔍 Analyze → 3. 💻 Generate → 4. ✅ Review with agents

</details>

---

# 📋 IMPLEMENTATION CHECKLIST

<details open>
<summary><strong>Phase 1: Planning & Design</strong></summary>

- [ ] Screen purpose & user stories defined
- [ ] UI mockup approved, responsive design verified
- [ ] Data sources & state structure designed
- [ ] API calls/WebSocket events mapped (based on BT)
- [ ] Error states & edge cases identified

</details>

<details open>
<summary><strong>Phase 2: File Structure Setup</strong></summary>

- [ ] Vue component: `src/page/[BT]/[ScreenName]Page.vue` (PascalCase)
- [ ] Logic class: `src/logic/page/[BT]/[ScreenName]PageLogic.ts`
- [ ] Models/types: `src/model/` (if needed)

</details>

<details>
<summary><strong>Phase 3-7: Implementation (Vue Component, Logic, Styling, i18n)</strong></summary>

### Vue Component
- [ ] Template: Semantic HTML, business type classes, no inline logic
- [ ] Script: `defineComponent()` + `setup()`, logic class instantiated, lifecycle hooks
- [ ] Style: Scoped CSS, theme variables (no hardcoded colors), touch targets ≥44px

### Logic Class
- [ ] Structure: `activate()`, `deactivate()`, error handling, TypeScript types
- [ ] HS: WebSocket events in `activate()`, cleanup in `deactivate()`, use `ZgsoOrder.Instance`
- [ ] SK/NV/ZL: C# bridge calls via `ZSOIF.ZIF`, use `Order.Instance`

### Event & State
- [ ] Touch events: `@click` + `@touchend`, debouncing if needed
- [ ] State: `ref()` for primitives, `reactive()` for objects, `computed()` for derived
- [ ] Navigation: `PageStack.Instance.push()/pop()`

### Styling & i18n
- [ ] CSS variables: `var(--background-base-default)`, `var(--text-default)`, etc.
- [ ] Responsive: Target resolution (HS: 1680x1050, SK-L: 1920x1200, etc.)
- [ ] i18n: `DictTextView` component, no hardcoded text

</details>

<details>
<summary><strong>Phase 8-9: Testing</strong></summary>

### Test Planning
- [ ] Test scenarios: Normal, error, edge cases
- [ ] Navigation, interactions, error cases tested
- [ ] Cross-device: SO + LO (if HS)

### CSV Test Cases
- [ ] CSV: `tests/test-data/[BT]-[screen-name]-testcases.csv`
- [ ] Test IDs: `[BT][Screen][N/E/M][XX]` (N=Normal, E=Error, M=Manual)
- [ ] Columns: TestID, TestName, BusinessType, SalesType, Steps, ExpectedResults

### Playwright Tests
- [ ] Spec: `tests/[BT]/specs/[screen-name].spec.ts`
- [ ] Page Object: `tests/[BT]/page-objects/[ScreenName]Page.ts`
- [ ] Use `clickWithTouch()` helper, `data-testid` selectors

### Manual Testing
- [ ] Real device (Android/WPF), all BT/ST combinations
- [ ] Touch gestures, performance, memory leaks

</details>

<details>
<summary><strong>Phase 10: Documentation</strong></summary>

- [ ] JSDoc for logic class/methods
- [ ] Update instruction files if new pattern
- [ ] README if major feature

</details>

---

# 🎯 Quick Implementation Steps

<details open>
<summary><strong>Recommended Order</strong></summary>

1. **Plan** → Requirements, mockup, data sources
2. **Files** → Create Vue component + Logic class
3. **Logic** → `activate()`/`deactivate()`, data loading, error handling
4. **UI** → Template, setup function, styles (theme variables)
5. **Test** → CSV + Playwright + Manual
6. **Polish** → TypeScript clean, no console errors, performance check
7. **Docs** → JSDoc, update instructions

</details>

---

# ✅ Acceptance Criteria

<details open>
<summary><strong>Definition of Done</strong></summary>

- [ ] Screen displays correctly on target device
- [ ] All interactions work (buttons, inputs, navigation)
- [ ] Loading states & errors displayed appropriately
- [ ] Touch events smooth, theme consistent
- [ ] Tests pass (CSV + Playwright), no TS/console errors
- [ ] Code reviewed & approved

</details>

---

# 📎 Additional Notes
<!-- Any special considerations, dependencies, or context -->


---

**@github/copilot**: When creating this screen, please:
1. **Read instruction files first**: Start with `ui-generation.instructions.md` for patterns
2. **Follow business type**: Use HS instructions for HS, ZSO for SK/NV/ZL
3. **Implement in order**: Logic class first, then Vue component, then tests
4. **Maintain separation**: Business logic in `.ts`, UI in `.vue`
5. **Use Composition API**: `defineComponent()` + `setup()`, NO Options API
6. **Theme variables**: All CSS from theme, no hardcoded colors
7. **Touch events**: Handle both click and touchend
8. **Type safety**: Full TypeScript typing, no `any`
9. **Test coverage**: CSV + Playwright + Page Objects
10. **WebSocket (HS)**: Register events in activate(), cleanup in deactivate()

Critical files to reference:
- `htmlV3/SO/.github/instructions/ui-generation.instructions.md` (PRIMARY)
- `htmlV3/SO/.github/instructions/coding-convention.instructions.md`
- Business type specific order flow instruction file
- Feature-specific instruction files if applicable
