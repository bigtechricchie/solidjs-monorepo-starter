import solid from '@solidjs/vite-plugin'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  plugins: [
    solid({
      compiler: 'native',
    }),
  ],
  test: {
    environment: 'jsdom',
    include: ['projects/reference-app/src/**/*.test.tsx'],
  },
})
