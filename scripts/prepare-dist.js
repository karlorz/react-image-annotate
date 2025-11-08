import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const rootDir = path.resolve(__dirname, '..')

// Read the source package.json
const rootPkg = JSON.parse(
  fs.readFileSync(path.join(rootDir, 'package.json'), 'utf-8')
)

// Create a new package.json for dist with correct paths
const distPkg = {
  name: rootPkg.name,
  version: rootPkg.version,
  type: rootPkg.type,
  description: rootPkg.description,
  main: 'index.js', // Changed from dist/index.js
  module: 'index.mjs', // Changed from dist/index.mjs
  types: 'index.d.ts', // Changed from dist/index.d.ts
  exports: {
    '.': {
      types: './index.d.ts', // Changed from ./dist/index.d.ts
      import: './index.mjs', // Changed from ./dist/index.mjs
      require: './index.js', // Changed from ./dist/index.js
    },
    './headless': {
      types: './headless.d.ts',
      import: './headless.js',
      require: './headless.cjs',
    },
  },
  files: ['*.js', '*.cjs', '*.mjs', '*.d.ts', '*.map', 'README.md'],
  author: rootPkg.author,
  license: rootPkg.license,
  dependencies: rootPkg.dependencies,
  peerDependencies: rootPkg.peerDependencies,
  publishConfig: rootPkg.publishConfig,
  homepage: rootPkg.homepage,
  repository: rootPkg.repository,
}

// Write the new package.json to dist
fs.writeFileSync(
  path.join(rootDir, 'dist', 'package.json'),
  JSON.stringify(distPkg, null, 2) + '\n'
)

// Copy README
fs.copyFileSync(
  path.join(rootDir, 'README.md'),
  path.join(rootDir, 'dist', 'README.md')
)

console.log('✓ Prepared dist/package.json with correct paths')
console.log('✓ Copied README.md to dist/')
