// src/app/workspace/api/session-end/route.ts
import { NextRequest } from 'next/server'
import { execSync } from 'child_process'

export async function POST(req: NextRequest) {
  if (process.env.NODE_ENV === 'production') {
    return Response.json({ error: 'Not available' }, { status: 404 })
  }

  try {
    const { summary } = (await req.json()) as { summary: string }
    const cwd = process.cwd()

    // Get git user info (pre-configured in Codespace)
    let username = 'contributor'
    try {
      username = execSync('git config user.name', { cwd, encoding: 'utf-8' })
        .trim()
        .toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^a-z0-9-]/g, '')
    } catch {
      // fallback
    }

    const timestamp = Date.now()
    const branch = `contrib/${username}-${timestamp}`
    const commitMsg = summary || 'feat: workspace contribution'

    // Check if there are changes to commit
    const statusData = execSync('git status --porcelain src/data/', {
      cwd,
      encoding: 'utf-8',
    }).trim()
    const statusContrib = execSync('git status --porcelain contributions/', {
      cwd,
      encoding: 'utf-8',
    }).trim()
    if (!statusData && !statusContrib) {
      return Response.json({ success: false, message: 'No changes to submit.' })
    }

    // Create branch, stage data files and contributions, commit, push, create PR
    execSync(`git checkout -b "${branch}"`, { cwd })
    execSync('git add src/data/ contributions/', { cwd })
    execSync(`git commit -m "${commitMsg.replace(/"/g, '\\"')}"`, { cwd })
    execSync(`git push -u origin "${branch}"`, { cwd })

    const prUrl = execSync(
      `gh pr create --title "${commitMsg.replace(/"/g, '\\"')}" --body "Submitted via Applied AI Workspace agent.\n\n${summary.replace(/"/g, '\\"')}"`,
      { cwd, encoding: 'utf-8' }
    ).trim()

    return Response.json({ success: true, prUrl, branch })
  } catch (error) {
    console.error('Session end error:', error)
    return Response.json(
      {
        success: false,
        message: error instanceof Error ? error.message : 'Failed to create PR.',
      },
      { status: 500 }
    )
  }
}
