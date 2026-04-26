import Header from '../../../components/Header'
import Footer from '../../../components/Footer'
import './blog.css'

export const metadata = {
  title: 'About ToolKit Pro — Free Online Text & Image Tools',
  description: 'Learn about ToolKit Pro — a collection of free online tools for text editing, case conversion, and image compression. No signup required.',
}

export default function AboutPage() {
  return (
    <div style={{ background: 'linear-gradient(135deg, #0f172a, #1e293b)', minHeight: '100vh' }}>
      <Header currentPage="about" />

      <main>
        <div className="tool-page container">
          <nav className="tool-breadcrumb">
            <a href="/">Home</a>
            <span>›</span>
            <span>About</span>
          </nav>

          <div className="seo-content" style={{ maxWidth: '800px' }}>
            <h1>About ToolKit Pro</h1>
            <p>
              ToolKit Pro is a growing collection of free online productivity tools built for writers, developers, 
              designers, and students. Whether you need to count words in an essay, convert text to camelCase for 
              a JavaScript variable, sort a list alphabetically, or compress an image for a website — we have you covered.
            </p>
            <p>
              Every tool on this site runs entirely in your web browser. That means your text and files are never 
              sent to a server, never stored, and never shared. Your privacy is guaranteed by design.
            </p>

            <h2>Our Mission</h2>
            <p>
              We believe powerful tools should be accessible to everyone — for free, without requiring an account, 
              without hidden fees, and without cluttered interfaces. Our mission is to provide the fastest, simplest, 
              most reliable versions of the tools people use every day.
            </p>

            <h2>Why Choose ToolKit Pro?</h2>
            <ul>
              <li><strong>Lightning Fast</strong> — All tools process data instantly in your browser, no server round-trips</li>
              <li><strong>100% Private</strong> — Your text and images never leave your device</li>
              <li><strong>Completely Free</strong> — No signup, no credit card, no premium tier required</li>
              <li><strong>Mobile Friendly</strong> — Works perfectly on phones, tablets, and desktops</li>
              <li><strong>No Ads in the Way</strong> — Clean, distraction-free tool interfaces</li>
              <li><strong>Always Available</strong> — No login sessions to expire or accounts to manage</li>
            </ul>

            <h2>Our Tools</h2>
            <p>We currently offer the following free tools:</p>
            <ul>
              <li><a href="/tools/word-counter-online" style={{ color: '#8b5cf6' }}>Word Counter</a> — Count words, characters, sentences, paragraphs, and lines</li>
              <li><a href="/tools/remove-extra-spaces" style={{ color: '#8b5cf6' }}>Remove Extra Spaces</a> — Strip leading, trailing, and double spaces from text</li>
              <li><a href="/tools/sort-text-alphabetically" style={{ color: '#8b5cf6' }}>Sort Text Alphabetically</a> — Sort lines A-Z or Z-A, with deduplication</li>
              <li><a href="/tools/image-compressor-online" style={{ color: '#8b5cf6' }}>Image Compressor</a> — Compress JPEG and PNG images in your browser</li>
              <li><a href="/tools/uppercase-converter" style={{ color: '#8b5cf6' }}>UPPERCASE Converter</a> — Convert text to ALL CAPS</li>
              <li><a href="/tools/lowercase-converter" style={{ color: '#8b5cf6' }}>lowercase converter</a> — Convert text to all lowercase</li>
              <li><a href="/tools/title-case-converter" style={{ color: '#8b5cf6' }}>Title Case Converter</a> — Capitalize each major word</li>
              <li><a href="/tools/sentence-case-converter" style={{ color: '#8b5cf6' }}>Sentence Case Converter</a> — Fix sentence capitalization</li>
              <li><a href="/tools/camelcase-converter" style={{ color: '#8b5cf6' }}>camelCase Converter</a> — For JavaScript variables and JSON keys</li>
              <li><a href="/tools/pascalcase-converter" style={{ color: '#8b5cf6' }}>PascalCase Converter</a> — For React components and class names</li>
              <li><a href="/tools/snake-case-converter" style={{ color: '#8b5cf6' }}>snake_case Converter</a> — For Python and databases</li>
              <li><a href="/tools/kebab-case-converter" style={{ color: '#8b5cf6' }}>kebab-case Converter</a> — For CSS and URL slugs</li>
            </ul>

            <h2>Privacy Commitment</h2>
            <p>
              We take your privacy seriously. None of the tools on ToolKit Pro send your data anywhere. 
              All processing happens locally in your browser using JavaScript. We do not use tracking cookies, 
              we do not collect personal information, and we do not sell data to third parties. 
              For more details, see our <a href="/blog/privacy" style={{ color: '#8b5cf6' }}>Privacy Policy</a>.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
