import { documentArrowUp } from 'solid-heroicons/solid'
import { Icon } from 'solid-heroicons'
import recognizeText from '@/utils/recognizeText'
import { RecordType } from '@/shared/RecordType'
import { addRecord } from '@/utils/database'
import { addRecordStore, setSelectedRecord } from '@/stores/recordsStore'

export default function BrowseButton() {
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

  const handleFileChange = async (event: Event) => {
    const file = (event.target as HTMLInputElement).files?.[0]
    if (file) await handleFileLoad(file)
  }
  return (
    <div class="flex h-32 flex-col items-center justify-center gap-4 rounded-xl border-2 border-dotted border-gray-300 bg-gray-100 pr-4 transition-colors hover:bg-gray-200">
      <label for="doc" class="flex items-center">
        <Icon path={documentArrowUp} class="h-24 w-24 text-gray-400" />
        <div>
          <p class="text-2xl font-bold text-gray-500">Browse file</p>
          <p class="text-sm text-gray-500">.jpg, .png, .web</p>
        </div>
        <input
          type="file"
          id="doc"
          name="doc"
          onChange={handleFileChange}
          accept="image/*,.png,.jpg,.web"
          hidden
        />
      </label>
    </div>
  )
}
