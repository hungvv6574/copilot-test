# 📱 Vue 3 + TypeScript Offline Web Application

## Project Overview

A modern Vue 3 + TypeScript single-page application designed for offline use on Android WebView. The project uses vanilla HTML/CSS (no external UI libraries) with fixed screen resolution of 1920x1200.

---

## 📖 Quick Links

- **Development**: `npm run dev`
- **Build**: `npm run build`
- **Type Check**: `npm run type-check`
- **Documentation**: See [.github/](./.github/) folder

---

## 🏗️ Folder Structure

```
project/
├── index.html                    ← HTML entry point
├── package.json                  ← Dependencies
├── vite.config.ts               ← Vite configuration
├── tsconfig.json                ← TypeScript config
│
└── src/
    ├── main.ts                  ← App initialization
    ├── App.vue                  ← Root component
    ├── components/              ← Reusable components
    ├── pages/                   ← Page components
    ├── services/                ← Business logic & API
    └── resources/               ← Static assets
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

## 🚀 Commands

```bash
# Install dependencies
npm install

# Development server (with hot reload)
npm run dev

# Type checking
npm run type-check

# Build for production
npm run build

# Preview production build
npm run preview
```

---

## 📚 Documentation

Refer to the documentation in `.github/` folder for detailed guides.

---

## 🎓 Common Questions

**Q: How do I set up the project?**  
A: Run `npm install` then `npm run dev`

**Q: Can I use external UI libraries?**  
A: No - vanilla CSS only

**Q: Does it work offline?**  
A: Yes! Designed for offline Android WebView

**Q: What's the screen resolution?**  
A: Fixed at 1920x1200

---

**Status**: Ready for Development ✅  
**Last Updated**: February 21, 2026




tôi có 1 project sử dụng vue3, typscript, javascript, html css thuần không dùng thư viện, nó tạo ra các màn hình dạng web form nhưng có thể chạy offline trên android. tỉ lệ màn hình cố định 19200x1200. dự án có phân tách rõ các layer: models, services, pages, components, resource. tôi muốn bạn hãy lên kế hoạch để tạo 1 agent giúp tôi điều tra lỗi, sửa lỗi, test.