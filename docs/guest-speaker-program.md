# Guest Speaker Program: Applied AI Club at Penn State

> Brainstorm doc. The canonical plan for recruiting, onboarding, and managing guest speakers.
> Written with club president. March 31, 2026.

---

## What We Are

The Applied AI Club at Penn State is a student organization of mostly business students (Smeal College of Business) with some non-business students. We exist to help students understand how AI is going to change the business world and prepare them for internships and careers where AI integration is expected.

We are not a computer science club. We are a business club that takes AI seriously.

**Three pillars:**

1. **Events and Programming** -- Guest speakers, tool walkthroughs, discussions about AI in the workplace
2. **Applied AI Labs** -- The R&D arm. Members build real projects with Claude Code, Next.js, GitHub Actions
3. **Explore AI** -- A registry of AI tools organized for students at every level

---

## What We Want from Guest Speakers

We are looking for people from any field who can share how AI has changed the way they work. Not professors giving lectures. Not salespeople pitching products. Practitioners who use AI in their jobs and can talk honestly about what works, what does not, and what students should know before they enter the workforce.

**What a good speaker looks like:**

- Someone who uses AI tools as part of their daily work (not just talks about AI theoretically)
- Someone who can explain their work to business students who are smart but not necessarily technical
- Someone who is willing to share real examples, not polished keynote slides
- Someone from any industry: finance, consulting, healthcare, marketing, law, operations, startups, nonprofits, government

**What we ask of speakers:**

- 30-45 minutes of their time (presentation + Q&A)
- Available via Zoom or in person at Penn State University Park
- Willing to share 2-3 bullet points about their topic so we can promote the talk to members
- Open to taking a few student questions

**What speakers get from us:**

- Access to a room full of motivated business students actively learning AI
- Exposure to Penn State's Applied AI community (100+ mailing list, growing)
- A recorded session (if they want it) for their own use
- Genuine engagement. Our members show up because they want to learn, not for attendance credit.

---

## The Landing Page

A new page at `/speakers` on the Applied AI Club website. This is the page we send to potential speakers, investors, partners, and anyone who asks "what does your club do and how can I get involved?"

### Page Structure

**Hero Section**

- Headline: "Speak to the next generation of AI-ready business students."
- Subtext: Short paragraph about what the club is and why speakers matter to us
- CTA: "Interested? Fill out the form below."

**What We Are Looking For**

- Bullet points (from the section above) about what makes a good speaker
- Emphasize: all industries welcome, Zoom or in person, 30-45 minutes

**About the Club**

- Mission statement
- The three pillars (Events, Labs, Explore AI)
- Current size and trajectory
- "We are a club of business students learning how AI changes the way businesses operate. Some of us build. All of us learn."

**Past Topics / What Members Want to Hear About**

- AI in consulting and professional services
- How startups are using AI to compete with larger companies
- AI in finance: risk modeling, automated analysis, portfolio management
- Marketing and content creation with AI tools
- AI ethics and what businesses are actually doing about it
- How to talk about AI skills in interviews and on resumes
- Real workflows: what does "using AI at work" actually look like day to day?

**Speaker Interest Form**
Fields:

- Full name
- Email
- Organization / Company
- Role / Title
- Topic they would speak about (short description)
- Preferred format: Zoom / In Person / Either
- Anything else they want us to know (optional)

Submits to a new tab on the existing Google Sheet (not a new sheet, just a new tab called "Speaker Interest"). Same Apps Script pattern as the mailing list, extended to handle the additional fields.

**AI Agent (Poly Widget White-Label)**
An embedded chat widget at the bottom of the page (or inline like EdConsult) that can answer questions about the club. Seeded with:

- Club mission, structure, and pillars
- What we look for in speakers
- How sessions work (format, length, Zoom/in-person)
- Club size and member demographics
- Past topics and areas of interest
- Contact info (appliedaipsu@gmail.com)
- Labs projects and what members build
- Explore AI tool registry overview

The agent uses GPT-4o-mini via the Polylogic AI platform (same architecture as EdConsult). This is a real working agent, not a mockup. It answers questions about the club so speakers, investors, or curious people can get answers without emailing and waiting.

---

## Google Sheets Integration

### Existing Setup

- Apps Script at `scripts/google/mailing-list.gs`
- Posts to a Google Sheet with columns: Timestamp, First Name, Email, Source
- Deduplicates by email

### New Tab: "Speaker Interest"

Add a new tab to the same Google Sheet. Columns:

| A         | B         | C     | D            | E    | F     | G      | H     |
| --------- | --------- | ----- | ------------ | ---- | ----- | ------ | ----- |
| Timestamp | Full Name | Email | Organization | Role | Topic | Format | Notes |

### Apps Script Update

Extend the existing `doPost` function (or add a second one) to handle speaker form submissions. The form will send a `source: "speaker-interest"` field to distinguish from mailing list submissions. If `source === "speaker-interest"`, write to the Speaker Interest tab. Otherwise, write to the existing mailing list tab.

---

## Agent Knowledge Base

The following content should be seeded into the agent's knowledge base. These are the chunks:

### ABOUT (2 chunks)

1. "The Applied AI Club at Penn State is a student organization focused on preparing business students for an AI-integrated workforce. We host guest speakers, run tool walkthroughs, and give members hands-on experience building with AI systems. We are based in the Smeal College of Business but open to all Penn State students."

2. "We have three pillars: Events and Programming (guest speakers and discussions), Applied AI Labs (our R&D arm where members build real projects), and Explore AI (a registry of AI tools organized by skill level). We are starting Fall 2026 at Penn State University Park."

### EVENTS (2 chunks)

3. "Our guest speaker program brings in practitioners from all industries who use AI in their daily work. We are looking for real practitioners, not professors giving lectures or salespeople pitching products. Sessions are 30-45 minutes including Q&A, conducted via Zoom or in person."

4. "Topics our members want to hear about include: AI in consulting, how startups use AI to compete, AI in finance, marketing and content creation with AI, AI ethics in practice, how to talk about AI skills in interviews, and what 'using AI at work' actually looks like day to day."

### LABS (1 chunk)

5. "Applied AI Labs is the R&D arm of the club. Members build real projects using Claude Code, Next.js, GitHub Actions, and the same tools professional teams ship with. Labs gives members who want to go deeper a place to work on real AI systems."

### EXPLORE (1 chunk)

6. "Explore AI is our tool registry. We maintain a list of AI tools worth knowing, organized for students at every level. From beginner-friendly assistants to the agentic tools shaping the industry."

### FAQ (4 chunks)

7. "We conduct speaker sessions via Zoom or in person at Penn State University Park. We are flexible and happy to work out logistics. Most sessions run 30-45 minutes with Q&A."

8. "We welcome speakers from any industry or background. The only thing we ask is that you can share real experience with AI in your work, not theoretical knowledge. Business, finance, healthcare, law, marketing, operations, nonprofits, startups, government, all welcome."

9. "If you are interested in speaking, fill out the form on our speakers page with your name, email, organization, role, and a short description of what you would talk about. We will follow up within a week."

10. "The club email is appliedaipsu@gmail.com. You can reach us there for any questions about speaking, partnerships, or getting involved."

### CONTACT (1 chunk)

11. "Contact us at appliedaipsu@gmail.com. We are the Applied AI Club at Penn State, based in the Smeal College of Business. Our website is at andysalvo.github.io/appliedai."

---

## Implementation Plan

### Phase 1: Landing Page (2-3 hours)

1. Create `src/app/speakers/page.tsx` with hero, about, what we look for, form
2. Create `src/components/SpeakerForm.tsx` (same pattern as MailingListForm)
3. Add "Speakers" to navigation in `src/data/navigation.ts`
4. Add the new tab to the Google Sheet manually
5. Update Apps Script to route speaker submissions to the new tab

### Phase 2: Agent Integration (2-3 hours)

1. Set up the Applied AI Club as a client on the Polylogic AI platform (Supabase insert)
2. Seed the 11 knowledge chunks listed above
3. Embed the chat widget on the speakers page (inline or floating)
4. Test with real questions: "What does your club do?" "How long are sessions?" "Can I present via Zoom?"

### Phase 3: PDF Export and Member Communication (1 hour)

1. Export this document as a clean PDF
2. Share with club officers and board
3. Post in club communication channels so all members know the speaker program exists

---

## What This Enables

Once the speakers page and agent are live, we can:

- Send a single link to any potential speaker, investor, or partner
- They can read about the club, see what we are looking for, fill out a form, and ask an AI agent any questions
- Every form submission goes to a Google Sheet the club leadership already monitors
- The agent handles the "what is your club?" questions that currently require someone to reply to an email
- Members can share the link when they meet professionals at career fairs, networking events, or class

---

## Next Steps

- [ ] Andy and president review this doc
- [ ] Build the speakers page
- [ ] Update Apps Script for speaker tab
- [ ] Set up agent on Poly platform
- [ ] Seed knowledge base
- [ ] Test end-to-end (form submission + agent responses)
- [ ] Export PDF and distribute to members
- [ ] Start sending to potential speakers
