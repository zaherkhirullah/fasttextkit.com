export default function sitemap() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://fasttextkit.com'

  const routes = [
    { url: '/', priority: 1.0, changeFrequency: 'weekly' },
    { url: '/tools/word-counter-online', priority: 0.9, changeFrequency: 'monthly' },
    { url: '/tools/remove-extra-spaces', priority: 0.9, changeFrequency: 'monthly' },
    { url: '/tools/sort-text-alphabetically', priority: 0.9, changeFrequency: 'monthly' },
    { url: '/tools/image-compressor-online', priority: 0.9, changeFrequency: 'monthly' },
    { url: '/tools/case-convert', priority: 0.9, changeFrequency: 'monthly' },
    { url: '/tools/uppercase-converter', priority: 0.9, changeFrequency: 'monthly' },
    { url: '/tools/lowercase-converter', priority: 0.9, changeFrequency: 'monthly' },
    { url: '/tools/title-case-converter', priority: 0.9, changeFrequency: 'monthly' },
    { url: '/tools/sentence-case-converter', priority: 0.9, changeFrequency: 'monthly' },
    { url: '/tools/capitalize-words', priority: 0.8, changeFrequency: 'monthly' },
    { url: '/tools/toggle-case', priority: 0.8, changeFrequency: 'monthly' },
    { url: '/tools/camelcase-converter', priority: 0.9, changeFrequency: 'monthly' },
    { url: '/tools/pascalcase-converter', priority: 0.8, changeFrequency: 'monthly' },
    { url: '/tools/snake-case-converter', priority: 0.9, changeFrequency: 'monthly' },
    { url: '/tools/kebab-case-converter', priority: 0.9, changeFrequency: 'monthly' },
    { url: '/blog/about', priority: 0.5, changeFrequency: 'yearly' },
    { url: '/blog/privacy', priority: 0.5, changeFrequency: 'yearly' },
    { url: '/blog/terms', priority: 0.5, changeFrequency: 'yearly' },
  ]

  return routes.map(route => ({
    url: `${baseUrl}${route.url}`,
    lastModified: new Date(),
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }))
}
