export interface Program {
  title: string
  description: string
  accent: string
  iconBg: string
  icon: 'calendar' | 'flask' | 'compass'
  link?: string
}

export const programs: Program[] = [
  {
    title: 'Guest Speakers and Workshops',
    description:
      'We bring in professionals from all fields to share how AI has changed the way they work. We also run hands-on workshops and case competitions where members work through real business problems using AI. Open to all Penn State students.',
    accent: 'border-t-navy',
    iconBg: 'bg-navy/[0.08]',
    icon: 'calendar',
  },
  {
    title: 'Labs',
    description:
      'For members who want to go deeper. Labs takes on full application builds using the same tools and workflows used in professional engineering teams. You pick a project, form a team, and ship it.',
    accent: 'border-t-beaver-blue',
    iconBg: 'bg-beaver-blue/[0.08]',
    icon: 'flask',
  },
  {
    title: 'Tool Registry',
    description:
      'We maintain a list of AI tools worth knowing, organized for students at every level. Each tool includes what it does, who makes it, and what you can do with it. Descriptions are written by club members.',
    accent: 'border-t-pugh-blue',
    iconBg: 'bg-pugh-blue/[0.15]',
    icon: 'compass',
    link: '/explore',
  },
]
