export interface NavItem {
  label: string
  href: string
  isAnchor: boolean
  isCta?: boolean
}

export const navigation: NavItem[] = [
  { label: 'About', href: '/about', isAnchor: false },
  { label: 'Labs', href: '/labs', isAnchor: false },
  { label: 'Explore AI', href: '/explore', isAnchor: false },
  { label: 'Get Equipped', href: '/get-equipped', isAnchor: false },
  { label: 'Speakers', href: '/speakers', isAnchor: false },
  { label: 'Join', href: '/team', isAnchor: false, isCta: true },
]
