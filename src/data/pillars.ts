export interface Pillar {
  title: string
  description: string
  accent: string
  iconBg: string
  icon: 'calendar' | 'flask' | 'compass'
  link?: string
}

export const pillars: Pillar[] = [
  {
    title: 'Events and Programming',
    description:
      'Guest speakers, tool walkthroughs, and discussions about how AI is changing business and the workplace. Starting Fall 2026 at Penn State. Open to all Penn State students.',
    accent: 'border-t-navy',
    iconBg: 'bg-navy/[0.08]',
    icon: 'calendar',
  },
  {
    title: 'Applied AI Labs',
    description:
      'Labs is the research and development arm of the Applied AI Club. We run experiments, build tools, and give members who want to go deeper a place to work on real projects with real AI systems.',
    accent: 'border-t-beaver-blue',
    iconBg: 'bg-beaver-blue/[0.08]',
    icon: 'flask',
  },
  {
    title: 'Explore AI',
    description:
      'We maintain a registry of AI tools worth knowing, organized for students at every level. From beginner-friendly assistants to the agentic tools shaping the industry, it is a good place to start.',
    accent: 'border-t-pugh-blue',
    iconBg: 'bg-pugh-blue/[0.15]',
    icon: 'compass',
    link: '/explore',
  },
]
