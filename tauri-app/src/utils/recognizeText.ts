import { createWorker } from 'tesseract.js'
import { selectedLanguages } from '@/stores/languageStore'

export default async function recognizeText(imageData: string) {
  const languages = selectedLanguages()
    .map((option) => option.value)
    .join('+')
  const worker = await createWorker()
  await worker.loadLanguage(languages)
  await worker.initialize(languages)
  const result = await worker.recognize(imageData)
  await worker.terminate()
  return result.data.text.replace(/^\s*[\r\n]/gm, '')
}
