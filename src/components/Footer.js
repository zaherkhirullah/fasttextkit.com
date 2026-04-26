import Link from 'next/link'
import './footer.css'

export default function Footer() {
  const textTools = [
    { href: '/tools/word-counter-online', label: 'Word Counter' },
    { href: '/tools/remove-extra-spaces', label: 'Remove Extra Spaces' },
    { href: '/tools/sort-text-alphabetically', label: 'Text Sorter' },
  ]

  const caseTools = [
    { href: '/tools/uppercase-converter', label: 'UPPERCASE' },
    { href: '/tools/lowercase-converter', label: 'lowercase' },
    { href: '/tools/title-case-converter', label: 'Title Case' },
    { href: '/tools/camelcase-converter', label: 'camelCase' },
    { href: '/tools/pascalcase-converter', label: 'PascalCase' },
    { href: '/tools/snake-case-converter', label: 'snake_case' },
    { href: '/tools/kebab-case-converter', label: 'kebab-case' },
    { href: '/tools/sentence-case-converter', label: 'Sentence Case' },
    { href: '/tools/capitalize-words', label: 'Capitalize Words' },
    { href: '/tools/toggle-case', label: 'Toggle Case' },
  ]

  const companyLinks = [
    { href: '/blog/about', label: 'About' },
    { href: '/blog/privacy', label: 'Privacy Policy' },
    { href: '/blog/terms', label: 'Terms of Service' },
  ]

  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <div className="footer-logo">
              <span>⚡</span>
              <span>FastTextKit</span>
            </div>
            <p className="footer-desc">
              Free online tools for text editing and image compression. Fast, simple, and secure.
            </p>
          </div>

          <div className="footer-section">
            <h4 className="footer-title">Text Tools</h4>
            <nav className="footer-links">
              {textTools.map(link => (
                <Link key={link.href} href={link.href} className="footer-link">
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          <div className="footer-section">
            <h4 className="footer-title">Case Converters</h4>
            <nav className="footer-links">
              {caseTools.map(link => (
                <Link key={link.href} href={link.href} className="footer-link">
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          <div className="footer-section">
            <h4 className="footer-title">Media Tools</h4>
            <nav className="footer-links">
              <Link href="/tools/image-compressor-online" className="footer-link">
                Image Compressor
              </Link>
            </nav>
          </div>

          <div className="footer-section">
            <h4 className="footer-title">Company</h4>
            <nav className="footer-links">
              {companyLinks.map(link => (
                <Link key={link.href} href={link.href} className="footer-link">
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; 2026 FastTextKit. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
