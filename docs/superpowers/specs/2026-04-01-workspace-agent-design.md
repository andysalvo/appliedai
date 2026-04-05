# Applied AI Workspace Agent

**Date:** 2026-04-01
**Author:** Andy Salvo + Claude
**Status:** Approved design, pending implementation

## What This Is

A conversational AI agent embedded in the Applied AI Club website that lets club members contribute to the repo without knowing how to code. Members open a GitHub Codespace, talk to the agent, and the agent makes changes on their behalf. Git operations (branching, committing, PRs) are fully automated.

## Why

Club members shouldn't need to understand Git, TypeScript, or file structures to add themselves to the team page or suggest a new AI tool. Andy and Ryan shouldn't have to personally onboard every contributor. The agent handles it.

## Three Layers

### Layer 1: Session Lifecycle (Automated)

**Start:** Member opens GitHub Codespace. `.devcontainer/devcontainer.json` handles everything:

- Installs dependencies (`npm install`)
- Starts dev server (`npm run dev`)
- Auto-opens VS Code Simple Browser to `localhost:3000/workspace`
- Git identity is pre-configured (Codespaces uses their GitHub profile)
- `gh` CLI is pre-authenticated (Codespaces injects their GitHub token)

**End:** Member clicks "I'm done" in the workspace app. The app automatically:

1. Creates a branch: `contrib/{github-username}-{timestamp}`
2. Stages changed data files only (not config, not components)
3. Commits with conventional format: `feat: add {name} to team roster`
4. Pushes the branch
5. Opens a PR via `gh pr create` with a summary of changes
6. Shows the PR link to the member
7. Shows: "A maintainer will review and merge your changes. You can close this Codespace now."

If the member closes the Codespace without clicking "I'm done," changes are lost. The app should warn before close (beforeunload event) if there are unsaved changes.

**Devcontainer config:**

```json
{
  "name": "Applied AI Club",
  "image": "mcr.microsoft.com/devcontainers/javascript-node:20",
  "postCreateCommand": "npm install",
  "postStartCommand": "npm run dev &",
  "forwardPorts": [3000],
  "portsAttributes": {
    "3000": {
      "label": "Applied AI Dev",
      "onAutoForward": "openBrowserOnce"
    }
  },
  "customizations": {
    "vscode": {
      "settings": {
        "editor.defaultFormatter": "esbenp.prettier-vscode",
        "editor.formatOnSave": true
      },
      "extensions": ["esbenp.prettier-vscode", "bradlc.vscode-tailwindcss"]
    }
  }
}
```

### Layer 2: The Agent (Core Product)

A chat interface at `/workspace` branded with Penn State colors. (Note: Next.js treats `_` prefixed folders as private/non-routable, so we use `/workspace` instead of `/_onboard`.) Powered by OpenAI GPT-4o-mini via the existing streaming chat pattern (same architecture as `/speakers` chat). The agent has full context about the repo and can perform actions on the member's behalf.

#### Agent Capabilities

**What it can do (all members):**

- Add a team member to `src/data/team.ts`
- Add an AI tool to `src/data/tools.ts`
- Answer questions about the repo, the club, or how to contribute
- Explain what any page does and how it works
- Show the current state of any data file ("What tools do we have listed?")
- Show a visual map of the repo structure
- Guide the member through uploading a team photo

**What it can do (admin only -- requires access code):**

- Edit existing entries in data files (modify, reorder)
- Delete entries from data files
- Edit page copy in component files
- Modify navigation structure

**What it cannot do (no one):**

- Edit config files (tsconfig, eslint, prettier, tailwind)
- Modify CI/CD workflows
- Change brand tokens or voice brief
- Install or remove dependencies
- Access `.env` files

#### Access Tiers

| Tier        | Who                     | Code Required | Capabilities                        |
| ----------- | ----------------------- | ------------- | ----------------------------------- |
| Contributor | Any club member         | None          | Append to data files, ask questions |
| Admin       | Andy Salvo, Ryan Einzig | Yes (env var) | Edit/delete data, edit page copy    |

The access code is stored in `ONBOARD_ADMIN_CODE` environment variable (set in Codespace secrets, not committed to repo). When a member types the code in chat, the agent unlocks admin tools for that session. The code is never displayed or echoed back.

#### System Prompt Structure

The agent's system prompt includes:

1. Role definition ("You are the Applied AI Club workspace assistant")
2. Voice brief rules (no em dashes, no hype words, conversational tone)
3. Brand guide (Penn State colors, typography, student org rules)
4. Data file schemas (TypeScript interfaces for team, tools)
5. Current state of data files (injected at session start)
6. Repo map (which files are editable, which are not)
7. Tool definitions for file operations
8. Access tier (contributor by default, admin after code)

#### Tool Definitions (OpenAI Function Calling)

```typescript
// Tools available to the agent:

add_team_member(name, role, email, image_path)
// Appends to src/data/team.ts
// Validates: @psu.edu email, required fields, no duplicates
// Returns: preview of the new entry

add_tool(name, company, description, category, url)
// Appends to src/data/tools.ts
// Validates: category is one of 4 options, URL format, no duplicates
// Returns: preview of the new entry

read_data_file(filename)
// Reads current contents of a data file
// Allowed files: team.ts, tools.ts, pillars.ts, navigation.ts

get_repo_map()
// Returns the visual repo structure diagram
// Color-coded: green (editable), blue (pages), gray (don't touch)

get_site_preview_url()
// Returns localhost:3000 URL for the live preview
// Tells member to check the other browser tab

upload_team_photo(member_name)
// Guides member through adding a photo to /public/images/team/
// Provides the expected filename format

// Admin-only tools (unlocked with code):

edit_entry(filename, entry_identifier, field, new_value)
// Modifies an existing entry in a data file

delete_entry(filename, entry_identifier)
// Removes an entry from a data file

edit_page_copy(page_path, section, new_content)
// Edits text content in a page component file
```

#### Validation Rules (Enforced by Tools, Not the Agent)

Every write operation validates:

- TypeScript type correctness (entry matches the interface)
- No duplicate entries (by name for tools, by email for team)
- Email format for team members (must be @psu.edu)
- URL format for tools
- No banned words from voice brief
- Category values match the enum
- No arbitrary colors or styles in content

Validation errors are returned to the agent, which explains them conversationally to the member.

### Layer 3: First-Time Welcome (One-Time)

On first visit (detected via localStorage flag), the agent starts with a welcome conversation instead of an empty chat:

> "Hey! Welcome to Applied AI. I help club members contribute to our website without needing to write code. Just tell me what you want to do and I'll handle the rest."
>
> "What's your name?"

After the name:

> "Nice to meet you, {name}. Here's what I can help with:"
>
> - Add yourself to the team page
> - Add an AI tool to our Explore page
> - Learn how the website is organized
> - Or just ask me anything
>
> "What sounds good?"

This flows into the regular agent conversation. No separate wizard. The onboarding IS a conversation.

Returning visitors get a clean chat with a brief: "Welcome back. What are you working on today?"

## Greenfield Data

Data files ship with typed schemas and empty arrays:

**`src/data/team.ts`**

```typescript
export interface TeamMember {
  name: string
  role: string
  email: string
  image: string
}

export const team: TeamMember[] = []
```

**`src/data/tools.ts`**

```typescript
export type ToolCategory = 'assistant' | 'research' | 'developer' | 'creative'

export interface Tool {
  name: string
  company: string
  description: string
  category: ToolCategory
  url: string
}

export const tools: Tool[] = []
```

Pages that render these arrays handle empty state:

- Team page: "Be the first to join. Open a Codespace and talk to the agent."
- Explore page: "No tools added yet. Be the first to suggest one."

Andy is the first person to go through the flow, proving it works end-to-end.

## UI Design

### Chat Interface (`/workspace`)

Full-screen layout, split into two panels on desktop:

**Left panel (60%):** Chat interface

- Penn State navy header bar with "Applied AI Workspace" title
- Message bubbles (agent = navy bg/white text, user = white bg/navy text)
- Streaming text with token fade-in animation
- Input bar at bottom with placeholder: "Tell me what you'd like to do..."
- "I'm done" button in the header (triggers session end flow)

**Right panel (40%):** Live preview

- iframe showing `localhost:3000` (the actual site)
- Refreshes automatically when the agent makes changes
- Tab bar to switch between site preview and repo map
- On mobile: single panel, chat only, preview accessible via button

### Visual Design Tokens

Uses the existing Penn State `@theme` from `globals.css`:

- Background: white (`--color-bg`)
- Primary: Nittany Navy (`--color-navy`, #001E44)
- Accent: Beaver Blue (`--color-beaver-blue`, #1E407C)
- Highlight: PA Sky (`--color-pa-sky`, #009CDE) for links and interactive elements
- Surface: `--color-surface` (#f3f4f6) for message bubbles
- Typography: Inter for body, Roboto Slab for headings

### Animations

- Message entrance: Framer Motion fade + slide up (opacity 0→1, y 8→0, 300ms)
- Typing indicator: three dots with staggered opacity pulse
- Panel transitions: smooth width changes on panel toggle
- All animations respect `prefers-reduced-motion`
- LazyMotion with domAnimation (same pattern as existing site)

## API Routes (Dev-Only)

All routes under `src/app/workspace/api/` with a dev-mode guard:

```typescript
// Every route starts with:
if (process.env.NODE_ENV === 'production') {
  return Response.json({ error: 'Not available' }, { status: 404 })
}
```

### `POST /workspace/api/chat`

- Streams OpenAI GPT-4o-mini responses
- System prompt with repo context, schemas, voice brief
- Function calling for file operations
- Handles tool execution server-side

### `POST /workspace/api/write`

- Receives validated data from agent tool calls
- Writes to the appropriate TypeScript data file
- Uses AST manipulation or template literals to maintain formatting
- Returns the diff for preview

### `POST /workspace/api/read`

- Reads current state of data files
- Returns parsed content for the agent's context

### `POST /workspace/api/session-end`

- Executes the git workflow:
  1. `git checkout -b contrib/{username}-{timestamp}`
  2. `git add src/data/` (only data files)
  3. `git commit -m "feat: {summary}"`
  4. `git push -u origin {branch}`
  5. `gh pr create --title "{summary}" --body "{details}"`
- Returns the PR URL

### `GET /workspace/api/status`

- Returns current session state
- Changed files, current branch, git status
- Used by the UI to show unsaved changes indicator

## File Structure (New Files)

```
src/app/workspace/
  page.tsx                 # Main workspace page (chat + preview layout)
  layout.tsx               # Minimal layout (no site header/footer)
  api/
    chat/route.ts          # Streaming chat with OpenAI
    write/route.ts         # File write operations
    read/route.ts          # File read operations
    session-end/route.ts   # Git automation
    status/route.ts        # Session state
  components/
    chat-panel.tsx         # Chat message list + input
    preview-panel.tsx      # iframe site preview + repo map
    repo-map.tsx           # Visual repo structure diagram
    session-bar.tsx        # Top bar with "I'm done" button
    message.tsx            # Single message bubble component
    typing-indicator.tsx   # Animated typing dots

.devcontainer/
  devcontainer.json        # Codespace configuration
```

## Environment Variables

| Variable             | Where            | Purpose                    |
| -------------------- | ---------------- | -------------------------- |
| `OPENAI_API_KEY`     | Codespace secret | Powers the agent chat      |
| `ONBOARD_ADMIN_CODE` | Codespace secret | Admin access for Andy/Ryan |

Both are set as GitHub Codespace secrets at the repo level. Contributors never see them. They're injected automatically when a Codespace launches.

## What's NOT in V1

- No database (all changes are local files committed via git)
- No user accounts (GitHub identity from Codespace)
- No persistent chat history (session-scoped only)
- No image upload UI (agent provides instructions for manual file add)
- No real-time collaboration (one contributor per Codespace)
- No AI-powered code review on PRs (manual review by Andy/Ryan)
- No edit/delete for contributors (append-only, admin code for mutations)

## Success Criteria

1. Andy opens a Codespace, talks to the agent, adds himself as first team member, and gets a PR -- all without touching a terminal
2. A club member with zero code knowledge can add an AI tool to the Explore page in under 5 minutes
3. The agent enforces voice brief and brand rules through conversation
4. Session end produces a clean PR with conventional commit format
5. The site renders correctly with empty data arrays (greenfield state)
6. Admin code unlocks edit/delete tools without exposing the code in the repo

## Cost

- OpenAI GPT-4o-mini: ~$0.01-0.03 per session (short conversations about data entry)
- GitHub Codespaces: free tier covers 120 core-hours/month (plenty for a club)
- Vercel: free tier (auto-deploys from main)
- Total: effectively $0 for normal usage, maybe $1-2/month if the whole club is active
