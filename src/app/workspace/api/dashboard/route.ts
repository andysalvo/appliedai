import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function GET() {
  if (process.env.NODE_ENV === 'production') {
    return NextResponse.json({ error: 'Not available' }, { status: 404 })
  }

  const [contribRes, sessionRes, ideaRes] = await Promise.all([
    supabase
      .from('workspace_contributors')
      .select('*')
      .order('session_count', { ascending: false }),
    supabase
      .from('workspace_sessions')
      .select('*')
      .order('started_at', { ascending: false })
      .limit(50),
    supabase.from('workspace_ideas').select('*').order('created_at', { ascending: false }),
  ])

  return NextResponse.json({
    contributors: contribRes.data || [],
    sessions: sessionRes.data || [],
    ideas: ideaRes.data || [],
  })
}
