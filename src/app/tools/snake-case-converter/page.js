import CaseToolClient from '../../../components/CaseToolClient'

export const metadata = {
  title: 'snake_case Converter Online Free — FastText Kit',
  description: 'Free online snake_case converter. Convert text to snake_case for Python variables, database columns, and Linux file names.',
  keywords: 'snake case converter online, text to snake_case, underscore case converter, python variable name generator',
}

export default function SnakeCasePage() {
  return <CaseToolClient caseType="snake-case" />
}
