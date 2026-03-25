export interface NavItem {
  label: string
  href: string
  isAnchor: boolean
  isCta?: boolean
}

export const navigation: NavItem[] = [
  { label: 'What We Do', href: '#what-we-do', isAnchor: true },
  { label: 'Labs', href: '/labs', isAnchor: false },
  { label: 'Team', href: '#team', isAnchor: true },
  { label: 'Explore AI', href: '/explore', isAnchor: false },
  { label: 'Join', href: '#join', isAnchor: true, isCta: true },
]
