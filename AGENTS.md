# AGENTS.md

This file provides guidance to Coding Agents when working with code in this repository, including migration strategy from the legacy React 17 version to the modern React 19 architecture.

## Overview

React Image Annotate is a powerful React component library for image and video annotation. It provides a customizable interface for adding bounding boxes, points, polygons, and other annotations to images and videos.

## Migration Strategy

### Target Architecture
The modern `@karlorz/image-annotate` (published at npm) represents the migration target with:
- React 19 with TypeScript 5.9.3
- Tailwind CSS 4.1.16 (while maintaining Material-UI v5 compatibility)
- Vite 7.1.12 build system

### Finding Migration Documentation with context7

**IMPORTANT**: When migrating components from React 17 to React 19, use context7 to find specific migration guides:

```
# For React version migration guides:
1. Use context7 to search "React 18 migration guide"
2. Use context7 to search "React 19 breaking changes"
3. Use context7 to search "React concurrent features migration"

# For Material-UI to Tailwind migration:
1. Use context7 to search "Material-UI v5 with Tailwind CSS integration"
2. Use context7 to search "MUI sx prop to Tailwind utilities"

# For webpack to Vite migration:
1. Use context7 to search "webpack to Vite migration guide"
2. Use context7 to search "Vite configuration for React library"
```

### Migration Rules for Agents

1. **DO NOT include large documentation snippets in code** - Instead, query context7 for specific migration topics
2. **ALWAYS check context7 first** for React hooks changes, concurrent features, and breaking changes
3. **Use deepwiki** for understanding the modern `@karlorz/image-annotate` architecture
4. **Keep Material-UI v5 working** while adding Tailwind CSS support for new components

### Material-UI + Tailwind CSS Compatibility

To maintain both styling systems during migration:

1. **Install both systems side-by-side**:
   ```bash
   # Keep Material-UI v6
   npm install @mui/material @emotion/react @emotion/styled

   # Add Tailwind CSS
   npm install -D tailwindcss postcss autoprefixer
   
   # Or with bun
   bun add @mui/material @emotion/react @emotion/styled
   bun add -D tailwindcss postcss autoprefixer
   ```

2. **Configure Tailwind to avoid conflicts**:
   ```javascript
   // tailwind.config.js
   module.exports = {
     important: '#tw-root', // Use ID selector to increase specificity
     corePlugins: {
       preflight: false, // Disable Tailwind's base reset to keep MUI styles
     }
   }
   ```

3. **Migration Pattern for Components**:
   - Phase 1: Keep existing MUI components working
   - Phase 2: Create new components with Tailwind
   - Phase 3: Gradually migrate MUI components to Tailwind
   - Phase 4: Remove MUI dependencies when complete

4. **Styling Priority**:
   - Use MUI's `sx` prop for existing components
   - Use Tailwind classes for new components
   - Use CSS modules for complex custom styles

### Key Migration Checkpoints

When migrating from React 17 to React 19, agents should verify:

1. **React 18 Breaking Changes** (use context7 for details):
   - Automatic batching behavior
   - Strict Mode double rendering in development
   - New root API (`createRoot` instead of `ReactDOM.render`)
   - Suspense changes

2. **React 19 Updates** (use context7 for specifics):
   - Server Components support
   - Actions and form handling
   - Use hook improvements
   - Compiler optimizations

3. **State Management Migration**:
   - From Redux patterns to React Context + useReducer
   - From seamless-immutable to Immer or native immutability
   - State update patterns with automatic batching

4. **Build System Migration** (webpack → Vite):
   - Module resolution differences
   - Environment variable handling (import.meta.env)
   - Dynamic imports and code splitting
   - Development server configuration

### Component Migration Priority

Focus on migrating in this order:
1. **Core Canvas Components** (ImageCanvas) - Critical path
2. **Annotation Tools** (BoundingBoxTool, PolygonTool, etc.)
3. **UI Controls** (Sidebars, Toolbars)
4. **Utility Components** (Dialogs, Menus)

## Package Manager

**Primary**: npm (recommended and default)
**Alternative**: bun (for faster installs, optional)

**Yarn is not used in this repository.** All lock files should be npm-based (package-lock.json).

## Development Commands

### Core Commands
- `npm install` - Install dependencies (use `--legacy-peer-deps` if needed for React 19 compatibility)
  - Alternative: `bun install`
- `npm run storybook` - Start Storybook development server on port 9090 (primary development environment)
  - **Note**: Now works natively with Node.js 20+ without requiring `NODE_OPTIONS=--openssl-legacy-provider`
  - Alternative: `bun run storybook`
- `npm start` or `npm run dev` - Start Vite development server
  - Alternative: `bun run dev`
- `npm test` - Run tests with Vitest
  - Alternative: `bun test`
- `npm run build` - Build library for distribution (outputs to ./dist)
  - Alternative: `bun run build`
- `npm run dist` - Build and publish to npm
  - Alternative: `bun run dist`

### Code Quality
- `npm run lint` - Check code with ESLint (alternative: `bun run lint`)
- `npm run lint:fix` - Auto-fix ESLint issues (alternative: `bun run lint:fix`)
- `npm run prettier` - Format source files (alternative: `bun run prettier`)
- `npm run format` - Format all files including JSON/Markdown (alternative: `bun run format`)

### Deployment
- `npm run build:gh-pages` - Build demo site for GitHub Pages
  - Alternative: `bun run build:gh-pages`
- `npm run gh-pages` - Build and deploy to GitHub Pages
  - Alternative: `bun run gh-pages`

## Architecture Overview

### Core Structure
The library follows a Redux-based architecture with immutable state management:

1. **Entry Point**: `src/lib.js` exports the main `Annotator` component
2. **Main Component**: `src/Annotator/index.js` - Orchestrates the entire annotation interface
3. **Layout**: `src/MainLayout/index.js` - Manages the overall UI layout and toolbar
4. **State Management**: Uses Redux with custom reducers in `src/Annotator/reducers/`:
   - `general-reducer.js` - Handles general annotation actions
   - `image-reducer.js` - Manages image-specific state
   - `video-reducer.js` - Manages video-specific state
   - `history-handler.js` - Implements undo/redo functionality
   - `combine-reducers.js` - Combines reducers based on annotation type

### Key Components

- **ImageCanvas** (`src/ImageCanvas/`) - Core canvas component for rendering images and annotations
- **RegionLabel** (`src/RegionLabel/`) - Component for displaying and editing region labels
- **Sidebar Components** (`src/*SidebarBox/`) - Various sidebar panels for different functionalities
- **SettingsProvider** (`src/SettingsProvider/`) - Context provider for global settings
- **Theme** (`src/Theme/`) - Material-UI theming configuration

### Annotation Types
The library supports multiple annotation types through the `enabledTools` prop:
- `select` - Selection tool
- `create-point` - Point annotations
- `create-box` - Bounding box annotations
- `create-polygon` - Polygon annotations
- `create-line` - Line annotations
- `create-expanding-line` - Expanding line annotations
- `show-mask` - Mask visualization

### Data Flow
1. User interactions trigger actions dispatched to reducers
2. Reducers update the immutable state using seamless-immutable
3. State changes propagate through React components
4. The `onExit` callback returns the complete annotation state

## Key Technologies

- **React 19** with Hooks and new features
- **Material-UI v6** for UI components
- **Immer** for immutable state management (migrated from seamless-immutable)
- **react-hotkeys** for keyboard shortcuts
- **transformation-matrix-js** for canvas transformations
- **Storybook v8/10** with Vite for component development and documentation
- **Vite 7.1.12** for build tooling and dev server
- **Vitest** for testing
- **ESLint 9** with React 19 plugins for code quality
- **Prettier** for code formatting
- **Flow** type checking (note: `// @flow` comments present but being phased out)

## Development Notes

### State Management
The application uses a custom Redux-like pattern without Redux itself. The state is made immutable using Immer (migrated from seamless-immutable), and all updates go through reducers. See `src/utils/immutable-helpers.js` for the compatibility layer.

### Coordinate Systems
Annotations use normalized coordinates (0-1 range) relative to image dimensions, making them resolution-independent.

### Keyboard Shortcuts
The library includes comprehensive keyboard shortcuts managed through `react-hotkeys` and the `ShortcutsManager` component.

### Testing
Tests are configured with Vitest. Run with `npm test` or `bun test`.

## Node.js and Runtime Compatibility

**Current Status**: This project supports Node.js 20+ and Bun!

### Migration Completed
- **React**: 17.0.0 → 19.0.0 ✅
- **Build System**: Create React App (webpack) → Vite 7.1.12 ✅
- **Storybook**: 7.x (webpack) → 8.x/10.x (Vite) ✅
- **State Management**: seamless-immutable → Immer ✅
- **Material-UI**: v5 → v6 ✅

### Requirements
- **Node.js**: 20 LTS or later (recommended)
- **npm**: 9+ or **bun**: latest
- **No longer required**: `NODE_OPTIONS=--openssl-legacy-provider` flag

### Package Manager Notes
- Use `npm install --legacy-peer-deps` for React 19 peer dependency compatibility
- Or use `bun install` which handles peer dependencies automatically
- **Do not use yarn** - this repository uses npm/bun only

## React StrictMode Migration Rules

### Critical Fixes for StrictMode Compatibility

1. **react-hotkeys Incompatibility**
   - **Issue**: react-hotkeys v2.0.0 accesses internal React structures (`childIds`) that don't exist in React 19
   - **Fix**: Disable the `withHotKeys` HOC wrapper temporarily
   - **TODO**: Migrate to `react-hotkeys-hook` for full compatibility

2. **Storybook 10 Migration**
   - **Import Path**: Use `storybook/test` NOT `@storybook/test`
   - **Mock Functions**: Use `fn()` from `storybook/test` instead of `action()` from addon-actions
   - **Pattern**: Create a single `const actionSpy = fn()` instance for middleware

3. **Component Migration from External Libraries**
   - Migrate all components from unmaintained `react-material-workspace-layout` into local `/src/WorkspaceLayout/`
   - Ensure all components are React 19 compliant with proper cleanup

4. **StrictMode Enablement Checklist**
   - ✅ Enable in `/src/index.jsx` with `<React.StrictMode>`
   - ✅ Enable in `/.storybook/preview.js` decorators
   - ✅ Fix all "childIds undefined" errors (usually from outdated HOCs)
   - ✅ Verify no duplicate renders cause side effects

### Common StrictMode Issues and Solutions

| Issue | Root Cause | Solution |
|-------|------------|----------|
| "Cannot read properties of undefined (reading 'childIds')" | Outdated HOC accessing React internals | Remove/replace HOC with hooks |
| Double rendering in dev | StrictMode intentional behavior | Ensure effects have proper cleanup |
| Storybook action errors | Wrong import path in v10 | Use `storybook/test` not `@storybook/test` |
| "action is not defined" | Deprecated addon-actions | Use `fn()` from `storybook/test` |

## Recent Updates

### v2.0.0 - Full React 19 StrictMode Support (2025-11-07)

**Major Achievement: Full React 19 StrictMode Compliance** ✅

- Migrated from `react-material-workspace-layout` to local components
- Fixed react-hotkeys incompatibility with React 19
- Updated Storybook to v10 with modern `fn()` mocking pattern
- All components now properly handle StrictMode double rendering

### v1.10.6+ - React 18 & 19 Compatibility (2025-01-06)

**Fixed: "Invalid hook call" errors when using the package with React 18**

The package now properly supports both React 18 and React 19 through corrected peer dependencies:
