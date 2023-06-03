import { RecordType } from '@/shared/RecordType'
import {
  deleteRecordStore,
  selectedRecord,
  setSelectedRecord,
} from '@/stores/recordsStore'
import { Icon } from 'solid-heroicons'
import { xMark } from 'solid-heroicons/solid-mini'
import { deleteRecord } from '@/utils/database'
import classNames from '@/utils/className'

export default function NavbarTab(props: { record: RecordType }) {
  const isSelectedRecord = () => props.record.id === selectedRecord()?.id
  const handleTabClick = () => setSelectedRecord(props.record)
  const handleDeleteButton = async (event: Event) => {
    event.stopPropagation()
    if (isSelectedRecord()) {
      await setSelectedRecord(undefined)
    }
    await deleteRecord(props.record.id)
    deleteRecordStore(props.record.id)
  }
  return (
    <button type="button" onClick={handleTabClick} class="group">
      <div
        class={classNames(
          isSelectedRecord()
            ? 'bg-white'
            : 'border-gray-100 bg-gray-100 hover:bg-gray-200',
          'flex h-full items-center gap-2 border-x px-3 transition-colors'
        )}
      >
        <p class="text-sm">{props.record.name}</p>
        <div
          class={classNames(
            isSelectedRecord() ? '' : 'invisible group-hover:visible',
            'h-full flex items-center'
          )}
        >
          <Icon
            path={xMark}
            onClick={handleDeleteButton}
            class="mt-1 h-3 w-3 text-gray-600 hover:rounded-full hover:bg-sky-200 hover:text-white"
          />
        </div>
      </div>
    </button>
  )
}
