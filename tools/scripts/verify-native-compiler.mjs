import { mkdtemp, readFile, readdir, rm } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { build } from 'vite'

const repositoryRoot = resolve(dirname(fileURLToPath(import.meta.url)), '../..')
const fixtureDirectory = resolve(repositoryRoot, 'tools/fixtures/native-compiler')
const outputDirectory = await mkdtemp(join(tmpdir(), 'solid-native-compiler-'))

try {
  await build({
    configFile: resolve(repositoryRoot, 'vite.config.mts'),
    root: fixtureDirectory,
    logLevel: 'error',
    build: {
      outDir: outputDirectory,
      emptyOutDir: true,
    },
  })

  const html = await readFile(join(outputDirectory, 'index.html'), 'utf8')
  const assets = await readdir(join(outputDirectory, 'assets'))
  const javascriptFiles = assets.filter((filename) => filename.endsWith('.js'))

  if (!html.includes('<div id="app"></div>') || javascriptFiles.length === 0) {
    throw new Error('Native Solid compiler fixture did not produce the expected assets')
  }

  const javascript = await Promise.all(
    javascriptFiles.map((filename) =>
      readFile(join(outputDirectory, 'assets', filename), 'utf8'),
    ),
  )

  if (!javascript.some((content) => content.includes('Native compiler verified'))) {
    throw new Error('Native Solid compiler fixture content is missing from the build')
  }

  console.log('Native Solid compiler fixture compiled successfully')
} finally {
  await rm(outputDirectory, { recursive: true, force: true })
}
