'use client'

import React from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'

const navLinks = [
    { href: '/agent', name: 'Agent'},
    { href: '/agent/about', name: 'About'}
]

export default function Navigation() {

  const pathname = usePathname()

  return (
    <ul>
        {navLinks.map((link) => {
            const isActive = pathname === link.href
            return (
                <li key={link.name}>
                    <Link 
                        className={isActive ? 'active' : ''}
                        href={link.href}
                    >
                        {link.name}
                    </Link>
                </li>
            )
        })} 
    </ul>
  )
}
