import WordCounterClient from './WordCounterClient'

export const metadata = {
  title: 'Word Counter Online Free (Count Words & Characters Instantly)',
  description: 'Free online word counter tool to count words, characters, and sentences instantly. Fast and accurate.',
}

export default function WordCounterPage() {
  return <WordCounterClient />
}
