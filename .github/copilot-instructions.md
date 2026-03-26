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
```

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
```

The Programming Lead (Andy Salvo) manages this file. Do not modify it unless instructed.
