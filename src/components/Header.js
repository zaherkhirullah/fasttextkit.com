'use client'
import Link from 'next/link'
import { useState } from 'react'
import './header.css'

const caseTools = [
  { label: 'UPPERCASE', href: '/tools/uppercase-converter', page: 'uppercase-converter' },
  { label: 'lowercase', href: '/tools/lowercase-converter', page: 'lowercase-converter' },
  { label: 'Title Case', href: '/tools/title-case-converter', page: 'title-case-converter' },
  { label: 'Sentence Case', href: '/tools/sentence-case-converter', page: 'sentence-case-converter' },
  { label: 'Capitalize Words', href: '/tools/capitalize-words', page: 'capitalize-words' },
  { label: 'tOGGLE cASE', href: '/tools/toggle-case', page: 'toggle-case' },
  { label: 'camelCase', href: '/tools/camelcase-converter', page: 'camelcase-converter' },
  { label: 'PascalCase', href: '/tools/pascalcase-converter', page: 'pascalcase-converter' },
  { label: 'snake_case', href: '/tools/snake-case-converter', page: 'snake-case-converter' },
  { label: 'kebab-case', href: '/tools/kebab-case-converter', page: 'kebab-case-converter' },
]

const textTools = [
  { label: 'Remove Spaces', href: '/tools/remove-extra-spaces', page: 'remove-spaces' },
  { label: 'Sort Text', href: '/tools/sort-text-alphabetically', page: 'text-sorter' },
]

export default function Header({ currentPage = '' }) {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [caseOpen, setCaseOpen] = useState(false)
  const [textOpen, setTextOpen] = useState(false)

  const isCasePage = caseTools.some(t => t.page === currentPage)

  return (
    <header className="site-header">
      <div className="container">
        <div className="header-inner">
          <Link href="/" className="logo">
            <span className="logo-icon">⚡</span>
            <span className="logo-text">FastTextKit</span>
          </Link>

          <nav className="nav-desktop">
            <Link href="/" className={`nav-link ${currentPage === 'home' ? 'active' : ''}`}>Home</Link>
            <Link href="/tools/word-counter-online" className={`nav-link ${currentPage === 'word-counter' ? 'active' : ''}`}>Word Counter</Link>

            {/* Case Converter dropdown */}
            <div className="nav-dropdown" onMouseEnter={() => setCaseOpen(true)} onMouseLeave={() => setCaseOpen(false)}>
              <button className={`dropdown-trigger nav-link ${isCasePage ? 'active' : ''}`} onClick={() => setCaseOpen(o => !o)}>
                Case Converter <span className="arrow">▾</span>
              </button>
              <div className={`dropdown-menu ${caseOpen ? 'open' : ''}`}>
                {caseTools.map(t => (
                  <Link key={t.href} href={t.href} className={`dropdown-item ${currentPage === t.page ? 'active-item' : ''}`}>
                    {t.label}
                  </Link>
                ))}
              </div>
            </div>

            {/* Text Tools dropdown */}
            <div className="nav-dropdown" onMouseEnter={() => setTextOpen(true)} onMouseLeave={() => setTextOpen(false)}>
              <button className={`dropdown-trigger nav-link ${textTools.some(t => t.page === currentPage) ? 'active' : ''}`} onClick={() => setTextOpen(o => !o)}>
                Text Tools <span className="arrow">▾</span>
              </button>
              <div className={`dropdown-menu ${textOpen ? 'open' : ''}`}>
                {textTools.map(t => (
                  <Link key={t.href} href={t.href} className={`dropdown-item ${currentPage === t.page ? 'active-item' : ''}`}>
                    {t.label}
                  </Link>
                ))}
              </div>
            </div>

            <Link href="/tools/image-compressor-online" className={`nav-link ${currentPage === 'image-compressor' ? 'active' : ''}`}>Image Compressor</Link>
          </nav>

          <button className="nav-toggle" aria-label="Toggle navigation" onClick={() => setMobileOpen(o => !o)}>
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`mobile-menu ${mobileOpen ? 'open' : ''}`}>
        <Link href="/" className="mobile-link" onClick={() => setMobileOpen(false)}>Home</Link>
        <Link href="/tools/word-counter-online" className="mobile-link" onClick={() => setMobileOpen(false)}>Word Counter</Link>
        <Link href="/tools/image-compressor-online" className="mobile-link" onClick={() => setMobileOpen(false)}>Image Compressor</Link>
        <div className="mobile-section-title">Text Tools</div>
        {textTools.map(t => (
          <Link key={t.href} href={t.href} className="mobile-link" onClick={() => setMobileOpen(false)}>{t.label}</Link>
        ))}
        <div className="mobile-section-title">Case Converters</div>
        {caseTools.map(t => (
          <Link key={t.href} href={t.href} className="mobile-link" onClick={() => setMobileOpen(false)}>{t.label}</Link>
        ))}
      </div>
    </header>
  )
}
