import { defineConfig } from '@playwright/test'
import dotenv from 'dotenv'
import path, { dirname } from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

dotenv.config({ path: path.resolve(__dirname, '.env') })

export default defineConfig({
  testDir: 'tests',
  projects: [
    {
      name: 'setup',
      testMatch: /.*\.setup\.ts/,
      use: {
        baseURL: 'http://localhost:3000',
        headless: true,
        permissions: ['clipboard-read', 'clipboard-write'],
        screenshot: 'only-on-failure',
      },
    },
    {
      name: 'e2e',
      dependencies: ['setup'],
      testMatch: '**/*.test.ts',
      use: {
        baseURL: 'http://localhost:3000',
        headless: true,
        permissions: ['clipboard-read', 'clipboard-write'],
        screenshot: 'only-on-failure',
        storageState: 'tests/.auth/user.json',
      },
    },
  ],
  workers: 2,
  webServer: [
    {
      command: 'npm run dev:mock',
      url: 'http://localhost:3000',
      reuseExistingServer: !process.env.CI,
      stdout: 'ignore',
      stderr: 'pipe',
      timeout: 120 * 1000,
    },
    {
      command: 'npm run mock',
      reuseExistingServer: !process.env.CI,
      stdout: 'ignore',
      stderr: 'pipe',
      timeout: 120 * 1000,
    },
  ],
})
