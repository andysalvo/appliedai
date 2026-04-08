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

  const results: { supabase?: string; sheets?: string; email?: string } = {}

  // 1. Save to Supabase (primary)
  if (supabase) {
    // Check for duplicate
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

  // 2. Forward to Google Sheets (backup)
  const sheetsEndpoint = process.env.SPEAKER_SHEETS_ENDPOINT
  if (sheetsEndpoint) {
    try {
      const formData = new FormData()
      formData.append('source', 'rsvp')
      formData.append('fullName', fullName)
      formData.append('email', email)
      formData.append('event', event || '')

      await fetch(sheetsEndpoint, { method: 'POST', body: formData })
      results.sheets = 'ok'
    } catch {
      results.sheets = 'error'
    }
  }

  // 3. Send email notification
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
