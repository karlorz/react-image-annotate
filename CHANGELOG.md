## [4.0.1](https://github.com/karlorz/react-image-annotate/compare/v4.0.0...v4.0.1) (2025-11-08)


### Bug Fixes

* Update dist files list and bump package version ([b50399f](https://github.com/karlorz/react-image-annotate/commit/b50399f7880b429bf1f81c0415a346b239c5ef41))

# [4.0.0](https://github.com/karlorz/react-image-annotate/compare/v3.0.0...v4.0.0) (2025-11-08)


### Bug Fixes

* Add automatic CHANGELOG generation with semantic-release ([#9](https://github.com/karlorz/react-image-annotate/issues/9)) ([cdcce43](https://github.com/karlorz/react-image-annotate/commit/cdcce43b4a21ac8ddb650ba0b795f07f6fc80629))


### BREAKING CHANGES

* Major v3.x release with headless architecture

Features:
- Add useAnnotator hook for framework-agnostic annotation UI
- Implement i18n support (EN/ZH/VI) via I18nProvider
- Add getCanvasProps() helper for custom canvas implementations
- Add production-ready ErrorBoundary with security defaults
- Add 3 headless implementation examples (vanilla, Tailwind, Semi Design)

Security:
- Implement XSS prevention with sanitize-input utility
- Apply input sanitization to RegionLabel component
- Hide error stack traces in production by default

Improvements:
- Add PropTypes validation to Theme and ErrorBoundary
- Remove stale Flow comments for TypeScript consistency
- Update AGENTS.md with Chrome DevTools MCP integration guide
- Update README.md with headless, i18n, and theme documentation
- Fix package name in LandingPage content.md

Fixes:
- Prevent memory leaks in useAnnotator with proper cleanup
- Fix ErrorBoundary production security issue

Tested: Build successful (3.04s), Storybook verified, 45 files changed

* docs: Switch license to Apache-2.0 and update release config

Changed project license from MIT to Apache-2.0 in LICENSE, package.json, and package-lock.json. Updated .releaserc.cjs to add changelog generation and include CHANGELOG.md in release assets. Removed sponsor section from README.md.

* style: Fix Prettier formatting in RegionSelectorSidebarBox/styles.js

* fix: Refactor styles to use MUI styled components

Replaced makeStyles and classnames usage with Material-UI's styled components across multiple files for improved consistency and maintainability. Updated MainLayout to separate theme logic and header title styling, and refactored RegionLabel, RegionSelectorSidebarBox, ImageCanvas, and WorkspaceLayout/Header to use styled components for layout and UI elements.
