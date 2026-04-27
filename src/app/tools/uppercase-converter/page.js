import CaseToolClient from '../../../components/CaseToolClient'

export const metadata = {
  title: 'UPPERCASE Converter Online Free — FastText Kit',
  description: 'Free online UPPERCASE converter. Instantly convert any text to ALL CAPS. No signup required. Works on mobile.',
  keywords: 'uppercase converter online, text to uppercase, all caps converter, capitalize text free',
}

export default function UppercasePage() {
  return <CaseToolClient caseType="uppercase" />
}
