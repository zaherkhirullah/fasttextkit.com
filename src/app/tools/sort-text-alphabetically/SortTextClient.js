'use client'

import { useState } from 'react'
import Link from 'next/link'
import Header from '../../../components/Header'
import Footer from '../../../components/Footer'
import AdUnit from '../../../components/AdUnit'

export default function SortTextClient() {
  const [text, setText] = useState('')
  const [options, setOptions] = useState({
    order: 'asc',
    removeDuplicates: false,
    removeEmpty: true,
    ignoreCase: true,
  })
  const [copied, setCopied] = useState(false)
  const [sorted, setSorted] = useState('')
  const [stats, setStats] = useState({ removed: 0, total: 0 })

  const processText = () => {
    let lines = text.split('\n')
    
    if (options.ignoreCase) {
      lines = lines.map(l => l.toLowerCase())
    }
    
    const total = lines.length
    
    if (options.removeEmpty) {
      lines = lines.filter(l => l.trim() !== '')
    }
    
    if (options.removeDuplicates) {
      const unique = new Set(lines)
      lines = [...unique]
    }
    
    if (options.order === 'asc') {
      lines.sort((a, b) => a.localeCompare(b))
    } else if (options.order === 'desc') {
      lines.sort((a, b) => b.localeCompare(a))
    } else if (options.order === 'length-asc') {
      lines.sort((a, b) => a.length - b.length)
    } else if (options.order === 'length-desc') {
      lines.sort((a, b) => b.length - a.length)
    }
    
    const result = lines.join('\n')
    const removed = total - lines.length
    
    setSorted(result)
    setStats({ removed, total: lines.length })
  }

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(sorted || text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <>
      <style jsx>{`
        .sorter-page {
          min-height: 100vh;
          background: linear-gradient(135deg, #0f172a 0%, #1a1500 100%);
        }
        
        .page-header {
          padding: 3rem 0 2rem;
          text-align: center;
        }
        
        .page-header h1 {
          font-size: clamp(2rem, 5vw, 3rem);
          font-weight: 700;
          margin-bottom: 0.75rem;
          background: linear-gradient(135deg, #fbbf24, #f97316);
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
        
        .options-panel {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
          gap: 1rem;
          margin-bottom: 2rem;
          padding: 1.5rem;
          background: linear-gradient(135deg, #1a1500, #120f00);
          border-radius: 1rem;
          border: 1px solid #78350f;
        }
        
        .option-group {
          margin-bottom: 0.5rem;
        }
        
        .option-label {
          display: block;
          font-weight: 600;
          font-size: 0.8125rem;
          color: #fbbf24;
          margin-bottom: 0.5rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }
        
        .option-select {
          width: 100%;
          padding: 0.625rem 1rem;
          border: 2px solid #78350f;
          border-radius: 0.5rem;
          font-size: 0.9375rem;
          font-weight: 500;
          background: #0f172a;
          color: #fbbf24;
          cursor: pointer;
        }
        
        .option-select:focus {
          outline: none;
          border-color: #ca8a04;
        }
        
        .checkbox-group {
          display: flex;
          flex-direction: column;
          gap: 0.75rem;
        }
        
        .checkbox-item {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          cursor: pointer;
        }
        
        .option-checkbox {
          width: 20px;
          height: 20px;
          accent-color: #ca8a04;
          cursor: pointer;
        }
        
        .checkbox-text {
          font-weight: 500;
          color: #fbbf24;
        }
        
        .input-section {
          margin-bottom: 1.5rem;
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
          border-color: #ca8a04;
          background: #0f172a;
          box-shadow: 0 0 0 4px rgba(202, 138, 4, 0.1);
        }
        
        .text-input::placeholder {
          color: #475569;
        }
        
        .stats-bar {
          display: flex;
          flex-wrap: wrap;
          gap: 1rem;
          margin-bottom: 1.5rem;
          padding: 1rem;
          background: #1e293b;
          border: 1px solid #334155;
          border-radius: 0.75rem;
        }
        
        .stat-item {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        
        .stat-value {
          font-weight: 700;
          color: #ca8a04;
        }
        
        .stat-label {
          color: #94a3b8;
          font-size: 0.875rem;
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
        
        .btn-sort {
          background: linear-gradient(135deg, #ca8a04, #eab308);
          color: white;
        }
        
        .btn-sort:hover {
          background: linear-gradient(135deg, #a16207, #ca8a04);
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
          color: #eab308;
        }

        .result-section {
          margin-top: 2rem;
        }

        .result-label {
          display: block;
          font-weight: 600;
          font-size: 0.875rem;
          color: #94a3b8;
          margin-bottom: 0.75rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .result-output {
          width: 100%;
          min-height: 200px;
          padding: 1.25rem;
          border: 2px solid #78350f;
          border-radius: 1rem;
          font-family: 'JetBrains Mono', 'Fira Code', monospace;
          font-size: 0.9375rem;
          line-height: 1.7;
          resize: vertical;
          background: #120f00;
          color: #fbbf24;
        }

        @media (max-width: 640px) {
          .main-card {
            padding: 1.5rem;
            border-radius: 1rem;
          }
          
          .options-panel {
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

      <div className="sorter-page">
        <Header currentPage="text-sorter" />
        
        <main className="container">
          <div className="page-header">
            <h1>Sort Text Alphabetically</h1>
            <p>Organize lists, remove duplicates, clean up instantly</p>
          </div>

          <AdUnit position="top" />

          <div className="main-card">
            <div className="options-panel">
              <div className="option-group">
                <label className="option-label">Sort Order</label>
                <select 
                  className="option-select"
                  value={options.order}
                  onChange={(e) => setOptions(prev => ({ ...prev, order: e.target.value }))}
                >
                  <option value="asc">A → Z (Ascending)</option>
                  <option value="desc">Z → A (Descending)</option>
                  <option value="length-asc">Shortest First</option>
                  <option value="length-desc">Longest First</option>
                </select>
              </div>
              
              <div className="checkbox-group">
                <label className="checkbox-item">
                  <input 
                    type="checkbox" 
                    className="option-checkbox"
                    checked={options.removeDuplicates}
                    onChange={() => setOptions(prev => ({ ...prev, removeDuplicates: !prev.removeDuplicates }))}
                  />
                  <span className="checkbox-text">Remove duplicates</span>
                </label>
                <label className="checkbox-item">
                  <input 
                    type="checkbox" 
                    className="option-checkbox"
                    checked={options.removeEmpty}
                    onChange={() => setOptions(prev => ({ ...prev, removeEmpty: !prev.removeEmpty }))}
                  />
                  <span className="checkbox-text">Remove empty lines</span>
                </label>
                <label className="checkbox-item">
                  <input 
                    type="checkbox" 
                    className="option-checkbox"
                    checked={options.ignoreCase}
                    onChange={() => setOptions(prev => ({ ...prev, ignoreCase: !prev.ignoreCase }))}
                  />
                  <span className="checkbox-text">Ignore case</span>
                </label>
              </div>
            </div>

            <div className="input-section">
              <label className="input-label">Enter Items (one per line)</label>
              <textarea
                className="text-input"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Apple&#10;banana&#10;orange&#10;apple&#10;grape"
              />
            </div>

            {sorted && (
              <div className="stats-bar">
                <div className="stat-item">
                  <span className="stat-value">{stats.total}</span>
                  <span className="stat-label">items sorted</span>
                </div>
                {stats.removed > 0 && (
                  <div className="stat-item">
                    <span className="stat-value">-{stats.removed}</span>
                    <span className="stat-label">removed</span>
                  </div>
                )}
              </div>
            )}

            <div className="actions">
              <button className="action-btn btn-sort" onClick={processText}>
                Sort Text
              </button>
              <button className="action-btn btn-clear" onClick={() => { setText(''); setSorted(''); setStats({ removed: 0, total: 0 }) }}>
                Clear
              </button>
              <button 
                className={`action-btn btn-copy ${copied ? 'copied' : ''}`} 
                onClick={copyToClipboard}
              >
                {copied ? '✓ Copied!' : 'Copy Result'}
              </button>
            </div>

            {sorted && (
              <div className="result-section">
                <label className="result-label">Sorted Result</label>
                <textarea
                  className="result-output"
                  value={sorted}
                  readOnly
                />
              </div>
            )}
          </div>

          <AdUnit position="bottom" />

          <section className="section-seo">
            <div className="seo-card">
              <h2>About This Text Sorter Tool</h2>
              <p>
                Our free <strong>sort text alphabetically online</strong> tool organizes your lists in seconds. 
                Sort A-Z or Z-A, remove duplicate entries, and clean up empty lines — all with customizable options.
              </p>
              <p>
                Perfect for organizing lists, preparing data, managing inventory, or cleaning up exported content.
              </p>
              
              <h2>How to Use</h2>
              <ul>
                <li>Enter each item on a new line in the input field</li>
                <li>Choose your sort order (A-Z, Z-A, or by length)</li>
                <li>Optionally remove duplicates or empty lines</li>
                <li>Click &quot;Sort Text&quot; and copy your sorted result</li>
              </ul>
              
              <h2>Why Sort Text Online?</h2>
              <p>
                Great for preparing data exports, organizing contact lists, managing products, 
                or cleaning up copied content. Remove duplicates instantly and get organized.
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
              <Link href="/tools/remove-extra-spaces" className="related-card">
                <span className="related-icon">🔧</span>
                <span className="related-title">Remove Extra Spaces</span>
                <span className="related-desc">Clean whitespace from text</span>
              </Link>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  )
}
