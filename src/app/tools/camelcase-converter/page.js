import CaseToolClient from '../../../components/CaseToolClient'

export const metadata = {
  title: 'camelCase Converter Online Free — ToolKit Pro',
  description: 'Free online camelCase converter. Convert text to camelCase for JavaScript variables, JSON keys, and API fields instantly.',
  keywords: 'camelcase converter online, text to camelCase, camel case generator, javascript variable name converter',
}

export default function CamelCasePage() {
  return <CaseToolClient caseType="camelcase" />
}
