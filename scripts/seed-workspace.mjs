import { createClient } from '@supabase/supabase-js'
import { config } from 'dotenv'
import { readFileSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))
config({ path: join(__dirname, '..', '.env.local') })

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

async function seed() {
  console.log('Seeding workspace data...\n')

  // Seed contributors (executive board + test students)
  const contributors = [
    {
      github_username: 'andysalvo',
      display_name: 'Andy Salvo',
      psu_email: 'ajs10845@psu.edu',
      interests: ['programming', 'AI agents', 'product design'],
      skill_signals: ['next.js', 'claude-code', 'system-design', 'video-production'],
      session_count: 3,
      last_session_at: new Date().toISOString(),
      contribution_summary:
        'Programming Lead. Built the workspace agent, speaker page chat widget, and club infrastructure.',
    },
    {
      github_username: 'ryaneinzig',
      display_name: 'Ryan Einzig',
      psu_email: 'rxe5177@psu.edu',
      interests: ['leadership', 'AI in business', 'event planning'],
      skill_signals: ['strategy', 'outreach', 'public-speaking'],
      session_count: 1,
      last_session_at: new Date().toISOString(),
      contribution_summary: 'President. Driving speaker program outreach and club strategy.',
    },
    {
      github_username: 'sarahchen99',
      display_name: 'Sarah Chen',
      psu_email: 'slc5678@psu.edu',
      interests: ['NLP', 'prompt engineering', 'workshops'],
      skill_signals: ['python', 'data-science'],
      session_count: 1,
      last_session_at: new Date().toISOString(),
      contribution_summary: 'Proposed prompt engineering workshop with team competition format.',
    },
    {
      github_username: 'marcuswilliams',
      display_name: 'Marcus Williams',
      psu_email: 'maw5432@psu.edu',
      interests: ['data science', 'labs'],
      skill_signals: ['python', 'pandas', 'jupyter'],
      session_count: 1,
      last_session_at: new Date().toISOString(),
      contribution_summary: 'Joined as Labs Member. Interested in hands-on data science projects.',
    },
    {
      github_username: 'priyapatel',
      display_name: 'Priya Patel',
      psu_email: 'prp5901@psu.edu',
      interests: ['creative AI', 'visual tools', 'design'],
      skill_signals: ['figma', 'canva', 'midjourney'],
      session_count: 1,
      last_session_at: new Date().toISOString(),
      contribution_summary:
        'Recommended Napkin AI for the tool registry. Interested in creative AI tools.',
    },
  ]

  const { error: contribError } = await supabase
    .from('workspace_contributors')
    .upsert(contributors, { onConflict: 'github_username' })

  if (contribError) {
    console.error('Contributors error:', contribError.message)
    return
  }
  console.log(`  Seeded ${contributors.length} contributors`)

  // Get contributor IDs for session linking
  const { data: contribs } = await supabase
    .from('workspace_contributors')
    .select('id, github_username')

  const idMap = Object.fromEntries(contribs.map((c) => [c.github_username, c.id]))

  // Seed sessions
  const sessions = [
    {
      github_username: 'sarahchen99',
      started_at: new Date('2026-04-05T13:15:00Z').toISOString(),
      ended_at: new Date('2026-04-05T13:22:00Z').toISOString(),
      ideas_discussed: ['prompt engineering workshop', 'team competition format'],
      tools_used: ['register_contributor', 'save_idea'],
      changes_made: ['Registered as contributor', 'Saved workshop idea'],
      files_modified: ['contributions/sessions/sarahchen99.md', 'contributions/contributors.md'],
      conversation_summary:
        'Sarah proposed a prompt engineering workshop where teams compete to get the best output from the same model. Categorized as an event for Friday afternoons.',
    },
    {
      github_username: 'marcuswilliams',
      started_at: new Date('2026-04-05T13:25:00Z').toISOString(),
      ended_at: new Date('2026-04-05T13:30:00Z').toISOString(),
      ideas_discussed: [],
      tools_used: ['register_contributor', 'add_agent'],
      changes_made: ['Registered as contributor', 'Added to agent list as Labs Member'],
      files_modified: ['contributions/contributors.md', 'src/data/agents.ts'],
      conversation_summary:
        'Marcus added himself to the agent list as a Labs Member. Sophomore studying data science, wants to help with the labs program.',
    },
    {
      github_username: 'priyapatel',
      started_at: new Date('2026-04-05T13:32:00Z').toISOString(),
      ended_at: new Date('2026-04-05T13:38:00Z').toISOString(),
      ideas_discussed: ['Napkin AI tool recommendation'],
      tools_used: ['register_contributor', 'add_tool'],
      changes_made: ['Registered as contributor', 'Added Napkin AI to creative tools'],
      files_modified: ['contributions/contributors.md', 'src/data/tools.ts'],
      conversation_summary:
        'Priya recommended Napkin AI, a creative tool that turns text into diagrams automatically. Added to the tool registry under creative category.',
    },
  ]

  const { data: insertedSessions, error: sessionError } = await supabase
    .from('workspace_sessions')
    .insert(sessions)
    .select('id, github_username')

  if (sessionError) {
    console.error('Sessions error:', sessionError.message)
    return
  }
  console.log(`  Seeded ${insertedSessions.length} sessions`)

  const sessionMap = Object.fromEntries(insertedSessions.map((s) => [s.github_username, s.id]))

  // Seed ideas (linked to sessions via session_id)
  const ideas = [
    {
      github_username: 'sarahchen99',
      session_id: sessionMap['sarahchen99'],
      title: 'Prompt Engineering Workshop',
      category: 'event',
      description:
        'A workshop where students learn to write better prompts for different AI tools. Teams compete to get the best output from the same model. Friday afternoon format.',
      relevance_score: 5,
      votes: 0,
      endorsements: [],
    },
    {
      github_username: 'priyapatel',
      session_id: sessionMap['priyapatel'],
      title: 'Visual AI Tools Showcase',
      category: 'event',
      description:
        'A session showcasing creative AI tools like Napkin AI, Midjourney, and others. Students bring a project and create something visual using AI tools.',
      relevance_score: 4,
      votes: 0,
      endorsements: [],
    },
    {
      github_username: 'marcuswilliams',
      session_id: sessionMap['marcuswilliams'],
      title: 'Data Science with AI Lab Project',
      category: 'project',
      description:
        'A Labs project where members build a data analysis pipeline using AI-assisted tools. Real dataset, real insights, shipped as a team.',
      relevance_score: 4,
      votes: 0,
      endorsements: [],
    },
  ]

  const { error: ideaError } = await supabase.from('workspace_ideas').insert(ideas)

  if (ideaError) {
    console.error('Ideas error:', ideaError.message)
    return
  }
  console.log(`  Seeded ${ideas.length} ideas`)

  console.log('\nDone.')
}

seed().catch(console.error)
