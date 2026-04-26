const seoData = {
  'word-counter': {
    title: 'Word Counter',
    howToUse: [
      'Type or paste your text in the input area',
      'View real-time counts for words, characters, sentences',
      'Copy your text with one click',
      'Clear and start over'
    ],
    features: [
      'Count words in real-time',
      'Count characters with/without spaces',
      'Count sentences and paragraphs',
      'Copy to clipboard'
    ]
  },
  'remove-spaces': {
    title: 'Remove Extra Spaces',
    howToUse: [
      'Enter your text with extra spaces',
      'Select which spaces to remove',
      'Click Remove Spaces button',
      'Copy the cleaned text'
    ],
    features: [
      'Remove leading/trailing spaces',
      'Collapse multiple spaces',
      'Remove newlines',
      'One-click copy'
    ]
  },
  'case-converter': {
    title: 'Case Converter',
    howToUse: [
      'Enter or paste your text',
      'Click your desired case type',
      'View converted result',
      'Copy to clipboard'
    ],
    features: [
      'UPPERCASE conversion',
      'lowercase conversion',
      'Title Case conversion',
      'Sentence case conversion'
    ]
  },
  'text-sorter': {
    title: 'Text Sorter',
    howToUse: [
      'Enter each item on a new line',
      'Choose sort order (A-Z, Z-A, length)',
      'Optionally remove duplicates',
      'Copy sorted result'
    ],
    features: [
      'Sort A-Z or Z-A',
      'Sort by line length',
      'Remove duplicates',
      'Remove empty lines'
    ]
  },
  'image-compressor': {
    title: 'Image Compressor',
    howToUse: [
      'Click or drag to upload image',
      'Adjust quality slider',
      'Set max width if needed',
      'Download compressed image'
    ],
    features: [
      'Adjustable quality',
      'Custom max width',
      'Client-side processing',
      'Shows size reduction'
    ]
  }
}

export default function SeoContent({ tool }) {
  const data = seoData[tool]
  if (!data) return null

  return (
    <section className="seo-content">
      <h2>How to Use {data.title}</h2>
      <ol>
        {data.howToUse.map((step, i) => (
          <li key={i}>{step}</li>
        ))}
      </ol>

      <h2>Features</h2>
      <ul>
        {data.features.map((feat, i) => (
          <li key={i}>{feat}</li>
        ))}
      </ul>
    </section>
  )
}