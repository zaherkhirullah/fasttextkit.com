import CaseToolClient from '../../../components/CaseToolClient'

export const metadata = {
  title: 'PascalCase Converter Online Free — ToolKit Pro',
  description: 'Free online PascalCase converter. Convert text to PascalCase for React components, TypeScript classes, and constructor functions.',
  keywords: 'pascalcase converter online, text to PascalCase, pascal case generator, react component name converter',
}

export default function PascalCasePage() {
  return <CaseToolClient caseType="pascalcase" />
}
