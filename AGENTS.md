# AGENTS.md

This file provides guidance to Coding Agents when working with code in this repository.

## Overview

React Image Annotate is a powerful React component library for image and video annotation. It provides a customizable interface for adding bounding boxes, points, polygons, and other annotations to images and videos.

## Development Commands

### Core Commands
- `yarn install` or `npm install` - Install dependencies
- `yarn storybook` or `npm run storybook` - Start Storybook development server on port 9090 (primary development environment)
  - **Note**: Now works natively with Node.js 20+ without requiring `NODE_OPTIONS=--openssl-legacy-provider`
- `yarn start` or `npm start` - Start React development server
- `yarn test` or `npm test` - Run tests with react-scripts
- `yarn build` or `npm run build` - Build library for distribution (outputs to ./dist)
- `yarn dist` or `npm run dist` - Build and publish to npm

### Code Quality
- `yarn prettier` or `npm run prettier` - Format all source files
- `yarn prettier:test` or `npm run prettier:test` - Check formatting without modifying files

### Deployment
- `yarn build:gh-pages` or `npm run build:gh-pages` - Build demo site for GitHub Pages
- `yarn gh-pages` or `npm run gh-pages` - Build and deploy to GitHub Pages

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

- **React 17** with Hooks
- **Material-UI v5** for UI components
- **seamless-immutable** for immutable state management
- **react-hotkeys** for keyboard shortcuts
- **transformation-matrix-js** for canvas transformations
- **Storybook v7** for component development and documentation
- **react-scripts v5** (Create React App) for build tooling
- **webpack 5** via Storybook and react-scripts
- **Flow** type checking (note: `// @flow` comments present but not enforced)

## Development Notes

### State Management
The application uses a custom Redux-like pattern without Redux itself. The state is made immutable using seamless-immutable, and all updates go through reducers.

### Coordinate Systems
Annotations use normalized coordinates (0-1 range) relative to image dimensions, making them resolution-independent.

### Keyboard Shortcuts
The library includes comprehensive keyboard shortcuts managed through `react-hotkeys` and the `ShortcutsManager` component.

### Testing
Currently no test files are present in the codebase. The `yarn test` command uses react-scripts test runner but no tests are implemented.

## Node.js Version Compatibility

**Current Status**: This project now supports Node.js 20+ natively!

- **Upgraded**: react-scripts 3.x → 5.x (webpack 4 → webpack 5)
- **Upgraded**: Storybook 5.x → 7.x (webpack 5 support)
- **No longer required**: `NODE_OPTIONS=--openssl-legacy-provider` flag
- **Recommended**: Node.js 20 LTS or later