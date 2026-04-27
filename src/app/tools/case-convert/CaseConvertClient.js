'use client'

import Link from 'next/link'
import { useState } from 'react'
import Footer from '../../../components/Footer'
import Header from '../../../components/Header'

const EXAMPLE_TEXT = `the quick brown fox jumps over the lazy dog.
hello world from fast text kit!
this is a sentence case example.`

const caseOptions = [
  { id: 'uppercase', label: 'UPPERCASE', color: '#8b5cf6' },
  { id: 'lowercase', label: 'lowercase', color: '#06b6d4' },
  { id: 'titlecase', label: 'Title Case', color: '#10b981' },
  { id: 'sentencecase', label: 'Sentence case', color: '#f59e0b' },
  { id: 'capitalizewords', label: 'Capitalize Words', color: '#ec4899' },
  { id: 'togglecase', label: 'tOGGLE cASE', color: '#6366f1' },
  { id: 'camelcase', label: 'camelCase', color: '#14b8a6' },
  { id: 'pascalcase', label: 'PascalCase', color: '#f97316' },
  { id: 'snakecase', label: 'snake_case', color: '#84cc16' },
  { id: 'kebabcase', label: 'kebab-case', color: '#e879f9' },
]

function convertCase(id, str) {
  if (!str) return ''
  switch (id) {
    case 'uppercase':
      return str.toUpperCase()
    case 'lowercase':
      return str.toLowerCase()
    case 'titlecase':
    case 'capitalizewords':
      return str.replace(/\w\S*/g, w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
    case 'sentencecase':
      return str
        .toLowerCase()
        .replace(/(^\s*\w|[.!?]\s*\w)/g, c => c.toUpperCase())
    case 'togglecase':
      return str.split('').map(c =>
        c === c.toUpperCase() ? c.toLowerCase() : c.toUpperCase()
      ).join('')
    case 'camelcase': {
      const words = str.trim().split(/[\s_\-]+/)
      return words
        .map((w, i) => i === 0 ? w.toLowerCase() : w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
        .join('')
    }
    case 'pascalcase':
      return str.trim().split(/[\s_\-]+/)
        .map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
        .join('')
    case 'snakecase':
      return str.trim().toLowerCase().replace(/[\s\-]+/g, '_')
    case 'kebabcase':
      return str.trim().toLowerCase().replace(/[\s_]+/g, '-')
    default:
      return str
  }
}

const relatedTools = [
  { icon: '📝', title: 'Word Counter', desc: 'Count words, characters & more', href: '/tools/word-counter-online' },
  { icon: '🔧', title: 'Remove Extra Spaces', desc: 'Clean whitespace from text', href: '/tools/remove-extra-spaces' },
  { icon: '📋', title: 'Sort Text Alphabetically', desc: 'Sort lines A-Z or Z-A', href: '/tools/sort-text-alphabetically' },
  { icon: '🖼️', title: 'Image Compressor', desc: 'Compress images free online', href: '/tools/image-compressor-online' },
]

export default function CaseConvertClient() {
  const [inputText, setInputText] = useState('')
  const [result, setResult] = useState('')
  const [activeCase, setActiveCase] = useState('')
  const [copied, setCopied] = useState(false)

  const handleCaseClick = (id) => {
    setActiveCase(id)
    setResult(convertCase(id, inputText))
  }

  const handleInput = (val) => {
    setInputText(val)
    if (activeCase) {
      setResult(convertCase(activeCase, val))
    }
  }

  const handleExample = () => {
    const caseId = activeCase || 'titlecase'
    setInputText(EXAMPLE_TEXT)
    setActiveCase(caseId)
    setResult(convertCase(caseId, EXAMPLE_TEXT))
  }

  const copyResult = async () => {
    if (!result) return
    await navigator.clipboard.writeText(result)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <>
      <style jsx>{`
        .case-convert-page {
          min-height: 100vh;
          background: linear-gradient(135deg, #0f172a 0%, #1a1040 50%, #0c1a2e 100%);
        }

        .page-header {
          padding: 3rem 0 2rem;
          text-align: center;
        }

        .page-header h1 {
          font-size: clamp(2rem, 5vw, 3rem);
          font-weight: 700;
          margin-bottom: 0.75rem;
          background: linear-gradient(135deg, #e2e8f0, #a78bfa);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          letter-spacing: -0.02em;
        }

        .page-header p {
          color: #94a3b8;
          font-size: 1.125rem;
        }

        .main-card {
          background: #1e293b;
          border: 1px solid #334155;
          border-radius: 1.5rem;
          box-shadow: 0 4px 24px rgba(0, 0, 0, 0.3);
          padding: 2rem;
          max-width: 960px;
          margin: 0 auto 2rem;
        }

        .case-buttons-grid {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 0.75rem;
          margin-bottom: 2rem;
        }

        .case-btn {
          padding: 0.75rem 0.5rem;
          font-size: 0.875rem;
          font-weight: 600;
          border-radius: 0.75rem;
          border: 2px solid #334155;
          background: #0f172a;
          color: #94a3b8;
          cursor: pointer;
          transition: all 0.2s ease;
          text-align: center;
        }

        .case-btn:hover {
          border-color: #475569;
          color: #f1f5f9;
        }

        .case-btn.active {
          color: #f1f5f9;
          box-shadow: 0 0 0 3px rgba(167, 139, 250, 0.25);
        }

        .two-col {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.5rem;
        }

        .col-label {
          display: block;
          font-weight: 600;
          font-size: 0.875rem;
          color: #94a3b8;
          margin-bottom: 0.75rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .text-area {
          width: 100%;
          min-height: 200px;
          padding: 1.25rem;
          border: 2px solid #334155;
          border-radius: 1rem;
          font-family: 'JetBrains Mono', 'Fira Code', monospace;
          font-size: 0.9375rem;
          line-height: 1.7;
          resize: vertical;
          transition: all 0.2s ease;
          background: #0f172a;
          color: #f1f5f9;
          display: block;
          box-sizing: border-box;
        }

        .text-area:focus {
          outline: none;
          border-color: #8b5cf6;
          box-shadow: 0 0 0 4px rgba(139, 92, 246, 0.15);
        }

        .text-area::placeholder {
          color: #475569;
        }

        .text-area.output {
          color: #a78bfa;
          border-color: #4c1d95;
          background: #0a0a1a;
        }

        .col-actions {
          display: flex;
          gap: 0.75rem;
          margin-top: 0.75rem;
        }

        .action-btn {
          padding: 0.75rem 1.25rem;
          font-size: 0.875rem;
          font-weight: 600;
          border-radius: 0.75rem;
          border: none;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .btn-example {
          background: #334155;
          color: #94a3b8;
        }

        .btn-example:hover {
          background: #475569;
          color: #f1f5f9;
        }

        .btn-copy {
          background: linear-gradient(135deg, #4c1d95, #7c3aed);
          color: white;
        }

        .btn-copy:hover {
          background: linear-gradient(135deg, #5b21b6, #8b5cf6);
          transform: translateY(-1px);
        }

        .btn-copy.copied {
          background: #10b981;
        }

        .seo-section {
          max-width: 960px;
          margin: 0 auto 3rem;
          background: #1e293b;
          border: 1px solid #334155;
          padding: 2.5rem;
          border-radius: 1.5rem;
        }

        .seo-section h2 {
          font-size: 1.5rem;
          font-weight: 700;
          color: #f1f5f9;
          margin: 1.5rem 0 1rem;
          letter-spacing: -0.01em;
        }

        .seo-section h2:first-child {
          margin-top: 0;
        }

        .seo-section h3 {
          font-size: 1.125rem;
          font-weight: 600;
          color: #a78bfa;
          margin: 1.25rem 0 0.5rem;
        }

        .seo-section p {
          color: #94a3b8;
          line-height: 1.75;
          margin-bottom: 1rem;
        }

        .seo-section ul {
          margin: 1rem 0;
          padding-left: 1.5rem;
        }

        .seo-section li {
          color: #94a3b8;
          margin-bottom: 0.75rem;
          line-height: 1.6;
        }

        .seo-section li::marker {
          color: #8b5cf6;
        }

        .seo-section code {
          background: #0f172a;
          color: #a78bfa;
          padding: 0.15em 0.4em;
          border-radius: 0.3em;
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.9em;
        }

        .related-tools {
          max-width: 960px;
          margin: 0 auto 3rem;
        }

        .related-tools h2 {
          font-size: 1.5rem;
          font-weight: 700;
          color: #f1f5f9;
          margin-bottom: 1.5rem;
          letter-spacing: -0.01em;
        }

        .related-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 1rem;
        }

        .related-card {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          padding: 1.5rem;
          background: #1e293b;
          border: 1px solid #334155;
          border-radius: 1rem;
          text-decoration: none;
          transition: all 0.2s ease;
        }

        .related-card:hover {
          border-color: #475569;
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
        }

        .related-icon {
          font-size: 1.5rem;
        }

        .related-title {
          font-weight: 600;
          color: #f1f5f9;
          font-size: 1rem;
        }

        .related-desc {
          color: #64748b;
          font-size: 0.875rem;
          line-height: 1.5;
        }

        @media (max-width: 768px) {
          .case-buttons-grid {
            grid-template-columns: repeat(2, 1fr);
          }

          .two-col {
            grid-template-columns: 1fr;
          }

          .main-card {
            padding: 1.5rem;
            border-radius: 1rem;
          }

          .col-actions {
            flex-direction: column;
          }

          .action-btn {
            width: 100%;
            text-align: center;
          }
        }
      `}</style>

      <div className="case-convert-page">
        <Header currentPage="case-convert" />

        <main className="container">
          <div className="page-header">
            <h1>Case Converter Online Free</h1>
            <p>Instantly convert text to UPPERCASE, lowercase, Title Case, camelCase, snake_case &amp; more</p>
          </div>

          <div className="main-card">
            <div className="case-buttons-grid">
              {caseOptions.map(opt => (
                <button
                  key={opt.id}
                  className={`case-btn${activeCase === opt.id ? ' active' : ''}`}
                  style={activeCase === opt.id ? { borderColor: opt.color, color: opt.color, boxShadow: `0 0 0 3px ${opt.color}30` } : {}}
                  onClick={() => handleCaseClick(opt.id)}
                >
                  {opt.label}
                </button>
              ))}
            </div>

            <div className="two-col">
              <div className="col-input">
                <label className="col-label">Input Text</label>
                <textarea
                  className="text-area"
                  value={inputText}
                  onChange={(e) => handleInput(e.target.value)}
                  placeholder="Type or paste your text here..."
                />
                <div className="col-actions">
                  <button className="action-btn btn-example" onClick={handleExample}>
                    Try Example
                  </button>
                </div>
              </div>

              <div className="col-output">
                <label className="col-label">Result</label>
                <textarea
                  className="text-area output"
                  value={result}
                  readOnly
                  placeholder="Converted text will appear here..."
                />
                <div className="col-actions">
                  <button
                    className={`action-btn btn-copy${copied ? ' copied' : ''}`}
                    onClick={copyResult}
                    disabled={!result}
                  >
                    {copied ? '✓ Copied!' : 'Copy Result'}
                  </button>
                </div>
              </div>
            </div>
          </div>

          <section className="seo-section">
            <h2>What Is a Case Converter?</h2>
            <p>
              A <strong>case converter</strong> is an online tool that transforms text from one letter case format to another.
              Whether you need to fix all-caps text, convert variable names to camelCase, or format headings as Title Case,
              a case converter does the job instantly — no manual editing required.
            </p>
            <p>
              Our free online case converter supports 10 different case formats and works entirely in your browser.
              No account, no upload, no data stored.
            </p>

            <h2>All 10 Case Types Explained</h2>

            <h3>UPPERCASE</h3>
            <p>
              Every letter is capitalized. Example: <code>hello world</code> → <code>HELLO WORLD</code>.
              Best for headings, warnings, or emphasis. Used in SQL keywords, acronyms, and titles.
            </p>

            <h3>lowercase</h3>
            <p>
              Every letter becomes lowercase. Example: <code>Hello World</code> → <code>hello world</code>.
              Common for email addresses, URLs, and normalizing input data.
            </p>

            <h3>Title Case</h3>
            <p>
              The first letter of every word is capitalized. Example: <code>the quick brown fox</code> → <code>The Quick Brown Fox</code>.
              Perfect for article titles, blog headings, and book titles.
            </p>

            <h3>Sentence case</h3>
            <p>
              Only the first letter of each sentence is capitalized. Example: <code>hello. how are you?</code> → <code>Hello. How are you?</code>.
              Ideal for natural writing, paragraphs, and content editing.
            </p>

            <h3>tOGGLE cASE</h3>
            <p>
              Every character&apos;s case is flipped. Example: <code>Hello World</code> → <code>hELLO wORLD</code>.
              A fun, creative format used for memes, stylized text, and social media posts.
            </p>

            <h3>camelCase</h3>
            <p>
              The first word is lowercase, subsequent words start with a capital, no spaces. Example:{' '}
              <code>user profile image</code> → <code>userProfileImage</code>.
              The standard naming convention for JavaScript and TypeScript variables and functions.
            </p>

            <h3>PascalCase</h3>
            <p>
              Every word starts with a capital letter, no spaces. Example: <code>user profile image</code> → <code>UserProfileImage</code>.
              Used for React component names, class names in OOP, and TypeScript interfaces.
            </p>

            <h3>snake_case</h3>
            <p>
              All lowercase, words separated by underscores. Example: <code>user profile image</code> → <code>user_profile_image</code>.
              The conventional format for Python variables, database column names, and file names.
            </p>

            <h3>kebab-case</h3>
            <p>
              All lowercase, words separated by hyphens. Example: <code>user profile image</code> → <code>user-profile-image</code>.
              Used for CSS class names, HTML attributes, URL slugs, and file names.
            </p>

            <h2>Who Uses a Case Converter?</h2>
            <ul>
              <li><strong>Developers</strong> — quickly switch between camelCase, snake_case, kebab-case, and PascalCase when writing or refactoring code</li>
              <li><strong>Content Writers &amp; Editors</strong> — fix accidental caps, format headings, and normalize text for publications</li>
              <li><strong>SEO Specialists</strong> — format meta titles, URL slugs, and alt text consistently</li>
              <li><strong>Students</strong> — fix pasted text from PDFs or scanned documents that may have incorrect casing</li>
              <li><strong>Data Analysts</strong> — normalize column headers and imported data</li>
            </ul>

            <h2>Why Use an Online Tool?</h2>
            <p>
              Manually changing the case of hundreds of words is tedious and error-prone. Our online case converter
              handles the transformation instantly, no matter how long or complex your text is.
              Unlike word processors, you get specialized formats like camelCase, PascalCase, snake_case, and kebab-case
              that are essential for programming.
            </p>

            <h2>Common Use Cases</h2>
            <ul>
              <li>Converting a database column name from <code>UserProfileImage</code> to <code>user_profile_image</code></li>
              <li>Fixing a title written in ALL CAPS to Title Case for a blog post</li>
              <li>Transforming a space-separated sentence into a URL-friendly <code>kebab-case</code> slug</li>
              <li>Quickly generating variable names from plain English descriptions</li>
              <li>Normalizing customer-submitted text before storing it in a database</li>
            </ul>
          </section>

          <section className="related-tools">
            <h2>Related Tools</h2>
            <div className="related-grid">
              {relatedTools.map(tool => (
                <Link key={tool.href} href={tool.href} className="related-card">
                  <span className="related-icon">{tool.icon}</span>
                  <span className="related-title">{tool.title}</span>
                  <span className="related-desc">{tool.desc}</span>
                </Link>
              ))}
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  )
}
