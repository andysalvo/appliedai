import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function POST(request: Request) {
  const data = await request.json()

  const { fullName, email, event } = data

  if (!fullName || !email) {
    return NextResponse.json({ error: 'Name and email are required.' }, { status: 400 })
  }

  if (!email.toLowerCase().endsWith('@psu.edu')) {
    return NextResponse.json({ error: 'Please use your @psu.edu email.' }, { status: 400 })
  }

  const results: { supabase?: string; email?: string } = {}

  // 1. Save to Supabase
  if (supabase) {
    const { data: existing } = await supabase
      .from('rsvps')
      .select('id')
      .eq('email', email.toLowerCase())
      .eq('event', event)
      .maybeSingle()

    if (existing) {
      return NextResponse.json({ ok: true, duplicate: true })
    }

    const { error } = await supabase.from('rsvps').insert({
      full_name: fullName,
      email: email.toLowerCase(),
      event,
    })
    results.supabase = error ? `error: ${error.message}` : 'ok'
  }

  // 2. Send email notification
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
          subject: `New RSVP: ${fullName}`,
          text: `${fullName} (${email}) RSVP'd for ${event}`,
        }),
      })
      results.email = 'ok'
    } catch {
      results.email = 'error'
    }
  }

  return NextResponse.json({ ok: true, results })
}
