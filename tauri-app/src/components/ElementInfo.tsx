import BrowseButton from './BrowseButton'
import { RecordType } from '@/shared/RecordType'
import { addRecord, deleteRecord, getAllRecords } from '@/utils/database'

export default function ElementInfo(props: {
  selectedRecord: RecordType | undefined
  setSelectedRecord: (record: RecordType | undefined) => void
  setRecords: (records: RecordType[]) => void
}) {
  const handleChange = async (event: Event) => {
    const file = (event.target as HTMLInputElement).files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = async (event) => {
        const photoData: RecordType = {
          id: Date.now(),
          text: 'fff1',
          name: file.name,
          dataURL: event.target?.result as string,
          createDate: new Date(),
        }
        await addRecord(photoData)
        props.setRecords(await getAllRecords())
        props.setSelectedRecord(photoData)
      }
      reader.readAsDataURL(file)
    }
  }
  const handleDeleteRecord = async () => {
    if (props.selectedRecord) {
      await deleteRecord(props.selectedRecord.id)
      props.setRecords(await getAllRecords())
      props.setSelectedRecord(undefined)
    }
  }

  return (
    <div class="w-full h-full p-2">
      <div class="flex items-center shadow-md justify-center w-full h-full rounded-2xl bg-white relative">
        {props.selectedRecord ? (
          <>
            <img src={props.selectedRecord.dataURL} alt="" class="h-40 w-40" />
            <button
              type="button"
              onClick={handleDeleteRecord}
              class="bg-red-400 top-0 right-0 mt-3 mr-3 w-36 h-7 hover:bg-red-500 transition-colors active:bg-red-600 rounded-2xl shadow-md text-white absolute"
            >
              Delete record
            </button>
          </>
        ) : (
          <BrowseButton handleChange={(event: Event) => handleChange(event)} />
        )}
      </div>
    </div>
  )
}
