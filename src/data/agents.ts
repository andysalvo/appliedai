export interface Agent {
  name: string
  role: string
  email: string
  photo?: string
}

export const agents: Agent[] = [
  {
    name: 'Ryan Einzig',
    role: 'President',
    email: 'rxe5177@psu.edu',
    photo: '/images/team/ryan-einzig.jpg',
  },
  {
    name: 'Evan Chappell',
    role: 'Vice-President',
    email: 'evc5667@psu.edu',
    photo: '/images/team/evan-chappell.jpg',
  },
  {
    name: 'Andy Salvo',
    role: 'Programming Lead',
    email: 'ajs10845@psu.edu',
    photo: '/images/team/andy-salvo.jpg',
  },
  {
    name: 'Brody Bell',
    role: 'Treasurer',
    email: 'bkb5921@psu.edu',
    photo: '/images/team/brody-bell.jpg',
  },
]

export const agentsSemester = 'Spring 2026'
