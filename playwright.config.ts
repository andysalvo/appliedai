import { defineConfig, devices } from '@playwright/test'
import { execFileSync } from 'child_process'

function findChromiumExecutable(): string | undefined {
  const browserNames = ['chromium', 'chromium-browser', 'google-chrome', 'google-chrome-stable']
  for (const name of browserNames) {
    try {
      const path = execFileSync('which', [name], {
        encoding: 'utf-8',
        stdio: ['pipe', 'pipe', 'ignore'],
      }).trim()
      if (path) return path
    } catch {
      // Try next
    }
  }
  return undefined
}

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : 4,
  reporter: 'html',

  use: {
    baseURL: 'http://localhost:3000',
    trace: 'on-first-retry',
  },

  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        launchOptions: {
          executablePath: findChromiumExecutable(),
        },
      },
    },
    {
      name: 'mobile-chrome',
      use: {
        ...devices['Pixel 5'],
        launchOptions: {
          executablePath: findChromiumExecutable(),
        },
      },
    },
  ],

  webServer: {
    command: 'npx next start -p 3000',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
    timeout: 120 * 1000,
  },
})
