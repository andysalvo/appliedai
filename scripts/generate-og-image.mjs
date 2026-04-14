#!/usr/bin/env node
import sharp from 'sharp'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const repoRoot = path.resolve(__dirname, '..')
const logoPath = path.join(repoRoot, 'public/images/logo.png')
const outPath = path.join(repoRoot, 'public/images/og-default.png')

const W = 1200
const H = 630
const NAVY = { r: 13, g: 27, b: 48, alpha: 1 }

const logoTargetWidth = 700
const logoMeta = await sharp(logoPath).metadata()
const logoAspect = (logoMeta.height ?? 241) / (logoMeta.width ?? 840)
const logoResizedHeight = Math.round(logoTargetWidth * logoAspect)

const logoBuffer = await sharp(logoPath)
  .resize({ width: logoTargetWidth })
  .toColourspace('srgb')
  .negate({ alpha: false })
  .toBuffer()

const gradientSvg = Buffer.from(`
<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="accent" x1="0%" y1="100%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#4A90B8" stop-opacity="0.25"/>
      <stop offset="50%" stop-color="#7FB5D1" stop-opacity="0.15"/>
      <stop offset="100%" stop-color="#1E3A5F" stop-opacity="0.1"/>
    </linearGradient>
    <radialGradient id="glow" cx="75%" cy="30%" r="50%">
      <stop offset="0%" stop-color="#4A90B8" stop-opacity="0.2"/>
      <stop offset="100%" stop-color="#0d1b30" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="${W}" height="${H}" fill="url(#glow)"/>
  <rect x="0" y="${H - 6}" width="${W}" height="6" fill="url(#accent)"/>
</svg>
`)

const textSvg = Buffer.from(`
<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">
  <style>
    .tag {
      font-family: -apple-system, system-ui, 'Segoe UI', Roboto, sans-serif;
      font-size: 28px;
      font-weight: 500;
      fill: rgba(255, 255, 255, 0.5);
      letter-spacing: 0.02em;
    }
    .url {
      font-family: -apple-system, system-ui, 'Segoe UI', Roboto, sans-serif;
      font-size: 22px;
      font-weight: 600;
      fill: rgba(127, 181, 209, 0.9);
      letter-spacing: 0.08em;
      text-transform: uppercase;
    }
  </style>
  <text x="50%" y="${H / 2 + logoResizedHeight / 2 + 60}" text-anchor="middle" class="tag">
    Where Penn State students learn to think with AI.
  </text>
  <text x="50%" y="${H - 70}" text-anchor="middle" class="url">
    appliedaipennstate.com
  </text>
</svg>
`)

await sharp({
  create: {
    width: W,
    height: H,
    channels: 4,
    background: NAVY,
  },
})
  .composite([
    { input: gradientSvg, top: 0, left: 0 },
    {
      input: logoBuffer,
      top: Math.round((H - logoResizedHeight) / 2 - 40),
      left: Math.round((W - logoTargetWidth) / 2),
    },
    { input: textSvg, top: 0, left: 0 },
  ])
  .png()
  .toFile(outPath)

console.log(`OG image: ${outPath} (${W}x${H})`)
