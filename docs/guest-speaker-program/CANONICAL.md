# Guest Speaker Program -- Canonical Version

**Active version:** v1.2
**Markdown source:** v1.2.md
**HTML template:** v1.2.html
**Live PDF:** ~/Desktop/Applied AI/Applied-AI-Guest-Speaker-Program-v1.2.pdf

## What changed from the original

- Removed "three programs" pillar structure -- just describe what we do naturally
- Removed Explore AI mention (bonus feature, not core programming)
- Removed topics PDF entirely -- too much, not needed
- Added case competitions
- Added "early in their exposure" lens from the topics intro paragraph
- Broadened "Who We Are Looking For" -- no named industries, open to all fields
- All links use full https:// URLs for cross-platform compatibility
- PDF uses Nittany Navy (#001E44) brand colors only, no red

## Generating the PDF

```bash
node -e "
const puppeteer = require('puppeteer');
(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('file:///Users/andysalvo_1/Documents/GitHub/appliedai/docs/guest-speaker-program/v1.2.html', { waitUntil: 'networkidle0' });
  await page.pdf({
    path: '/Users/andysalvo_1/Desktop/Applied AI/Applied-AI-Guest-Speaker-Program-v1.2.pdf',
    format: 'Letter',
    printBackground: true,
    margin: { top: 0, bottom: 0, left: 0, right: 0 }
  });
  await browser.close();
})();
"
```
