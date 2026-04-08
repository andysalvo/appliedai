#!/usr/bin/env node
/**
 * Applied AI Club — Branded Deck Generator
 *
 * Usage:
 *   node scripts/generate-deck.mjs                          # blank template
 *   node scripts/generate-deck.mjs --title "First Meeting"  # custom title
 *   node scripts/generate-deck.mjs --date "April 20, 2026"  # custom date
 *
 * Output: decks/Applied-AI-Deck.pptx
 */

import PptxGenJS from 'pptxgenjs'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, '..')

// ── Brand tokens ──
const NAVY = '001E44'
const BEAVER_BLUE = '1E407C'
const PUGH_BLUE = '96BEE6'
const PA_SKY = '009CDE'
const WHITE = 'FFFFFF'
const LIGHT_BG = 'F0F4FA'
const MUTED = '4B5563'

const FONT_DISPLAY = 'Roboto Slab'
const FONT_BODY = 'Inter'

// ── Parse args ──
const args = process.argv.slice(2)
function getArg(flag, fallback) {
  const idx = args.indexOf(flag)
  return idx !== -1 && args[idx + 1] ? args[idx + 1] : fallback
}
const deckTitle = getArg('--title', 'Applied AI Club')
const deckSubtitle = getArg('--subtitle', 'Penn State University')
const deckDate = getArg('--date', new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }))

// ── Load logo as base64 ──
const logoPath = path.join(ROOT, 'public/images/logos/applied-ai-transparent.png')
const logoBase64 = fs.readFileSync(logoPath).toString('base64')
const logoDataUrl = `image/png;base64,${logoBase64}`

// ── Create presentation ──
const pptx = new PptxGenJS()
pptx.author = 'Applied AI Club'
pptx.company = 'Applied AI Club at Penn State'
pptx.subject = deckTitle
pptx.title = deckTitle
pptx.layout = 'LAYOUT_WIDE' // 13.33 x 7.5

// ── Master: TITLE ──
pptx.defineSlideMaster({
  title: 'TITLE_SLIDE',
  background: { color: NAVY },
  objects: [
    // gradient accent line at top
    { rect: { x: 0, y: 0, w: '100%', h: 0.04, fill: { color: PA_SKY } } },
    // logo
    { image: { data: logoDataUrl, x: 0.6, y: 0.6, w: 1.0, h: 1.0 } },
    // subtle glow (lighter rect)
    { rect: { x: 8, y: 1, w: 5, h: 5, fill: { color: BEAVER_BLUE, transparency: 90 } } },
    // bottom bar
    { rect: { x: 0, y: 7.2, w: '100%', h: 0.04, fill: { color: PUGH_BLUE } } },
    // footer text
    {
      text: {
        text: 'Applied AI Club  |  Penn State University',
        options: { x: 0.6, y: 6.8, w: 6, h: 0.4, fontSize: 9, fontFace: FONT_BODY, color: PUGH_BLUE },
      },
    },
  ],
})

// ── Master: SECTION DIVIDER ──
pptx.defineSlideMaster({
  title: 'SECTION_DIVIDER',
  background: { color: NAVY },
  objects: [
    { rect: { x: 0, y: 0, w: '100%', h: 0.04, fill: { color: PA_SKY } } },
    { rect: { x: 0, y: 7.2, w: '100%', h: 0.04, fill: { color: PUGH_BLUE } } },
    // logo small bottom-right
    { image: { data: logoDataUrl, x: 11.83, y: 6.2, w: 0.7, h: 0.7 } },
  ],
})

// ── Master: CONTENT (white) ──
pptx.defineSlideMaster({
  title: 'CONTENT',
  background: { color: WHITE },
  objects: [
    // navy header bar
    { rect: { x: 0, y: 0, w: '100%', h: 0.8, fill: { color: NAVY } } },
    // accent line under header
    { rect: { x: 0, y: 0.8, w: '100%', h: 0.03, fill: { color: PA_SKY } } },
    // logo in header
    { image: { data: logoDataUrl, x: 0.4, y: 0.1, w: 0.6, h: 0.6 } },
    // footer
    {
      text: {
        text: 'Applied AI Club  |  Penn State',
        options: { x: 0.6, y: 7.0, w: 5, h: 0.3, fontSize: 8, fontFace: FONT_BODY, color: MUTED },
      },
    },
  ],
})

// ── Master: CONTENT ALT (light blue bg) ──
pptx.defineSlideMaster({
  title: 'CONTENT_ALT',
  background: { color: LIGHT_BG },
  objects: [
    { rect: { x: 0, y: 0, w: '100%', h: 0.8, fill: { color: NAVY } } },
    { rect: { x: 0, y: 0.8, w: '100%', h: 0.03, fill: { color: PA_SKY } } },
    { image: { data: logoDataUrl, x: 0.4, y: 0.1, w: 0.6, h: 0.6 } },
    {
      text: {
        text: 'Applied AI Club  |  Penn State',
        options: { x: 0.6, y: 7.0, w: 5, h: 0.3, fontSize: 8, fontFace: FONT_BODY, color: MUTED },
      },
    },
  ],
})

// ── Master: TWO COLUMN ──
pptx.defineSlideMaster({
  title: 'TWO_COLUMN',
  background: { color: WHITE },
  objects: [
    { rect: { x: 0, y: 0, w: '100%', h: 0.8, fill: { color: NAVY } } },
    { rect: { x: 0, y: 0.8, w: '100%', h: 0.03, fill: { color: PA_SKY } } },
    { image: { data: logoDataUrl, x: 0.4, y: 0.1, w: 0.6, h: 0.6 } },
    // center divider line
    { rect: { x: 6.565, y: 1.2, w: 0.02, h: 5.5, fill: { color: PUGH_BLUE, transparency: 60 } } },
    {
      text: {
        text: 'Applied AI Club  |  Penn State',
        options: { x: 0.6, y: 7.0, w: 5, h: 0.3, fontSize: 8, fontFace: FONT_BODY, color: MUTED },
      },
    },
  ],
})

// ── Master: CLOSING ──
pptx.defineSlideMaster({
  title: 'CLOSING',
  background: { color: NAVY },
  objects: [
    { rect: { x: 0, y: 0, w: '100%', h: 0.04, fill: { color: PA_SKY } } },
    { image: { data: logoDataUrl, x: 5.665, y: 1.2, w: 2.0, h: 2.0 } },
    { rect: { x: 0, y: 7.2, w: '100%', h: 0.04, fill: { color: PUGH_BLUE } } },
  ],
})

// ═══════════════════════════════════════════════
// SLIDES
// ═══════════════════════════════════════════════

// 1. Title slide
const s1 = pptx.addSlide({ masterName: 'TITLE_SLIDE' })
s1.addText(deckTitle, {
  x: 0.6, y: 2.2, w: 8, h: 1.4,
  fontSize: 44, fontFace: FONT_DISPLAY, color: WHITE, bold: true,
})
s1.addText(deckSubtitle, {
  x: 0.6, y: 3.6, w: 8, h: 0.6,
  fontSize: 20, fontFace: FONT_BODY, color: PUGH_BLUE,
})
s1.addText(deckDate, {
  x: 0.6, y: 4.3, w: 8, h: 0.5,
  fontSize: 14, fontFace: FONT_BODY, color: PUGH_BLUE,
})

// 2. Agenda slide
const s2 = pptx.addSlide({ masterName: 'CONTENT' })
s2.addText('Agenda', {
  x: 0.6, y: 1.1, w: 10, h: 0.8,
  fontSize: 32, fontFace: FONT_DISPLAY, color: NAVY, bold: true,
})
s2.addText(
  [
    { text: '01  ', options: { fontSize: 18, fontFace: FONT_DISPLAY, color: PA_SKY, bold: true } },
    { text: 'Welcome and introductions\n\n', options: { fontSize: 16, fontFace: FONT_BODY, color: MUTED } },
    { text: '02  ', options: { fontSize: 18, fontFace: FONT_DISPLAY, color: PA_SKY, bold: true } },
    { text: 'What is Applied AI?\n\n', options: { fontSize: 16, fontFace: FONT_BODY, color: MUTED } },
    { text: '03  ', options: { fontSize: 18, fontFace: FONT_DISPLAY, color: PA_SKY, bold: true } },
    { text: 'How to get involved\n\n', options: { fontSize: 16, fontFace: FONT_BODY, color: MUTED } },
    { text: '04  ', options: { fontSize: 18, fontFace: FONT_DISPLAY, color: PA_SKY, bold: true } },
    { text: 'Open discussion', options: { fontSize: 16, fontFace: FONT_BODY, color: MUTED } },
  ],
  { x: 0.6, y: 2.2, w: 10, h: 4.5, valign: 'top', lineSpacingMultiple: 1.1 }
)

// 3. Section divider example
const s3 = pptx.addSlide({ masterName: 'SECTION_DIVIDER' })
s3.addText('What is Applied AI?', {
  x: 0.8, y: 2.6, w: 11, h: 1.2,
  fontSize: 40, fontFace: FONT_DISPLAY, color: WHITE, bold: true,
})
s3.addText('How AI shows up in real work, across every field.', {
  x: 0.8, y: 3.9, w: 9, h: 0.6,
  fontSize: 16, fontFace: FONT_BODY, color: PUGH_BLUE,
})

// 4. Content slide example
const s4 = pptx.addSlide({ masterName: 'CONTENT' })
s4.addText('What we do', {
  x: 0.6, y: 1.1, w: 10, h: 0.8,
  fontSize: 32, fontFace: FONT_DISPLAY, color: NAVY, bold: true,
})
const bullets = [
  'Guest speakers from all industries share how AI changed their work',
  'Hands-on workshops where you use AI tools on real tasks',
  'Case competitions solving real business problems with AI',
  'Labs program for members who want to build full applications',
]
s4.addText(
  bullets.map((b) => ({
    text: b,
    options: {
      fontSize: 15, fontFace: FONT_BODY, color: MUTED,
      bullet: { type: 'bullet', color: PA_SKY },
      paraSpaceAfter: 14,
    },
  })),
  { x: 0.6, y: 2.2, w: 11, h: 4.5, valign: 'top' }
)

// 5. Two-column slide example
const s5 = pptx.addSlide({ masterName: 'TWO_COLUMN' })
s5.addText('This semester', {
  x: 0.6, y: 1.1, w: 10, h: 0.8,
  fontSize: 32, fontFace: FONT_DISPLAY, color: NAVY, bold: true,
})
// Left column
s5.addText('Meetings', {
  x: 0.6, y: 2.2, w: 5.5, h: 0.5,
  fontSize: 18, fontFace: FONT_DISPLAY, color: BEAVER_BLUE, bold: true,
})
s5.addText('Regular meetings with guest speakers, workshops, and open discussion. All majors welcome.', {
  x: 0.6, y: 2.8, w: 5.5, h: 2,
  fontSize: 14, fontFace: FONT_BODY, color: MUTED, valign: 'top',
})
// Right column
s5.addText('Labs', {
  x: 7.0, y: 2.2, w: 5.5, h: 0.5,
  fontSize: 18, fontFace: FONT_DISPLAY, color: BEAVER_BLUE, bold: true,
})
s5.addText('Build real applications using industry-standard tools. Ship projects, not just ideas.', {
  x: 7.0, y: 2.8, w: 5.5, h: 2,
  fontSize: 14, fontFace: FONT_BODY, color: MUTED, valign: 'top',
})

// 6. Content alt (light bg) example
const s6 = pptx.addSlide({ masterName: 'CONTENT_ALT' })
s6.addText('How to get involved', {
  x: 0.6, y: 1.1, w: 10, h: 0.8,
  fontSize: 32, fontFace: FONT_DISPLAY, color: NAVY, bold: true,
})
const steps = [
  { num: '1', label: 'Join the GroupMe', desc: 'Scan the QR code or ask a member for the link' },
  { num: '2', label: 'Sign up for the mailing list', desc: 'appliedaipennstate.com' },
  { num: '3', label: 'Show up', desc: 'No prerequisites, no application, just come' },
]
steps.forEach((step, i) => {
  const yBase = 2.3 + i * 1.4
  s6.addText(step.num, {
    x: 0.6, y: yBase, w: 0.7, h: 0.7,
    fontSize: 22, fontFace: FONT_DISPLAY, color: WHITE, bold: true,
    align: 'center', valign: 'middle',
    fill: { color: PA_SKY },
    rectRadius: 0.1,
  })
  s6.addText(step.label, {
    x: 1.6, y: yBase, w: 9, h: 0.4,
    fontSize: 16, fontFace: FONT_DISPLAY, color: NAVY, bold: true,
  })
  s6.addText(step.desc, {
    x: 1.6, y: yBase + 0.4, w: 9, h: 0.4,
    fontSize: 13, fontFace: FONT_BODY, color: MUTED,
  })
})

// 7. Blank content slide (for adding custom content)
const s7 = pptx.addSlide({ masterName: 'CONTENT' })
s7.addText('Your slide title here', {
  x: 0.6, y: 1.1, w: 10, h: 0.8,
  fontSize: 32, fontFace: FONT_DISPLAY, color: NAVY, bold: true,
})
s7.addText('Replace this with your content. This is a blank template slide.', {
  x: 0.6, y: 2.2, w: 11, h: 4,
  fontSize: 15, fontFace: FONT_BODY, color: MUTED, valign: 'top',
})

// 8. Closing slide
const s8 = pptx.addSlide({ masterName: 'CLOSING' })
s8.addText('Thank you', {
  x: 0.6, y: 3.6, w: 12, h: 1,
  fontSize: 44, fontFace: FONT_DISPLAY, color: WHITE, bold: true, align: 'center',
})
s8.addText('appliedaipennstate.com', {
  x: 0.6, y: 4.6, w: 12, h: 0.5,
  fontSize: 16, fontFace: FONT_BODY, color: PUGH_BLUE, align: 'center',
})

// ── Write file ──
const outDir = path.join(ROOT, 'decks')
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true })

const filename = `Applied-AI-Deck.pptx`
const outPath = path.join(outDir, filename)

pptx.writeFile({ fileName: outPath }).then(() => {
  console.log(`\n  Deck generated: ${outPath}\n`)
  console.log(`  Slides: ${pptx.slides.length}`)
  console.log(`  Masters: TITLE_SLIDE, SECTION_DIVIDER, CONTENT, CONTENT_ALT, TWO_COLUMN, CLOSING`)
  console.log(`  Fonts: ${FONT_DISPLAY}, ${FONT_BODY}`)
  console.log(`\n  Open in PowerPoint or Google Slides to edit.\n`)
})
