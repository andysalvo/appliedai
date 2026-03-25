'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import { navigation } from '@/data/navigation'
import { assetPath } from '@/lib/assetPath'

export function Header() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="relative z-50 bg-white/85 backdrop-blur-xl">
      <nav className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Brand */}
        <Link href="/" className="flex items-center">
          <Image
            src={assetPath('/images/logo.png')}
            alt="Applied AI"
            width={840}
            height={241}
            className="h-8 w-auto"
            priority
          />
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {navigation.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className={
                item.isCta
                  ? 'bg-beaver-blue text-white px-5 py-2 rounded-lg text-sm font-medium hover:bg-navy transition-colors'
                  : 'text-sm font-medium text-text-muted hover:text-navy transition-colors'
              }
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden p-2 text-navy"
          aria-label={isOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={isOpen}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile panel */}
      {isOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-xl border-t border-border px-6 py-6 space-y-4">
          {navigation.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              onClick={() => setIsOpen(false)}
              className={`block text-base font-medium ${
                item.isCta
                  ? 'bg-beaver-blue text-white px-5 py-3 rounded-lg text-center'
                  : 'text-text-muted hover:text-navy'
              } transition-colors`}
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  )
}
