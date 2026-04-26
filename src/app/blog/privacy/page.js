import Footer from '../../../components/Footer'
import Header from '../../../components/Header'
import '../about/blog.css'

export const metadata = {
  title: 'Privacy Policy — ToolKit Pro',
  description: 'ToolKit Pro privacy policy. Learn how we collect, use, and protect your information. We respect your privacy and never sell your data.',
}

export default function PrivacyPage() {
  return (
    <div style={{ background: 'linear-gradient(135deg, #0f172a, #1e293b)', minHeight: '100vh' }}>
      <Header currentPage="privacy" />
      <main>
        <div className="tool-page container">
          <nav className="tool-breadcrumb">
            <a href="/">Home</a>
            <span>›</span>
            <span>Privacy Policy</span>
          </nav>
          <div className="seo-content" style={{ maxWidth: '800px' }}>
            <h1>Privacy Policy</h1>
            <p><strong>Last updated:</strong> April 26, 2026</p>

            <h2>1. Introduction</h2>
            <p>
              Welcome to ToolKit Pro ("we", "our", or "us"), accessible at <strong>fasttextkit.com</strong>.
              We provide free browser-based tools for text processing and image compression.
              This Privacy Policy explains how we collect, use, and protect information when you visit our website.
              By using ToolKit Pro, you agree to the practices described in this policy.
            </p>

            <h2>2. Information We Collect</h2>
            <h3 style={{ color: '#e2e8f0', fontSize: '1.05rem', margin: '1rem 0 0.5rem' }}>Automatically Collected Information</h3>
            <p>
              When you visit fasttextkit.com, we automatically collect certain information through Google Analytics and standard server logs, including:
            </p>
            <ul>
              <li>IP address (anonymized)</li>
              <li>Browser type and version</li>
              <li>Device type (desktop, mobile, tablet)</li>
              <li>Operating system</li>
              <li>Pages visited and time spent on each page</li>
              <li>Referring website (how you found us)</li>
              <li>General geographic location (country/city level only)</li>
            </ul>
            <h3 style={{ color: '#e2e8f0', fontSize: '1.05rem', margin: '1rem 0 0.5rem' }}>Information You Input Into Tools</h3>
            <p>
              All text, images, and data you enter into our tools are processed <strong>entirely within your browser</strong>.
              This data is never transmitted to our servers, never stored, and never shared with any third party.
              Your content remains completely private on your device.
            </p>

            <h2>3. How We Use Your Information</h2>
            <p>We use the automatically collected information to:</p>
            <ul>
              <li>Understand how visitors use our tools and which features are most popular</li>
              <li>Diagnose technical issues and improve site performance</li>
              <li>Measure the effectiveness of our content and SEO efforts</li>
              <li>Serve relevant advertisements through Google AdSense</li>
              <li>Comply with legal obligations</li>
            </ul>

            <h2>4. Google AdSense and Advertising</h2>
            <p>
              We use <strong>Google AdSense</strong> to display advertisements on our website.
              Google AdSense uses cookies and web beacons to serve ads based on your prior visits to our website and other sites on the internet.
            </p>
            <p>
              Google&apos;s use of advertising cookies enables it and its partners to serve ads based on your visit to our site and/or other sites on the internet.
              You may opt out of personalized advertising by visiting <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer" style={{ color: '#8b5cf6' }}>Google Ads Settings</a>.
            </p>
            <p>
              For more information about how Google uses data from advertising cookies, visit:
              <a href="https://policies.google.com/technologies/ads" target="_blank" rel="noopener noreferrer" style={{ color: '#8b5cf6' }}> Google Advertising Policies</a>.
            </p>
            <p>
              We do not have control over the specific ads shown by Google. Ad content is determined by Google based on your browsing history and interests.
            </p>

            <h2>5. Google Analytics</h2>
            <p>
              We use <strong>Google Analytics 4</strong> to collect anonymized information about how visitors use our website.
              Google Analytics uses cookies to collect information such as how often users visit the site, what pages they visit, and what other sites they used prior to arriving.
              We use this information to improve our site. Google Analytics collects only the IP address assigned to you, not your name or other identifying information.
            </p>
            <p>
              You can opt out of Google Analytics by installing the
              <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer" style={{ color: '#8b5cf6' }}> Google Analytics Opt-out Browser Add-on</a>.
              Analytics data is retained for 26 months.
            </p>

            <h2>6. Cookies</h2>
            <p>We use the following types of cookies:</p>
            <ul>
              <li><strong>Essential cookies:</strong> Required for basic site functionality such as page navigation. These cannot be disabled.</li>
              <li><strong>Analytics cookies:</strong> Used by Google Analytics to understand site usage (can be opted out via the link above).</li>
              <li><strong>Advertising cookies:</strong> Used by Google AdSense to serve relevant ads based on your browsing history.</li>
            </ul>
            <p>
              You can control and delete cookies through your browser settings. Note that disabling cookies may affect the functionality of some features.
              Visit <a href="https://www.allaboutcookies.org" target="_blank" rel="noopener noreferrer" style={{ color: '#8b5cf6' }}>allaboutcookies.org</a> for guidance on managing cookies.
            </p>

            <h2>7. Data Processing and Security</h2>
            <p>
              All tool operations — including text processing and image compression — happen entirely in your browser using JavaScript.
              No content you process through our tools is ever sent to our servers.
              We implement appropriate technical measures to protect the information we do collect (analytics data) against unauthorized access, alteration, or disclosure.
            </p>

            <h2>8. Third-Party Links</h2>
            <p>
              Our website may contain links to third-party websites. We are not responsible for the privacy practices or content of those sites.
              We encourage you to read the privacy policy of every website you visit.
            </p>

            <h2>9. Children&apos;s Privacy</h2>
            <p>
              ToolKit Pro is not directed to children under the age of 13. We do not knowingly collect personally identifiable information from children under 13.
              If you believe a child has provided us with personal information, please contact us and we will promptly delete it.
            </p>

            <h2>10. Your Rights (GDPR)</h2>
            <p>
              If you are located in the European Union or European Economic Area, you have the following rights under GDPR:
            </p>
            <ul>
              <li><strong>Right of access:</strong> Request a copy of the data we hold about you</li>
              <li><strong>Right to rectification:</strong> Request correction of inaccurate data</li>
              <li><strong>Right to erasure:</strong> Request deletion of your data</li>
              <li><strong>Right to restrict processing:</strong> Request that we limit how we use your data</li>
              <li><strong>Right to object:</strong> Object to our processing of your data</li>
              <li><strong>Right to data portability:</strong> Request transfer of your data in a machine-readable format</li>
            </ul>
            <p>To exercise any of these rights, contact us at <a href="mailto:info@fasttextkit.com" style={{ color: '#8b5cf6' }}>info@fasttextkit.com</a>.</p>

            <h2>11. Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. When we make changes, we will update the &quot;Last updated&quot; date at the top of this page.
              We encourage you to review this policy periodically. Continued use of our website after changes constitutes your acceptance of the updated policy.
            </p>

            <h2>12. Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy, please contact us:
            </p>
            <ul>
              <li>Email: <a href="mailto:info@fasttextkit.com" style={{ color: '#8b5cf6' }}>info@fasttextkit.com</a></li>
              <li>Website: <a href="https://fasttextkit.com" style={{ color: '#8b5cf6' }}>https://fasttextkit.com</a></li>
            </ul>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
