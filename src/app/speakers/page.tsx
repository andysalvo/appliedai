import { Mic, Clock, Video, Users, CheckCircle2, Gift } from 'lucide-react'
import { FadeIn } from '@/components/ui/FadeIn'
import { SpeakerForm } from '@/components/SpeakerForm'
import { SpeakerChat } from '@/components/SpeakerChat'

export const metadata = {
  title: 'Speak at Applied AI',
  description:
    'We are looking for professionals from any field who can share how AI has changed the way they work. 30-45 minutes, Zoom or in person at Penn State.',
}

export default function SpeakersPage() {
  return (
    <>
      {/* ─── HERO ─── */}
      <section className="bg-navy relative overflow-hidden py-20 md:py-28">
        <div className="absolute top-[20%] right-[-5%] w-[400px] h-[400px] rounded-full bg-beaver-blue/10 blur-[150px]" />
        <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-beaver-blue via-pa-sky to-pugh-blue" />
        <div className="absolute bottom-0 left-[10%] right-[10%] h-[80px] bg-gradient-to-r from-beaver-blue/15 via-pa-sky/10 to-pugh-blue/10 blur-[60px]" />

        <div className="relative max-w-3xl mx-auto px-6 text-center">
          <FadeIn>
            <p className="text-sm font-semibold tracking-widest uppercase text-pugh-blue mb-4">
              Guest Speaker Program
            </p>
            <h1
              className="font-display font-bold text-white leading-tight mb-6"
              style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}
            >
              Share what AI looks like in your work
            </h1>
            <p className="text-white/50 text-lg leading-relaxed max-w-xl mx-auto mb-8">
              We are a student organization at Penn State dedicated to helping students understand
              how AI is changing the way businesses operate. We are looking for professionals who
              can share what that looks like in practice.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <a
                href="#signup"
                className="inline-flex items-center gap-2 bg-white text-navy px-7 py-3.5 rounded-xl font-semibold text-sm hover:bg-white/90 transition-colors"
              >
                Sign up to speak
              </a>
              <a
                href="#ask"
                className="inline-flex items-center gap-2 border border-white/15 text-white/80 px-7 py-3.5 rounded-xl font-medium text-sm hover:bg-white/[0.06] transition-colors"
              >
                Ask questions
              </a>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ─── AT A GLANCE ─── */}
      <section className="px-6 py-12">
        <div className="max-w-3xl mx-auto">
          <FadeIn>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
              {[
                { icon: Clock, label: '30-45 minutes', detail: 'Including Q&A' },
                { icon: Video, label: 'Zoom or in person', detail: 'Your preference' },
                { icon: Users, label: 'All fields welcome', detail: 'Any industry, any role' },
                { icon: Mic, label: 'Your experience', detail: 'AI in your day to day' },
              ].map((item) => (
                <div
                  key={item.label}
                  className="flex flex-col items-center text-center p-5 rounded-xl border border-border bg-white"
                >
                  <div className="w-10 h-10 rounded-lg bg-navy/[0.06] flex items-center justify-center mb-3">
                    <item.icon className="w-5 h-5 text-navy" />
                  </div>
                  <p className="text-sm font-semibold text-navy mb-0.5">{item.label}</p>
                  <p className="text-xs text-text-muted">{item.detail}</p>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ─── WHO WE ARE ─── */}
      <section className="bg-surface-alt px-6 py-14 md:py-20">
        <div className="max-w-3xl mx-auto">
          <FadeIn>
            <h2 className="font-display text-xl font-bold text-navy mb-6 text-center">
              Who we are and what we do
            </h2>
            <p className="text-text-muted leading-relaxed mb-6">
              The Applied AI Club is a student organization at Penn State dedicated to helping
              students understand how AI is changing the way businesses operate. Our membership is
              primarily based in the Smeal College of Business, with students across accounting,
              finance, marketing, supply chain, MIS, risk management, and management. We welcome
              students from all colleges and majors.
            </p>
            <p className="text-text-muted leading-relaxed mb-6">
              Most of our members are still early in their exposure to how AI and technology are
              used in professional settings. Guest speakers help bridge the gap between what
              students learn in the classroom and what professionals work with every day.
            </p>
          </FadeIn>

          <FadeIn delay={0.1}>
            <div className="bg-white rounded-xl p-5 border border-border mb-6">
              <p className="text-text-muted text-sm leading-relaxed">
                We run guest speaker sessions, hands-on workshops, and case competitions where
                members work through real business problems using AI. For members who want to go
                deeper, our Labs program takes on full application builds using industry-standard
                development workflows.
              </p>
            </div>
          </FadeIn>

          <FadeIn delay={0.2}>
            <p className="text-text-muted leading-relaxed text-sm">
              We begin formal meetings in Fall 2026 at Penn State University Park. In the meantime,
              we have a growing mailing list, an active GroupMe, and a board of four students
              building the foundation for what comes next.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ─── WHO WE ARE LOOKING FOR ─── */}
      <section className="px-6 py-14 md:py-20">
        <div className="max-w-3xl mx-auto">
          <FadeIn>
            <h2 className="font-display text-xl font-bold text-navy mb-4">
              Who we are looking for
            </h2>
            <p className="text-text-muted leading-relaxed mb-4">
              Professionals whose work has been shaped by AI in some meaningful way. Technical
              expertise is valuable, and so is a perspective from someone whose role had little to
              do with technology until recently. What matters most is that you can communicate your
              experience in a way that a student with no background in your field could follow.
            </p>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
            <FadeIn delay={0.1}>
              <div className="bg-white rounded-xl p-6 border border-border h-full">
                <div className="flex items-center gap-2 mb-4">
                  <CheckCircle2 size={18} className="text-beaver-blue" />
                  <p className="font-display text-navy font-semibold text-sm">What we ask</p>
                </div>
                <ul className="space-y-3">
                  <li className="text-text-muted text-sm flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-beaver-blue/30 mt-1.5 shrink-0" />
                    30 to 45 minutes of your time, including Q&A
                  </li>
                  <li className="text-text-muted text-sm flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-beaver-blue/30 mt-1.5 shrink-0" />
                    Zoom or in person at Penn State University Park, whichever works best for your
                    schedule
                  </li>
                  <li className="text-text-muted text-sm flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-beaver-blue/30 mt-1.5 shrink-0" />A
                    brief description of what you would like to discuss, so we can share it with our
                    members ahead of time
                  </li>
                </ul>
              </div>
            </FadeIn>

            <FadeIn delay={0.2}>
              <div className="bg-white rounded-xl p-6 border border-border h-full">
                <div className="flex items-center gap-2 mb-4">
                  <Gift size={18} className="text-beaver-blue" />
                  <p className="font-display text-navy font-semibold text-sm">What you get</p>
                </div>
                <ul className="space-y-3">
                  <li className="text-text-muted text-sm flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-beaver-blue/30 mt-1.5 shrink-0" />
                    An engaged audience of students who are actively learning AI and show up because
                    they want to be there
                  </li>
                  <li className="text-text-muted text-sm flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-beaver-blue/30 mt-1.5 shrink-0" />A
                    recorded copy of your session, if you would like one for your own use
                  </li>
                  <li className="text-text-muted text-sm flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-beaver-blue/30 mt-1.5 shrink-0" />A
                    lasting connection to a student community that will remember the people who
                    invested in them early
                  </li>
                </ul>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ─── FORM + CHAT ─── */}
      <section id="speak" className="px-6 py-14 md:py-20 bg-surface-alt scroll-mt-20">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
            <FadeIn className="flex">
              <div
                id="signup"
                className="bg-white rounded-2xl border border-border p-5 sm:p-8 md:p-10 scroll-mt-24 flex-1 flex flex-col"
              >
                <h2 className="font-display text-lg font-bold text-navy mb-2 text-center">
                  Interested in speaking?
                </h2>
                <p className="text-text-muted text-sm text-center mb-8">
                  Fill this out and we will follow up within a week.
                </p>
                <SpeakerForm />
              </div>
            </FadeIn>

            <FadeIn delay={0.15} className="flex">
              <div
                id="ask"
                className="scroll-mt-24 flex-1 flex flex-col min-h-[420px] lg:min-h-0 lg:overflow-hidden"
              >
                <SpeakerChat />
              </div>
            </FadeIn>
          </div>

          <FadeIn delay={0.2}>
            <p className="text-center text-text-muted text-sm mt-10">
              Know someone who would be a great speaker? Please share this page.
              <br />
              <span className="text-beaver-blue font-medium">appliedaipennstate.com/speakers</span>
            </p>
          </FadeIn>
        </div>
      </section>
    </>
  )
}
