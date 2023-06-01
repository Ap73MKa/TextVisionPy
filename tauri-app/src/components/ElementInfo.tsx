import BrowseButton from './BrowseButton'
import { RecordType } from '@/shared/RecordType'
import { addRecord, deleteRecord } from '@/utils/database'
import {
  addRecordStore,
  deleteRecordStore,
  selectedRecord,
  setSelectedRecord,
} from '@/stores/recordsStore'
import { createWorker } from 'tesseract.js'

export default function ElementInfo() {
  const handleFileLoad = async (file: File) => {
    const reader = new FileReader()
    reader.onload = async () => {
      const imageData = reader.result as string
      const text = await recognizeText(imageData)
      const photoData: RecordType = {
        id: Date.now(),
        text: text,
        name: file.name,
        dataURL: imageData,
        createDate: new Date(),
      }
      await addRecord(photoData)
      addRecordStore(photoData)
      setSelectedRecord(photoData)
    }
    reader.readAsDataURL(file)
  }

  const recognizeText = async (imageData: string) => {
    const worker = await createWorker()
    await worker.loadLanguage('eng')
    await worker.initialize('eng')
    const result = await worker.recognize(imageData)
    await worker.terminate()
    return result.data.text
  }

  const handleFileChange = async (event: Event) => {
    const file = (event.target as HTMLInputElement).files?.[0]
    if (file) await handleFileLoad(file)
  }
  const handleDeleteRecord = async () => {
    const record = selectedRecord()
    if (record) {
      await deleteRecord(record.id)
      deleteRecordStore(record.id)
      setSelectedRecord(undefined)
    }
  }

  return (
    <div class="h-full w-full p-2">
      <div class="flex h-full w-full max-w-[500px] flex-col items-center justify-center rounded-2xl bg-white shadow-md">
        {selectedRecord() ? (
          <>
            <div class="flex w-full items-center justify-between px-6">
              <p class="pt-2 text-lg">{selectedRecord()?.name}</p>
              <button
                type="button"
                onClick={handleDeleteRecord}
                class="mt-2 h-7 w-36 rounded-2xl bg-red-400 text-white shadow-md transition-colors hover:bg-red-500 active:bg-red-600"
              >
                Delete record
              </button>
            </div>

            <div class="m-4 h-full w-full overflow-y-auto px-4">
              <p class="w-full break-words">{selectedRecord()?.text}</p>
            </div>
          </>
        ) : (
          <BrowseButton
            handleChange={(event: Event) => handleFileChange(event)}
          />
        )}
      </div>
    </div>
  )
}
