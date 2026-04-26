'use client'

import { useState, useRef } from 'react'
import Header from '../../../components/Header'
import Footer from '../../../components/Footer'

function formatBytes(bytes) {
  if (bytes === 0) return '0 B'
  const k = 1024
  const sizes = ['B', 'KB', 'MB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

export default function ImageCompressorClient() {
  const [file, setFile] = useState(null)
  const [result, setResult] = useState(null)
  const [quality, setQuality] = useState(80)
  const [maxWidth, setMaxWidth] = useState(1920)
  const [targetKB, setTargetKB] = useState(100)
  const [mode, setMode] = useState('quality') // 'quality' or 'target'
  const [loading, setLoading] = useState(false)
  const [dragOver, setDragOver] = useState(false)
  const fileInputRef = useRef(null)

  const handleFile = (selected) => {
    if (selected && selected.type.startsWith('image/')) {
      setFile(selected)
      setResult(null)
    }
  }

  const onFileChange = (e) => handleFile(e.target.files?.[0])

  const onDrop = (e) => {
    e.preventDefault()
    setDragOver(false)
    handleFile(e.dataTransfer.files?.[0])
  }

  const compressWithQuality = (img, q) => {
    return new Promise((resolve) => {
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')
      let width = img.width
      let height = img.height
      if (width > maxWidth) {
        height = (height * maxWidth) / width
        width = maxWidth
      }
      canvas.width = width
      canvas.height = height
      ctx.drawImage(img, 0, 0, width, height)
      canvas.toBlob((blob) => {
        resolve({ blob, dataUrl: canvas.toDataURL('image/jpeg', q), width, height })
      }, 'image/jpeg', q)
    })
  }

  const compress = async () => {
    if (!file) return
    setLoading(true)

    const img = new Image()
    img.onload = async () => {
      let finalResult
      if (mode === 'target') {
        // Binary search for quality to hit target size
        let low = 0.05, high = 1.0, best = null
        const targetBytes = targetKB * 1024
        for (let i = 0; i < 8; i++) {
          const q = (low + high) / 2
          const r = await compressWithQuality(img, q)
          if (r.blob.size <= targetBytes) {
            best = r
            low = q
          } else {
            high = q
          }
        }
        finalResult = best || await compressWithQuality(img, 0.05)
      } else {
        finalResult = await compressWithQuality(img, quality / 100)
      }

      setResult({
        blob: finalResult.blob,
        dataUrl: finalResult.dataUrl,
        originalSize: file.size,
        compressedSize: finalResult.blob.size,
        width: finalResult.width,
        height: finalResult.height,
      })
      setLoading(false)
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
    setResult(null)
  }

  const reduction = result
    ? ((result.originalSize - result.compressedSize) / result.originalSize * 100).toFixed(1)
    : 0

  return (
    <>
      <style jsx>{`
        .compressor-page {
          min-height: 100vh;
          background: linear-gradient(135deg, #fdf2f8 0%, #fce7f3 50%, #f3e8ff 100%);
        }
        
        .page-header {
          padding: 3rem 0 2rem;
          text-align: center;
        }
        
        .page-header h1 {
          font-size: clamp(2rem, 5vw, 3rem);
          font-weight: 700;
          margin-bottom: 0.75rem;
          background: linear-gradient(135deg, #be185d, #9333ea);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          letter-spacing: -0.02em;
        }
        
        .page-header p {
          color: #64748b;
          font-size: 1.125rem;
        }
        
        .main-card {
          background: white;
          border-radius: 1.5rem;
          box-shadow: 0 4px 24px rgba(0, 0, 0, 0.06), 0 1px 2px rgba(0, 0, 0, 0.04);
          border: 1px solid #e2e8f0;
          padding: 2rem;
          max-width: 900px;
          margin: 0 auto 2rem;
        }
        
        .upload-zone {
          border: 3px dashed #f9a8d4;
          border-radius: 1.25rem;
          padding: 3rem 2rem;
          text-align: center;
          cursor: pointer;
          transition: all 0.3s ease;
          background: linear-gradient(135deg, #fdf2f8, #fce7f3);
        }
        
        .upload-zone:hover, .upload-zone.drag-over {
          border-color: #ec4899;
          background: linear-gradient(135deg, #fce7f3, #f9a8d4);
          transform: scale(1.01);
        }
        
        .upload-icon {
          font-size: 3.5rem;
          margin-bottom: 1rem;
          display: inline-block;
          animation: bounce 2s ease-in-out infinite;
        }
        
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        
        .upload-text {
          font-size: 1.125rem;
          font-weight: 600;
          color: #831843;
          margin-bottom: 0.5rem;
        }
        
        .upload-formats {
          font-size: 0.875rem;
          color: #9f1239;
        }
        
        .file-info {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1rem 1.25rem;
          background: #fdf2f8;
          border: 1px solid #f9a8d4;
          border-radius: 0.75rem;
          margin-bottom: 1.5rem;
        }
        
        .file-info-main {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }
        
        .file-icon {
          font-size: 1.5rem;
        }
        
        .file-name {
          font-weight: 600;
          color: #831843;
        }
        
        .file-size {
          font-size: 0.875rem;
          color: #9f1239;
        }
        
        .mode-tabs {
          display: flex;
          gap: 0.5rem;
          margin-bottom: 1.5rem;
          padding: 0.375rem;
          background: #f1f5f9;
          border-radius: 0.75rem;
        }
        
        .mode-tab {
          flex: 1;
          padding: 0.75rem 1rem;
          font-size: 0.875rem;
          font-weight: 600;
          border-radius: 0.5rem;
          border: none;
          background: transparent;
          color: #64748b;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        
        .mode-tab.active {
          background: white;
          color: #be185d;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
        }
        
        .options-panel {
          padding: 1.5rem;
          background: linear-gradient(135deg, #fdf2f8, #f3e8ff);
          border-radius: 1rem;
          border: 1px solid #f9a8d4;
          margin-bottom: 1.5rem;
        }
        
        .option-row {
          margin-bottom: 1.25rem;
        }
        
        .option-row:last-child {
          margin-bottom: 0;
        }
        
        .option-label {
          display: flex;
          justify-content: space-between;
          font-size: 0.9375rem;
          font-weight: 600;
          color: #831843;
          margin-bottom: 0.625rem;
        }
        
        .option-value {
          color: #ec4899;
          font-family: 'JetBrains Mono', monospace;
        }
        
        .slider {
          width: 100%;
          height: 6px;
          border-radius: 3px;
          background: #f9a8d4;
          outline: none;
          appearance: none;
          cursor: pointer;
        }
        
        .slider::-webkit-slider-thumb {
          appearance: none;
          width: 22px;
          height: 22px;
          border-radius: 50%;
          background: linear-gradient(135deg, #ec4899, #9333ea);
          cursor: pointer;
          border: 3px solid white;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
        }
        
        .slider::-moz-range-thumb {
          width: 22px;
          height: 22px;
          border-radius: 50%;
          background: linear-gradient(135deg, #ec4899, #9333ea);
          cursor: pointer;
          border: 3px solid white;
        }
        
        .actions {
          display: flex;
          flex-wrap: wrap;
          gap: 0.75rem;
          margin-bottom: 1.5rem;
        }
        
        .action-btn {
          padding: 0.875rem 1.5rem;
          font-size: 0.9375rem;
          font-weight: 600;
          border-radius: 0.75rem;
          border: none;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        
        .btn-primary {
          background: linear-gradient(135deg, #ec4899, #9333ea);
          color: white;
        }
        
        .btn-primary:hover:not(:disabled) {
          transform: translateY(-1px);
          box-shadow: 0 6px 16px rgba(236, 72, 153, 0.3);
        }
        
        .btn-primary:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }
        
        .btn-secondary {
          background: #f1f5f9;
          color: #475569;
        }
        
        .btn-secondary:hover {
          background: #e2e8f0;
        }
        
        .btn-download {
          background: linear-gradient(135deg, #10b981, #059669);
          color: white;
        }
        
        .btn-download:hover {
          transform: translateY(-1px);
          box-shadow: 0 6px 16px rgba(16, 185, 129, 0.3);
        }
        
        .result-section {
          margin-top: 2rem;
        }
        
        .preview-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
          margin-bottom: 1.5rem;
        }
        
        .preview-card {
          background: #fafafa;
          border-radius: 1rem;
          padding: 1rem;
          border: 1px solid #e2e8f0;
        }
        
        .preview-card h3 {
          font-size: 0.875rem;
          font-weight: 700;
          color: #475569;
          margin-bottom: 0.75rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }
        
        .preview-card img {
          width: 100%;
          max-height: 200px;
          object-fit: contain;
          border-radius: 0.5rem;
          background: white;
          margin-bottom: 0.75rem;
        }
        
        .preview-size {
          font-family: 'JetBrains Mono', monospace;
          font-weight: 600;
          color: #475569;
        }
        
        .savings-banner {
          background: linear-gradient(135deg, #10b981, #059669);
          color: white;
          padding: 1.25rem;
          border-radius: 1rem;
          text-align: center;
          margin-bottom: 1.5rem;
        }
        
        .savings-banner .big {
          font-size: 2rem;
          font-weight: 800;
          font-family: 'DM Sans', sans-serif;
        }
        
        .savings-banner .label {
          font-size: 0.875rem;
          opacity: 0.9;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          margin-top: 0.25rem;
        }
        
        .section-seo {
          max-width: 900px;
          margin: 0 auto 3rem;
        }
        
        .seo-card {
          background: white;
          border-radius: 1.5rem;
          box-shadow: 0 4px 24px rgba(0, 0, 0, 0.06);
          border: 1px solid #e2e8f0;
          padding: 2.5rem;
        }
        
        .seo-card h2 {
          font-size: 1.5rem;
          font-weight: 700;
          color: #1e293b;
          margin-bottom: 1.25rem;
          letter-spacing: -0.01em;
        }
        
        .seo-card p {
          color: #475569;
          line-height: 1.75;
          margin-bottom: 1rem;
        }
        
        .seo-card ul {
          margin: 1.5rem 0;
          padding-left: 1.5rem;
        }
        
        .seo-card li {
          color: #475569;
          margin-bottom: 0.75rem;
          line-height: 1.6;
        }
        
        .seo-card li::marker {
          color: #ec4899;
        }

        @media (max-width: 640px) {
          .main-card {
            padding: 1.5rem;
            border-radius: 1rem;
          }
          
          .upload-zone {
            padding: 2rem 1rem;
          }
          
          .preview-grid {
            grid-template-columns: 1fr;
          }
          
          .actions {
            flex-direction: column;
          }
          
          .action-btn {
            width: 100%;
          }
          
          .mode-tab {
            font-size: 0.8125rem;
            padding: 0.625rem 0.5rem;
          }
        }
      `}</style>

      <div className="compressor-page">
        <Header currentPage="image-compressor" />
        
        <main className="container">
          <div className="page-header">
            <h1>Image Compressor</h1>
            <p>Reduce image file size to 100KB or less — free &amp; instant</p>
          </div>

          <div className="main-card">
            {!file && (
              <div 
                className={`upload-zone ${dragOver ? 'drag-over' : ''}`}
                onClick={() => fileInputRef.current?.click()}
                onDragOver={(e) => { e.preventDefault(); setDragOver(true) }}
                onDragLeave={() => setDragOver(false)}
                onDrop={onDrop}
              >
                <input 
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={onFileChange}
                  hidden
                />
                <div className="upload-icon">📸</div>
                <p className="upload-text">Drop your image here or click to browse</p>
                <span className="upload-formats">Supports JPG, PNG, WebP · Max 20MB</span>
              </div>
            )}

            {file && (
              <>
                <div className="file-info">
                  <div className="file-info-main">
                    <span className="file-icon">🖼️</span>
                    <div>
                      <div className="file-name">{file.name}</div>
                      <div className="file-size">{formatBytes(file.size)}</div>
                    </div>
                  </div>
                  <button className="action-btn btn-secondary" onClick={reset} style={{ padding: '0.5rem 1rem', fontSize: '0.8125rem' }}>
                    Change
                  </button>
                </div>

                <div className="mode-tabs">
                  <button 
                    className={`mode-tab ${mode === 'quality' ? 'active' : ''}`}
                    onClick={() => setMode('quality')}
                  >
                    Quality Mode
                  </button>
                  <button 
                    className={`mode-tab ${mode === 'target' ? 'active' : ''}`}
                    onClick={() => setMode('target')}
                  >
                    Target Size (KB)
                  </button>
                </div>

                <div className="options-panel">
                  {mode === 'quality' ? (
                    <div className="option-row">
                      <label className="option-label">
                        <span>Quality</span>
                        <span className="option-value">{quality}%</span>
                      </label>
                      <input 
                        type="range"
                        className="slider"
                        min="10"
                        max="100"
                        value={quality}
                        onChange={(e) => setQuality(+e.target.value)}
                      />
                    </div>
                  ) : (
                    <div className="option-row">
                      <label className="option-label">
                        <span>Target size</span>
                        <span className="option-value">{targetKB} KB</span>
                      </label>
                      <input 
                        type="range"
                        className="slider"
                        min="10"
                        max="1000"
                        step="10"
                        value={targetKB}
                        onChange={(e) => setTargetKB(+e.target.value)}
                      />
                    </div>
                  )}

                  <div className="option-row">
                    <label className="option-label">
                      <span>Max width</span>
                      <span className="option-value">{maxWidth}px</span>
                    </label>
                    <input 
                      type="range"
                      className="slider"
                      min="200"
                      max="4000"
                      step="100"
                      value={maxWidth}
                      onChange={(e) => setMaxWidth(+e.target.value)}
                    />
                  </div>
                </div>

                <div className="actions">
                  <button className="action-btn btn-primary" onClick={compress} disabled={loading}>
                    {loading ? 'Compressing…' : '⚡ Compress Image'}
                  </button>
                </div>
              </>
            )}

            {result && (
              <div className="result-section">
                <div className="savings-banner">
                  <div className="big">−{reduction}%</div>
                  <div className="label">Size Reduced · {formatBytes(result.originalSize - result.compressedSize)} saved</div>
                </div>

                <div className="preview-grid">
                  <div className="preview-card">
                    <h3>Original</h3>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={URL.createObjectURL(file)} alt="Original" />
                    <div className="preview-size">{formatBytes(result.originalSize)}</div>
                  </div>
                  <div className="preview-card">
                    <h3>Compressed</h3>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={result.dataUrl} alt="Compressed" />
                    <div className="preview-size">{formatBytes(result.compressedSize)}</div>
                  </div>
                </div>

                <div className="actions">
                  <button className="action-btn btn-download" onClick={download}>
                    ⬇ Download Compressed Image
                  </button>
                  <button className="action-btn btn-secondary" onClick={reset}>
                    New Image
                  </button>
                </div>
              </div>
            )}
          </div>

          <section className="section-seo">
            <div className="seo-card">
              <h2>About This Image Compressor</h2>
              <p>
                Our free <strong>image compressor online</strong> tool reduces JPG, PNG, and WebP file sizes quickly 
                without visible quality loss. Whether you need to compress images for your website, email attachments, 
                social media, or documents, this tool gets the job done in seconds.
              </p>
              <p>
                Use <strong>Target Size mode</strong> to automatically reduce image size to 100KB or less. 
                Everything runs privately in your browser — your images never leave your device.
              </p>
              
              <h2>How to Use</h2>
              <ul>
                <li>Upload your image by clicking or dragging it into the upload zone</li>
                <li>Choose between Quality Mode or Target Size (KB) mode</li>
                <li>Adjust quality, target size, or max width with the sliders</li>
                <li>Click &quot;Compress Image&quot; and download the result instantly</li>
              </ul>
              
              <h2>Why Use an Online Image Compressor?</h2>
              <p>
                Smaller images mean faster website load times, better SEO, and lower bandwidth costs. 
                Compress JPG to 100KB for email attachments, reduce image size KB for fast-loading websites, 
                or optimize photos for social media — all privacy-safe, all client-side, all free.
              </p>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </>
  )
}