# Copilot Instructions for copilot-test

Vue 3 + TypeScript frontend application using Vite for fast development and building.

## Project Overview

A modern Vue 3 single-page application with TypeScript, styled with CSS. Uses Vite as the build tool for optimal developer experience and production performance.

## Architecture & Components

- **Entry Point**: [index.html](../index.html) - HTML template
- **Main App**: [src/main.ts](../src/main.ts) - Vue app initialization
- **Root Component**: [src/App.vue](../src/App.vue) - Main Vue component with setup syntax
- **Build Tool**: Vite (vite.config.ts)
- **TypeScript Config**: tsconfig.json with strict mode enabled

### Component Structure
- Use Vue 3 `<script setup lang="ts">` syntax for components
- Define types explicitly; avoid implicit `any`
- Reactive state with `ref<Type>()` for primitives, `reactive()` for objects
- Example in [src/App.vue](../src/App.vue): `const count = ref(0)`

## Development Workflows

### Setup & Installation
```bash
npm install
```

### Development Server
```bash
npm run dev
```
Starts Vite dev server on port 5173 with auto-reload.

### Build for Production
```bash
npm run build
```
Includes TypeScript type checking before bundling.

### Type Checking
```bash
npm run type-check
```
Run Vue TypeScript compiler to catch type errors without building.

### Preview Production Build
```bash
npm run preview
```

## Conventions & Patterns

### Component Naming
- Use PascalCase for component files: `MyComponent.vue`
- Import with consistent casing: `import MyComponent from './MyComponent.vue'`

### TypeScript in Vue
- Always specify return types on functions: `const handler = (): void => {}`
- Use `import type` for type-only imports
- Define component props with `withDefaults()` for optional props with defaults

### Styling
- Use `<style scoped>` to isolate component styles
- CSS variables for theming: `--primary-color: #42b983`
- Responsive design with mobile-first approach

### File Organization
- Components go in `src/components/` (create as needed)
- Views/pages in `src/views/`
- Composables (reusable logic) in `src/composables/`
- Utilities in `src/utils/`
- Types in `src/types/`

## Key Files & Directories

- [package.json](../package.json) - Dependencies and scripts
- [vite.config.ts](../vite.config.ts) - Vite configuration
- [tsconfig.json](../tsconfig.json) - TypeScript strict mode with Vue support
- [src/](../src/) - Source code
- [index.html](../index.html) - HTML entry point

## Dependencies & Tools

- **Vue 3**: Progressive JavaScript framework
- **Vite**: Next-gen build tool (dev server + bundler)
- **TypeScript**: Static typing for JavaScript
- **vue-tsc**: Type checking tool for Vue 3

---

**When adding features**: Update this file with new patterns, components, or workflows discovered during development.
