'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { assetPath } from '@/lib/assetPath'
import { Menu, X } from 'lucide-react'
import { navigation } from '@/data/navigation'

export function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 80)
    }
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/90 backdrop-blur-xl shadow-sm' : 'bg-transparent'
      }`}
    >
      <nav className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center">
          <Image
            src={assetPath('/images/logo.png')}
            alt="Applied AI"
            width={822}
            height={205}
            className={`h-10 w-auto transition-all duration-300 ${
              scrolled ? '' : 'brightness-0 invert'
            }`}
            priority
          />
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {navigation.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className={
                item.isCta
                  ? `px-5 py-2 rounded-lg text-sm font-medium transition-all ${
                      scrolled
                        ? 'bg-beaver-blue text-white hover:bg-navy'
                        : 'bg-white/10 text-white hover:bg-white/20'
                    }`
                  : `text-sm font-medium transition-colors ${
                      scrolled
                        ? 'text-text-muted hover:text-navy'
                        : 'text-white/70 hover:text-white'
                    }`
              }
            >
              {item.label}
            </Link>
          ))}
        </div>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`md:hidden p-2 transition-colors ${scrolled ? 'text-navy' : 'text-white'}`}
          aria-label={isOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={isOpen}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

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
