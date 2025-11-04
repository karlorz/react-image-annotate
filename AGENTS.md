# AGENTS.md

This file provides guidance to Coding Agents when working with code in this repository.

## Overview

React Image Annotate is a powerful React component library for image and video annotation. It provides a customizable interface for adding bounding boxes, points, polygons, and other annotations to images and videos.

## Development Commands

### Core Commands
- `yarn install` - Install dependencies
- `NODE_OPTIONS=--openssl-legacy-provider yarn storybook` - Start Storybook development server on port 9090 (primary development environment)
  - **Note**: Requires `NODE_OPTIONS=--openssl-legacy-provider` for Node.js 17+ due to OpenSSL 3.0 compatibility with webpack 4
- `NODE_OPTIONS=--openssl-legacy-provider yarn start` - Start React development server
- `yarn test` - Run tests with react-scripts
- `yarn build` - Build library for distribution (outputs to ./dist)
- `yarn dist` - Build and publish to npm

### Code Quality
- `yarn prettier` - Format all source files
- `yarn prettier:test` - Check formatting without modifying files

### Deployment
- `yarn build:gh-pages` - Build demo site for GitHub Pages
- `yarn gh-pages` - Build and deploy to GitHub Pages

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
- **Storybook** for component development and documentation
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

## Common Development Tasks

### Adding a New Annotation Tool
1. Add the tool to `enabledTools` array in component props
2. Implement tool logic in `src/ImageCanvas/`
3. Add reducer cases in `src/Annotator/reducers/general-reducer.js`
4. Update the toolbar in `src/MainLayout/`

### Modifying the Sidebar
Sidebar components are in directories ending with `SidebarBox`. Each implements a self-contained panel that can be toggled in the main layout.

### Customizing Region Labels
Use the `RegionEditLabel` prop to provide a custom component for editing region properties.

## Important Files

- `src/MainLayout/types.js` - Type definitions for the application state
- `src/ImageCanvas/region-tools.js` - Region manipulation utilities
- `src/MainLayout/icon-dictionary.js` - Icon mappings for the UI
- `.storybook/` - Storybook configuration
- `.babelrc` - Babel configuration for the build process

## Automated Dependency Management

### Dependabot Configuration
The repository includes automated dependency updates via GitHub Dependabot:

- **Configuration**: `.github/dependabot.yml`
- **Schedule**: Weekly updates every Monday at 9:00 AM EST
- **Auto-merge**: Minor and patch updates are automatically approved and merged via `.github/workflows/dependabot-auto-merge.yml`
- **Protected versions**: Major updates for React, webpack, and react-scripts are ignored to prevent breaking changes

### Key Features
- **Grouped updates**: Dependencies are grouped by type (production/development) for easier review
- **Automatic labels**: PRs are tagged with `dependencies` and `automated`
- **Security updates**: Vulnerable dependencies are automatically updated
- **Major version protection**: Major updates require manual review and testing

### Manual Override
To manually trigger Dependabot or customize behavior:
1. Navigate to the repository's "Insights" → "Dependency graph" → "Dependabot" tab
2. Click "Check for updates" to trigger immediate dependency checks
3. Edit `.github/dependabot.yml` to modify schedule, ignore rules, or grouping

## Node.js Version Compatibility

**Important**: This project uses webpack 4 and Storybook 5, which require special configuration for Node.js 17+:

- **Issue**: Node.js 17+ uses OpenSSL 3.0, which removed legacy crypto algorithms
- **Solution**: Use `NODE_OPTIONS=--openssl-legacy-provider` when running development commands
- **Alternative**: Use Node.js 14 or 16 (LTS versions that include OpenSSL 1.1.1)

To set this permanently, add to your shell profile (`~/.zshrc` or `~/.bashrc`):
```bash
export NODE_OPTIONS=--openssl-legacy-provider
```