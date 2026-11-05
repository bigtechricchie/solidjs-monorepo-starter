import { execFileSync } from 'node:child_process'
import { extname } from 'node:path'

const expectedNodeVersion = 'v24.20.0'
const expectedPnpmVersion = '12.15.0'

const pnpmExecutablePath = process.env.npm_execpath

if (pnpmExecutablePath === undefined || pnpmExecutablePath === '') {
  throw new Error('Unable to determine the pnpm executable path')
}

function runPnpm(arguments_, options = {}) {
  const extension = extname(pnpmExecutablePath).toLowerCase()
  const javascriptExtensions = new Set(['.cjs', '.js', '.mjs'])

  if (javascriptExtensions.has(extension)) {
    return execFileSync(
      process.execPath,
      [pnpmExecutablePath, ...arguments_],
      options,
    )
  }

  return execFileSync(pnpmExecutablePath, arguments_, options)
}

console.log('==> Node.js version')

if (process.version !== expectedNodeVersion) {
  throw new Error(
    `Expected Node.js ${expectedNodeVersion}, received ${process.version}`,
  )
}

console.log(process.version)

console.log('==> pnpm version')

const pnpmVersion = runPnpm(['--version'], {
  encoding: 'utf8',
}).trim()

if (pnpmVersion !== expectedPnpmVersion) {
  throw new Error(
    `Expected pnpm ${expectedPnpmVersion}, received ${pnpmVersion}`,
  )
}

console.log(pnpmVersion)

console.log('==> Dependency installation')

runPnpm(['list', '--depth', '0'], {
  stdio: 'inherit',
})

console.log('==> Vite')

runPnpm(['exec', 'vite', '--version'], {
  stdio: 'inherit',
})

console.log('==> TypeScript')

runPnpm(['exec', 'tsc', '--version'], {
  stdio: 'inherit',
})

console.log('==> Native Solid compiler')
execFileSync(process.execPath, ['tools/scripts/verify-native-compiler.mjs'], {
  stdio: 'inherit',
})

console.log('==> Repository verification passed')
