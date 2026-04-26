'use client'

import { useState } from 'react'
import Header from '../../../components/Header'
import Footer from '../../../components/Footer'

export default function UppercaseConverterClient() {
  const [text, setText] = useState('')
  const [copied, setCopied] = useState(false)

  const toUpperCase = (str) => str.toUpperCase()
  const toLowerCase = (str) => str.toLowerCase()
  const toTitleCase = (str) => {
    return str.replace(/\w\S*/g, (txt) => 
      txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
    )
  }
  const toSentenceCase = (str) => {
    return str.toLowerCase().replace(/(^\s*\w|[.!?]\s*\w)/g, (c) => c.toUpperCase())
  }
  const toCapitalize = (str) => {
    return str.toLowerCase().replace(/(^|\s)\w/g, (c) => c.toUpperCase())
  }
  const toToggleCase = (str) => {
    return str.split('').map(c => 
      c === c.toUpperCase() ? c.toLowerCase() : c.toUpperCase()
    ).join('')
  }

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const caseTypes = [
    { id: 'upper', label: 'UPPERCASE', fn: toUpperCase, color: '#8b5cf6' },
    { id: 'lower', label: 'lowercase', fn: toLowerCase, color: '#06b6d4' },
    { id: 'title', label: 'Title Case', fn: toTitleCase, color: '#10b981' },
    { id: 'sentence', label: 'Sentence case', fn: toSentenceCase, color: '#f59e0b' },
    { id: 'capital', label: 'Capitalize', fn: toCapitalize, color: '#ec4899' },
    { id: 'toggle', label: 'tOGGLE cASE', fn: toToggleCase, color: '#6366f1' },
  ]

  const applyCase = (fn) => {
    setText(fn(text))
  }

  return (
    <>
      <style jsx>{`
        .case-page {
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
          background: linear-gradient(135deg, #a78bfa, #22d3ee);
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
          border-radius: 1.5rem;
          box-shadow: 0 4px 24px rgba(0, 0, 0, 0.3);
          border: 1px solid #334155;
          padding: 2rem;
          max-width: 900px;
          margin: 0 auto 2rem;
        }
        
        .case-buttons {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
          gap: 0.75rem;
          margin-bottom: 2rem;
        }
        
        .case-btn {
          padding: 1rem;
          font-size: 0.9375rem;
          font-weight: 600;
          border-radius: 0.75rem;
          border: 2px solid #334155;
          cursor: pointer;
          transition: all 0.2s ease;
          text-align: center;
          background: #0f172a;
          color: #94a3b8;
        }
        
        .case-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
          background: #1e293b;
        }
        
        .input-section {
          margin-bottom: 2rem;
        }
        
        .input-label {
          display: block;
          font-weight: 600;
          font-size: 0.875rem;
          color: #94a3b8;
          margin-bottom: 0.75rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }
        
        .text-input {
          width: 100%;
          min-height: 180px;
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
        }
        
        .text-input:focus {
          outline: none;
          border-color: #8b5cf6;
          background: #0f172a;
          box-shadow: 0 0 0 4px rgba(139, 92, 246, 0.1);
        }
        
        .text-input::placeholder {
          color: #475569;
        }
        
        .actions {
          display: flex;
          flex-wrap: wrap;
          gap: 0.75rem;
        }
        
        .action-btn {
          padding: 0.875rem 1.5rem;
          font-size: 0.9375rem;
          font-weight: 600;
          border-radius: 0.75rem;
          border: none;
          cursor: pointer;
          transition: all 0.2s ease;
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
        }
        
        .btn-clear {
          background: #334155;
          color: #94a3b8;
        }
        
        .btn-clear:hover {
          background: #475569;
          color: #f1f5f9;
        }
        
        .btn-copy {
          background: linear-gradient(135deg, #1e293b, #334155);
          color: white;
        }
        
        .btn-copy:hover {
          background: #334155;
        }
        
        .btn-copy.copied {
          background: #10b981;
        }
        
        .section-seo {
          max-width: 900px;
          margin: 0 auto 3rem;
        }
        
        .seo-card {
          background: #1e293b;
          border-radius: 1.5rem;
          box-shadow: 0 4px 24px rgba(0, 0, 0, 0.3);
          border: 1px solid #334155;
          padding: 2.5rem;
        }
        
        .seo-card h2 {
          font-size: 1.5rem;
          font-weight: 700;
          color: #f1f5f9;
          margin-bottom: 1.25rem;
          letter-spacing: -0.01em;
        }
        
        .seo-card p {
          color: #94a3b8;
          line-height: 1.75;
          margin-bottom: 1rem;
        }
        
        .seo-card ul {
          margin: 1.5rem 0;
          padding-left: 1.5rem;
        }
        
        .seo-card li {
          color: #94a3b8;
          margin-bottom: 0.75rem;
          line-height: 1.6;
        }
        
        .seo-card li::marker {
          color: #8b5cf6;
        }

        @media (max-width: 640px) {
          .main-card {
            padding: 1.5rem;
            border-radius: 1rem;
          }
          
          .case-buttons {
            grid-template-columns: repeat(2, 1fr);
          }
          
          .actions {
            flex-direction: column;
          }
          
          .action-btn {
            width: 100%;
            justify-content: center;
          }
        }
      `}</style>

      <div className="case-page">
        <Header currentPage="case-converter" />
        
        <main className="container">
          <div className="page-header">
            <h1>Uppercase Converter</h1>
            <p>Convert text case instantly — 6 case options available</p>
          </div>

          <div className="main-card">
            <div className="case-buttons">
              {caseTypes.map((type) => (
                <button 
                  key={type.id}
                  className="case-btn"
                  onClick={() => applyCase(type.fn)}
                  disabled={!text}
                  style={{ borderColor: type.color + '40' }}
                >
                  {type.label}
                </button>
              ))}
            </div>

            <div className="input-section">
              <label className="input-label">Your Text</label>
              <textarea
                className="text-input"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Type or paste your text here to convert..."
              />
            </div>

            <div className="actions">
              <button className="action-btn btn-clear" onClick={() => setText('')}>
                Clear
              </button>
              <button 
                className={`action-btn btn-copy ${copied ? 'copied' : ''}`} 
                onClick={copyToClipboard}
                disabled={!text}
              >
                {copied ? '✓ Copied!' : 'Copy Text'}
              </button>
            </div>
          </div>

          <section className="section-seo">
            <div className="seo-card">
              <h2>About This Case Converter Tool</h2>
              <p>
                Our free <strong>uppercase converter online</strong> tool instantly changes text case in 6 different formats. 
                Convert to UPPERCASE, lowercase, Title Case, Sentence case, Capitalize Each Word, or tOGGLE cASE — all in one click.
              </p>
              <p>
                This is perfect for standardizing text, fixing capitalization mistakes, or quickly reformatting content 
                for social media, documents, or code.
              </p>
              
              <h2>How to Use</h2>
              <ul>
                <li>Type or paste your text in the input field above</li>
                <li>Click any case button to convert instantly</li>
                <li>Try different case options to find your preferred format</li>
                <li>Click &quot;Copy Text&quot; to copy to clipboard</li>
              </ul>
              
              <h2>Why Use an Online Case Converter?</h2>
              <p>
                Whether you need ALL CAPS for emphasis, lowercase for casual messages, or Title Case for headings, 
                this tool makes case conversion effortless — no software installation required.
              </p>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  )
}
