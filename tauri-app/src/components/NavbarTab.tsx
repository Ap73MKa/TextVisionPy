import { RecordType } from '@/shared/RecordType'
import {
  deleteRecordStore,
  selectedRecord,
  setSelectedRecord,
} from '@/stores/recordsStore'
import { Icon } from 'solid-heroicons'
import { xMark } from 'solid-heroicons/solid-mini'
import { deleteRecord } from '@/utils/database'

export default function NavbarTab(props: { record: RecordType }) {
  const handleTabClick = () => setSelectedRecord(props.record)
  const handleDeleteButton = async (event: Event) => {
    event.stopPropagation()
    if (props.record.id === selectedRecord()?.id) {
      await setSelectedRecord(undefined)
    }
    await deleteRecord(props.record.id)
    deleteRecordStore(props.record.id)
  }
  return (
    <button type="button" onClick={handleTabClick}>
      <div
        class={`flex h-full items-center gap-2 border-x px-3 transition-colors ${
          props.record.id === selectedRecord()?.id
            ? 'bg-white'
            : 'border-gray-100 bg-gray-100'
        }`}
      >
        <p class="text-sm">{props.record.name}</p>
        <Icon
          path={xMark}
          onClick={handleDeleteButton}
          class="mt-1 h-3 w-3 text-gray-600 hover:rounded-full hover:bg-sky-200 hover:text-white"
        />
      </div>
    </button>
  )
}
