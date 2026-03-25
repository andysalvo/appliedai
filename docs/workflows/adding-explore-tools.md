# Workflow: Adding Tools to the Explore AI Page

This is a repeatable process for adding new AI tools to the Explore AI page.

## What You Need

- The tool's name, maker, URL, and category
- A one-sentence description (honest, no hype -- read content/VOICE_BRIEF.md)
- 4 capabilities (what you can actually do with it)

## Steps

### 1. Add the tool to src/data/tools.ts

Add an entry to the `tools` array:

```typescript
{
  name: 'Tool Name',
  maker: 'Company',
  description: 'One sentence. Honest. No hype.',
  capabilities: [
    'First thing you can do',
    'Second thing you can do',
    'Third thing you can do',
    'Fourth thing you can do',
  ],
  url: 'https://tool-url.com',
  category: 'assistant' | 'research' | 'developer' | 'creative',
},
```

### 2. Add an icon mapping in src/app/explore/page.tsx

In the `toolIcons` record, add a mapping from the tool name to a Lucide icon:

```typescript
const toolIcons: Record<string, typeof MessageSquare> = {
  // ... existing
  'Tool Name': SomeLucideIcon,
}
```

Pick an icon from https://lucide.dev that represents the tool.

### 3. Add a category (if new)

If the tool belongs to a new category:

1. Add the category to the union type in `src/data/tools.ts`
2. Add it to the `categories` export with label, accent color, and bg color
3. Add a new section in `src/app/explore/page.tsx` following the existing pattern

### 4. Add a category image (optional)

Use the Pexels API to download a category header image:

```bash
# Get the API key
PEXELS_KEY=$(grep PEXELS /Users/andysalvo_1/Documents/GitHub/smealstudentaihub/.env.local | cut -d= -f2)

# Download
curl -sH "Authorization: $PEXELS_KEY" \
  "https://api.pexels.com/v1/search?query=YOUR+SEARCH&orientation=landscape&size=medium&per_page=1" \
  | node -e "const d=require('fs');process.stdin.on('data',c=>{const u=JSON.parse(c).photos[0].src.large;require('https').get(u,r=>r.pipe(d.createWriteStream('public/images/explore/CATEGORY.jpg')))})"
```

### 5. Verify

```bash
npm run build    # Must pass
npm run lint     # Must pass
npm run format   # Fix formatting
```

### 6. Commit

```bash
git add src/data/tools.ts src/app/explore/page.tsx public/images/explore/
git commit -m "feat: add [tool name] to explore AI tools"
```

## Voice Brief Rules (from content/VOICE_BRIEF.md)

- No hype words: "revolutionary," "game-changing," "transforming"
- No parallel structure cadences
- No selling. Describe what exists.
- The word "curated" is banned
- Descriptions should sound like a student explaining it to another student

## Categories

| Category  | What goes here                              | Accent               |
| --------- | ------------------------------------------- | -------------------- |
| assistant | Chat-based AI tools for general use         | border-t-navy        |
| research  | Tools for finding and analyzing information | border-t-beaver-blue |
| developer | Code editors, frameworks, deployment tools  | border-t-pugh-blue   |
| creative  | Image, video, audio, and music generation   | border-t-pa-sky      |
