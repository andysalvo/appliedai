import {
  Mic,
  Clock,
  Video,
  Users,
  Calendar,
  FlaskConical,
  Compass,
  CheckCircle2,
  Gift,
} from 'lucide-react'
import { FadeIn } from '@/components/ui/FadeIn'
import { SlideIn } from '@/components/ui/SlideIn'
import { AnimatedCard } from '@/components/ui/AnimatedCard'
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
                { icon: Users, label: 'All fields welcome', detail: 'Finance to nonprofits' },
                { icon: Mic, label: 'Your experience', detail: 'Real insight over slides' },
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
              primarily based in the Smeal College of Business, though we welcome students from all
              colleges and majors. AI is already appearing in job descriptions, internship
              interviews, and classroom conversations, and our goal is to make sure students are
              prepared for that shift before they enter the workforce.
            </p>
          </FadeIn>

          <FadeIn delay={0.1}>
            <div className="space-y-4 mb-6">
              {[
                {
                  icon: Calendar,
                  title: 'Events and Programming',
                  desc: 'Our primary program brings guest speakers and working sessions to campus. We invite people who use AI in their professional lives to share what that experience actually looks like, and we run hands-on tool walkthroughs where members work directly with ChatGPT, Claude, Cursor, Perplexity, and other tools that are becoming standard across industries.',
                },
                {
                  icon: FlaskConical,
                  title: 'Labs',
                  desc: 'Our technical division, where a smaller group of members build real applications from start to finish. Labs members learn to scope AI projects, develop working prototypes, run automated tests, and ship finished products using the same tools and workflows found in professional engineering teams.',
                },
                {
                  icon: Compass,
                  title: 'Explore AI',
                  desc: 'A public registry of 18 AI tools across four categories, organized by what you want to accomplish. Each listing provides a straightforward description of what the tool does, who makes it, and how students can use it.',
                },
              ].map((item) => {
                const Icon = item.icon
                return (
                  <AnimatedCard
                    key={item.title}
                    className="bg-white rounded-xl p-5 border border-border flex gap-4"
                  >
                    <div className="w-10 h-10 rounded-lg bg-navy/[0.06] flex items-center justify-center shrink-0">
                      <Icon size={18} className="text-navy" />
                    </div>
                    <div>
                      <p className="font-display text-navy font-semibold text-sm mb-1">
                        {item.title}
                      </p>
                      <p className="text-text-muted text-sm leading-relaxed">{item.desc}</p>
                    </div>
                  </AnimatedCard>
                )
              })}
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
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <SlideIn direction="left">
              <h2 className="font-display text-xl font-bold text-navy mb-4">
                Who we are looking for
              </h2>
              <p className="text-text-muted leading-relaxed mb-4">
                We are looking to learn from professionals whose work has been shaped by AI in some
                meaningful way. Technical expertise is valuable, and so is a perspective from
                someone whose role had little to do with technology until recently.
              </p>
              <p className="text-text-muted leading-relaxed mb-4">
                We welcome speakers from any field, whether that is finance, marketing, consulting,
                healthcare, law, education, startups, or government. The common thread is a
                willingness to speak candidly about how AI has changed the way you work and what you
                have learned along the way.
              </p>
              <p className="text-text-muted leading-relaxed">
                What matters most to us is that you can communicate your experience in a way that a
                student with no background in your field could follow. We are looking for real
                insight over polished presentations.
              </p>
            </SlideIn>

            <SlideIn direction="right">
              <div className="space-y-4">
                {/* What we ask */}
                <div className="bg-white rounded-xl p-6 border border-border">
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
                      <span className="w-1.5 h-1.5 rounded-full bg-beaver-blue/30 mt-1.5 shrink-0" />
                      A brief description of what you would like to discuss, so we can share it with
                      our members ahead of time
                    </li>
                  </ul>
                </div>

                {/* What you get */}
                <div className="bg-white rounded-xl p-6 border border-border">
                  <div className="flex items-center gap-2 mb-4">
                    <Gift size={18} className="text-beaver-blue" />
                    <p className="font-display text-navy font-semibold text-sm">What you get</p>
                  </div>
                  <ul className="space-y-3">
                    <li className="text-text-muted text-sm flex items-start gap-2.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-beaver-blue/30 mt-1.5 shrink-0" />
                      An engaged audience of students who are actively learning AI and show up
                      because they want to be there
                    </li>
                    <li className="text-text-muted text-sm flex items-start gap-2.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-beaver-blue/30 mt-1.5 shrink-0" />
                      A recorded copy of your session, if you would like one for your own use
                    </li>
                    <li className="text-text-muted text-sm flex items-start gap-2.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-beaver-blue/30 mt-1.5 shrink-0" />
                      A lasting connection to a student community that will remember the people who
                      invested in them early
                    </li>
                  </ul>
                </div>
              </div>
            </SlideIn>
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
