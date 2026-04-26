'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import Header from '../../../components/Header'
import Footer from '../../../components/Footer'
import AdUnit from '../../../components/AdUnit'

export default function WordCounterClient() {
  const [text, setText] = useState('')
  const [copied, setCopied] = useState(false)

  const counts = useMemo(() => {
    if (!text.trim()) {
      return { words: 0, chars: 0, charsNoSpaces: 0, sentences: 0, paragraphs: 0, lines: 0 }
    }
    const trimmed = text.trim()
    return {
      words: trimmed.split(/\s+/).filter(w => w.length > 0).length,
      chars: text.length,
      charsNoSpaces: text.replace(/\s/g, '').length,
      sentences: text.split(/[.!?]+/).filter(s => s.trim().length > 0).length || (trimmed ? 1 : 0),
      paragraphs: text.split(/\n\s*\n/).filter(p => p.trim().length > 0).length || (trimmed ? 1 : 0),
      lines: text.split('\n').length,
    }
  }, [text])

  const copyToClipboard = async () => {
    if (!text) return
    await navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const stats = [
    { value: counts.words, label: 'Words', color: '#8b5cf6' },
    { value: counts.chars, label: 'Characters', color: '#06b6d4' },
    { value: counts.charsNoSpaces, label: 'No Spaces', color: '#10b981' },
    { value: counts.sentences, label: 'Sentences', color: '#f59e0b' },
    { value: counts.paragraphs, label: 'Paragraphs', color: '#ec4899' },
    { value: counts.lines, label: 'Lines', color: '#6366f1' },
  ]

  return (
    <>
      <style jsx>{`
        .word-counter-page {
          min-height: 100vh;
          background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
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
          border-radius: 1.5rem;
          box-shadow: 0 4px 24px rgba(0, 0, 0, 0.3);
          border: 1px solid #334155;
          padding: 2rem;
          max-width: 900px;
          margin: 0 auto 2rem;
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
          min-height: 220px;
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
          box-shadow: 0 0 0 4px rgba(139, 92, 246, 0.15);
        }
        
        .text-input::placeholder {
          color: #475569;
        }
        
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(130px, 1fr));
          gap: 1rem;
          margin-bottom: 2rem;
        }
        
        .stat-card {
          background: linear-gradient(135deg, #1e293b, #0f172a);
          border-radius: 1rem;
          padding: 1.5rem 1rem;
          text-align: center;
          border: 1px solid #334155;
          transition: all 0.3s ease;
        }
        
        .stat-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.4);
        }
        
        .stat-value {
          display: block;
          font-size: 2rem;
          font-weight: 700;
          margin-bottom: 0.25rem;
          font-family: 'DM Sans', sans-serif;
        }
        
        .stat-label {
          display: block;
          font-size: 0.75rem;
          color: #64748b;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          font-weight: 600;
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
          background: linear-gradient(135deg, #334155, #475569);
          transform: translateY(-1px);
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
          
          .stats-grid {
            grid-template-columns: repeat(2, 1fr);
          }
          
          .stat-card {
            padding: 1rem;
          }
          
          .stat-value {
            font-size: 1.5rem;
          }
          
          .actions {
            flex-direction: column;
          }
          
          .action-btn {
            width: 100%;
            justify-content: center;
          }
        }

        .related-tools {
          max-width: 900px;
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
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
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
          box-shadow: 0 4px 12px rgba(0,0,0,0.3);
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
      `}</style>

      <div className="word-counter-page">
        <Header currentPage="word-counter" />
        
        <main className="container">
          <div className="page-header">
            <h1>Word Counter Online</h1>
            <p>Count words, characters, sentences &amp; more — instant &amp; free</p>
          </div>

          <AdUnit position="top" />

          <div className="main-card">
            <div className="input-section">
              <label className="input-label">Your Text</label>
              <textarea
                className="text-input"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Type or paste your text here to count words, characters, and more..."
              />
            </div>

            <div className="stats-grid">
              {stats.map((stat, i) => (
                <div className="stat-card" key={i} style={{ borderColor: `${stat.color}20` }}>
                  <span className="stat-value" style={{ color: stat.color }}>{stat.value}</span>
                  <span className="stat-label">{stat.label}</span>
                </div>
              ))}
            </div>

            <div className="actions">
              <button className="action-btn btn-clear" onClick={() => setText('')}>
                Clear Text
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

          <AdUnit position="bottom" />

          <section className="section-seo">
            <div className="seo-card">
              <h2>About This Word Counter Tool</h2>
              <p>
                Our free <strong>word counter online</strong> tool provides instant, accurate text analysis for any content. 
                Whether you&apos;re a writer, student, or professional, knowing your word count is essential for meeting deadlines, 
                adhering to limits, or optimizing content for SEO.
              </p>
              <p>
                This character counter tool works completely in your browser — no uploads needed. Simply type or paste 
                your text, and watch the counts update in real-time.
              </p>
              
              <h2>How to Use</h2>
              <ul>
                <li>Type or paste your text into the input area above</li>
                <li>View instant counts for words, characters, sentences, and paragraphs</li>
                <li>Click &quot;Copy Text&quot; to copy your content to clipboard</li>
                <li>Click &quot;Clear&quot; to start fresh</li>
              </ul>
              
              <h2>Why Use an Online Word Counter?</h2>
              <p>
                Perfect for blog posts, essays, social media captions, and more. Our character counter tool helps you stay 
                within Twitter/X limits, meta descriptions, and other platform constraints. The sentence and paragraph counters give you insights into 
                content structure and readability.
              </p>
            </div>
          </section>

          <section className="related-tools">
            <h2>Related Tools</h2>
            <div className="related-grid">
              <Link href="/tools/case-convert" className="related-card">
                <span className="related-icon">Aa</span>
                <span className="related-title">Case Converter</span>
                <span className="related-desc">Convert text to any case format</span>
              </Link>
              <Link href="/tools/remove-extra-spaces" className="related-card">
                <span className="related-icon">🔧</span>
                <span className="related-title">Remove Extra Spaces</span>
                <span className="related-desc">Clean whitespace from text</span>
              </Link>
              <Link href="/tools/sort-text-alphabetically" className="related-card">
                <span className="related-icon">📋</span>
                <span className="related-title">Sort Text Alphabetically</span>
                <span className="related-desc">Sort lines A-Z or Z-A</span>
              </Link>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  )
}
