# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is the **Liquid Glass Generator** - a Next.js application for creating Apple-inspired liquid glass UI effects. The project allows users to generate glassmorphism CSS and components through a visual editor interface.

## Development Commands

Based on package.json scripts:

- **Development**: `npm run dev` - Starts Next.js dev server with Turbopack
- **Build**: `npm run build` - Creates production build  
- **Start**: `npm start` - Starts production server
- **Lint**: `npm run lint` - Runs ESLint with Next.js rules

## Architecture & Tech Stack

### Framework & Language
- **Next.js 15.4.3** with App Router architecture
- **TypeScript 5** for type safety
- **React 19.1.0** for UI components

### Styling & UI
- **Tailwind CSS 4** for utility-first styling with inline themes
- **Geist font family** (Sans & Mono variants) via next/font/google
- Custom CSS variables for theming (light/dark mode support)

### File Structure
```
src/
├── app/                 # Next.js App Router
│   ├── layout.tsx       # Root layout with font setup
│   ├── page.tsx         # Home page component
│   ├── globals.css      # Global styles & Tailwind imports
│   └── favicon.ico      # App icon
```

### Configuration Files
- `next.config.ts` - Next.js configuration (currently minimal)
- `tsconfig.json` - TypeScript config with `@/*` path mapping
- `eslint.config.mjs` - ESLint with Next.js TypeScript rules
- `postcss.config.mjs` - PostCSS configuration for Tailwind

## Key Design Patterns

### Theming System
The app uses CSS custom properties for theming:
- Light mode: `--background: #ffffff`, `--foreground: #171717`
- Dark mode: `--background: #0a0a0a`, `--foreground: #ededed`
- Automatic dark mode detection via `prefers-color-scheme`

### Font Management
Fonts are loaded via next/font/google and exposed as CSS variables:
- `--font-geist-sans` for regular text
- `--font-geist-mono` for code/monospace content

## Implementation Status

### MVP Features (Completed)
The application now includes a fully functional MVP with:

**Core Components:**
- `ControlPanel` - Parameter adjustment sliders, presets, output type selection  
- `PreviewArea` - Real-time liquid glass preview with light/dark mode toggle
- `CodeOutput` - Generated code display with copy functionality
- UI Components: `Button`, `Slider`, `ColorPicker`, `Select`

**Features Implemented:**
- ✅ Real-time preview of liquid glass effects
- ✅ Parameter adjustment (blur, opacity, saturation, border radius, padding)
- ✅ Color customization (background, border with alpha support)
- ✅ Multiple output formats (CSS, HTML, React, Vue)
- ✅ Built-in presets (Modern, Subtle, Bold)
- ✅ Copy to clipboard functionality
- ✅ Light/dark theme toggle in preview
- ✅ Component type selection (Card, Button, Modal, Panel)

### Code Generation
The app generates production-ready code:
- **CSS**: Pure CSS with backdrop-filter and glass effects
- **HTML**: Complete HTML page with embedded styles
- **React**: TypeScript React component with props
- **Vue**: Vue 3 component with composition API

### Technical Implementation
- Uses CSS-in-JS with styled-jsx for preview rendering
- Clipboard API for copy functionality
- Responsive design with Tailwind CSS
- TypeScript for full type safety
- ESLint compliant code

### Next Steps (Per Design Document)
The foundation is ready for Phase 2 features:
- User authentication system
- Database integration for saved presets
- Community preset gallery
- Export/import functionality

### Path Aliases
The project uses `@/*` mapping to `./src/*` for clean imports.