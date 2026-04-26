import CaseToolClient from '../../../components/CaseToolClient'

export const metadata = {
  title: 'Sentence Case Converter Online Free — ToolKit Pro',
  description: 'Free online sentence case converter. Fix improperly capitalized text instantly. Convert ALL CAPS or random case to proper sentences.',
  keywords: 'sentence case converter online, fix capitalization, sentence case tool, proper case converter',
}

export default function SentenceCasePage() {
  return <CaseToolClient caseType="sentence-case" />
}
