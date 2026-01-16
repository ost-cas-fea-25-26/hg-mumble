import js from '@eslint/js'
import next from 'eslint-config-next'
import eslintConfigPrettier from 'eslint-config-prettier/flat'
import { defineConfig } from 'eslint/config'

export default defineConfig([
  {
    ignores: [
      'playwright-report/**',
      'node_modules/**',
      '.next/**',
      'out/**',
      'build/**',
      'next-env.d.ts',
      'src/mumble/api/generated/**',
    ],
  },
  js.configs.recommended,
  ...next,
  eslintConfigPrettier,
  {
    rules: {
      'react-hooks/rules-of-hooks': 'off',
      'react-hooks/exhaustive-deps': 'off',
      'no-useless-escape': 'off',
      'no-undef': 'off',
      '@next/next/no-img-element': 'off',
      'react-hooks/set-state-in-effect': 'off',
    },
  },
])
