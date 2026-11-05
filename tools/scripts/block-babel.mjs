import { registerHooks } from 'node:module'

function isBabelModule(value) {
  return (
    value === '@babel/core' ||
    value.startsWith('@babel/') ||
    value.startsWith('@solidjs/babel-plugin') ||
    value === 'babel-preset-solid' ||
    value.startsWith('babel-plugin-') ||
    /[/\\]node_modules[/\\](?:\.pnpm[/\\])?(?:@babel[/\\]|@babel\+|@solidjs[/\\]babel-plugin|@solidjs\+babel-plugin|babel-preset-solid|babel-plugin-)/.test(value)
  )
}

registerHooks({
  resolve(specifier, context, nextResolve) {
    if (isBabelModule(specifier)) {
      throw new Error(`Babel execution blocked: ${specifier}`)
    }

    const resolved = nextResolve(specifier, context)

    if (isBabelModule(resolved.url)) {
      throw new Error(`Babel execution blocked: ${resolved.url}`)
    }

    return resolved
  },
})

console.log('Babel module-resolution blocker enabled')
