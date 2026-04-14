import type { Metadata } from 'next'
import { ArrowRight, Calendar, Clock, MapPin, Users, Sparkles } from 'lucide-react'
import { FadeIn } from '@/components/ui/FadeIn'
import { SlideIn } from '@/components/ui/SlideIn'
import { AnimatedCard } from '@/components/ui/AnimatedCard'
import { PressableButton } from '@/components/ui/PressableButton'
import { RSVPForm } from '@/components/RSVPForm'
import { EventStructuredData } from '@/components/EventStructuredData'

export const metadata: Metadata = {
  title: 'Upcoming Events at the Applied AI Club',
  description:
    'Upcoming events at the Applied AI Club at Penn State. First general meeting April 20, 2026. Guest speakers, workshops, and case competitions open to every Penn State student.',
  alternates: { canonical: 'https://appliedaipennstate.com/events' },
  openGraph: {
    title: 'Upcoming Events at the Applied AI Club at Penn State',
    description:
      'First general meeting April 20, 2026. Guest speakers, workshops, and case competitions open to every Penn State student.',
    url: 'https://appliedaipennstate.com/events',
  },
}

const structuredEvents = [
  {
    id: 'first-general-meeting-2026-04-20',
    name: 'Applied AI Club First General Meeting',
    description:
      'First general meeting of the Applied AI Club at Penn State. Meet the executive board, learn how the club will operate in Fall 2026, and find out how to get involved. Open to every Penn State student.',
    startDate: '2026-04-20T18:00:00-04:00',
    endDate: '2026-04-20T19:00:00-04:00',
    location: 'Pennsylvania State University, University Park',
  },
]

interface Event {
  title: string
  date: string
  time: string
  location: string
  tag?: string
}

const events: Event[] = [
  {
    title: 'First General Meeting',
    date: 'April 20, 2026',
    time: '6:00 PM – 7:00 PM',
    location: 'TBD',
    tag: 'Meeting',
  },
]

export default function EventsPage() {
  return (
    <>
      <EventStructuredData events={structuredEvents} />
      {/* ─── HERO ─── */}
      <section className="bg-navy relative overflow-hidden py-14 md:py-20">
        <div className="absolute top-[20%] right-[-5%] w-[400px] h-[400px] rounded-full bg-beaver-blue/10 blur-[150px]" />
        <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-beaver-blue via-pa-sky to-pugh-blue" />
        <div className="absolute bottom-0 left-[10%] right-[10%] h-[80px] bg-gradient-to-r from-beaver-blue/15 via-pa-sky/10 to-pugh-blue/10 blur-[60px]" />

        <div className="relative max-w-6xl mx-auto px-6">
          <FadeIn>
            <p className="text-xs uppercase tracking-widest text-pugh-blue font-semibold mb-3">
              Events
            </p>
            <h1
              className="font-display text-white font-bold leading-tight mb-6"
              style={{ fontSize: 'clamp(2.5rem, 5vw, 3.5rem)' }}
            >
              Upcoming events
            </h1>
            <p className="text-white/50 text-lg max-w-2xl leading-relaxed">
              Guest speakers, hands-on workshops, and open meetings. All events are open to Penn
              State students regardless of major or experience.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ─── ANNOUNCEMENT ─── */}
      <section className="py-14 md:py-20">
        <div className="max-w-6xl mx-auto px-6">
          <SlideIn direction="left">
            <div className="relative overflow-hidden rounded-2xl">
              {/* Layered background */}
              <div className="absolute inset-0 bg-navy" />
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-beaver-blue via-pa-sky to-pugh-blue" />
              <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-pugh-blue via-pa-sky to-beaver-blue" />
              <div className="absolute top-[20%] right-[-8%] w-[400px] h-[400px] rounded-full bg-beaver-blue/8 blur-[150px]" />
              <div className="absolute bottom-[10%] left-[-5%] w-[250px] h-[250px] rounded-full bg-pa-sky/5 blur-[100px]" />

              <div className="relative p-8 md:p-14">
                <div className="grid grid-cols-1 lg:grid-cols-[1fr_220px] gap-10 lg:gap-16 items-start">
                  <div>
                    <p className="text-xs uppercase tracking-widest text-pugh-blue font-semibold mb-5">
                      First General Meeting
                    </p>
                    <h2
                      className="font-display text-white font-bold leading-tight mb-4"
                      style={{ fontSize: 'clamp(2.25rem, 4.5vw, 3.25rem)' }}
                    >
                      April 20, 2026
                    </h2>
                    <p className="text-white/45 leading-relaxed mb-10 max-w-xl text-[15px]">
                      Meet the executive board and learn how Applied AI will operate when we go
                      full-scale in Fall 2026. Find out how to get involved early, what roles are
                      opening up, and how the club is structured. The people who show up now get to
                      shape what this becomes.
                    </p>

                    {/* Details row */}
                    <div className="flex flex-wrap gap-8 mb-10">
                      {[
                        { icon: Clock, label: 'Time', value: '6:00 PM – 7:00 PM' },
                        { icon: MapPin, label: 'Location', value: 'TBD' },
                      ].map((item) => {
                        const Icon = item.icon
                        return (
                          <div key={item.label} className="flex items-center gap-3">
                            <div className="w-11 h-11 rounded-xl bg-white/[0.05] border border-white/[0.06] flex items-center justify-center">
                              <Icon size={18} className="text-pugh-blue" />
                            </div>
                            <div>
                              <p className="text-white/30 text-[11px] uppercase tracking-wider font-medium">
                                {item.label}
                              </p>
                              <p className="text-white font-medium text-sm">{item.value}</p>
                            </div>
                          </div>
                        )
                      })}
                    </div>

                    {/* Agenda pills */}
                    <div className="flex flex-wrap gap-3 mb-10">
                      {[
                        { icon: Users, text: 'Meet the team' },
                        { icon: Sparkles, text: 'Fall 2026 plan' },
                        { icon: ArrowRight, text: 'Get involved early' },
                      ].map((item) => {
                        const Icon = item.icon
                        return (
                          <div
                            key={item.text}
                            className="flex items-center gap-2 bg-white/[0.03] border border-white/[0.07] rounded-full px-4 py-2"
                          >
                            <Icon size={13} className="text-pugh-blue/80" />
                            <p className="text-white/60 text-[13px] font-medium">{item.text}</p>
                          </div>
                        )
                      })}
                    </div>

                    {/* Divider before RSVP */}
                    <div className="h-[1px] bg-gradient-to-r from-white/[0.08] via-white/[0.04] to-transparent mb-8 max-w-lg" />

                    <RSVPForm event="First General Meeting - April 20, 2026" />
                  </div>

                  {/* Calendar block */}
                  <div className="hidden lg:block">
                    <div className="bg-white/[0.03] border border-white/[0.07] rounded-2xl p-8 text-center">
                      <p className="text-pugh-blue text-[11px] uppercase tracking-[0.2em] font-semibold mb-2">
                        April
                      </p>
                      <p
                        className="font-display text-white font-bold leading-none tracking-tight"
                        style={{ fontSize: '5.5rem' }}
                      >
                        20
                      </p>
                      <div className="h-[1px] bg-white/[0.06] my-4" />
                      <p className="text-white/30 text-sm font-medium">Sunday</p>
                      <p className="text-white/20 text-xs mt-1">6:00 PM</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </SlideIn>
        </div>
      </section>

      {/* ─── SCHEDULE ─── */}
      <section className="pb-14 md:pb-20">
        <div className="max-w-6xl mx-auto px-6">
          <FadeIn>
            <p className="text-xs uppercase tracking-widest text-beaver-blue font-semibold mb-3">
              Schedule
            </p>
            <h3
              className="font-display text-navy font-bold leading-tight mb-8"
              style={{ fontSize: 'clamp(1.5rem, 2.5vw, 2rem)' }}
            >
              All events
            </h3>
          </FadeIn>

          <div className="space-y-3">
            {events.map((event) => (
              <AnimatedCard
                key={event.title}
                className="bg-white rounded-xl p-5 border border-border"
              >
                <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-8">
                  <div className="flex items-center gap-3 sm:min-w-[200px]">
                    <div className="w-10 h-10 rounded-xl bg-navy/[0.05] flex items-center justify-center shrink-0">
                      <Calendar size={17} className="text-navy" />
                    </div>
                    <div>
                      <p className="font-display text-navy font-semibold text-sm">{event.date}</p>
                      <p className="text-text-muted text-xs">{event.time}</p>
                    </div>
                  </div>
                  <div className="flex-1">
                    <p className="font-display text-navy font-semibold text-sm">{event.title}</p>
                    <p className="text-text-muted text-xs mt-0.5">{event.location}</p>
                  </div>
                  {event.tag && (
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-beaver-blue bg-beaver-blue/[0.06] px-3 py-1.5 rounded-full self-start sm:self-center">
                      {event.tag}
                    </span>
                  )}
                </div>
              </AnimatedCard>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="py-14 md:py-20">
        <div className="max-w-3xl mx-auto px-6">
          <div className="h-[1px] bg-gradient-to-r from-transparent via-beaver-blue/15 to-transparent mb-14" />
          <div className="text-center">
            <FadeIn>
              <h2
                className="font-display text-navy font-bold leading-tight mb-4"
                style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}
              >
                Do not wait for Fall
              </h2>
              <p className="text-text-muted mb-10 max-w-md mx-auto">
                Join the GroupMe or the mailing list now so you know when and where to show up.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <PressableButton
                  href="/team"
                  className="inline-flex items-center gap-2 bg-beaver-blue text-white px-8 py-4 rounded-xl font-medium text-sm"
                >
                  How to join
                  <ArrowRight size={16} />
                </PressableButton>
                <PressableButton
                  href="/#join"
                  className="inline-flex items-center gap-2 border border-border text-text px-8 py-4 rounded-xl font-medium text-sm"
                >
                  Mailing list
                </PressableButton>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>
    </>
  )
}
