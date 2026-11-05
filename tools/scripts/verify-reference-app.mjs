import { mkdtemp, readFile, readdir, rm } from 'node:fs/promises'
import { tmpdir } from 'node:os'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { build } from 'vite'

const repositoryRoot = resolve(dirname(fileURLToPath(import.meta.url)), '../..')
const applicationDirectory = resolve(repositoryRoot, 'projects/reference-app')
const outputDirectory = await mkdtemp(join(tmpdir(), 'solid-reference-app-'))

try {
  await build({
    configFile: resolve(repositoryRoot, 'vite.config.ts'),
    root: applicationDirectory,
    logLevel: 'error',
    build: {
      emptyOutDir: true,
      outDir: outputDirectory,
    },
  })

  const html = await readFile(join(outputDirectory, 'index.html'), 'utf8')
  const assets = await readdir(join(outputDirectory, 'assets'))
  const javascriptFiles = assets.filter((filename) => filename.endsWith('.js'))

  if (!html.includes('<div id="root"></div>') || javascriptFiles.length === 0) {
    throw new Error(
      'Reference application did not produce the expected build assets',
    )
  }

  const javascript = await Promise.all(
    javascriptFiles.map((filename) =>
      readFile(join(outputDirectory, 'assets', filename), 'utf8'),
    ),
  )

  if (
    !javascript.some((content) =>
      content.includes('SolidJS Monorepo Starter'),
    )
  ) {
    throw new Error(
      'Reference application content is missing from the production build',
    )
  }

  console.log('Reference application built successfully')
} finally {
  await rm(outputDirectory, { recursive: true, force: true })
}
