import { createWorker } from 'tesseract.js'

export default async function recognizeText(imageData: string) {
  const worker = await createWorker()
  await worker.loadLanguage('eng')
  await worker.initialize('eng')
  const result = await worker.recognize(imageData)
  await worker.terminate()
  return result.data.text
}
