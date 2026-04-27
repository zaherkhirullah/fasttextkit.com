import CaseConvertClient from './CaseConvertClient'

export const metadata = {
  title: 'Case Converter Online Free — UPPERCASE, lowercase, Title Case | FastText Kit',
  description: 'Free online case converter tool. Instantly convert text to UPPERCASE, lowercase, Title Case, Sentence case, camelCase, snake_case and more. No signup needed.',
  keywords: 'case converter online, uppercase converter, lowercase converter, title case converter, sentence case, camelCase converter, snake_case, text case changer free',
  openGraph: {
    title: 'Case Converter Online Free — FastText Kit',
    description: 'Convert text to any case format instantly. 8 case types available — UPPERCASE, lowercase, Title Case, Sentence case, camelCase, PascalCase, snake_case, kebab-case.',
    type: 'website',
  }
}

export default function CaseConvertPage() {
  return <CaseConvertClient />
}
