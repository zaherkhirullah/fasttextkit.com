import CaseToolClient from '../../../components/CaseToolClient'

export const metadata = {
  title: 'kebab-case Converter Online Free — ToolKit Pro',
  description: 'Free online kebab-case converter. Convert text to kebab-case for CSS class names, URL slugs, and HTML attributes.',
  keywords: 'kebab case converter online, text to kebab-case, css class name generator, url slug converter',
}

export default function KebabCasePage() {
  return <CaseToolClient caseType="kebab-case" />
}
