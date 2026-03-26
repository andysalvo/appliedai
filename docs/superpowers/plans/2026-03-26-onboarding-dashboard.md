# Onboarding Dashboard Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a member onboarding system that greets collaborators by name in Copilot, opens a 3D dashboard in VS Code's Simple Browser, and gives role-specific briefings.

**Architecture:** A static HTML dashboard (`dashboard/index.html`) using vanilla Three.js renders a 3D animated hero with Penn State brand colors. A JSON roster (`.github/roster.json`) maps names to roles and briefings. Copilot instructions (`.github/copilot-instructions.md`) tell the agent how to greet members, look up the roster, and open the dashboard. Dashboard data lives in `dashboard/data.json` for easy updates by any agent.

**Tech Stack:** Three.js (CDN, no build step), vanilla HTML/CSS/JS, JSON data files

---

### Task 1: Create the member roster

**Files:**

- Create: `.github/roster.json`

- [ ] **Step 1: Create roster file**

```json
[
  {
    "name": "Andy Salvo",
    "role": "Programming Lead",
    "github": "andysalvo",
    "email": "ajs10845@psu.edu",
    "briefing": "Welcome back. You have full repo access. Check open issues and PRs for current work."
  },
  {
    "name": "Ryan Einzig",
    "role": "President",
    "github": "",
    "email": "rxe5177@psu.edu",
    "briefing": "Welcome to the repo. Your first priority: we need to figure out a meeting date for the club. Coordinate with the exec board and find a time that works."
  },
  {
    "name": "Evan Chappell",
    "role": "Vice-President",
    "github": "",
    "email": "evc5667@psu.edu",
    "briefing": "Welcome to the repo. Check with the President on current priorities."
  },
  {
    "name": "Brody Bell",
    "role": "Treasurer",
    "github": "",
    "email": "bkb5921@psu.edu",
    "briefing": "Welcome to the repo. Check with the President on current priorities."
  },
  {
    "name": "Chris Coyne",
    "role": "Faculty Director",
    "github": "",
    "email": "",
    "briefing": "Welcome, Professor Coyne. You have advisory oversight of this repository. The exec board handles day-to-day development."
  }
]
```

- [ ] **Step 2: Commit**

```bash
git add .github/roster.json
git commit -m "feat: add member roster for onboarding system"
```

---

### Task 2: Create the dashboard data file

**Files:**

- Create: `dashboard/data.json`

- [ ] **Step 1: Create data file**

```json
{
  "club_name": "Applied AI Club at Penn State",
  "site_url": "https://andysalvo.github.io/appliedai/",
  "site_display": "appliedaipsu.com",
  "mailing_list_count": 0,
  "mailing_list_note": "Manually updated. Automation coming soon.",
  "open_issues": "Check GitHub Issues tab",
  "last_updated": "2026-03-26",
  "announcements": ["First priority: determine a regular meeting date for the club."]
}
```

- [ ] **Step 2: Commit**

```bash
git add dashboard/data.json
git commit -m "feat: add dashboard data file for onboarding system"
```

---

### Task 3: Build the 3D dashboard HTML page

**Files:**

- Create: `dashboard/index.html`

This is a self-contained HTML file. No build step. Uses Three.js from CDN. Reads URL params for personalization (`?name=Andy+Salvo&role=Programming+Lead`) and fetches `data.json` for project info.

- [ ] **Step 1: Create the dashboard HTML file**

The page has three sections:

1. **3D hero** -- full-width Three.js canvas with animated particle field in Penn State navy/amber
2. **Welcome bar** -- member name, role, and personalized briefing
3. **Dashboard panels** -- site embed/link, mailing list count, announcements, and placeholder panels for future widgets

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Applied AI Club -- Dashboard</title>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>
    <style>
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }

      body {
        font-family:
          'Inter',
          system-ui,
          -apple-system,
          sans-serif;
        background: #001e44;
        color: #ffffff;
        overflow-x: hidden;
      }

      /* 3D Hero */
      #hero {
        position: relative;
        width: 100%;
        height: 280px;
        overflow: hidden;
      }

      #hero canvas {
        display: block;
        width: 100%;
        height: 100%;
      }

      #hero-overlay {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        text-align: center;
        pointer-events: none;
        z-index: 2;
      }

      #hero-overlay h1 {
        font-family: 'Roboto Slab', Georgia, serif;
        font-size: 2rem;
        font-weight: 700;
        letter-spacing: -0.02em;
        margin-bottom: 0.25rem;
      }

      #hero-overlay p {
        font-size: 1rem;
        opacity: 0.8;
      }

      /* Welcome bar */
      .welcome-bar {
        background: #1e407c;
        padding: 1.25rem 2rem;
        display: flex;
        align-items: center;
        gap: 1rem;
        flex-wrap: wrap;
      }

      .welcome-bar .name {
        font-weight: 700;
        font-size: 1.1rem;
      }

      .welcome-bar .role {
        background: rgba(150, 190, 230, 0.2);
        padding: 0.2rem 0.75rem;
        border-radius: 999px;
        font-size: 0.85rem;
        color: #96bee6;
      }

      .welcome-bar .briefing {
        width: 100%;
        margin-top: 0.5rem;
        font-size: 0.95rem;
        opacity: 0.9;
        line-height: 1.5;
      }

      /* Dashboard grid */
      .dashboard {
        padding: 1.5rem;
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        gap: 1.25rem;
        max-width: 1200px;
        margin: 0 auto;
      }

      .card {
        background: rgba(30, 64, 124, 0.3);
        border: 1px solid rgba(150, 190, 230, 0.15);
        border-radius: 12px;
        padding: 1.5rem;
        transition: border-color 0.2s;
      }

      .card:hover {
        border-color: rgba(150, 190, 230, 0.4);
      }

      .card h2 {
        font-family: 'Roboto Slab', Georgia, serif;
        font-size: 1.1rem;
        margin-bottom: 0.75rem;
        color: #96bee6;
      }

      .card .value {
        font-size: 2.5rem;
        font-weight: 700;
        margin-bottom: 0.25rem;
      }

      .card .label {
        font-size: 0.85rem;
        opacity: 0.6;
      }

      .card a {
        color: #009cde;
        text-decoration: none;
      }

      .card a:hover {
        text-decoration: underline;
      }

      .card ul {
        list-style: none;
        padding: 0;
      }

      .card ul li {
        padding: 0.5rem 0;
        border-bottom: 1px solid rgba(150, 190, 230, 0.1);
        font-size: 0.95rem;
      }

      .card ul li:last-child {
        border-bottom: none;
      }

      .card.coming-soon {
        opacity: 0.5;
        text-align: center;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        min-height: 140px;
      }

      .card.coming-soon h2 {
        color: rgba(150, 190, 230, 0.5);
      }

      .footer-bar {
        text-align: center;
        padding: 1rem;
        font-size: 0.75rem;
        opacity: 0.4;
        margin-top: 1rem;
      }
    </style>
  </head>
  <body>
    <!-- 3D Hero -->
    <div id="hero">
      <div id="hero-overlay">
        <h1>Applied AI Club</h1>
        <p>at Penn State</p>
      </div>
    </div>

    <!-- Welcome bar (populated by JS) -->
    <div class="welcome-bar" id="welcome">
      <span class="name" id="member-name">Welcome</span>
      <span class="role" id="member-role">Member</span>
      <div class="briefing" id="member-briefing">
        Open the Copilot chat and introduce yourself to get a personalized briefing.
      </div>
    </div>

    <!-- Dashboard panels -->
    <div class="dashboard" id="dashboard">
      <!-- Populated by JS from data.json -->
    </div>

    <div class="footer-bar">Dashboard data last updated: <span id="last-updated">--</span></div>

    <script>
      // --- URL Params for personalization ---
      const params = new URLSearchParams(window.location.search)
      const memberName = params.get('name') || 'Welcome'
      const memberRole = params.get('role') || 'Member'
      const memberBriefing = params.get('briefing') || ''

      document.getElementById('member-name').textContent = memberName
      document.getElementById('member-role').textContent = memberRole
      if (memberBriefing) {
        document.getElementById('member-briefing').textContent = memberBriefing
      }

      // --- 3D Particle Hero ---
      ;(function initHero() {
        const container = document.getElementById('hero')
        const scene = new THREE.Scene()
        const camera = new THREE.PerspectiveCamera(
          60,
          container.clientWidth / container.clientHeight,
          0.1,
          100
        )
        camera.position.z = 30

        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
        renderer.setSize(container.clientWidth, container.clientHeight)
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
        container.insertBefore(renderer.domElement, container.firstChild)

        // Particle system
        const count = 800
        const positions = new Float32Array(count * 3)
        const colors = new Float32Array(count * 3)

        // Penn State colors as RGB
        const brandColors = [
          [0.0, 0.118, 0.267], // navy #001e44
          [0.118, 0.251, 0.486], // beaver-blue #1e407c
          [0.588, 0.745, 0.902], // pugh-blue #96bee6
          [0.0, 0.612, 0.871], // pa-sky #009cde
        ]

        for (let i = 0; i < count; i++) {
          positions[i * 3] = (Math.random() - 0.5) * 60
          positions[i * 3 + 1] = (Math.random() - 0.5) * 30
          positions[i * 3 + 2] = (Math.random() - 0.5) * 40

          const c = brandColors[Math.floor(Math.random() * brandColors.length)]
          colors[i * 3] = c[0]
          colors[i * 3 + 1] = c[1]
          colors[i * 3 + 2] = c[2]
        }

        const geometry = new THREE.BufferGeometry()
        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
        geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))

        const material = new THREE.PointsMaterial({
          size: 0.15,
          vertexColors: true,
          transparent: true,
          opacity: 0.8,
          sizeAttenuation: true,
        })

        const points = new THREE.Points(geometry, material)
        scene.add(points)

        // Animate
        function animate() {
          requestAnimationFrame(animate)
          points.rotation.y += 0.001
          points.rotation.x += 0.0003

          const pos = geometry.attributes.position.array
          for (let i = 0; i < count; i++) {
            pos[i * 3 + 1] += Math.sin(Date.now() * 0.001 + i) * 0.003
          }
          geometry.attributes.position.needsUpdate = true

          renderer.render(scene, camera)
        }
        animate()

        // Resize
        window.addEventListener('resize', () => {
          camera.aspect = container.clientWidth / container.clientHeight
          camera.updateProjectionMatrix()
          renderer.setSize(container.clientWidth, container.clientHeight)
        })
      })()

      // --- Load dashboard data ---
      fetch('data.json')
        .then((r) => r.json())
        .then((data) => {
          const dashboard = document.getElementById('dashboard')
          document.getElementById('last-updated').textContent = data.last_updated

          // Site card
          dashboard.innerHTML += `
          <div class="card">
            <h2>Our Site</h2>
            <a href="${data.site_url}" target="_blank">${data.site_display}</a>
            <p style="margin-top:0.5rem;font-size:0.9rem;opacity:0.7">Live on GitHub Pages</p>
          </div>
        `

          // Mailing list card
          dashboard.innerHTML += `
          <div class="card">
            <h2>Mailing List</h2>
            <div class="value">${data.mailing_list_count}</div>
            <div class="label">${data.mailing_list_note}</div>
          </div>
        `

          // Announcements card
          if (data.announcements && data.announcements.length > 0) {
            const items = data.announcements.map((a) => `<li>${a}</li>`).join('')
            dashboard.innerHTML += `
            <div class="card">
              <h2>Announcements</h2>
              <ul>${items}</ul>
            </div>
          `
          }

          // Future panels (placeholders)
          dashboard.innerHTML += `
          <div class="card coming-soon">
            <h2>Open Issues</h2>
            <p>Coming soon</p>
          </div>
        `

          dashboard.innerHTML += `
          <div class="card coming-soon">
            <h2>Team Activity</h2>
            <p>Coming soon</p>
          </div>
        `

          dashboard.innerHTML += `
          <div class="card coming-soon">
            <h2>Meeting Schedule</h2>
            <p>Coming soon</p>
          </div>
        `
        })
        .catch(() => {
          document.getElementById('dashboard').innerHTML =
            '<div class="card"><h2>Dashboard</h2><p>Could not load data.json. Run from a local server.</p></div>'
        })
    </script>
  </body>
</html>
```

- [ ] **Step 2: Commit**

```bash
git add dashboard/index.html
git commit -m "feat: add 3D onboarding dashboard with Three.js particle hero"
```

---

### Task 4: Update Copilot instructions with onboarding protocol

**Files:**

- Modify: `.github/copilot-instructions.md`

- [ ] **Step 1: Replace copilot-instructions.md with onboarding protocol**

```markdown
# Copilot Instructions

Read `AGENTS.md` in the repo root for full project context, commands, style guide, and boundaries.

## Onboarding Protocol

When a user introduces themselves (messages starting with "Hello", "Hi", or "I am"), follow this protocol:

### Step 1: Check the roster

Read `.github/roster.json`. Look for a name match (case-insensitive, partial match OK -- "Andy" matches "Andy Salvo", "Ryan" matches "Ryan Einzig").

### Step 2: Greet the member

**If the name is found in the roster:**

Respond with:

> Welcome, [full name]. You are registered as **[role]** for the Applied AI Club at Penn State.
>
> [Their personalized briefing from the roster]

**If the name is NOT found:**

Respond with:

> Welcome to the Applied AI Club repo. I don't have you in the roster yet, but you can still explore the project.
>
> This is the official repository for the Applied AI Club at Penn State. The site is live at https://andysalvo.github.io/appliedai/. Read AGENTS.md for the full project guide.
>
> To get added to the roster, contact the Programming Lead (Andy Salvo).

### Step 3: Open the dashboard

After greeting, open the 3D dashboard in VS Code's Simple Browser. Run this command in the terminal:
```

npx http-server dashboard -p 9173 -c-1 --silent &

````

Then tell the user:

> I've started a local server. Open the dashboard by running this VS Code command:
> **Simple Browser: Show** and navigate to:
> `http://localhost:9173?name=[URL-encoded name]&role=[URL-encoded role]&briefing=[URL-encoded briefing]`

Alternatively, suggest the user press `Cmd+Shift+P`, type "Simple Browser: Show", and paste the URL.

### Roster file format

Each entry in `.github/roster.json`:

```json
{
  "name": "Full Name",
  "role": "Title",
  "github": "username",
  "email": "email@psu.edu",
  "briefing": "Personalized message shown on dashboard"
}
````

The Programming Lead (Andy Salvo) manages this file. Do not modify it unless instructed.

````

- [ ] **Step 2: Commit**

```bash
git add .github/copilot-instructions.md
git commit -m "feat: add onboarding protocol to Copilot instructions"
````

---

### Task 5: Update .gitignore for dashboard server artifacts

**Files:**

- Modify: `.gitignore`

- [ ] **Step 1: Add dashboard server artifacts to .gitignore**

Append to the end of `.gitignore`:

```
# Dashboard local server
dashboard/node_modules/
```

- [ ] **Step 2: Commit**

```bash
git add .gitignore
git commit -m "chore: add dashboard server artifacts to gitignore"
```

---

### Task 6: Update AGENTS.md project structure

**Files:**

- Modify: `AGENTS.md`

- [ ] **Step 1: Add dashboard to the project structure section**

In the `Project Structure` section of AGENTS.md, add after the `.github/` block:

```
  dashboard/
    index.html                    # 3D onboarding dashboard (Three.js, standalone)
    data.json                     # Dashboard data (mailing list count, announcements)
```

Also add to the `.github/` section:

```
    roster.json                   # Member roster for onboarding (name, role, briefing)
```

- [ ] **Step 2: Commit**

```bash
git add AGENTS.md
git commit -m "docs: add dashboard and roster to project structure"
```

---

### Task 7: Test the full onboarding flow

- [ ] **Step 1: Start the dashboard server locally**

```bash
cd ~/Documents/GitHub/appliedai
npx http-server dashboard -p 9173 -c-1
```

- [ ] **Step 2: Open in browser and verify**

Open: `http://localhost:9173?name=Andy+Salvo&role=Programming+Lead&briefing=Welcome+back.+You+have+full+repo+access.`

Verify:

- 3D particle animation renders with Penn State colors
- Name shows "Andy Salvo", role shows "Programming Lead"
- Briefing text displays
- Dashboard panels load from data.json (site link, mailing list count, announcements)
- "Coming soon" placeholder panels render

- [ ] **Step 3: Test Ryan's view**

Open: `http://localhost:9173?name=Ryan+Einzig&role=President&briefing=Welcome+to+the+repo.+Your+first+priority%3A+we+need+to+figure+out+a+meeting+date+for+the+club.`

Verify the briefing text about meeting date shows correctly.

- [ ] **Step 4: Test generic view**

Open: `http://localhost:9173`

Verify it shows "Welcome" / "Member" defaults with the generic briefing prompt.

- [ ] **Step 5: Open in VS Code Simple Browser**

In VS Code: `Cmd+Shift+P` > "Simple Browser: Show" > paste the localhost URL. Verify it renders inside the editor.

- [ ] **Step 6: Build check**

```bash
npm run build
```

Verify the dashboard directory does not break the Next.js static export (it shouldn't since it's outside `src/`).

- [ ] **Step 7: Commit any fixes, then push**

```bash
git push origin main
```

Or create a feature branch and PR per the repo's git workflow.
