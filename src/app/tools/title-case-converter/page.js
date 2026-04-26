import CaseToolClient from '../../../components/CaseToolClient'

export const metadata = {
  title: 'Title Case Converter Online Free — ToolKit Pro',
  description: 'Free online Title Case converter. Capitalize the first letter of every major word instantly. Perfect for blog titles and headings.',
  keywords: 'title case converter online, capitalize words, title case generator, heading capitalization tool',
}

export default function TitleCasePage() {
  return <CaseToolClient caseType="title-case" />
}
