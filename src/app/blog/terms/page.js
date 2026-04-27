import Footer from '../../../components/Footer'
import Header from '../../../components/Header'
import '../about/blog.css'

export const metadata = {
  title: 'Terms of Service — FastText Kit',
  description: 'FastText Kit terms of service. Read our terms and conditions for using our free online tools at fasttextkit.com.',
}

export default function TermsPage() {
  return (
    <div style={{ background: 'linear-gradient(135deg, #0f172a, #1e293b)', minHeight: '100vh' }}>
      <Header currentPage="terms" />
      <main>
        <div className="tool-page container">
          <nav className="tool-breadcrumb">
            <a href="/">Home</a>
            <span>›</span>
            <span>Terms of Service</span>
          </nav>
          <div className="seo-content" style={{ maxWidth: '800px' }}>
            <h1>Terms of Service</h1>
            <p><strong>Last updated:</strong> April 26, 2026</p>

            <h2>1. Acceptance of Terms</h2>
            <p>
              By accessing or using FastText Kit at <strong>fasttextkit.com</strong>, you agree to be bound by these Terms of Service.
              If you do not agree with any part of these terms, you may not use our website.
              These terms apply to all visitors, users, and anyone who accesses the service.
            </p>

            <h2>2. Description of Service</h2>
            <p>
              FastText Kit provides free, browser-based online tools including text case converters, word counters,
              whitespace removers, text sorters, and image compressors. No account or registration is required to use any tool.
              All processing occurs locally in your browser — your content is never uploaded to our servers.
            </p>

            <h2>3. Permitted Use</h2>
            <p>Our tools are free for both personal and commercial use. You agree not to:</p>
            <ul>
              <li>Use the service for any illegal or unauthorized purpose</li>
              <li>Attempt to reverse engineer, decompile, or extract source code from the website</li>
              <li>Use automated scripts to scrape, crawl, or mass-access our pages</li>
              <li>Attempt to disrupt or overload the website infrastructure</li>
              <li>Distribute malware or harmful content through the service</li>
              <li>Violate any applicable local, national, or international laws or regulations</li>
            </ul>

            <h2>4. Intellectual Property</h2>
            <p>
              All website design, source code, branding, and original content on fasttextkit.com is the intellectual property of FastText Kit and is protected by copyright law.
              You may not reproduce, distribute, or create derivative works from our website content without explicit written permission.
            </p>
            <p>
              You retain full ownership of any text, data, or content you process through our tools.
              We make no claim to any content you input into or receive from our tools.
            </p>

            <h2>5. Disclaimer of Warranties</h2>
            <p>
              FastText Kit is provided on an &quot;AS IS&quot; and &quot;AS AVAILABLE&quot; basis without any warranty of any kind,
              either express or implied, including but not limited to warranties of merchantability, fitness for a particular purpose, or non-infringement.
            </p>
            <p>
              We do not warrant that the service will be uninterrupted, error-free, or completely accurate in all cases.
              Tool results (such as word counts, case conversions, and image compression) are provided as best-effort computations
              and may not be suitable for all professional or legal purposes.
            </p>

            <h2>6. Limitation of Liability</h2>
            <p>
              To the maximum extent permitted by applicable law, FastText Kit shall not be liable for any indirect, incidental,
              special, consequential, or punitive damages, including but not limited to loss of data, loss of profits,
              or business interruption, arising from your use of or inability to use the service,
              even if we have been advised of the possibility of such damages.
            </p>

            <h2>7. Advertising</h2>
            <p>
              We display third-party advertisements through Google AdSense. The content of advertisements is controlled entirely by Google
              and its advertising partners. We are not responsible for the accuracy, content, or availability of advertised products or services.
              Clicking on advertisements may direct you to third-party websites subject to their own terms and privacy policies.
            </p>

            <h2>8. Privacy</h2>
            <p>
              Your use of FastText Kit is also governed by our{' '}
              <a href="/blog/privacy" style={{ color: '#8b5cf6' }}>Privacy Policy</a>,
              which is incorporated into these Terms of Service by reference.
              Please review our Privacy Policy to understand our data practices.
            </p>

            <h2>9. Modifications to Service</h2>
            <p>
              We reserve the right to modify, suspend, or discontinue any tool, feature, or aspect of the service at any time
              without prior notice. We may also update these Terms of Service at any time.
              The updated version will be posted on this page with a revised &quot;Last updated&quot; date.
              Continued use of the service after changes constitutes acceptance of the new terms.
            </p>

            <h2>10. Governing Law</h2>
            <p>
              These Terms of Service shall be governed by and construed in accordance with applicable law.
              Any disputes arising from these terms or your use of the service shall be resolved in the competent courts of the applicable jurisdiction.
            </p>

            <h2>11. Contact Us</h2>
            <p>If you have any questions about these Terms of Service, please contact us:</p>
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
