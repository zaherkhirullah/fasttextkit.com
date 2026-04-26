'use client'

import { useState } from 'react'
import Link from 'next/link'
import Header from '../../../components/Header'
import Footer from '../../../components/Footer'
import AdUnit from '../../../components/AdUnit'

export default function RemoveExtraSpacesClient() {
  const [text, setText] = useState('')
  const [options, setOptions] = useState({
    leading: true,
    trailing: true,
    double: true,
    newlines: false,
  })
  const [copied, setCopied] = useState(false)
  const [removed, setRemoved] = useState(null)
  const [result, setResult] = useState('')

  const cleanText = () => {
    let cleaned = text
    
    if (options.leading) {
      cleaned = cleaned.replace(/^[ \t]+/gm, '')
    }
    if (options.trailing) {
      cleaned = cleaned.replace(/[ \t]+$/gm, '')
    }
    if (options.double) {
      cleaned = cleaned.replace(/[ \t]{2,}/g, ' ')
    }
    if (options.newlines) {
      cleaned = cleaned.replace(/\n{2,}/g, '\n')
    }
    
    const originalSpaces = (text.match(/ +/g) || []).length
    const newSpaces = (cleaned.match(/ +/g) || []).length
    setRemoved(originalSpaces - newSpaces)
    setResult(cleaned)
    
    return cleaned
  }

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(result)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleOptionChange = (key) => {
    setOptions(prev => ({ ...prev, [key]: !prev[key] }))
  }

  return (
    <>
      <style jsx>{`
        .remove-spaces-page {
          min-height: 100vh;
          background: linear-gradient(180deg, #0f172a 0%, #0c2010 100%);
        }
        
        .page-header {
          padding: 3rem 0 2rem;
          text-align: center;
        }
        
        .page-header h1 {
          font-size: clamp(2rem, 5vw, 3rem);
          font-weight: 700;
          margin-bottom: 0.75rem;
          background: linear-gradient(135deg, #4ade80, #22d3ee);
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
        
        .options-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 1rem;
          margin-bottom: 2rem;
          padding: 1.5rem;
          background: linear-gradient(135deg, #0f2318, #0a1a10);
          border-radius: 1rem;
          border: 1px solid #166534;
        }
        
        .option-item {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          cursor: pointer;
          padding: 0.75rem 1rem;
          border-radius: 0.5rem;
          transition: all 0.2s ease;
        }
        
        .option-item:hover {
          background: rgba(255, 255, 255, 0.05);
        }
        
        .option-checkbox {
          width: 20px;
          height: 20px;
          accent-color: #16a34a;
          cursor: pointer;
        }
        
        .option-text {
          font-weight: 500;
          color: #4ade80;
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
        }
        
        .text-input:focus {
          outline: none;
          border-color: #22c55e;
          background: #0f172a;
          box-shadow: 0 0 0 4px rgba(34, 197, 94, 0.1);
        }
        
        .text-input::placeholder {
          color: #475569;
        }
        
        .result-section {
          margin-bottom: 2rem;
        }
        
        .result-label {
          display: block;
          font-weight: 600;
          font-size: 0.875rem;
          color: #475569;
          margin-bottom: 0.75rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }
        
        .result-output {
          width: 100%;
          min-height: 150px;
          padding: 1.25rem;
          border: 2px solid #166534;
          border-radius: 1rem;
          font-family: 'JetBrains Mono', 'Fira Code', monospace;
          font-size: 0.9375rem;
          line-height: 1.7;
          resize: vertical;
          background: #0a1a0f;
          color: #4ade80;
        }
        
        .badge-count {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.5rem 1rem;
          background: #052e0a;
          color: #4ade80;
          border-radius: 2rem;
          font-size: 0.875rem;
          font-weight: 600;
          margin-bottom: 1rem;
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
        
        .btn-process {
          background: linear-gradient(135deg, #16a34a, #22c55e);
          color: white;
        }
        
        .btn-process:hover {
          background: linear-gradient(135deg, #15803d, #16a34a);
          transform: translateY(-1px);
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
          color: #22c55e;
        }

        @media (max-width: 640px) {
          .main-card {
            padding: 1.5rem;
            border-radius: 1rem;
          }
          
          .options-grid {
            grid-template-columns: 1fr;
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

      <div className="remove-spaces-page">
        <Header currentPage="remove-spaces" />
        
        <main className="container">
          <div className="page-header">
            <h1>Remove Extra Spaces</h1>
            <p>Clean your text instantly — remove unwanted whitespace</p>
          </div>

          <AdUnit position="top" />

          <div className="main-card">
            <div className="options-grid">
              <label className="option-item">
                <input 
                  type="checkbox" 
                  className="option-checkbox"
                  checked={options.leading}
                  onChange={() => handleOptionChange('leading')}
                />
                <span className="option-text">Remove leading spaces</span>
              </label>
              <label className="option-item">
                <input 
                  type="checkbox" 
                  className="option-checkbox"
                  checked={options.trailing}
                  onChange={() => handleOptionChange('trailing')}
                />
                <span className="option-text">Remove trailing spaces</span>
              </label>
              <label className="option-item">
                <input 
                  type="checkbox" 
                  className="option-checkbox"
                  checked={options.double}
                  onChange={() => handleOptionChange('double')}
                />
                <span className="option-text">Collapse double spaces</span>
              </label>
              <label className="option-item">
                <input 
                  type="checkbox" 
                  className="option-checkbox"
                  checked={options.newlines}
                  onChange={() => handleOptionChange('newlines')}
                />
                <span className="option-text">Remove extra newlines</span>
              </label>
            </div>

            <div className="input-section">
              <label className="input-label">Your Text</label>
              <textarea
                className="text-input"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Paste your text with extra spaces here..."
              />
            </div>

            <div className="actions">
              <button className="action-btn btn-process" onClick={cleanText}>
                Remove Spaces
              </button>
              <button className="action-btn btn-clear" onClick={() => { setText(''); setRemoved(null); setResult('') }}>
                Clear
              </button>
              <button 
                className={`action-btn btn-copy ${copied ? 'copied' : ''}`} 
                onClick={copyToClipboard}
              >
                {copied ? '✓ Copied!' : 'Copy Result'}
              </button>
            </div>

            {result !== '' && (
              <div className="result-section" style={{ marginTop: '2rem' }}>
                <span className="badge-count">
                  ✓ Removed {removed} space{removed !== 1 ? 's' : ''}
                </span>
                <label className="result-label">Cleaned Result</label>
                <textarea
                  className="result-output"
                  value={result}
                  readOnly
                />
              </div>
            )}
          </div>

          <AdUnit position="bottom" />

          <section className="section-seo">
            <div className="seo-card">
              <h2>About This Remove Extra Spaces Tool</h2>
              <p>
                Our free <strong>remove extra spaces online</strong> tool cleans up your text with a single click. 
                Remove leading and trailing whitespace, collapse multiple spaces between words, and tidy up irregular line breaks 
                — all completely in your browser.
              </p>
              <p>
                Perfect for cleaning up copied content, fixing formatting issues, or preparing text for databases, 
                emails, or publications.
              </p>
              
              <h2>How to Use</h2>
              <ul>
                <li>Paste or type your text with extra spaces</li>
                <li>Select which types of spaces to remove</li>
                <li>Click &quot;Remove Spaces&quot; to clean your text</li>
                <li>Copy the cleaned result</li>
              </ul>
              
              <h2>Why Remove Extra Spaces?</h2>
              <p>
                Extra spaces can cause formatting issues in documents, break code, and look unprofessional. 
                This text cleaner tool ensures consistent spacing throughout your content, making it look polished and professional.
              </p>
            </div>
          </section>

          <section className="related-tools">
            <h2>Related Tools</h2>
            <div className="related-grid">
              <Link href="/tools/word-counter-online" className="related-card">
                <span className="related-icon">📝</span>
                <span className="related-title">Word Counter</span>
                <span className="related-desc">Count words, characters &amp; more</span>
              </Link>
              <Link href="/tools/case-convert" className="related-card">
                <span className="related-icon">Aa</span>
                <span className="related-title">Case Converter</span>
                <span className="related-desc">Convert text to any case format</span>
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
