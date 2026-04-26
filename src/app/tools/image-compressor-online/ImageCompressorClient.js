'use client'

import { useState, useRef, useCallback } from 'react'
import Header from '../../../components/Header'
import Footer from '../../../components/Footer'
import AdUnit from '../../../components/AdUnit'

function formatBytes(bytes) {
  if (bytes === 0) return '0 B'
  const k = 1024
  const sizes = ['B', 'KB', 'MB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

export default function ImageCompressorClient() {
  const [file, setFile] = useState(null)
  const [preview, setPreview] = useState(null)
  const [result, setResult] = useState(null)
  const [quality, setQuality] = useState(80)
  const [maxWidth, setMaxWidth] = useState(1920)
  const [loading, setLoading] = useState(false)
  const [dragging, setDragging] = useState(false)
  const fileInputRef = useRef(null)

  const handleFile = (selected) => {
    if (!selected || !selected.type.startsWith('image/')) return
    setFile(selected)
    setResult(null)
    const reader = new FileReader()
    reader.onload = (e) => setPreview(e.target.result)
    reader.readAsDataURL(selected)
  }

  const onInputChange = (e) => handleFile(e.target.files?.[0])

  const onDrop = useCallback((e) => {
    e.preventDefault()
    setDragging(false)
    handleFile(e.dataTransfer.files?.[0])
  }, [])

  const onDragOver = (e) => { e.preventDefault(); setDragging(true) }
  const onDragLeave = () => setDragging(false)

  const compress = async () => {
    if (!file) return
    setLoading(true)

    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    const img = new Image()

    img.onload = () => {
      let width = img.width
      let height = img.height

      if (width > maxWidth) {
        height = Math.round((height * maxWidth) / width)
        width = maxWidth
      }

      canvas.width = width
      canvas.height = height
      ctx.drawImage(img, 0, 0, width, height)

      canvas.toBlob((blob) => {
        const dataUrl = canvas.toDataURL('image/jpeg', quality / 100)
        setResult({
          blob,
          dataUrl,
          originalSize: file.size,
          compressedSize: blob.size,
          width,
          height,
        })
        setLoading(false)
      }, 'image/jpeg', quality / 100)
    }

    img.src = URL.createObjectURL(file)
  }

  const download = () => {
    if (!result) return
    const link = document.createElement('a')
    link.href = result.dataUrl
    link.download = 'compressed-' + file.name.replace(/\.[^/.]+$/, '.jpg')
    link.click()
  }

  const reset = () => {
    setFile(null)
    setPreview(null)
    setResult(null)
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  const reduction = result
    ? ((result.originalSize - result.compressedSize) / result.originalSize * 100).toFixed(1)
    : 0

  return (
    <>
      <style jsx>{`
        .compressor-page {
          min-height: 100vh;
          background: linear-gradient(135deg, #0f172a 0%, #0c1a2e 50%, #0a1a10 100%);
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

        .upload-zone {
          border: 2.5px dashed #334155;
          border-radius: 1.25rem;
          padding: 3rem 2rem;
          text-align: center;
          cursor: pointer;
          transition: all 0.2s ease;
          background: #0f172a;
          margin-bottom: 2rem;
        }

        .upload-zone.dragging {
          border-color: #22d3ee;
          background: #0a1a2e;
          transform: scale(1.01);
        }

        .upload-zone:hover {
          border-color: #22d3ee;
          background: #0a1a2e;
        }

        .upload-icon {
          font-size: 3rem;
          margin-bottom: 1rem;
          display: block;
        }

        .upload-title {
          font-size: 1.125rem;
          font-weight: 600;
          color: #f1f5f9;
          margin-bottom: 0.5rem;
        }

        .upload-sub {
          color: #94a3b8;
          font-size: 0.9375rem;
        }

        .upload-formats {
          display: inline-block;
          margin-top: 0.75rem;
          padding: 0.375rem 1rem;
          background: #1e293b;
          color: #22d3ee;
          border-radius: 2rem;
          font-size: 0.8125rem;
          font-weight: 600;
        }

        .sliders-section {
          margin-bottom: 2rem;
        }

        .slider-group {
          margin-bottom: 1.5rem;
        }

        .slider-label {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 0.625rem;
        }

        .slider-name {
          font-weight: 600;
          color: #94a3b8;
          font-size: 0.9375rem;
        }

        .slider-value {
          font-weight: 700;
          color: #22d3ee;
          font-size: 0.9375rem;
          background: #1e293b;
          padding: 0.25rem 0.75rem;
          border-radius: 1rem;
        }

        .slider {
          width: 100%;
          height: 6px;
          -webkit-appearance: none;
          appearance: none;
          background: linear-gradient(to right, #22d3ee 0%, #22d3ee var(--val, 70%), #334155 var(--val, 70%), #334155 100%);
          border-radius: 3px;
          outline: none;
          cursor: pointer;
        }

        .slider::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: #22d3ee;
          cursor: pointer;
          box-shadow: 0 2px 6px rgba(34, 211, 238, 0.4);
          transition: transform 0.15s ease;
        }

        .slider::-webkit-slider-thumb:hover {
          transform: scale(1.2);
        }

        .file-info {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          padding: 1rem 1.25rem;
          background: #0f172a;
          border: 1px solid #334155;
          border-radius: 0.75rem;
          margin-bottom: 2rem;
        }

        .file-name {
          font-weight: 600;
          color: #f1f5f9;
          flex: 1;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .file-size {
          color: #94a3b8;
          font-size: 0.875rem;
          white-space: nowrap;
        }

        .actions {
          display: flex;
          flex-wrap: wrap;
          gap: 0.75rem;
          margin-bottom: 2rem;
        }

        .action-btn {
          padding: 0.875rem 1.75rem;
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

        .btn-compress {
          background: linear-gradient(135deg, #059669, #10b981);
          color: white;
        }

        .btn-compress:hover:not(:disabled) {
          background: linear-gradient(135deg, #047857, #059669);
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(5, 150, 105, 0.3);
        }

        .btn-compress:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .btn-reset {
          background: #334155;
          color: #94a3b8;
        }

        .btn-reset:hover {
          background: #475569;
          color: #f1f5f9;
        }

        .btn-download {
          background: linear-gradient(135deg, #0f766e, #0891b2);
          color: white;
        }

        .btn-download:hover {
          background: linear-gradient(135deg, #0d6b63, #0780a3);
          transform: translateY(-1px);
        }

        .comparison {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.5rem;
          margin-bottom: 1.5rem;
        }

        .preview-box {
          border-radius: 1rem;
          overflow: hidden;
          border: 1px solid #334155;
        }

        .preview-header {
          padding: 0.75rem 1rem;
          font-weight: 600;
          font-size: 0.875rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .preview-header.original {
          background: #1e293b;
          color: #94a3b8;
          border-bottom: 1px solid #334155;
        }

        .preview-header.compressed {
          background: #0f2318;
          color: #4ade80;
          border-bottom: 1px solid #166534;
        }

        .preview-img {
          width: 100%;
          aspect-ratio: 4/3;
          object-fit: contain;
          background: #0f172a;
          display: block;
        }

        .preview-footer {
          padding: 0.75rem 1rem;
          text-align: center;
          font-weight: 600;
          font-size: 0.9375rem;
        }

        .preview-footer.original {
          color: #94a3b8;
          background: #1e293b;
          border-top: 1px solid #334155;
        }

        .preview-footer.compressed {
          color: #4ade80;
          background: #0f2318;
          border-top: 1px solid #166534;
        }

        .stats-row {
          display: flex;
          flex-wrap: wrap;
          gap: 1rem;
          padding: 1.25rem;
          background: linear-gradient(135deg, #0f2318, #0a1a10);
          border-radius: 1rem;
          border: 1px solid #166534;
          margin-bottom: 1.5rem;
        }

        .stat-chip {
          display: flex;
          flex-direction: column;
          align-items: center;
          flex: 1;
          min-width: 80px;
        }

        .stat-chip-value {
          font-size: 1.5rem;
          font-weight: 700;
          color: #4ade80;
        }

        .stat-chip-label {
          font-size: 0.75rem;
          color: #94a3b8;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          font-weight: 600;
          margin-top: 0.25rem;
        }

        .reduction-highlight {
          color: #dc2626;
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
          color: #059669;
        }

        @media (max-width: 640px) {
          .main-card {
            padding: 1.25rem;
            border-radius: 1rem;
          }

          .comparison {
            grid-template-columns: 1fr;
          }

          .actions {
            flex-direction: column;
          }

          .action-btn {
            width: 100%;
            justify-content: center;
          }

          .upload-zone {
            padding: 2rem 1rem;
          }
        }
      `}</style>

      <div className="compressor-page">
        <Header currentPage="image-compressor" />

        <main className="container">
          <div className="page-header">
            <h1>Image Compressor Online</h1>
            <p>Reduce image file size instantly — free, fast, no upload needed</p>
          </div>

          <AdUnit position="top" />

          <div className="main-card">
            {/* Upload Zone */}
            {!file && (
              <div
                className={`upload-zone ${dragging ? 'dragging' : ''}`}
                onClick={() => fileInputRef.current?.click()}
                onDrop={onDrop}
                onDragOver={onDragOver}
                onDragLeave={onDragLeave}
              >
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={onInputChange}
                  hidden
                />
                <span className="upload-icon">🖼️</span>
                <p className="upload-title">Drop your image here or click to browse</p>
                <p className="upload-sub">Compress JPG, PNG, WebP images instantly in your browser</p>
                <span className="upload-formats">JPG · PNG · WebP · GIF</span>
              </div>
            )}

            {/* File info + sliders */}
            {file && !result && (
              <>
                <div className="file-info">
                  <span>📄</span>
                  <span className="file-name">{file.name}</span>
                  <span className="file-size">{formatBytes(file.size)}</span>
                </div>

                <div className="sliders-section">
                  <div className="slider-group">
                    <div className="slider-label">
                      <span className="slider-name">Quality</span>
                      <span className="slider-value">{quality}%</span>
                    </div>
                    <input
                      type="range"
                      className="slider"
                      min="10"
                      max="100"
                      value={quality}
                      style={{ '--val': `${quality}%` }}
                      onChange={(e) => setQuality(+e.target.value)}
                    />
                  </div>

                  <div className="slider-group">
                    <div className="slider-label">
                      <span className="slider-name">Max Width</span>
                      <span className="slider-value">{maxWidth}px</span>
                    </div>
                    <input
                      type="range"
                      className="slider"
                      min="100"
                      max="4000"
                      step="10"
                      value={maxWidth}
                      style={{ '--val': `${((maxWidth - 100) / 3900) * 100}%` }}
                      onChange={(e) => setMaxWidth(+e.target.value)}
                    />
                  </div>
                </div>

                <div className="actions">
                  <button className="action-btn btn-compress" onClick={compress} disabled={loading}>
                    {loading ? '⏳ Compressing...' : '⚡ Compress Image'}
                  </button>
                  <button className="action-btn btn-reset" onClick={reset}>
                    Reset
                  </button>
                </div>
              </>
            )}

            {/* Result */}
            {result && (
              <>
                <div className="stats-row">
                  <div className="stat-chip">
                    <span className="stat-chip-value">{formatBytes(result.originalSize)}</span>
                    <span className="stat-chip-label">Original</span>
                  </div>
                  <div className="stat-chip">
                    <span className="stat-chip-value">{formatBytes(result.compressedSize)}</span>
                    <span className="stat-chip-label">Compressed</span>
                  </div>
                  <div className="stat-chip">
                    <span className="stat-chip-value reduction-highlight">{reduction}%</span>
                    <span className="stat-chip-label">Reduced</span>
                  </div>
                  <div className="stat-chip">
                    <span className="stat-chip-value">{result.width}×{result.height}</span>
                    <span className="stat-chip-label">Resolution</span>
                  </div>
                </div>

                <div className="comparison">
                  <div className="preview-box">
                    <div className="preview-header original">
                      <span>Original</span>
                      <span>{formatBytes(result.originalSize)}</span>
                    </div>
                    {preview && <img className="preview-img" src={preview} alt="Original" />}
                    <div className="preview-footer original">{formatBytes(result.originalSize)}</div>
                  </div>
                  <div className="preview-box">
                    <div className="preview-header compressed">
                      <span>Compressed</span>
                      <span>{formatBytes(result.compressedSize)}</span>
                    </div>
                    <img className="preview-img" src={result.dataUrl} alt="Compressed" />
                    <div className="preview-footer compressed">{formatBytes(result.compressedSize)}</div>
                  </div>
                </div>

                <div className="actions">
                  <button className="action-btn btn-download" onClick={download}>
                    ⬇ Download Compressed Image
                  </button>
                  <button className="action-btn btn-reset" onClick={reset}>
                    Compress Another
                  </button>
                </div>
              </>
            )}
          </div>

          <AdUnit position="bottom" />

          {/* SEO Section */}
          <section className="section-seo">
            <div className="seo-card">
              <h2>Free Online Image Compressor — Reduce Image Size Instantly</h2>
              <p>
                Our <strong>free online image compressor</strong> reduces the file size of JPG, PNG, and WebP images
                directly in your browser — no uploads to any server, no account required, and completely free.
                Whether you need to compress images to under 100KB for email attachments, reduce PNG file size for
                faster web page loading, or shrink photos before sharing on social media, this tool does the job instantly.
              </p>
              <p>
                The compression engine uses HTML5 Canvas to re-encode your image at the quality level you choose.
                Lower quality means smaller files; higher quality preserves more detail. The max-width slider
                lets you resize large photos so they load faster on mobile devices and don&apos;t waste bandwidth.
              </p>

              <h2>How to Compress an Image Online</h2>
              <ul>
                <li>Click the upload zone or drag and drop your image (JPG, PNG, WebP, or GIF)</li>
                <li>Adjust the <strong>Quality</strong> slider — 80% is a great balance of size and sharpness</li>
                <li>Set a <strong>Max Width</strong> if you need to resize the image at the same time</li>
                <li>Click <strong>Compress Image</strong> and see the before/after comparison instantly</li>
                <li>Click <strong>Download</strong> to save the compressed file to your device</li>
              </ul>

              <h2>Why Compress Images?</h2>
              <p>
                Large images slow down websites, eat up storage, and are rejected by email services.
                Compressed images load faster, rank better in Google, and improve user experience on every device.
                Our tool is ideal for bloggers, web developers, e-commerce sellers, and anyone who needs
                smaller image files without sacrificing visible quality.
              </p>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  )
}
