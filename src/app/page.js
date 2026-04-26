'use client'

import Header from '../components/Header'
import Footer from '../components/Footer'
import AdUnit from '../components/AdUnit'

const toolsByCategory = [
  {
    category: 'Text Tools',
    tools: [
      { id: 'word-counter', name: 'Word Counter', desc: 'Count words, characters, sentences instantly', icon: '📝', href: '/tools/word-counter-online' },
      { id: 'remove-spaces', name: 'Remove Extra Spaces', desc: 'Clean unnecessary whitespace from text', icon: '🔧', href: '/tools/remove-extra-spaces' },
      { id: 'text-sorter', name: 'Sort Text Alphabetically', desc: 'Sort lines A-Z or Z-A', icon: '📋', href: '/tools/sort-text-alphabetically' },
    ]
  },
  {
    category: 'Case Converters',
    tools: [
      { id: 'uppercase', name: 'UPPERCASE Converter', desc: 'Convert text to ALL CAPS', icon: '🔠', href: '/tools/uppercase-converter' },
      { id: 'lowercase', name: 'lowercase converter', desc: 'Convert text to all lowercase', icon: '🔡', href: '/tools/lowercase-converter' },
      { id: 'title-case', name: 'Title Case Converter', desc: 'Capitalize Every Major Word', icon: '📰', href: '/tools/title-case-converter' },
      { id: 'sentence-case', name: 'Sentence Case Converter', desc: 'Fix sentence capitalization', icon: '✏️', href: '/tools/sentence-case-converter' },
      { id: 'capitalize', name: 'Capitalize Words', desc: 'Capitalize every word', icon: '🔤', href: '/tools/capitalize-words' },
      { id: 'toggle-case', name: 'Toggle Case', desc: 'Flip every character case', icon: '🔄', href: '/tools/toggle-case' },
      { id: 'camelcase', name: 'camelCase Converter', desc: 'For JavaScript variables', icon: '🐪', href: '/tools/camelcase-converter' },
      { id: 'pascalcase', name: 'PascalCase Converter', desc: 'For React & class names', icon: '🏗️', href: '/tools/pascalcase-converter' },
      { id: 'snake-case', name: 'snake_case Converter', desc: 'For Python & databases', icon: '🐍', href: '/tools/snake-case-converter' },
      { id: 'kebab-case', name: 'kebab-case Converter', desc: 'For CSS & URL slugs', icon: '🍢', href: '/tools/kebab-case-converter' },
    ]
  },
  {
    category: 'Image Tools',
    tools: [
      { id: 'image-compressor', name: 'Image Compressor', desc: 'Compress images without quality loss', icon: '🖼️', href: '/tools/image-compressor-online' },
    ]
  },
]

export default function HomePage() {
  return (
    <>
      <Header currentPage="home" />

      <main>
        {/* Hero */}
        <section className="hero">
          <div className="container">
            <div className="hero-content">
              <h1 className="hero-title">
                Free Online <span>Tools</span> for Everyone
              </h1>
              <p className="hero-subtitle">
                Fast, simple, and powerful text and image tools to boost your productivity. No signup required.
              </p>
            </div>
          </div>
        </section>

        {/* Tools by category */}
        <section className="tools-section">
          <div className="container">
            {toolsByCategory.map(group => (
              <div key={group.category} style={{ marginBottom: '3rem' }}>
                <header className="section-header">
                  <h2 className="section-title">{group.category}</h2>
                </header>

                <div className="tools-grid">
                  {group.tools.map(tool => (
                    <a key={tool.id} href={tool.href} className="tool-card">
                      <div className="tool-card-icon">{tool.icon}</div>
                      <h3 className="tool-card-title">{tool.name}</h3>
                      <p className="tool-card-desc">{tool.desc}</p>
                      <span className="tool-card-link">Use Tool</span>
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Features */}
        <section className="features-section">
          <div className="container">
            <header className="section-header">
              <h2 className="section-title">Why ToolKit Pro?</h2>
            </header>

            <div className="features-grid">
              <div className="feature-card">
                <div className="feature-icon">⚡</div>
                <h3 className="feature-title">Lightning Fast</h3>
                <p className="feature-desc">All tools run in your browser with no server delays</p>
              </div>

              <div className="feature-card">
                <div className="feature-icon">🔒</div>
                <h3 className="feature-title">Privacy First</h3>
                <p className="feature-desc">Your data never leaves your device</p>
              </div>

              <div className="feature-card">
                <div className="feature-icon">📱</div>
                <h3 className="feature-title">Mobile Ready</h3>
                <p className="feature-desc">Works perfectly on any device</p>
              </div>

              <div className="feature-card">
                <div className="feature-icon">🎯</div>
                <h3 className="feature-title">100% Free</h3>
                <p className="feature-desc">No signup required, ever</p>
              </div>
            </div>
          </div>
        </section>

        <div className="container">
          <AdUnit position="bottom" />
        </div>
      </main>

      <Footer />
    </>
  )
}
