import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function POST(request: Request) {
  const data = await request.json()

  const { firstName, email, list = 'general' } = data

  if (!firstName || !email) {
    return NextResponse.json({ error: 'Name and email are required.' }, { status: 400 })
  }

  const validLists = ['general', 'labs']
  if (!validLists.includes(list)) {
    return NextResponse.json({ error: 'Invalid list.' }, { status: 400 })
  }

  const results: { supabase?: string; email?: string } = {}

  // Save to Supabase
  if (supabase) {
    // Check for duplicate
    const { data: existing } = await supabase
      .from('club_signups')
      .select('id')
      .eq('email', email.toLowerCase())
      .eq('list', list)
      .maybeSingle()

    if (existing) {
      return NextResponse.json({ ok: true, duplicate: true })
    }

    const { error } = await supabase.from('club_signups').insert({
      first_name: firstName,
      email: email.toLowerCase(),
      list,
    })
    results.supabase = error ? `error: ${error.message}` : 'ok'
  }

  // Send email notification
  const resendKey = process.env.RESEND_API_KEY
  const notifyEmail = process.env.NOTIFY_EMAIL || 'appliedaipsu@gmail.com'
  if (resendKey) {
    try {
      await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${resendKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: 'Applied AI <notifications@appliedaipennstate.com>',
          to: notifyEmail,
          subject: `New signup: ${firstName} (${list})`,
          text: `${firstName} (${email}) signed up for the ${list} list.`,
        }),
      })
      results.email = 'ok'
    } catch {
      results.email = 'error'
    }
  }

  return NextResponse.json({ ok: true, results })
}
