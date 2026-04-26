'use client'
import { useState } from 'react'
import Link from 'next/link'
import Header from './Header'
import Footer from './Footer'
import AdUnit from './AdUnit'

const CASE_CONFIGS = {
  uppercase: {
    title: 'UPPERCASE Converter Online Free',
    subtitle: 'Instantly convert any text to ALL CAPS — perfect for headings, emphasis, and formatting',
    accent: '#8b5cf6',
    accentLight: 'rgba(139,92,246,0.15)',
    icon: '🔠',
    currentPage: 'uppercase-converter',
    exampleText: `the quick brown fox jumps over the lazy dog.\nhello world from toolkit pro!\nthis is a test sentence for uppercase conversion.`,
    convert: (s) => s.toUpperCase(),
    seoTitle: 'UPPERCASE Converter',
    seoIntro: `The UPPERCASE converter tool instantly transforms any text into ALL CAPITAL LETTERS. Whether you need to emphasize a title, format a heading, or meet specific style requirements, this free online tool handles it in seconds.`,
    useCases: ['Social media posts and hashtags', 'Document headings and titles', 'Acronyms and abbreviations', 'Email subject lines', 'Code constants (MY_CONSTANT)'],
    seoBody: `UPPERCASE text is one of the most common formatting needs in writing and development. Writers use it for emphasis and impact. Developers use it for constants and environment variables. Designers use it for typographic hierarchy. With this tool, you simply paste your text, click convert, and instantly get your result — no account, no download, no cost.`
  },
  lowercase: {
    title: 'lowercase converter Online Free',
    subtitle: 'Convert text to all lowercase letters instantly — ideal for emails, URLs and casual writing',
    accent: '#06b6d4',
    accentLight: 'rgba(6,182,212,0.15)',
    icon: '🔡',
    currentPage: 'lowercase-converter',
    exampleText: `THE QUICK BROWN FOX JUMPS OVER THE LAZY DOG.\nHELLO WORLD FROM TOOLKIT PRO!\nCONVERT THIS TEXT TO LOWERCASE NOW.`,
    convert: (s) => s.toLowerCase(),
    seoTitle: 'Lowercase Converter',
    seoIntro: `The lowercase converter transforms any text — whether ALL CAPS or Mixed Case — into clean, uniform lowercase letters. Perfect for normalizing data, writing casual messages, or preparing text for URLs and email addresses.`,
    useCases: ['Email addresses and usernames', 'URL slugs and permalinks', 'Database field normalization', 'Casual social media writing', 'Fixing accidental CAPS LOCK text'],
    seoBody: `Lowercase text is the default for most digital communication. URLs, email addresses, and usernames are typically lowercase. Database queries are case-sensitive — having consistent lowercase text prevents errors. This tool saves time and prevents mistakes by converting any text instantly.`
  },
  'title-case': {
    title: 'Title Case Converter Online Free',
    subtitle: 'Capitalize the first letter of every major word — for blog titles, article headings, and more',
    accent: '#10b981',
    accentLight: 'rgba(16,185,129,0.15)',
    icon: '📰',
    currentPage: 'title-case-converter',
    exampleText: `the quick brown fox jumps over the lazy dog\nhow to use a title case converter online\nbest free tools for writers and developers`,
    convert: (s) => s.replace(/\w\S*/g, (w) => w.charAt(0).toUpperCase() + w.substr(1).toLowerCase()),
    seoTitle: 'Title Case Converter',
    seoIntro: `Title Case capitalizes the first letter of each significant word in a phrase. It's the standard format for article titles, book names, movie titles, and section headings. Our free online Title Case converter applies this instantly to any text.`,
    useCases: ['Blog post and article titles', 'Book and movie titles', 'Product names and brand names', 'Page and section headings', 'Presentation slide titles'],
    seoBody: `Title Case follows the convention used by major style guides including AP, APA, Chicago, and MLA. It makes titles look professional and is a requirement for most publishing platforms. Instead of manually capitalizing each word, use this tool to do it instantly and accurately.`
  },
  'sentence-case': {
    title: 'Sentence Case Converter Online Free',
    subtitle: 'Capitalize the first letter of each sentence — fix improperly cased paragraphs instantly',
    accent: '#f59e0b',
    accentLight: 'rgba(245,158,11,0.15)',
    icon: '✏️',
    currentPage: 'sentence-case-converter',
    exampleText: `THE QUICK BROWN FOX. HELLO WORLD. THIS IS A TEST. how are you today? i am doing great!`,
    convert: (s) => s.toLowerCase().replace(/(^\s*\w|[.!?]\s*\w)/g, (c) => c.toUpperCase()),
    seoTitle: 'Sentence Case Converter',
    seoIntro: `Sentence case means only the first letter of the first word in each sentence is capitalized, along with proper nouns. It's the most natural way to write English prose. This free tool converts improperly capitalized text into properly formatted sentences instantly.`,
    useCases: ['Fixing ALL CAPS paragraphs', 'Normalizing copy-pasted text', 'Preparing text for articles and blogs', 'Social media captions', 'Customer support responses'],
    seoBody: `When you paste text from PDFs, OCR tools, or old documents, it often comes in ALL CAPS or random CaSeS. Converting it manually is tedious. Sentence case conversion instantly fixes this, producing clean, readable text ready for publication.`
  },
  'capitalize-words': {
    title: 'Capitalize Each Word Online Free',
    subtitle: 'Capitalize the first letter of every single word — great for names, labels, and headers',
    accent: '#ec4899',
    accentLight: 'rgba(236,72,153,0.15)',
    icon: '🔤',
    currentPage: 'capitalize-words',
    exampleText: `john smith from new york\nproduct name goes here\nfirst name last name email address`,
    convert: (s) => s.toLowerCase().replace(/(^|\s)\S/g, (c) => c.toUpperCase()),
    seoTitle: 'Capitalize Words',
    seoIntro: `The Capitalize Words tool converts the first letter of every single word to uppercase. Unlike Title Case which skips small words, this capitalizes everything — ideal for proper names, form labels, database fields, and contact information.`,
    useCases: ['Full names (first and last)', 'Address formatting', 'Form field labels', 'Product catalog titles', 'Name lists and directories'],
    seoBody: `Capitalizing every word is different from Title Case — it applies universally to every word without exceptions. This is the standard for proper nouns, names, and many UI labels. Perfect for preparing name lists, formatting contact data, or generating properly cased titles from raw input.`
  },
  'toggle-case': {
    title: 'tOGGLE cASE Converter Online Free',
    subtitle: "Flip every letter's case — turn UPPER to lower and lower to UPPER character by character",
    accent: '#6366f1',
    accentLight: 'rgba(99,102,241,0.15)',
    icon: '🔄',
    currentPage: 'toggle-case',
    exampleText: `Hello World from ToolKit Pro!\nThis Is A Test Sentence.\nMixed CASE text goes HERE.`,
    convert: (s) => s.split('').map(c => c === c.toUpperCase() ? c.toLowerCase() : c.toUpperCase()).join(''),
    seoTitle: 'Toggle Case Converter',
    seoIntro: `Toggle Case (also known as alternating case) flips every single character's case — uppercase becomes lowercase and lowercase becomes uppercase. It creates the distinctive aLtErNaTiNg cAsE effect used in memes, mockery, and creative design.`,
    useCases: ['Meme text and internet humor', 'Creative typography and design', 'Social media posts', 'Reversing accidentally wrongly cased text', 'Fun text effects'],
    seoBody: `Toggle case is the go-to format for sarcastic internet memes and the "mocking SpongeBob" style. It's also useful when you have text that was formatted in the wrong case and you want to flip all characters at once. Fast, free, and requires zero effort.`
  },
  camelcase: {
    title: 'camelCase Converter Online Free',
    subtitle: 'Convert text to camelCase — the JavaScript and JSON naming convention for variables',
    accent: '#f97316',
    accentLight: 'rgba(249,115,22,0.15)',
    icon: '🐪',
    currentPage: 'camelcase-converter',
    exampleText: `user profile image\nhello world example\nget user by id\ncreate new account`,
    convert: (s) => s.trim().toLowerCase().replace(/[^a-zA-Z0-9]+(.)/g, (_, c) => c.toUpperCase()),
    seoTitle: 'camelCase Converter',
    seoIntro: `camelCase is the naming convention where the first word is lowercase and every subsequent word begins with an uppercase letter, with no spaces or separators. It's the standard for JavaScript variables, JSON keys, and many programming languages.`,
    useCases: ['JavaScript variable names (userName)', 'JSON object keys', 'React state variables', 'API response field names', 'TypeScript interfaces'],
    seoBody: `Every JavaScript developer uses camelCase daily. Variable names, function names, object properties — all follow this convention. Converting a plain English phrase like "user profile image" to "userProfileImage" manually is error-prone. This tool does it instantly and accurately, making it perfect for developers building APIs, writing code, or designing data schemas.`
  },
  pascalcase: {
    title: 'PascalCase Converter Online Free',
    subtitle: 'Convert text to PascalCase — the standard for React components, classes, and types',
    accent: '#a855f7',
    accentLight: 'rgba(168,85,247,0.15)',
    icon: '🏗️',
    currentPage: 'pascalcase-converter',
    exampleText: `user profile component\nhello world\nbutton primary large\ncreate user service`,
    convert: (s) => s.trim().toLowerCase().replace(/(^|[^a-zA-Z0-9]+)(.)/g, (_, __, c) => c.toUpperCase()),
    seoTitle: 'PascalCase Converter',
    seoIntro: `PascalCase (also called UpperCamelCase) capitalizes the first letter of every word with no spaces or separators. It's the standard naming convention for React components, TypeScript classes, C# classes, and constructor functions.`,
    useCases: ['React component names (UserProfile)', 'TypeScript class definitions', 'C# and Java class names', 'Constructor functions', 'Enum values'],
    seoBody: `In React, every component must start with a capital letter — that's PascalCase. In TypeScript and C#, classes and interfaces follow PascalCase. Converting a descriptive phrase like "user profile component" to "UserProfileComponent" is a daily task for developers. This free tool handles it instantly.`
  },
  'snake-case': {
    title: 'snake_case Converter Online Free',
    subtitle: 'Convert text to snake_case — the Python and database naming convention',
    accent: '#84cc16',
    accentLight: 'rgba(132,204,22,0.15)',
    icon: '🐍',
    currentPage: 'snake-case-converter',
    exampleText: `user profile image\nhello world example\nget user by id\ndatabase table name`,
    convert: (s) => s.trim().toLowerCase().replace(/\s+/g, '_').replace(/[^a-zA-Z0-9_]/g, ''),
    seoTitle: 'snake_case Converter',
    seoIntro: `snake_case uses all lowercase letters with underscores separating words. It's the standard naming convention for Python variables, database column names, file names in Linux, and many backend APIs.`,
    useCases: ['Python variable names (user_name)', 'Database column names', 'Linux file and directory names', 'API endpoint parameters', 'PostgreSQL and MySQL field names'],
    seoBody: `Python's official style guide (PEP 8) requires snake_case for variables and functions. Database naming conventions across PostgreSQL, MySQL, and SQLite favor snake_case for column names. REST API designers often use it for query parameters. This tool converts any phrase to clean snake_case instantly.`
  },
  'kebab-case': {
    title: 'kebab-case Converter Online Free',
    subtitle: 'Convert text to kebab-case — the CSS, URL, and HTML attribute naming convention',
    accent: '#ef4444',
    accentLight: 'rgba(239,68,68,0.15)',
    icon: '🍢',
    currentPage: 'kebab-case-converter',
    exampleText: `user profile image\nhello world example\nbackground primary color\nmy component name`,
    convert: (s) => s.trim().toLowerCase().replace(/\s+/g, '-').replace(/[^a-zA-Z0-9-]/g, ''),
    seoTitle: 'kebab-case Converter',
    seoIntro: `kebab-case uses all lowercase letters with hyphens connecting words. It's the universal convention for CSS class names, HTML attributes, URL slugs, and CLI command options.`,
    useCases: ['CSS class names (.my-component)', 'URL slugs (/blog/my-post-title)', 'HTML data attributes (data-user-id)', 'NPM package names', 'CLI command flags (--dry-run)'],
    seoBody: `CSS requires kebab-case for class names and custom properties. URLs use kebab-case for SEO-friendly slugs. NPM packages are named in kebab-case. HTML data attributes follow kebab-case. This makes it one of the most-used conventions in web development. Convert any text to kebab-case instantly with this free tool.`
  }
}

const ALL_TOOLS = [
  { icon: '📝', title: 'Word Counter', desc: 'Count words, characters & more', href: '/tools/word-counter-online' },
  { icon: '🔧', title: 'Remove Extra Spaces', desc: 'Clean whitespace from text', href: '/tools/remove-extra-spaces' },
  { icon: '📋', title: 'Sort Text', desc: 'Sort lines A-Z or Z-A', href: '/tools/sort-text-alphabetically' },
  { icon: '🖼️', title: 'Image Compressor', desc: 'Compress images for free', href: '/tools/image-compressor-online' },
  { icon: '🔠', title: 'UPPERCASE', desc: 'Convert to ALL CAPS', href: '/tools/uppercase-converter' },
  { icon: '🔡', title: 'lowercase', desc: 'Convert to all lowercase', href: '/tools/lowercase-converter' },
  { icon: '📰', title: 'Title Case', desc: 'Capitalize each major word', href: '/tools/title-case-converter' },
  { icon: '✏️', title: 'Sentence Case', desc: 'Fix sentence capitalization', href: '/tools/sentence-case-converter' },
  { icon: '🔤', title: 'Capitalize Words', desc: 'Capitalize every word', href: '/tools/capitalize-words' },
  { icon: '🔄', title: 'Toggle Case', desc: 'Flip every character case', href: '/tools/toggle-case' },
  { icon: '🐪', title: 'camelCase', desc: 'For JS variables & JSON', href: '/tools/camelcase-converter' },
  { icon: '🏗️', title: 'PascalCase', desc: 'For React & class names', href: '/tools/pascalcase-converter' },
  { icon: '🐍', title: 'snake_case', desc: 'For Python & databases', href: '/tools/snake-case-converter' },
  { icon: '🍢', title: 'kebab-case', desc: 'For CSS & URLs', href: '/tools/kebab-case-converter' },
]

export default function CaseToolClient({ caseType }) {
  const config = CASE_CONFIGS[caseType]
  const [inputText, setInputText] = useState('')
  const [result, setResult] = useState('')
  const [copied, setCopied] = useState(false)

  const relatedTools = ALL_TOOLS.filter(t => !t.href.endsWith(config.currentPage))

  const loadExample = () => {
    setInputText(config.exampleText)
    setResult(config.convert(config.exampleText))
  }

  const convertText = () => {
    setResult(config.convert(inputText))
  }

  const copyResult = async () => {
    if (!result) return
    await navigator.clipboard.writeText(result)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const clear = () => {
    setInputText('')
    setResult('')
  }

  return (
    <>
      <style jsx>{`
        .case-tool-page {
          min-height: 100vh;
          background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
        }
        .tool-page-header {
          text-align: center;
          padding: 3rem 0 2rem;
        }
        .tool-icon {
          font-size: 3rem;
          display: block;
          margin-bottom: 1rem;
        }
        .tool-page-header h1 {
          color: #f1f5f9;
          font-size: clamp(1.75rem, 4vw, 2.75rem);
          font-weight: 700;
          margin-bottom: 0.75rem;
        }
        .tool-page-header p {
          color: #94a3b8;
          font-size: 1.0625rem;
        }
        .tool-main-card {
          background: #1e293b;
          border: 1px solid #334155;
          border-radius: 1.5rem;
          padding: 2rem;
          max-width: 960px;
          margin: 0 auto 2rem;
        }
        .tool-two-col {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.5rem;
        }
        @media (max-width: 640px) {
          .tool-two-col {
            grid-template-columns: 1fr;
          }
        }
        .tool-col label {
          color: #94a3b8;
          font-size: 0.875rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          display: block;
          margin-bottom: 0.75rem;
        }
        .tool-textarea {
          width: 100%;
          min-height: 200px;
          background: #0f172a;
          border: 2px solid #334155;
          border-radius: 1rem;
          color: #f1f5f9;
          padding: 1.25rem;
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.9375rem;
          line-height: 1.7;
          resize: vertical;
          box-sizing: border-box;
        }
        .tool-textarea:focus {
          outline: none;
          border-color: #8b5cf6;
        }
        .tool-textarea::placeholder {
          color: #475569;
        }
        .tool-result {
          color: #a78bfa;
        }
        .tool-actions {
          display: flex;
          flex-wrap: wrap;
          gap: 0.75rem;
          margin-top: 1rem;
        }
        .btn-example {
          background: #334155;
          color: #94a3b8;
          padding: 0.75rem 1.25rem;
          border-radius: 0.75rem;
          border: none;
          cursor: pointer;
          font-weight: 600;
        }
        .btn-example:hover {
          background: #475569;
          color: #f1f5f9;
        }
        .btn-convert {
          color: white;
          padding: 0.75rem 1.5rem;
          border-radius: 0.75rem;
          border: none;
          cursor: pointer;
          font-weight: 600;
        }
        .btn-clear {
          background: #1e293b;
          border: 1px solid #334155;
          color: #64748b;
          padding: 0.75rem 1.25rem;
          border-radius: 0.75rem;
          cursor: pointer;
          font-weight: 600;
        }
        .btn-clear:hover {
          border-color: #475569;
          color: #94a3b8;
        }
        .btn-copy {
          background: #334155;
          color: #f1f5f9;
          padding: 0.75rem 1.5rem;
          border-radius: 0.75rem;
          border: none;
          cursor: pointer;
          font-weight: 600;
        }
        .btn-copy.copied {
          background: #10b981;
        }
        .seo-section {
          max-width: 960px;
          margin: 0 auto 2rem;
          background: #1e293b;
          border: 1px solid #334155;
          border-radius: 1.5rem;
          padding: 2.5rem;
        }
        .seo-section h2 {
          color: #f1f5f9;
          font-size: 1.5rem;
          font-weight: 700;
          margin-bottom: 1rem;
        }
        .seo-section h3 {
          color: #e2e8f0;
          font-size: 1.125rem;
          font-weight: 600;
          margin: 1.5rem 0 0.75rem;
        }
        .seo-section p {
          color: #94a3b8;
          line-height: 1.75;
          margin-bottom: 1rem;
        }
        .seo-section ul {
          padding-left: 1.5rem;
          margin-bottom: 1rem;
        }
        .seo-section li {
          color: #94a3b8;
          margin-bottom: 0.5rem;
        }
        .related-section {
          max-width: 960px;
          margin: 0 auto 3rem;
        }
        .related-section h2 {
          color: #f1f5f9;
          font-size: 1.5rem;
          font-weight: 700;
          margin-bottom: 1.5rem;
        }
        .related-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
          gap: 1rem;
        }
        .related-card {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
          padding: 1.25rem;
          background: #1e293b;
          border: 1px solid #334155;
          border-radius: 1rem;
          text-decoration: none;
          transition: all 0.2s;
        }
        .related-card:hover {
          border-color: #475569;
          transform: translateY(-2px);
        }
        .related-icon {
          font-size: 1.5rem;
        }
        .related-title {
          color: #f1f5f9;
          font-weight: 600;
          font-size: 0.9375rem;
        }
        .related-desc {
          color: #64748b;
          font-size: 0.8125rem;
          line-height: 1.5;
        }
      `}</style>

      <div className="case-tool-page">
        <Header currentPage={config.currentPage} />
        <main className="container">
          <div className="tool-page-header">
            <span className="tool-icon">{config.icon}</span>
            <h1>{config.title}</h1>
            <p>{config.subtitle}</p>
          </div>

          <AdUnit position="top" />

          <div className="tool-main-card">
            <div className="tool-two-col">
              <div className="tool-col">
                <label>Your Text</label>
                <textarea
                  className="tool-textarea"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder="Paste or type text here..."
                />
                <div className="tool-actions">
                  <button className="btn-example" onClick={loadExample}>Try Example</button>
                  <button className="btn-convert" onClick={convertText} style={{ background: config.accent }}>Convert</button>
                  <button className="btn-clear" onClick={clear}>Clear</button>
                </div>
              </div>
              <div className="tool-col">
                <label>Result</label>
                <textarea
                  className="tool-textarea tool-result"
                  value={result}
                  readOnly
                  placeholder="Result will appear here..."
                />
                <div className="tool-actions">
                  <button className={`btn-copy ${copied ? 'copied' : ''}`} onClick={copyResult}>
                    {copied ? '✓ Copied!' : '📋 Copy Result'}
                  </button>
                </div>
              </div>
            </div>
          </div>

          <AdUnit position="bottom" />

          <section className="seo-section">
            <h2>About the {config.seoTitle} Tool</h2>
            <p>{config.seoIntro}</p>
            <h3>Common Use Cases</h3>
            <ul>{config.useCases.map(uc => <li key={uc}>{uc}</li>)}</ul>
            <h3>Why Use This Tool?</h3>
            <p>{config.seoBody}</p>
          </section>

          <section className="related-section">
            <h2>Related Tools</h2>
            <div className="related-grid">
              {relatedTools.map(t => (
                <a key={t.href} href={t.href} className="related-card">
                  <span className="related-icon">{t.icon}</span>
                  <span className="related-title">{t.title}</span>
                  <span className="related-desc">{t.desc}</span>
                </a>
              ))}
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </>
  )
}
