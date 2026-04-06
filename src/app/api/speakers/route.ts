import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function POST(request: Request) {
  const data = await request.json()

  const { fullName, email, organization, role, topic, format, notes } = data

  if (!fullName || !email) {
    return NextResponse.json({ error: 'Name and email are required.' }, { status: 400 })
  }

  const results: { supabase?: string; sheets?: string; email?: string } = {}

  // 1. Save to Supabase
  if (supabase) {
    const { error } = await supabase.from('speaker_submissions').insert({
      full_name: fullName,
      email,
      organization: organization || null,
      role: role || null,
      topic: topic || null,
      format: format || 'either',
      notes: notes || null,
    })
    results.supabase = error ? `error: ${error.message}` : 'ok'
  }

  // 2. Forward to Google Sheets
  const sheetsEndpoint = process.env.SPEAKER_SHEETS_ENDPOINT
  if (sheetsEndpoint) {
    try {
      const formData = new FormData()
      formData.append('source', 'speaker-interest')
      formData.append('fullName', fullName)
      formData.append('email', email)
      formData.append('organization', organization || '')
      formData.append('role', role || '')
      formData.append('topic', topic || '')
      formData.append('format', format || 'either')
      formData.append('notes', notes || '')

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
          subject: `New speaker interest: ${fullName}`,
          text: [
            `Name: ${fullName}`,
            `Email: ${email}`,
            `Organization: ${organization || 'N/A'}`,
            `Role: ${role || 'N/A'}`,
            `Topic: ${topic || 'N/A'}`,
            `Format: ${format || 'either'}`,
            `Notes: ${notes || 'None'}`,
          ].join('\n'),
        }),
      })
      results.email = 'ok'
    } catch {
      results.email = 'error'
    }
  }

  return NextResponse.json({ ok: true, results })
}
